import React, {useState, useEffect } from 'react'
import axios from 'axios'
import * as ReactBootstrap from 'react-bootstrap'
import { NavBar } from './navigation'
import { Link,useParams } from 'react-router-dom'
import { MdEdit, MdDelete } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import { BsSearch } from "react-icons/bs";

const DetailsBanque = () => {
    const id=useParams();
    const [show,setShow] = useState(false)
    const [banques, setBanques] = useState({ banks: []})
    const [data,setData]=useState({
            designation:"",
            taux_pret:"",
            numBanque:""
    });
    const [error, setError] = useState("");
	
    useEffect(()=>{
        getBanqueById();
        fetchBanques()
      },[]);

    const getBanqueById = async () =>{
        const url = "http://localhost:6969/banque/"+id.id;
        try {
          await axios.get(`${url}`)
        .then((response)=>{
          const allUsers = response.data
          setData({
            designation:allUsers.designation,
            taux_pret:allUsers.taux_pret,
            numBanque:allUsers.numBanque
          })
        })
       } catch (err) {
        console.error(`error:${err}`);
      } 
    }

    const fetchBanques = async ()=> {
        try{
          const {data} = await axios.get("http://localhost:6969/banque/"+id.id+"/pretBanque")
          console.log("response data ambany")
          console.log(data.pret)
          setBanques({banks: data.pret})
          console.log("Anaty banques")
          console.log(banques.banks)

        }
        catch (error) {
          console.log(error)
        }



    }
  

  return (
    <div>
        <NavBar></NavBar>
        <div style={{
          display:'flex',
          width:"95%",
          height:'45px',
          justifyContent:'space-between',
          paddingLeft:'50px',
          paddingRight:'50px',
          marginBottom:'20px',
        }}>
          <div style={{height:'100%',textAlign:'center',fontWeight:'400',fontSize:'15px',paddingTop:'9px',display:'flex'}}>
           <p>BANQUE : <b> {data.designation}</b></p> 
           <p style={{marginLeft:'10px'}}>Taux de prêt : <b> {data.taux_pret} %</b></p>
          </div>

           
         <form className="d-flex">
            <input
              style={{
                borderRadius:'5px',
                boxShadow:'0 0 2px #183153',
                border:'none',
                paddingLeft:'20px',
                outline:'none'
              }}
              type="search"
              placeholder="Rechercher..."
              className="me-2"

            />
            <Button variant="outline-success">
              <BsSearch size={20}></BsSearch>
            </Button>
          </form>
        </div>
        
        <ReactBootstrap.Table striped bordered hover>
            <thead>
                <tr>
                    <th></th>
                    <th>Numéro Client</th>
                    <th>Date du prêt</th>
                    <th>Montant</th>
                    <th>Montant à payer</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
        {
            banques.banks && banques.banks.map((bank,index) => (
                <tr key={bank._id}>
                <td>{index}</td>
                <td>{bank.Client.nom}</td>
                <td>{bank.Banque}</td>
                <td>{bank.montant}</td>
                <td>
                </td>
                </tr>
            ))
        }        
      </tbody>
        </ReactBootstrap.Table>
    </div>


   
  )
}

export default DetailsBanque