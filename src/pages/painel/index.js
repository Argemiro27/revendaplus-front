import React from "react";
import { Container } from "react-bootstrap";

function Painel() {
  return (
    <div className="main-content">
      <Container>
        <section id="minimal-statistics">
          <div className="row">
            <div className="col-12 mt-3 mb-1">
              <h4 className="text-uppercase">Minimal Statistics Cards</h4>
              <p>Plano de registros</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="align-self-center">
                        <i className="icon-pencil primary font-large-2 float-left"></i>
                      </div>
                      <div className="media-body text-right">
                        <h3>278</h3>
                        <span>Produtos cadastrados</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="align-self-center">
                        <i className="icon-speech warning font-large-2 float-left"></i>
                      </div>
                      <div className="media-body text-right">
                        <h3>156</h3>
                        <span>Vendas registradas</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="align-self-center">
                        <i className="icon-graph success font-large-2 float-left"></i>
                      </div>
                      <div className="media-body text-right">
                        <h3>64.89 %</h3>
                        <span>Bounce Rate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default Painel;
