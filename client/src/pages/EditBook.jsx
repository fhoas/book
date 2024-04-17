import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  axios.defaults.withCredentials = true;


  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://mern-bookbase-server.vercel.app//books/${id}`)
      .then((response) => {
        const { title, author, publishYear } = response.data.book;
        setTitle(title);
        setAuthor(author);
        const formattedPublishYear = new Date(publishYear)
          .toISOString()
          .split("T")[0];
        setPublishYear(formattedPublishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`https://bookbase-mern-api.vercel.app/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Edited successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="h-fit p-4">
          <BackButton />
          <div className="max-w-4xl w-full mx-auto p-6 bg-gray9 border border-gray6 rounded-[5px] shadow-lg text-white flex items-center justify-center">
            <div className="flex flex-col gap-6 border-gray6 w-full">
              <div>
                <label className="text-xl">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-gray9 border border-gray6 px-4 py-2 rounded-[5px] w-full outline-none"
                />
              </div>
              <div>
                <label className="text-xl">Author</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="bg-gray9 border border-gray6 px-4 py-2 rounded-[5px] w-full outline-none"
                />
              </div>
              <div>
                <label className="text-xl">Publish Year</label>
                <input
                  type="date"
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  className="bg-gray9 border border-gray6 px-4 py-2 rounded-[5px] w-full outline-none"
                />
              </div>
              <button
                className="bg-gray9 border border-gray6 hover:border-gray5 px-4 py-2 rounded-[5px]"
                onClick={handleEditBook}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBook;
