import React from 'react'
import { NavBar } from './navigation'
import { useState } from 'react'
import axios from "axios";


const AddPret = () => {
    const [data,setData]=useState({
        montant:"",
        Banque:"",
        Client:"",
        numPret:""
    });

    const [error, setError] = useState("");

	
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:6969/pret/create";
			const { data: res } = await axios.post(url, data);
            console.log(res.data)
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
      <p style={{
          marginLeft:'100px',
          fontWeight:'700',
          fontSize:'15px'
        }}>ENREGISTRER UN PRÊT</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}
       style={{
        width:'30%',
        margin:'10px',
        marginLeft:'100px'
      }}>
        <div class="mb-3">
            <label for="numPret" class="form-label">Numéro prêt</label>
            <input type="text" class="form-control" id="numPret" name="numPret" value={data.numPret}  onChange={handleChange} required/>
        </div>
        <div class="mb-3">
            <label for="Client" class="form-label">Client</label>
            <input type="Client" class="form-control" id="Client" name="Client"  value={data.Client} onChange={handleChange} required/>
        </div>
        <div class="mb-3">
            <label for="Banque" class="form-label">Banque</label>
            <input type="text" class="form-control" id="Banque" name="Banque" value={data.Banque}  onChange={handleChange}  required/>
        </div> 
        <div class="mb-3">
            <label for="montant" class="form-label">Montant</label>
            <input type="text" class="form-control" id="montant" name="montant"  value={data.montant} onChange={handleChange} required/>
        </div>

        <button type="submit" class="btn btn-primary">Enregistrer</button>
      </form>
    </div>
  )
}

export default AddPret
