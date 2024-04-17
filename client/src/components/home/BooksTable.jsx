import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { IoInformationOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import DeleteModal from "./DeleteModal";
import BookModal from "./BookModal";

const BooksTable = ({ books }) => {
  if (!books) {
    return null;
  }

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleDisabledAction = () => {
    alert(
      "This is a demo book. Editing and deletion are not allowed for demo books."
    );
  };

  const handleEditClick = () => {
    handleDisabledAction();
  };

  const handleDeleteClick = (bookIndex) => {
    if (bookIndex === 1 || bookIndex === 2) {
      handleDisabledAction();
    } else {
      setShowDeleteModal(true);
    }
  };

  const handleShowModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  return (
    <table
      className="w-full border-separate border-spacing-2"
      style={{ tableLayout: "fixed" }}
    >
      <thead>
        <tr>
          <th className="border border-gray6 bg-gray9 rounded-[5px] p-2 w-1/12">
            No
          </th>
          <th className="border border-gray6 bg-gray9 rounded-[5px] w-2/12">
            Cover
          </th>
          <th className="border border-gray6 bg-gray9 rounded-[5px] w-3/12">
            Title
          </th>
          <th className="border border-gray6 bg-gray9 rounded-[5px] max-md:hidden w-3/12">
            Author
          </th>
          <th className="border border-gray6 bg-gray9 rounded-[5px] max-md:hidden w-2/12">
            Publish Year
          </th>
          <th className="border border-gray6 bg-gray9 rounded-[5px] w-2/12">
            Operations
          </th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className="h-8">
            <td className="border border-gray6 bg-gray9 p-2 rounded-[5px] text-center">
              {index + 1}
            </td>
            <td className="flex justify-center border border-gray6 bg-gray9 p-2 rounded-[5px] text-center">
              {index + 1 === 1 ? (
                <img
                  className="rounded-[5px] w-[80px] h-[120px]"
                  src="https://cdn.kobo.com/book-images/392971e9-4f19-4827-a041-3abe4d0e1f54/1200/1200/False/don-quixote-111.jpg"
                  alt="img"
                />
              ) : index + 1 === 2 ? (
                <img
                  className="rounded-[5px] w-[80px] h-[120px]"
                  src="https://m.media-amazon.com/images/I/91LUbAcpACL._AC_UF1000,1000_QL80_.jpg"
                  alt="img"
                />
              ) : (
                <img
                  className="rounded-[5px] w-[80px] h-[120px]"
                  src="https://angelbookhouse.com/assets/front/img/product/edition_placeholder.png"
                  alt="img"
                />
              )}
            </td>
            <td className="border border-gray6 bg-gray9 p-2 rounded-[5px] text-center">
              {book.title}
            </td>
            <td className="border border-gray6 bg-gray9 p-2 rounded-[5px] text-center max-md:hidden">
              {book.author}
            </td>
            <td className="border border-gray6 bg-gray9 p-2 rounded-[5px] text-center max-md:hidden">
              {new Date(book.publishYear).toISOString().split("T")[0]}
            </td>
            <td className="border border-gray6 bg-gray9 rounded-[5px] p-2 text-center">
              <div className="flex justify-center items-center gap-x-4">
                <BiShow
                  className="text-xl text-white cursor-pointer"
                  onClick={() => handleShowModal(book)}
                />
                <Link to={`/books/details/${book._id}`}>
                  <IoInformationOutline className="text-2xl" />
                </Link>
                {index + 1 === 1 || index + 1 === 2 ? (
                  <AiOutlineEdit
                    className={`text-2xl text-gray cursor-not-allowed`}
                    onClick={handleEditClick}
                  />
                ) : (
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit
                      className={`text-2xl text-white cursor-pointer`}
                    />
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
                {showDeleteModal && (
                  <DeleteModal
                    id={book._id}
                    onClose={() => setShowDeleteModal(false)}
                  />
                )}
                {showModal && (
                  <BookModal
                    book={selectedBook}
                    onClose={() => setShowModal(false)}
                  />
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
