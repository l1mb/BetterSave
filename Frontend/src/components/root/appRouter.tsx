import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages";
import Cards from "../pages/cards/cards";
import Goals from "../pages/goals/goals";
import Layout from "../pages/layout";
import Loans from "../pages/loans/loans";
import Login from "../pages/login/login";
import NotFound from "../pages/notFound/notFound";
import Operations from "../pages/operations/operations";
import Register from "../pages/register/register";
import Stats from "../pages/stats";
import Split from "../pages/split/split";
import Categories from "../pages/categories/categories";
import Settings from "../pages/settings";

function AppRouter() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/budget" element={<Stats />} />
          <Route path="/operations" element={<Operations />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/split" element={<Split />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default AppRouter;
