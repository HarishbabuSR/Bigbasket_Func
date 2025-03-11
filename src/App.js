import React from "react";
import './App.css';
//importing animate.css
import '../node_modules/animate.css/animate.min.css'
//importing bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route,Switch} from "react-router-dom"
import Navbar from "./root/components/navbar/Navbar";
import Home from "./root/components/home/Home";
import ProductAdmin from "./products/components/admin/ProductAdmin";
import ProductList from "./products/components/list/ProductList";
import CreateProduct from "./products/components/create/CreateProduct";
import UpdateProduct from "./products/components/update/UpdateProduct";
let App = ()=> {
  return (
    <React.Fragment>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/admin" component={ProductAdmin} />
          <Route exact path="/products/list" component={ProductList}/>
          <Route exact path="/products/create" component={CreateProduct}/>
          <Route exact path="/products/update/:productId" component={UpdateProduct}/>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
