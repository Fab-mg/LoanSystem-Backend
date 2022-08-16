import React, { useMemo, useState, useEffect } from 'react'
import axios from 'axios'
import * as ReactBootstrap from 'react-bootstrap'

const Banques = () => {
    const [banques, setBanques] = useState({ banks: []})

    useEffect(()=> {
        const fetchBanques = async ()=> {
            const {data} = await axios.get("http://localhost:6969/banque/list")
            setBanques({banks: data})
            console.log(data)
        }
        fetchBanques()
    }, [setBanques])
  return (
    <div>
        <ReactBootstrap.Table striped bordered hover>
      <thead>
        <tr>
          <th>ID-Banque</th>
          <th>Designation</th>
          <th>Taux d'interet</th>
          <th>Numero de banque</th>

        </tr>
      </thead>
      <tbody>
        {
            banques.banks && banques.banks.map((bank) => (
                <tr key={bank._id}>
                <td>{bank._id}</td>
                <td>{bank.designation}</td>
                <td>{bank.taux_pret + "%"}</td>
                <td>{bank.numBanque}</td>
                </tr>
            ))
        }        
      </tbody>
    </ReactBootstrap.Table>
    </div>
  )
}

export default Banques