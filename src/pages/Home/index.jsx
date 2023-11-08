import React, { useEffect, useState, useRef } from "react";
import Card from "../../components/Card/Card";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";
import Pagination from "../../components/Pagination/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, createNote, deleteNote } from "../../slices/noteSlice";

const NOTE_PER_PAGE = 6;

const index = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.notes.error);
  const notes = useSelector((state) => state.notes.notes);
  const status = useSelector((state) => state.notes.status);

  const [title, setTitle] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [note, setNote] = useState("");
  const notify = (message) => toast(message);

  const [showDescription, setShowDescription] = useState(false);
  const titleInputRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(0);

  const rows = notes.slice(
    currentPage * NOTE_PER_PAGE,
    currentPage * NOTE_PER_PAGE + NOTE_PER_PAGE
  );

  const totalNoOfPages = Math.ceil(notes.length / NOTE_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 0 || pageNumber > totalNoOfPages - 1) return;
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        titleInputRef.current &&
        !titleInputRef.current.contains(event.target)
      ) {
        setShowDescription(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (error) {
      notify(error);
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  const handleDeleteNote = async (id) => {
    dispatch(deleteNote(id));
    if (status) {
      notify("Note deleted successfully");
    }

    const remainingNotes = notes.length - 1;
    const lastNoteOnPage = (currentPage + 1) * NOTE_PER_PAGE;

    if (remainingNotes <= lastNoteOnPage - NOTE_PER_PAGE) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const handleTitleClick = () => {
    setShowDescription(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "" && note.trim() === "") {
      notify("Title and note are empty. Please fill at least one of them.");

      return;
    }

    dispatch(
      createNote({
        title: title || "",
        body: note || "",
        tag_line: tagLine || "",
        inserted_at: new Date().toISOString(),
      })
    );

    if (status) {
      notify("Note added successfully");
    }
    setTitle("");
    setTagLine("");
    setNote("");
  };

  return (
    <div className="w-full min-h-screen  p-8">
      <div className="text-center text-xl font-bold"> NOTE KEEPER</div>
      <div className="w-full md:w-3/4 m-auto py-8 ">
        <form
          onSubmit={handleFormSubmit}
          ref={titleInputRef}
          className="flex flex-col gap-4 rounded-md bg-white p-6  border-2 border-gray-200 shadow-md "
        >
          <InputField
            type="text"
            name="title"
            onClick={handleTitleClick}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title ..."
          />
          {showDescription && (
            <div className=" flex flex-col gap-4">
              <InputField
                type="text"
                name="tagline"
                value={tagLine}
                maxLength="20"
                onChange={(e) => {
                  setTagLine(e.target.value);
                }}
                placeholder="Tag line ..."
              />
              <div>
                <TextArea
                  currentValue={note}
                  onChangeValue={(e) => setNote(e.target.value)}
                />
              </div>
              <div className="flex gap-4 justify-end">
                <Button type="submit" text="Add" />
              </div>
            </div>
          )}
        </form>
      </div>

      <ToastContainer />
      <div className="w-full flex flex-wrap items-start justify-center gap-4 ">
        {rows.map((note, index) => {
          return (
            <Card key={index} note={note} handleDeleteNote={handleDeleteNote} />
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalNoOfPages={totalNoOfPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default index;
