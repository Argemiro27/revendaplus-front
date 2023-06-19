import React from "react";
import { Container, Table } from "react-bootstrap";
import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

function Produtos() {
  return (
    <div className="main-content">
      <Container>
        <a href="/produtos/create">
          <Button
            variant="contained"
            className="mb-3"
            color="success"
            startIcon={<AddBoxIcon />}
          >
            Novo produto
          </Button>
        </a>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome do produto</th>
              <th>Código/ SKU</th>
              <th>Categoria</th>
              <th>Preço de compra</th>
              <th>Preço de venda</th>
              <th>Taxa de lucro</th>
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
