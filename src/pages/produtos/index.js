import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "axios";
import { formatarData } from "../../utils";

function Produtos() {
  const [produtos, setProdutos] = useState([]);

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
  const deleteProduto = async (id) => {
    try {
      await axios.delete(`https://localhost:44360/api/Produto/${id}`);
      fetchProdutos(); // Atualiza a lista de produtos após a exclusão
      console.log("Produto excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o produto:", error);
    }
  };
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
              <th>Data/hora</th>
              <th>Nome do produto</th>
              <th>SKU</th>
              <th>Categoria</th>
              <th>Quantidade</th>
              <th>Preço de compra (unit)</th>
              <th>Preço total de compra</th>
              <th>Preço de venda</th>
              <th>Taxa de lucro</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{formatarData(produto.data_hora)}</td>
                <td>{produto.nome_produto}</td>
                <td>{produto.sku}</td>
                <td>{produto.categoria}</td>
                <td>{produto.quantidade}</td>
                <td>{produto.preco_unit_compra}</td>
                <td>{produto.preco_total_compra}</td>
                <td>{produto.preco_venda}</td>
                <td>{produto.taxa_lucro}%</td>
                <td>
                  <Button variant="contained" color="success">
                    <i className="fa-solid fa-pencil"></i>
                  </Button>
                </td>
                <td>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteProduto(produto.id)}
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

export default Produtos;
