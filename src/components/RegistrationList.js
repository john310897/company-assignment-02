import React from 'react'
import { Button, Container, Table } from 'react-bootstrap'
function RegistrationList({ headers, tableData, handleEdit, handleDelete }) {
  console.log(tableData)
  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {headers?.map((header, index) => (
              <th key={index + 1}>{header?.label}</th>
            ))}
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((data, index1) => (
            <tr key={index1 + 1}>
              <td>{index1 + 1}</td>
              {headers?.map((field, index2) => (
                <td key={index2 + 1}>{data[field?.field_name]}</td>
              ))}
              <td><Button
                variant="primary"
                onClick={() => handleEdit(data)}
              >Edit</Button></td>
              <td><Button
                variant="danger"
                onClick={() => handleDelete(data?.id)}
              >Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>

  )
}

export default RegistrationList