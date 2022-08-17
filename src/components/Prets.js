import React, {useState, useEffect } from 'react'
import axios from 'axios'
import * as ReactBootstrap from 'react-bootstrap'
import {NavBar} from './navigation'
import { Link } from 'react-router-dom'
import { MdEdit, MdDelete } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import { BsSearch } from "react-icons/bs";
import ActivityIndicator from 'react-activity-indicator'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Prets = () => {
    const [prets, setPrets] = useState({ loans: []})
    const [show,setShow] = useState(false);
    const [data, setData] = useState({ keyword: "" });
    const [loading,setLoading]=useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleChange = ({ currentTarget: input }) => {
      setData({ ...data, [input.name]: input.value });
    };


      const fetchPrets = async ()=> {
        try{
          const {data} = await axios.get("http://localhost:6969/pret/list")
          setPrets({loans: data})
          console.log(data)
        }
        catch(err){
          console.log(err)
        }
      }


    useEffect(()=> {
        fetchPrets()
    }, [setPrets])

    const entreDeuxDate = async () =>{
      try {
        if(data.startDate!="" && data.endDate!=""){

          const url = "http://localhost:6969/pret/pretEntreDate";
          const { data: res } = await axios.post(url, {minDate:startDate,maxDate:endDate});
        
          if(res.length>0){
            setPrets({loans: res})
          }
          else{
            setPrets("")
          }       
        }
        else{
          fetchPrets();
        }
      } catch (error) {
        console.error(error)
      }
    }

    const searchPret = async (e) => {
      e.preventDefault();
      console.log("ATO EEEEE")
      try {
        if(data.keyword!=""){
          const url = "http://localhost:6969/pret/search";
          const { data: res } = await axios.post(url, data);

          if(res.length>0){
            setPrets({loans:res})
          }
          else{
            setPrets("")
          }       
        }
        else{
          fetchPrets();
        }
      } catch (error) {
        console.error(error)
      }
    };

    const deletePrets = async (id)=>{
      try{
        await axios.delete('http://localhost:6969/pret/'+id+'/delete')
        .then(() => 
        console.log("DELETE SUCCES"));
        setShow(true);
        window.location = "/Pret";
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
            LISTE DES PRÊTS
          </div>
           
         <form className="d-flex" onSubmit={searchPret}>
            <input
              name="keyword"
              id="keyword"
              value={data.keyword}
              onChange={handleChange}
              autoComplete="off"
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
            <Button type="submit" variant="outline-success">
              <BsSearch size={20}></BsSearch>
            </Button>
          </form>
        </div>
        <div style={{
        display:'flex',
        width:"35%",
        height:'45px',
        justifyContent:'space-between',
        marginLeft:'50px',
        marginBottom:'20px',
      }}>
        <div style={{display:'flex', height:'100%', justifyContent:'center',}}>
          <p style={{alignSelf:'center',marginRight:'5px'}}><b>D:</b></p>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
        <div style={{display:'flex', height:'100%', justifyContent:'center',}}>
          <p style={{alignSelf:'center',marginRight:'5px'}}><b>F:</b></p>
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        </div>
        <Button onClick={()=>{
           entreDeuxDate();
        }} style={{height:'30px',display:'flex',alignItems:'center'}} variant="outline-success">
          <BsSearch size={15}></BsSearch>
        </Button>

        
       
      </div>
        <ReactBootstrap.Table striped bordered hover>
      <thead>
        <tr>
          {/* <th>ID</th> */}
          <th></th>
          <th>Numero de prêt</th>
          <th>Date de prêt</th>
          <th>Banque</th>
          <th>Client</th>
          <th>Montant</th>
          <th></th>
          
        </tr>
      </thead>
      <tbody>
        {
            prets.loans && prets.loans.map((loan,index) => (
                <tr key={loan._id}>
                <td>{index}</td>
                <td>{loan.numPret}</td>
                <td>{loan.datePret}</td>
                <td>{loan.Banque.designation}</td>
                <td>{loan.Client.nom}</td>
                <td>{loan.montant}</td>
                <td>
                    <button style={{
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
                        <Link  to={{pathname: `/Pret/update/${loan._id}`}} >
                            <MdEdit color="#183153" size={20}></MdEdit>
                        </Link>
                      </div>
                    </button>
                </td>
                <td> 
                  <button style={{
                       outline:"none",
                       border:'none',
                       width:'30px',
                       height:'30px',
                       backgroundColor:'rgba(0,91,128,0.1)',
                       borderRadius:'5px',
                    }} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <div style={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        width:'100%',
                        height:'100%',
                      }}>
                            <MdDelete color="#183153" size={20}></MdDelete>
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
                          Êtes-vous sûr de vouloir supprimer ce prêt ?
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Non</button>
                          <button type="button" class="btn btn-primary" data-bs-dismiss={show ? 'modal': null} onClick={(e)=>{
                              
                              deletePrets(loan._id);
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

export default Prets