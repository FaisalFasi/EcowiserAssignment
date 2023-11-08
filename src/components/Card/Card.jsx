import React, { useState } from "react";
import CardPopUp from "../../components/CardPopUp/CardPopUp";
import { useDispatch } from "react-redux";
import { updateNote } from "../../slices/noteSlice";
import { toast } from "react-toastify";

const Card = ({ note, handleDeleteNote }) => {
  const dispatch = useDispatch();

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const notify = (message) => toast(message);

  const handlePopupClose = (e) => {
    e.stopPropagation();
    setPopupOpen(false);
  };
  const handlePopupOpen = (e) => {
    e.stopPropagation();
    setPopupOpen(true);
    setIsHovering(false);
  };

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={` relative w-full sm:max-w-[250px] md:w-1/3 flex flex-col items-start gap-4 h-fit p-4 rounded-md border-2 border-gray-300 shadow-md   hover:shadow-lg hover:border-gray-400 ${
        note.is_pinned ? "bg-green-200" : "bg-white"
      } `}
    >
      {isHovering && (
        <div className="absolute h-full top-0 right-0 flex justify-end gap-4  ">
          <button
            aria-label="Pin or Unpin Note"
            onClick={() => {
              dispatch(updateNote({ id: note.id, is_pinned: !note.is_pinned }));

              {
                note.is_pinned
                  ? notify("Note unPinned successfully")
                  : notify("Note pinned successfully");
              }
            }}
            className=" text-xs absolute bg-gray-300 p-2 rounded-full"
          >
            📌
          </button>
          <button
            aria-label="Delete Note"
            onClick={() => handleDeleteNote(note.id)}
            className=" text-xs absolute  bottom-0 p-2 bg-gray-300 rounded-full"
          >
            ❌
          </button>
        </div>
      )}
      <div
        className="w-full flex flex-col justify-between gap-4 h-fit"
        onClick={(e) => handlePopupOpen(e)}
      >
        <div className="w-full">
          <h1 className=" text-md font-bold overflow-ellipsis overflow-hidden ">
            {note.title}
          </h1>
          <p className=" max-h-[300px] text-sm whitespace-pre-wrap overflow-ellipsis overflow-scroll ">
            {note.body}
          </p>
        </div>
        <div className="flex flex-col justify-start gap-4">
          <span className="h-fit text-xs bg-gray-200 w-fit px-2 overflow-ellipsis overflow-hidden rounded-full ">
            {note.tag_line}
          </span>

          <span className="text-xs text-right pr-4">
            <>
              {"Edited:"} {note?.inserted_at?.slice(0, 10)}{" "}
              {note?.inserted_at?.slice(11, 16)}
            </>
          </span>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed top-0 left-0 z-20 ">
          <CardPopUp
            id={note.id}
            title={note.title}
            tag_line={note.tag_line}
            body={note.body}
            onClose={handlePopupClose}
          />
        </div>
      )}
    </div>
  );
};

export default Card;
