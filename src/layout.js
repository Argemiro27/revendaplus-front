import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Painel from "./pages/painel";
import About from "./pages/about";
import Nav from "./components/Nav";
import NavHorizontal from "./components/NavHorizontal";
import Vendas from "./pages/vendas";
import Produtos from "./pages/produtos";
import CreateProduto from "./pages/create/produtos";
import CreateVenda from "./pages/create/vendas";

const Layout = () => {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <NavHorizontal />
          <Nav />
          <div className="col pt-2">
            <Routes>
              <Route path="/" element={<Navigate to="/painel" replace />} />
              <Route path="/painel" element={<Painel />} />
              <Route path="/about" element={<About />} />
              <Route path="/vendas" element={<Vendas />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/vendas/create" element={<CreateVenda />} />
              <Route path="/produtos/create" element={<CreateProduto />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Layout;
