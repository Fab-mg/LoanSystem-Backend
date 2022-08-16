import React, { useMemo, useState, useEffect } from 'react'
import axios from 'axios'
import * as ReactBootstrap from 'react-bootstrap'
import NavBar from './components/navigation';

const Clients = () => {
    const [clients, setClients] = useState({ users: []})

    useEffect(()=> {
        const fetchClients = async ()=> {
            const {data} = await axios.get("http://localhost:6969/client/list")
            setClients({users: data})
            console.log(data)
        }
        fetchClients()
    }, [setClients])
  return (
    <div>
        <NavBar></NavBar>
        <ReactBootstrap.Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Adresse</th>
          <th>Email</th>
          <th>Telephone</th>
          <th>Numero</th>
          <th>Action</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
            clients.users && clients.users.map((client) => (
                <tr key={client._id}>
                <td>{client._id}</td>
                <td>{client.nom}</td>
                <td>{client.adresse}</td>
                <td>{client.email}</td>
                <td>{client.telClient}</td>
                <td>{client.numClient}</td>
                <td><a>Supprimer</a></td>
                <td><a>Modifier</a></td>
                </tr>
            ))
        }        
      </tbody>
    </ReactBootstrap.Table>
    </div>
  )
}

export default Clients