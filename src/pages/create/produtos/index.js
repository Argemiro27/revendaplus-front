import React from "react";
import { Container, Form, Card } from "react-bootstrap";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SearchProdutos from "../../../services/api/Produtos/produtos";
import "./style.css";
import { useState } from "react";
import axios from "axios";

function CreateProduto() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [precoUnit, setPrecoUnit] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [precoTotalCompra, setPrecoTotalCompra] = useState("");
  const [categoria, setCategoria] = useState("");
  const [taxaLucro, setTaxaLucro] = useState("");
  const [precoVenda, setPrecoVenda] = useState("");
  const [codigoSKU, setCodigoSKU] = useState("");
  const [imagemProduto, setImagemProduto] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform actions with the selected product, purchase price, and category
    console.log("Produto selecionado:", selectedProduct);
    console.log("Preço unitário:", precoUnit);
    console.log("Categoria:", categoria);
    console.log("Taxa de lucro:", taxaLucro);
    console.log("Preço de venda:", precoVenda);
    console.log("Código/SKU:", codigoSKU);
    console.log("Quantidade:", quantidade);
    console.log("Preço total:", precoTotalCompra);
  };

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

      setPrecoUnit(preco.toString());

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

  const handlePrecoUnitChange = (event) => {
    setPrecoUnit(event.target.value);
    calculatePrecoVenda(event.target.value, taxaLucro);
    calculatePrecoTotal(event.target.value, quantidade);
  };
  const handleQuantidadeChange = (event) => {
    setQuantidade(event.target.value);
    calculatePrecoTotal(precoUnit, event.target.value);
  };

  const calculatePrecoTotal = (precoUnit, quantidade) => {
    const precoUnitFloat = parseFloat(precoUnit);
    const quantidadeInt = parseInt(quantidade);

    if (!isNaN(precoUnitFloat) && !isNaN(quantidadeInt)) {
      const valorTotalFloat = precoUnitFloat * quantidadeInt;
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
    calculatePrecoVenda(precoUnit, event.target.value);
  };

  const calculatePrecoVenda = (precoUnit, taxaLucro) => {
    const precoUnitFloat = parseFloat(precoUnit);
    const taxaLucroFloat = parseFloat(taxaLucro);

    if (!isNaN(precoUnitFloat) && !isNaN(taxaLucroFloat)) {
      const lucro = (precoUnitFloat * taxaLucroFloat) / 100;
      const precoVendaFloat = precoUnitFloat + lucro;
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
                  style={{ width: "200px", height: "200px" }}
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
                value={precoUnit}
                onChange={handlePrecoUnitChange}
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
