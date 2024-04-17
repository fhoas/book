import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";

import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://mern-bookbase-server.vercel.app/books")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray10 h-fit relative flex flex-col p-8 text-white">
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center gap-4 ml-2">
          <span>View Type: </span>
          <button
            className={`border ${
              showType === "table"
                ? "bg-gray8 border-gray5"
                : "bg-gray9 border-gray6"
            } px-4 py-2 rounded-[5px]`}
            onClick={() => setShowType("table")}
          >
            Table
          </button>
          <button
            className={`border ${
              showType === "card"
                ? "bg-gray8 border-gray5"
                : "bg-gray9 border-gray6"
            } px-4 py-2 rounded-[5px]`}
            onClick={() => setShowType("card")}
          >
            Card
          </button>
        </div>

        <Link
          to="/books/create"
          className="text-white flex items-center border bg-gray9 border-gray6 py-2 pl-4 pr-2 rounded-[5px] hover:border-gray5"
        >
          Add New Book
          <IoIosAdd className="text-4xl" size={24} />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
