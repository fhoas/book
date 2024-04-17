import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { CiCalendar, CiUser } from "react-icons/ci";
import { GoNumber } from "react-icons/go";
const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full md:w-[600px] h-[400px] bg-gray8 border border-gray5 rounded-[5px] p-6 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-xl text-white cursor-pointer"
          onClick={onClose}
        />
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
        <p className="mt-4 text-start">Lorem ipsum dolor sit amet</p>
        <p className="my-2 text-start">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quia
          voluptatum sint. Nisi impedit libero eveniet cum vitae qui expedita
          necessitatibus assumenda laboriosam, facilis iste cumque a pariatur
          nesciunt cupiditate voluptas? Quis atque earum voluptate dolor nisi
          dolorum est? Deserunt placeat cumque quo dicta architecto, dolore
          vitae voluptate sequi repellat!
        </p>
      </div>
    </div>
  );
};

export default BookModal;
