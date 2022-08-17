import React, {useState, useEffect } from 'react'
import axios from 'axios'
import * as ReactBootstrap from 'react-bootstrap'
import { NavBar } from './navigation'
import { Link,useParams } from 'react-router-dom'
import { MdEdit, MdDelete } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import { BsSearch } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ActivityIndicator from 'react-activity-indicator'

const DetailsBanque = () => {
    const [loading,setLoading]=useState(true);
    const id=useParams();
    const [show,setShow] = useState(false)
    const [banques, setBanques] = useState({ banks: []})
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [data,setData]=useState({
            designation:"",
            taux_pret:"",
            numBanque:""
    });
    const [error, setError] = useState("");
	
    useEffect(()=>{
        getBanqueById();
        //fetchPretBanque();
        fetchBanques()
      },[]);

    const getBanqueById = async () =>{
        setLoading(true)

        try {
          const url = "http://localhost:6969/banque/"+id.id;
          await axios.get(`${url}`)
          .then(async (response)=>{
            const allUsers = response.data
            setData({
              designation:allUsers.designation,
              taux_pret:allUsers.taux_pret,
              numBanque:allUsers.numBanque
            })

            const url ="http://localhost:6969/pret/list";
              await axios.get(`${url}`)
              .then((response)=>{
                const allPret = response.data
                const banqueList = [];
                allPret.map((pret,index)=>{
                  if(pret.Banque._id == id.id){
                      banqueList.push(pret)
                  } 
                })
                setBanques({banks: banqueList})
              })

            setLoading(false)
        })
       }catch (err) {
          console.error(`error:${err}`);
      } 
    }

    const fetchBanques = async ()=> {
      setLoading(true)
        try{
          const {data} = await axios.get("http://localhost:6969/banque/"+id.id+"/pretBanque")
          setBanques({banks: data.pret})
          setLoading(false)
        }
        catch (error) {
          console.log(error)
        }
    }

    const fetchPretBanque = async () =>{
      setLoading(true);

      
      try {
        const url ="http://localhost:6969/pret/list";
        await axios.get(`${url}`)
      .then((response)=>{
        const allPret = response.data
        const banqueList = [];
      
         allPret.map((pret,index)=>{
            if(pret.Banque._id == id.id){
              banqueList.push(pret)
            }
          })
    
        setBanques({banks: banqueList}) 
        setLoading(false)
      })
     } catch (err) {
      console.error(`error:${err}`);
    } 
    }

    const entreDeuxDate = async (e) =>{
      try {
        if(data.startDate!="" && data.endDate!=""){

          const url = "http://localhost:6969/pret/pretEntreDate";
          const { data: res } = await axios.post(url, {minDate:startDate,maxDate:endDate});
          const pretbanque = []
          console.log(res)
          if(res.length>0){
            res.map((pret,index)=>{
              if(pret.Banque._id == id.id){
                pretbanque.push(pret)
              }
            })
            setBanques({banks: pretbanque})
          }
          else{
            setBanques({banks: ""})
          }       
        }
        else{
          fetchPretBanque();
        }
      } 
      catch (error) {
        console.error(error)
      }

    }
  
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
          <p>N° Banque : <b> {data.numBanque}</b></p> 
           <p style={{marginLeft:'15px'}}>BANQUE : <b> {data.designation}</b></p> 
           <p style={{marginLeft:'15px'}}>Taux de prêt : <b> {data.taux_pret} %</b></p>
          </div>
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
                    <th></th>
                    <th>N° Prêt</th>
                    <th>Client</th>
                    <th>Date du prêt</th>
                    <th>Montant</th>
                    <th>Montant à payer</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
        {
            banques.banks && banques.banks.map((bank,index) =>        
              (
                <tr key={bank._id}>
                <td>{index}</td>
                <td>{bank.numPret}</td>
                <td>{bank.Client.nom}</td>
                <td>{bank.datePret}</td>
                <td>{bank.montant}</td>

                <td>{(bank.montant+((bank.montant*bank.Banque.taux_pret)/100))}</td>
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