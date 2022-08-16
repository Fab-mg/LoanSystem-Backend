import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as ReactBootstrap from 'react-bootstrap'
import {NavBar} from './navigation'
import { Link } from 'react-router-dom'
import { MdEdit, MdDelete } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import { BsSearch,BsThreeDotsVertical } from "react-icons/bs";

const Banques = () => {
    const [banques, setBanques] = useState({ banks: []})
    const [show,setShow] = useState(false)
    
    const fetchBanques = async ()=> {
      try{
        const {data} = await axios.get("http://localhost:6969/banque/list")
        setBanques({banks: data})
        console.log(data)
      }
      catch (error) {
        console.log(error)
      }
      
  }

    useEffect(()=> { 
        fetchBanques()
    }, [setBanques])

    const deleteBanque = async (id)=>{
      try{
        await axios.delete('http://localhost:6969/banque/'+id+'/delete')
        .then(() => console.log("DELETE SUCCES"));


        await axios.delete('http://localhost:6969/pret/'+id+'/delete')
        .then(() => console.log("DELETE SUCCES"));
        setShow(true);



        window.location = "/Banque";
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
          <div style={{height:'100%',textAlign:'center',fontWeight:'700',fontSize:'15px',paddingTop:'9px'}}>
            LISTE DES BANQUES
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
          <th>Numéro de banque</th>
          <th>Désignation</th>
          <th>Taux d'interet</th>
          <th></th>


        </tr>
      </thead>
      <tbody>
        {
            banques.banks && banques.banks.map((bank,index) => (
                <tr key={bank._id}>
                <td>{index}</td>
                <td>{bank.numBanque}</td>
                <td>{bank.designation}</td>
                <td>{bank.taux_pret + "%"}</td>
                <td>
                <button title='Détails' style={{
                      outline:"none",
                      width:'30px',
                      height:'30px',
                      border:'none',
                      backgroundColor:'rgba(0,91,128,0.1)',
                      borderRadius:'5px',
                      
                    }}>
                    <div style={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        width:'100%',
                        height:'100%',

                      }}>
                        <Link  to={{pathname: `/Banque/Detail/${bank._id}`}} >
                            <BsThreeDotsVertical color="black" size={20}></BsThreeDotsVertical>
                        </Link>
                      </div>
                </button>
                 
                </td>
                <td>
                <button title='Modifier' style={{
                      outline:"none",
                      width:'30px',
                      height:'30px',
                      border:'none',
                      backgroundColor:'rgba(0,91,128,0.1)',
                      borderRadius:'5px',
                      
                    }}>
                    <div style={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        width:'100%',
                        height:'100%',

                      }}>
                        <Link  to={{pathname: `/Banque/update/${bank._id}`}} >
                            <MdEdit color="black" size={20}></MdEdit>
                        </Link>
                      </div>
                </button>
                 
                </td>
                
                <td> 
                <button data-bs-toggle="modal" data-bs-target="#exampleModal"
                 style={{
                      outline:"none",
                      width:'30px',
                      height:'30px',
                      border:'none',
                      backgroundColor:'rgba(0,91,128,0.1)',
                      borderRadius:'5px',
                      
                    }}>
                    <div style={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        width:'100%',
                        height:'100%',

                      }}>
                          <MdDelete color="black" size={20}></MdDelete>
                      </div>
                </button>
                </td>

                
                  <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Supprimer</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          Êtes-vous sûr de vouloir supprimer cette banque ?
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Non</button>
                          <button type="button" class="btn btn-primary" data-bs-dismiss={show ? 'modal': null} onClick={(e)=>{
                              
                              deleteBanque(bank._id);
                          }}>Oui</button>
                        </div>
                      </div>
                    </div>  
                  </div>
                </tr>
            ))
        }        
      </tbody>
    </ReactBootstrap.Table>
    </div>
  )
}

export default Banques