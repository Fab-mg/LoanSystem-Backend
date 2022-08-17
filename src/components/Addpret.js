import React from 'react'
import { NavBar } from './navigation'
import { useState,useEffect } from 'react'
import axios from "axios";
import {useParams} from 'react-router-dom'


const AddPret = () => {
    const [banques, setBanques] = useState({ banks: []})

    const items = []
    const id = useParams();

    const [id_banque,setId_banque ]= useState("");

    const [data,setData]=useState({
        montant:"",
        numPret:"",
        Client:"",
        Banque:""
    });

    const [clients,setClients]=useState({
      nom:"",
      adresse:"",
      numClient: "",
      telClient: "",
      email:""
  });

  const [error, setError] = useState("");
	
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
   // setData({Banque:id_banque})
	};

  const getClientById = async () =>{
    const url = "http://localhost:6969/client/"+id.id;
    try {
      await axios.get(`${url}`)
      .then((response)=>{
        const allUsers = response.data
        fetchBanques();
        console.log(response.data)
        setClients({
          nom: allUsers.nom,
          adresse: allUsers.adresse,
          numClient: allUsers.numClient,
          telClient: allUsers.telClient,
          email: allUsers.email,
        })
        setId_banque(banques.banks[0]._id)
      })
    }catch (err) {
      console.error(`error:${err}`);
    } 
  }

  const fetchBanques = async ()=> {
    try{
      const {data} = await axios.get("http://localhost:6969/banque/list")
      setBanques({banks: data})
      console.log(data)
      setId_banque(banques.banks[0]._id)

    }
    catch (error) {
      console.log(error)
    }  
  }

  useEffect(()=>{
    getClientById();
  },[]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:6969/pret/create";
      console.log(data) 
      console.log(data.montant)
      console.log(data.numPret)
      console.log(id.id)
      
      var b_id = ""
      if(id_banque == ""){
        b_id = banques.banks[0]._id
      }
      else{
        b_id = id_banque;
      }
      console.log(banques.banks[0])
      console.log(b_id)
      console.log("HANAOPRET IRETO")

     console.log(data)
		const { data: res } = await axios.post(url,{montant:data.montant,numPret:data.numPret,Client:id.id,Banque:b_id});
    console.log(res)
		console.log(res.message);
    window.location = "/PRET";
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
      {/* <p style={{
          marginLeft:'100px',
          fontWeight:'700',
          fontSize:'15px'
        }}>ENREGISTRER UN PRÊT</p> */}

        <div style={{
            marginLeft:'100px',
            height:'120px',
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

            <p> N° Client : <b>  {clients.numClient}</b></p> 
            <p> Nom : <b>  {clients.nom}</b></p> 
            <p> Adresse: <b>  {clients.adresse}</b></p>
          </div>

         
        


          <p style={{
          marginLeft:'100px',
          fontWeight:'700',
          fontSize:'14px'
        }}>Banque</p>
        <select style={{
          width:'20%',
          height:'45px',
          marginLeft:'100px',
          borderRadius:'5px',
          outline:'none',
          fontWeight:'600',
          paddingLeft:'10px',
          marginBottom:'20px'
        }} name="banque" onChange={(e)=>{
          setId_banque(e.target.value)
         // setData({Banque:e.target.value}) 
          }}>
            {
              banques.banks.map((bank,key)=>{
                return <option key={bank._id} value={bank._id}><b>{bank.designation}</b></option>;
              })  
            }
          </select>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}
       style={{
        width:'20%',
        margin:'10px',
        marginLeft:'100px',
        fontSize:'14px'
      }}>
        <div class="mb-3">
            <label for="numPret" class="form-label"><b>Numéro prêt</b></label>
            <input type="text" class="form-control" id="numPret" name="numPret" value={data.numPret}  onChange={handleChange} required/>
        </div>
        <div class="mb-3">
            <input  type="hidden" class="form-control" id="Client" name="Client"  value={id.id} onChange={handleChange} required/>
        </div>
        <div class="mb-3">
            <input type="hidden"  class="form-control" id="Banque" name="Banque" value={id_banque} onChange={handleChange}  required/>
        </div> 
        <div class="mb-3">
            <label for="montant" class="form-label"><b>Montant</b></label>
            <input type="text" class="form-control" id="montant" name="montant"  value={data.montant} onChange={handleChange} required/>
        </div>

        <button type="submit" class="btn btn-primary">Enregistrer un prêt</button>
      </form>
    </div>
  )
}

export default AddPret
