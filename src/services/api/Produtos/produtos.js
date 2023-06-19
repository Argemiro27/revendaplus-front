import React, { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";

function SearchProdutos({ onSelected }) {
  const [searchText, setSearchText] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchText(value);

    try {
      const response = await axios.get(
        `https://api.mercadolibre.com/sites/MLB/search?q=${value}`
      );
      const data = response.data;

      const suggestions = data.results.map((result) => result.title);
      setFilteredSuggestions(suggestions);
    } catch (error) {
      console.error("Erro ao buscar sugestões:", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion);
    setFilteredSuggestions([]);
    onSelected(suggestion);
  };

  return (
    <Form.Group controlId="formAutocomplete">
      <Form.Control
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Digite o nome do produto"
      />
      {filteredSuggestions.length > 0 && (
        <ul className="autocomplete-list">
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </Form.Group>
  );
}

SearchProdutos.propTypes = {
  onSelected: PropTypes.func.isRequired,
};

export default SearchProdutos;