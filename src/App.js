import React from "react";
import { Navbar } from "react-bootstrap";
import InvoiceForm from "./components/InvoiceForm";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div className="outer-container">
        <Navbar className="nav-holder bg-body-tertiary">
          <Navbar.Brand href="#home" className="logo-container">
            <img src="/images/holidays.svg" alt="Logo" className="logo" />
          </Navbar.Brand>
        </Navbar>
        <div className="content-holder">
          <InvoiceForm />
        </div>
      </div>
    </div>
  );
};

export default App;
