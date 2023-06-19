import React from "react";
import { Container, Form, Card } from "react-bootstrap";
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';


function CreateVenda() {
  return (
    <div className="main-content">
      <Container>
        <Card className="formwrapper">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicNome">
              <Form.Label>Nome do produto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do produto"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescricao">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a descrição do produto"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrecoCompra">
              <Form.Label>Preço de compra</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o preço de compra do produto"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrecoVenda">
              <Form.Label>Preço de venda</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o preço de venda do produto"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTaxaLucro">
              <Form.Label>Taxa de lucro</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a taxa de lucro do produto"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCodigoSKU">
              <Form.Label>Código/SKU</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o código/SKU do produto"
              />
            </Form.Group>

            <Button variant="contained" type="submit" color="success" endIcon={<SendIcon />}>
              Salvar
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  )
}

export default CreateVenda