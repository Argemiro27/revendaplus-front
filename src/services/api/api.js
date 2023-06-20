import axios from 'axios';

const API_BASE_URL = 'https://localhost:44360/api';

export const saveProduto = async (produto) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Produto`, produto);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao salvar o produto');
  }
};


export const saveItem = async (item) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Estoque`, item);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao salvar o item');
  }
};

export const saveVenda = async (venda) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Venda`, venda);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao salvar a venda');
  }
};
