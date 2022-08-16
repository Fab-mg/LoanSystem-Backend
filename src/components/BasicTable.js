import React, { useMemo, useState, useEffect } from 'react'
import { useTable} from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import {COLUMNS} from './colums'
import './table.css'

import axios from 'axios'


export const BasicTable = () => {
  
    const [client, setClient] = useState([])

    useEffect(()=> {
      let url = "http://localhost:6969/client/list"
      axios.get(url)
      .then(res => {
        setClient(res.data)
        client.map(client1 => {
          console.log(client1._id)
        })
      })
      .catch(err =>{
        console.log(err)
      })
    }, [])

    // return  (
    //   <div>
        
    //       {
    //         client.map((client1, index) => {
    //         return  <span>{client1.nom}</span>
    //         })
    //       }
        
    //   </div>

    // )
    
  

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => client, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  })

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            
          })}
        </tbody>
      </table>
    </>
  )
}
