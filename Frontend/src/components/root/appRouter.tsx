import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages";
import Cards from "../pages/cards/cards";
import Goals from "../pages/goals/goals";
import Layout from "../pages/layout";
import Loans from "../pages/loans";
import Login from "../pages/login";
import NotFound from "../pages/notFound";
import Operations from "../pages/operations/operations";
import Register from "../pages/register";
import Stats from "../pages/stats";

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
          <Route path="/settings" element={<Stats />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default AppRouter;
