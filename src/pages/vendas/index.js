import React from "react";
import { Container, Table } from "react-bootstrap";
import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

function Produtos() {
  return (
    <div className="main-content">
      <Container>
        <a href="/vendas/create">
          <Button
            variant="contained"
            className="mb-3"
            color="success"
            startIcon={<AddBoxIcon />}
          >
            Nova venda
          </Button>
        </a>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Produto</th>
              <th>Data da venda</th>
              <th>Quantidade Vendida</th>
              <th>Preço total</th>
              <th>Lucro total</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>
                <Button variant="contained" color="success">
                  <i className="fa-solid fa-pencil"></i>
                </Button>
              </td>
              <td>
                <Button variant="contained" color="error">
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Produtos;
