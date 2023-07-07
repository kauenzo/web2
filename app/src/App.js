import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import TestQuestion from "./components/listaAsPerguntasERespostas";
import TestRegister from "./components/cadastrarTeste";
import TestList from "./components/listaTestes"

class App extends Component {
  render() {
    return (
      <div className="flex">
        <div className="w-1/6 h-screen bg-neutral-800  text-white">
          <Link to={"/teste"} className="text-3xl font-semibold hover:bg-neutral-600 text-white my-5 ml-3">
            Questionários
          </Link>
          <div className="my-5 ml-3">
            <div>
              <Link to={"/teste"} className="text-lg my-5 py-2 text-base text-white hover:text-gray-300 hover:bg-neutral-600">
                Cadastrar novo testes
              </Link>
              <div className='my-2'/>
              <Link to={"/listaTestes"} className="text-lg my-5 py-2 text-base text-white hover:text-gray-300 hover:bg-neutral-600">
                Testes cadastrados
              </Link>
            </div>
          </div>
        </div>

        <div className="w-5/6 h-screen">
          <Routes>
            <Route path="/" element={<TestRegister />} />
            <Route path="/teste" element={<TestRegister />} />
            <Route path="/listaPerguntasERespostas/:id" element={<TestQuestion />} />
            <Route path="/listaTestes" element={<TestList />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
