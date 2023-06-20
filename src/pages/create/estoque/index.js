import React, { useState, useEffect } from "react";
import { Container, Form, Card } from "react-bootstrap";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { saveItem } from "../../../services/api/api";

function CreateItem() {
  const [produtos, setProdutos] = useState([]);
  const [id_produto, setIdProduto] = useState([]);
  const [quant_estoque, setQuantEstoque] = useState([]);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get("https://localhost:44360/api/Produto");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar os produtos:", error);
    }
  };

  const handleIdProduto = (event) => {
    setIdProduto(event.target.value);
  };

  const handleQuantEstoque = (event) => {
    setQuantEstoque(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const item = {
      id: 0,
      id_produto: id_produto,
      quant_estoque: quant_estoque,
    };

    try {
      console.log("Enviando item:", item);

      const response = await saveItem(item);
      console.log("Resposta da API:", response);

      console.log("Item salvo com sucesso");
      toast.success("Item salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar o item:", error);
      toast.error("Erro ao salvar o item!");
    }
  };
  return (
    <div className="main-content">
      <Container>
        <ToastContainer />
        <Card className="formwrapper">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicNome">
              <Form.Label>Nome do produto</Form.Label>
              <Form.Control
                as="select"
                value={id_produto}
                onChange={handleIdProduto}
                placeholder="Selecione um produto"
              >
                <option disabled value="">
                  Selecione um produto
                </option>
                {produtos.map((produto) => (
                  <option key={produto.id} value={produto.id}>
                    {produto.nome_produto}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicQuantEstoque">
              <Form.Label>Quantidade em estoque:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a quantidade em estoque"
                value={quant_estoque}
                onChange={handleQuantEstoque}
              />
            </Form.Group>

            <Button
              variant="contained"
              type="submit"
              color="success"
              endIcon={<SendIcon />}
            >
              Salvar
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default CreateItem;
