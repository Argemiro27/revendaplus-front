import React, { useState, useEffect } from "react";
import { Container, Form, Card } from "react-bootstrap";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { saveVenda } from "../../../services/api/api";

function CreateVenda() {
  const [produtos, setProdutos] = useState([]);
  const [id_produto, setIdProduto] = useState([]);
  const [quant_vendida, setQuantVendida] = useState([]);
  const [descricao, setDescricao] = useState([]);
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

  const handleQuantVendida = (event) => {
    setQuantVendida(event.target.value);
  };

  const handleDescricao = (event) => {
    setDescricao(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = new Date();
    const venda = {
      id: 0,
      id_produto: id_produto,
      quant_vendida: quant_vendida,
      descricao: descricao,
      data_hora: currentDate.toISOString(),
    };

    try {
      console.log("Cadastrando venda:", venda);

      const response = await saveVenda(venda);
      console.log("Resposta da API:", response);

      console.log("Venda cadastrada com sucesso");
      toast.success("Venda cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar venda:", error);
      toast.error("Erro ao cadastrar venda!");
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

            <Form.Group className="mb-3" controlId="formBasicQuantVendida">
              <Form.Label>Quantidade vendida:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a quantidade vendida"
                value={quant_vendida}
                onChange={handleQuantVendida}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescricao">
              <Form.Label>Descrição:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite uma descrição"
                value={descricao}
                onChange={handleDescricao}
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

export default CreateVenda;
