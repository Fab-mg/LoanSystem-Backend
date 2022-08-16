import React, { useMemo, useState, useEffect } from 'react'
import axios from 'axios'
import * as ReactBootstrap from 'react-bootstrap'

const Prets = () => {
    const [prets, setPrets] = useState({ loans: []})

    useEffect(()=> {
        const fetchPrets = async ()=> {
            const {data} = await axios.get("http://localhost:6969/pret/list")
            setPrets({loans: data})
            console.log(data)
        }
        fetchPrets()
    }, [setPrets])
  return (
    <div>
        <ReactBootstrap.Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Montant</th>
          <th>Date de pret</th>
          <th>Banque</th>
          <th>Client</th>
          <th>Numero de pret</th>
        </tr>
      </thead>
      <tbody>
        {
            prets.loans && prets.loans.map((loan) => (
                <tr key={loan._id}>
                <td>{loan._id}</td>
                <td>{loan.montant}</td>
                <td>{loan.datePret}</td>
                <td>{loan.Banque.designation}</td>
                <td>{loan.Client.nom}</td>
                <td>{loan.numPret}</td>
                </tr>
            ))
        }        
      </tbody>
    </ReactBootstrap.Table>
    </div>
  )
}

export default Prets