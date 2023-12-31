import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "axios";

const fetchNomesProdutos = async (produtoIds) => {
  try {
    const response = await axios.get("https://localhost:44360/api/Produto");
    const produtos = response.data;
    const nomesProdutos = produtoIds.map((id) => {
      const produto = produtos.find((produto) => produto.id === id);
      return produto ? produto.nome_produto : "";
    });
    return nomesProdutos;
  } catch (error) {
    console.error("Erro ao buscar os nomes dos produtos:", error);
    return [];
  }
};

function Vendas() {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    fetchVendas();
  }, []);

  const fetchVendas = async () => {
    try {
      const response = await axios.get("https://localhost:44360/api/Venda");
      setVendas(response.data);

      // Obtenha os nomes dos produtos com base nos IDs dos produtos
      const produtoIds = response.data.map((item) => item.id_produto);
      const nomesProdutos = await fetchNomesProdutos(produtoIds);

      // Atualize o estado dos itens de estoque com os nomes dos produtos
      const vendasAtualizadas = response.data.map((item, index) => ({
        ...item,
        nome_produto: nomesProdutos[index]
      }));
      setVendas(vendasAtualizadas);
    } catch (error) {
      console.error("Erro ao buscar os itens:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`https://localhost:44360/api/Venda/${id}`);
      fetchVendas(); // Atualize os itens de estoque após excluir um produto
      console.log("Produto excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o produto:", error);
    }
  };
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
              <th>Data/ Hora</th>
              <th>Nome do produto</th>
              <th>Quantidade vendida</th>
              <th>Descrição</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.data_hora}</td>
                <td>{item.nome_produto}</td>
                <td>{item.quant_vendida}</td>
                <td>{item.descricao}</td>
                <td>
                  <Button variant="contained" color="success">
                    <i className="fa-solid fa-pencil"></i>
                  </Button>
                </td>
                <td>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteItem(item.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Vendas;
