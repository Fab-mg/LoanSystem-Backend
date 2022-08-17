import React from 'react'
import { NavBar } from './navigation'
import { useState,useEffect } from 'react'
import axios from "axios";
import {useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdatePret = () => {
    const id=useParams();
    const [data,setData]=useState({
      montant:"",
      datePret:"",
      nom:"",
      designation:"",
    });
    const [error, setError] = useState("");
    const [startDate, setStartDate] = useState(new Date());

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    useEffect(()=>{
        getPretById();
      },[]);

    const getPretById = async () =>{
        const url = "http://localhost:6969/pret/"+id.id;
        try {
          await axios.get(`${url}`)
        .then((response)=>{
          const allPrets = response.data
          console.log(response.data)
          setData({
            montant: allPrets.montant,
            datePret: allPrets.datePret,
            nom: allPrets.Client.nom,            telClient: allPrets.telClient,
            designation: allPrets.Banque.designation,
          })
        })
       } catch (err) {
        console.error(`error:${err}`);
      } 
    }

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:6969/pret/"+id.id+"/update";
			const { data: res } = await axios.put(url, {datePret : data.datePret,montant:data.montant});
			console.log(res.message);
            window.location = "/Pret";
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

  return (
    <div>
      <NavBar></NavBar>
      <p style={{
          marginLeft:'100px',
          fontWeight:'700',
          fontSize:'15px'
        }}>MODIFIER UN PRÊT</p>
        <div style={{
            marginLeft:'100px',
            height:'80px',
            width:'20%',
            fontWeight:'400',
            fontSize:'14px',
            paddingTop:'9px',
            display:'flex',
            flexDirection:'column',
            backgroundColor:'rgb(245,245,245)',
            paddingLeft:'20px',
            borderRadius:'10px',
            marginBottom:'30px'
            }}>

            <p> Client : <b>  {data.nom}</b></p> 
            <p> Banque : <b>  {data.designation}</b></p> 
        </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div style={{width:'20%',marginLeft:'100px',display:'flex', height:'100%', justifyContent:'center',}}>
          <p style={{alignSelf:'center',marginRight:'5px'}}><b>D:</b></p>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
      <form onSubmit={handleSubmit}
       style={{
        width:'30%',
        margin:'10px',
        marginLeft:'100px'

      }}>
        <div class="mb-3">
            <label for="montant" class="form-label">Montant</label>
            <input type="number" class="form-control" id="montant" name="montant" value={data.montant} onChange={handleChange} required/>
        </div>

        <button type="submit" class="btn btn-primary">Modifier</button>
      </form>
    </div>
  )
}

export default UpdatePret
