import React from "react";
import "./style.css";

function Cadastros() {
  return (
    <>
      <div
        className="col-2 collapse show d-md-flex bg-light pt-2 pl-0 min-vh-100"
        id="sidebar"
      >
        <ul className="nav flex-column flex-nowrap overflow-hidden">
          <li className="nav-item">
            <a className="nav-link text-truncate" href="/painel">
              <i className="fa fa-bar-chart"></i>{" "}
              <span className="d-none d-sm-inline">PAINEL</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-truncate" href="/about">
              <i className="fa fa-book"></i>{" "}
              <span className="d-none d-sm-inline">SOBRE</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-truncate" href="/produtos">
              <i className="fa-solid fa-truck"></i>{" "}
              <span className="d-none d-sm-inline">COMPRAS</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link text-truncate" href="/estoque">
              <i className="fa-solid fa-boxes-stacked"></i>{" "}
              <span className="d-none d-sm-inline">ESTOQUE</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-truncate" href="/vendas">
              <i className="fa-solid fa-cart-shopping"></i>{" "}
              <span className="d-none d-sm-inline">VENDAS</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Cadastros;
