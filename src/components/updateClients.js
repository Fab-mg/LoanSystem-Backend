import React from 'react'
import { NavBar } from './navigation'
import { useState,useEffect } from 'react'
import axios from "axios";
import {useParams } from 'react-router-dom';


const UpdateClient = () => {
    const id=useParams();
    const [data,setData]=useState({
        nom:"",
        adresse:"",
        numClient: "",
        telClient: "",
        email:""
    });
    const [error, setError] = useState("");
	
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

  const getClientById = async () =>{
    const url = "http://localhost:6969/client/"+id.id;
    try {
      await axios.get(`${url}`)
    .then((response)=>{
      const allUsers = response.data
      console.log(response.data)
      setData({
        nom: allUsers.nom,
        adresse: allUsers.adresse,
        numClient: allUsers.numClient,
        telClient: allUsers.telClient,
        email: allUsers.email,
      })
    })
   } catch (err) {
    console.error(`error:${err}`);
  } 
}

    useEffect(()=>{
        getClientById();
      },[]);

 

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:6969/client/"+id.id+"/update";
			const { data: res } = await axios.put(url, data);
			console.log(res.message);
            window.location = "/Client";
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
        }}>MODIFIER UN CLIENT</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}
       style={{
        width:'30%',
        margin:'10px',
        marginLeft:'100px'

      }}>
        <div class="mb-3">
            <label for="numClient" class="form-label">Numéro client</label>
            <input type="text" class="form-control" id="numClient" name="numClient" value={data.numClient}  onChange={handleChange} required/>
        </div>
        <div class="mb-3">
            <label for="nom" class="form-label">Nom</label>
            <input type="nom" class="form-control" id="nom" name="nom"  value={data.nom} onChange={handleChange} required/>
        </div>
        <div class="mb-3">
            <label for="adresse" class="form-label">Adresse</label>
            <input type="text" class="form-control" id="adresse" name="adresse" value={data.adresse}  onChange={handleChange}  required/>
        </div> 
        <div class="mb-3">
            <label for="telClient" class="form-label">Téléphone</label>
            <input type="text" class="form-control" id="telClient" name="telClient"  value={data.telClient} onChange={handleChange} required/>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input type="email" class="form-control" id="email" name="email" value={data.email} onChange={handleChange} required/>
        </div>

        <button type="submit" class="btn btn-primary">Modifier</button>
      </form>
    </div>
  )
}

export default UpdateClient
