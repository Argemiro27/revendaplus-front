import { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min.js';
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #1b194a;
    font-family: 'Kanit', sans-serif;
  }
  a{
    color: #8487cb !important;
  }
  .main-content{
    color: #fff !important;
  }
  button{
    font-family: 'Kanit', sans-serif !important;
  }
`;

export default GlobalStyle;