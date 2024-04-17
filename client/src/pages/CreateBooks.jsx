import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

const handleSaveBook = () => {
  const regex = /^[a-zA-Z0-9\s]*$/;

  if (!title.trim() || !author.trim()) {
    enqueueSnackbar("Title and Author cannot be empty", { variant: "error" });
    return;
  }

  if (!regex.test(title) || !regex.test(author)) {
    enqueueSnackbar(
      "Title and Author should contain only letters, digits, and spaces",
      { variant: "error" }
    );
    return;
  }

  const limitedTitle = title.slice(0, 40);
  const limitedAuthor = author.slice(0, 40);

  const formattedTitle = sentenceCase(limitedTitle);
  const formattedAuthor = sentenceCase(limitedAuthor);

  const data = {
    title: formattedTitle,
    author: formattedAuthor,
    publishYear,
  };
  axios.defaults.withCredentials = true;

  setLoading(true);
  axios
    .post("https://mern-bookbase-server.vercel.app/books", data)
    .then(() => {
      setLoading(false);
      enqueueSnackbar("Book Created successfully", { variant: "success" });
      navigate("/");
    })
    .catch((error) => {
      setLoading(false);
      enqueueSnackbar("Error occurred while creating the book", {
        variant: "error",
      });
      console.log(error);
    });
};

  const sentenceCase = (str) => {
    return str.toLowerCase().replace(/(^|\s)\S/g, function (letter) {
      return letter.toUpperCase();
    });
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="h-fit p-4">
          <BackButton />
          <div className="max-w-4xl w-full flex flex-col border text-white border-gray6 bg-gray9 rounded-[5px] p-6 m-2 mx-auto items-center justify-center">
            <div className="flex flex-col gap-6 border-gray6 mt-4 w-full">
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
                  className="bg-gray9 text-white border border-gray6 px-4 py-2 rounded-[5px] w-full outline-none"
                />
              </div>
            </div>
            <button
              className="rounded-[5px] border border-gray6 bg-gray9 hover:border-gray5 mt-6 px-4 py-2 w-full"
              onClick={handleSaveBook}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateBooks;
