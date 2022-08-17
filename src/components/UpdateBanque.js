import React from 'react'
import { NavBar } from './navigation'
import { useState,useEffect } from 'react'
import axios from "axios";
import {useParams } from 'react-router-dom';
import ActivityIndicator from 'react-activity-indicator'


const UpdateBanque = () => {
    const [loading,setLoading]=useState(true);
    const id=useParams();
    const [data,setData]=useState({
        designation:"",
        taux_pret:"",
        numBanque:""
    });
    const [error, setError] = useState("");
	
	  const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	  };

    useEffect(()=>{
        getBanqueById();
      },[]);

    const getBanqueById = async () =>{
        setLoading(true)
        const url = "http://localhost:6969/banque/"+id.id;
        try {
          await axios.get(`${url}`)
        .then((response)=>{
          const allUsers = response.data
          console.log(response.data)
          setData({
            designation:allUsers.designation,
            taux_pret:allUsers.taux_pret,
            numBanque:allUsers.numBanque
          })
          setLoading(false)
        })
       } catch (err) {
        console.error(`error:${err}`);
      } 
    }

	  const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:6969/banque/"+id.id+"/update";
			const { data: res } = await axios.put(url, data);
			console.log(res.message);
            window.location = "/Banque";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	  };

    if(loading){
      return(
        <div style={{
          width:'100%',
          height:'80vh',
          display:'flex',
          justifyContent:'center',
          alignItems:'center'}}>
          <ActivityIndicator
            number={5}
            diameter={20}
            borderWidth={1}
            duration={300}
            activeColor="#183153"
            borderColor="#183153"
            borderRadius="50px" 
            boxShadow="0 0 2px #183153"/>
        </div>
  
      )
    }

  return (
    <div>
      
      <NavBar></NavBar>
      <p style={{
          marginLeft:'100px',
          fontWeight:'700',
          fontSize:'15px'
        }}>MODIFIER UNE BANQUE</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}
       style={{
        width:'30%',
        margin:'10px',
        marginLeft:'100px'

      }}>
        <div class="mb-3">
            <label for="numBanque" class="form-label">Numéro Banque</label>
            <input type="text" class="form-control" id="numBanque" name="numBanque" value={data.numBanque}  onChange={handleChange}  required/>
        </div> 
        <div class="mb-3">
            <label for="designation" class="form-label">Désignation</label>
            <input type="text" class="form-control" id="designation" name="designation" value={data.designation}  onChange={handleChange} required/>
        </div>
        <div class="mb-3">
            <label for="taux_pret" class="form-label">Taux prêt</label>
            <input type="taux_pret" class="form-control" id="taux_pret" name="taux_pret"  value={data.taux_pret} onChange={handleChange} required/>
        </div>

        <button type="submit" class="btn btn-primary">Modifier</button>
      </form>
    </div>
  )
}

export default UpdateBanque
