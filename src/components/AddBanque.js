import React from 'react'
import { NavBar } from './navigation'
import { useState } from 'react'
import axios from "axios";


const AddBanque = () => {
    const [data,setData]=useState({
        designation:"",
        taux_pret:"",
        numBanque:""
    });
    const [error, setError] = useState("");
	
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:6969/banque/create";
			const { data: res } = await axios.post(url, data);
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

  return (
    <div>
      <NavBar></NavBar>
      <p style={{
          marginLeft:'100px',
          fontWeight:'700',
          fontSize:'15px'
        }}>AJOUTER UNE BANQUE</p>
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
        <button type="submit" class="btn btn-primary">Ajouter</button>
      </form>
    </div>
  )
}

export default AddBanque
