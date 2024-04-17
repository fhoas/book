import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditBook from "./pages/EditBook";
import CreateBooks from "./pages/CreateBooks";
import ShowBook from "./pages/ShowBook";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<CreateBooks />} />
        <Route path="/books/details/:id" element={<ShowBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
      </Routes>

    </>
  );
};

export default App;
