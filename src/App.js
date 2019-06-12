import React from 'react';
import './App.css';
import Header from './components/header/Header';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Office from './components/office/Office';
import Shipment from './components/shipment/Shipment';
import AddEditOffice from './components/office/AddEditOffice';
import AddEditShipment from './components/shipment/AddEditShipment';

function App() {
  return (
    <Router>
      <div>
        <Header />

        <div className="container">
          <Redirect from="/" exact to="/office" />
          <Route exact path="/office" component={Office} />
          <Route exact path="/office/add" component={AddEditOffice} />
          <Route exact path="/office/edit" component={AddEditOffice} />
          <Route exact path="/shipment" component={Shipment} />
          <Route exact path="/shipment/add" component={AddEditShipment} />
          <Route exact path="/shipment/edit" component={AddEditShipment} />
        </div>
      </div>
    </Router>
  );
}

export default App;
