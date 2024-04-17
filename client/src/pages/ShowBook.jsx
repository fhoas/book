import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useParams } from "react-router-dom";

const ShowBook = () => {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState([]);
  const { id } = useParams();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://mern-bookbase-server.vercel.app/books/${id}`)
      .then((response) => {
        setBook(response.data.book);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="h-fit p-4">
      <BackButton />
      <div className="flex items-center justify-center">
        <div>
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col border border-gray-300 rounded-[5px] p-4 m-2">
              <div className="my-4">
                <span className="text-xl mr-4 text-white">Id</span>
                <span className="text-gray5">{book._id}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-white">Title</span>
                <span className="text-gray5">{book.title}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-white">Author</span>
                <span className="text-gray5">{book.author}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-white">Publish Year</span>
                <span className="text-gray5">{book.publishYear}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-white">Create Time</span>
                <span className="text-gray5">
                  {new Date(book.createdAt).toString()}
                </span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-white">
                  Last Update Time
                </span>
                <span className="text-gray5">
                  {new Date(book.updatedAt).toString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowBook;
