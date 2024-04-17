import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

const DeleteModal = ({ id, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  axios.defaults.withCredentials = true;

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`https://mern-bookbase-server.vercel.app/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted successfully", { variant: "success" });
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center bg-gray9 border border-gray6 rounded-[5px] w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are You Sure You want to delete this book?</h3>
        <button
          className="p-4 bg-gray10 border border-red-600 hover:border-red-900 rounded-[5px] text-white mt-8 w-full"
          onClick={handleDeleteBook}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
