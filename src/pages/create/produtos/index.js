import React from "react";
import { Container, Form, Card } from "react-bootstrap";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SearchProdutos from "../../../services/Produtos/searchProdutos";
import "./style.css";
import { useState } from "react";
import axios from "axios";
import { saveProduto } from "../../../services/api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateProduto() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [precoUnitCompra, setPrecoUnitCompra] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [precoTotalCompra, setPrecoTotalCompra] = useState("");
  const [categoria, setCategoria] = useState("");
  const [taxaLucro, setTaxaLucro] = useState("");
  const [precoVenda, setPrecoVenda] = useState("");
  const [codigoSKU, setCodigoSKU] = useState("");
  const [imagemProduto, setImagemProduto] = useState("");

  const handleProdutoChange = async (product) => {
    setSelectedProduct(product);
    let productData;

    try {
      const response = await axios.get(
        `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(
          product
        )}`
      );
      const data = response.data;

      // Retrieve the price and category ID of the first result from the API response
      const preco = data.results[0]?.price || "";
      const categoriaId = data.results[0]?.category_id || "";
      const productId = data.results[0]?.id || "";

      setPrecoUnitCompra(preco.toString());

      // Fetch the category details using the category ID
      const categoriaResponse = await axios.get(
        `https://api.mercadolibre.com/categories/${categoriaId}`
      );
      const categoriaData = categoriaResponse.data;

      const categoriaNome = categoriaData?.name || "";
      setCategoria(categoriaNome);
      setCodigoSKU(productId);

      // Fetch the product details using the product ID to retrieve the image URL
      const productResponse = await axios.get(
        `https://api.mercadolibre.com/items/${productId}`
      );
      productData = productResponse.data;

      const imagem = productData?.pictures?.[0]?.url || "";
      setImagemProduto(imagem);
    } catch (error) {
      console.error("Erro ao buscar sugestões:", error);
    }
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = new Date();

    const produto = {
      id: 0, // Valor apropriado para o ID do produto, ou você pode removê-lo se for gerado automaticamente pelo servidor
      nome_produto: selectedProduct,
      categoria: categoria,
      taxa_lucro: taxaLucro,
      preco_unit_compra: precoUnitCompra,
      preco_venda: precoVenda,
      sku: codigoSKU,
      quantidade: quantidade,
      preco_total_compra: precoTotalCompra,
      data_hora: currentDate.toISOString(),
    };

    try {
      console.log("Enviando produto:", produto);

      const response = await saveProduto(produto);
      console.log("Resposta da API:", response);

      console.log("Produto salvo com sucesso");
      toast.success("Produto salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar o produto:", error);
      toast.error("Erro ao salvar o produto!");
    }
  };

  const handlePrecoUnitCompraChange = (event) => {
    setPrecoUnitCompra(event.target.value);
    calculatePrecoVenda(event.target.value, taxaLucro);
    calculatePrecoTotal(event.target.value, quantidade);
  };
  const handleQuantidadeChange = (event) => {
    setQuantidade(event.target.value);
    calculatePrecoTotal(precoUnitCompra, event.target.value);
  };

  const calculatePrecoTotal = (precoUnitCompra, quantidade) => {
    const precoUnitCompraFloat = parseFloat(precoUnitCompra);
    const quantidadeInt = parseInt(quantidade);

    if (!isNaN(precoUnitCompraFloat) && !isNaN(quantidadeInt)) {
      const valorTotalFloat = precoUnitCompraFloat * quantidadeInt;
      setPrecoTotalCompra(valorTotalFloat.toFixed(2).toString());
    } else {
      setPrecoTotalCompra("");
    }
  };

  const handlePrecoTotalCompraChange = (event) => {
    setPrecoTotalCompra(event.target.value);
  };

  const handleTaxaLucroChange = (event) => {
    setTaxaLucro(event.target.value);
    calculatePrecoVenda(precoUnitCompra, event.target.value);
  };

  const calculatePrecoVenda = (precoUnitCompra, taxaLucro) => {
    const precoUnitCompraFloat = parseFloat(precoUnitCompra);
    const taxaLucroFloat = parseFloat(taxaLucro);

    if (!isNaN(precoUnitCompraFloat) && !isNaN(taxaLucroFloat)) {
      const lucro = (precoUnitCompraFloat * taxaLucroFloat) / 100;
      const precoVendaFloat = precoUnitCompraFloat + lucro;
      setPrecoVenda(precoVendaFloat.toFixed(2).toString());
    } else {
      setPrecoVenda("");
    }
  };

  const handleCodigoSKUChange = (event) => {
    setCodigoSKU(event.target.value);
  };

  return (
    <div className="main-content">
      <Container>
        <ToastContainer />
        <Card className="formwrapper">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicNome">
              <Form.Label>Nome do produto:</Form.Label>
              <SearchProdutos onSelected={handleProdutoChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicImagem">
              <Form.Label>Imagem do Produto:</Form.Label>
              <br></br>
              {imagemProduto && (
                <img
                  src={imagemProduto}
                  alt="Produto"
                  style={{
                    width: "auto",
                    height: "150px",
                    backgroundSize: "cover",
                  }}
                />
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategoria">
              <Form.Label>Categoria:</Form.Label>
              <Form.Control type="text" value={categoria} disabled />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCodigoSKU">
              <Form.Label>Código/SKU:</Form.Label>
              <Form.Control
                type="text"
                value={codigoSKU}
                onChange={handleCodigoSKUChange}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicQuantidade">
              <Form.Label>Quantidade:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a quantidade"
                value={quantidade}
                onChange={handleQuantidadeChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrecoUnit">
              <Form.Label>Preço unitário:</Form.Label>
              <Form.Control
                type="text"
                value={precoUnitCompra}
                onChange={handlePrecoUnitCompraChange}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrecoUnit">
              <Form.Label>Preço total de compra:</Form.Label>
              <Form.Control
                type="text"
                value={precoTotalCompra}
                onChange={handlePrecoTotalCompraChange}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTaxaLucro">
              <Form.Label>Percentual de lucro aplicado (%):</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a taxa de lucro do produto"
                value={taxaLucro}
                onChange={handleTaxaLucroChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrecoVenda">
              <Form.Label>Preço de venda:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o preço de venda do produto"
                value={precoVenda}
                disabled
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

export default CreateProduto;
