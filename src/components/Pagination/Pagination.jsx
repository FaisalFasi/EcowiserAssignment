import React from "react";

const Pagination = ({ currentPage, totalNoOfPages, handlePageChange }) => {
  return (
    <div className="pt-40">
      <div className="fixed w-full left-0 bottom-0   flex justify-center items-center   bg-gray-100  py-4">
        <div className="text-2xl flex gap-4 justify-end items-center">
          <p>Pages</p>
          <button onClick={() => handlePageChange(currentPage - 1)}>
            {"<"}
          </button>
          <span>{`${
            currentPage + 1 + "/" + (totalNoOfPages === 0 ? 1 : totalNoOfPages)
          }`}</span>
          <button onClick={() => handlePageChange(currentPage + 1)}>
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
