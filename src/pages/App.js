import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Principal from "./Principal";
import ProductsCreate from "./ProductCreate";
import ProductDetail from "./ProductDetail";
import Layout from "../components/Layout";
import Footer from "../components/Footer"; 
import NotFound from "./NotFound"; 
import Market from "./Market"; 
import MarketList from "./MarketList"; 

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Principal} />
          <Route path="/create/:id?" exact component={ProductsCreate} />
          {/* <Route path="/detail/:id" exact component={ProductDetail} /> */}
          <Route path="/market/:id?" exact component={Market} />
          <Route path="/marketlist" exact component={MarketList} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
