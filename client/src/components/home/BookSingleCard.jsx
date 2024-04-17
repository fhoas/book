import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { CiCalendar, CiUser } from "react-icons/ci";
import { GoNumber } from "react-icons/go";
import { BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { IoInformationOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import BookModal from "./BookModal";
import DeleteModal from "./DeleteModal";

const BookSingleCard = ({ book, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDisabledAction = () => {
    alert(
      "This is a demo book. Editing and deletion are not allowed for demo books."
    );
  };

  const handleEditClick = () => {
    handleDisabledAction();
  };

  const handleDeleteClick = (index) => {
    if (index + 1 === 1 || index + 1 === 2) {
      handleDisabledAction();
    } else {
      setShowDeleteModal(true);
    }
  };

  return (
    <div className="border border-gray6 bg-gray9 rounded-[5px] p-6 m-4 relative hover:shadow-xl">
      <div className="flex justify-start items-center gap-x-2">
        <PiBookOpenTextLight className="text-white text-2xl" />
        <h2 className="my-1">{book.title}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <CiUser className="text-white text-2xl" />
        <h2 className="my-1">{book.author}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <CiCalendar className="text-white text-2xl" />
        {new Date(book.publishYear).toISOString().split("T")[0]}
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <GoNumber className="text-white text-2xl" />
        <h4 className="my-2 text-gray-500">{book._id}</h4>
      </div>
      <div className="flex justify-between items-center gap-x-2 mt-4">
        <BiShow
          className="text-xl text-white cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/details/${book._id}`}>
          <IoInformationOutline className="text-xl text-white" />
        </Link>
        {index + 1 === 1 || index + 1 === 2 ? (
          <AiOutlineEdit
            className={`text-xl text-gray cursor-not-allowed`}
            onClick={handleEditClick}
          />
        ) : (
          <Link to={`/books/edit/${book._id}`}>
            <AiOutlineEdit className={`text-xl text-white cursor-pointer`} />
          </Link>
        )}

        <MdOutlineDelete
          className={`text-xl ${
            index + 1 === 1 || index + 1 === 2
              ? "text-gray cursor-not-allowed"
              : "text-white cursor-pointer"
          }`}
          onClick={() => handleDeleteClick(index + 1)}
        />
      </div>
      {showDeleteModal && (
        <DeleteModal id={book._id} onClose={() => setShowDeleteModal(false)} />
      )}
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;
