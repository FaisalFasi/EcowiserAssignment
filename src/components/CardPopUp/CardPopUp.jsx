import React, { useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import TextArea from "../TextArea/TextArea";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateNote } from "../../Slices/noteSlice";

const CardPopUp = ({ onClose, id, body, tag_line, title }) => {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.notes.status);
  const notify = (message) => toast(message);

  const [noteInput, setNoteInput] = useState(body);

  const [tagLineInput, setTagLineInput] = useState(tag_line);
  const [titleInput, setTitleInput] = useState(title);

  const handlePropagation = (e) => {
    e.stopPropagation();
  };
  const handleNoteInput = (e) => {
    setNoteInput(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      titleInput.trim() === "" &&
      tagLineInput.trim() === "" &&
      noteInput.trim() === ""
    ) {
      if (error) {
        notify("Title and note are empty. Please fill at least one of them.");
      }

      return;
    }

    dispatch(
      updateNote({
        id: id,
        title: titleInput && titleInput,
        tag_line: tagLineInput && tagLineInput,
        body: noteInput ? noteInput : "",
        inserted_at: new Date().toISOString(),
      })
    );
    if (status) {
      notify("Note updated successfully");
    }
    onClose(e);
  };

  return (
    <div
      className="w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-full sm:w-4/5 md:w-2/3 h-fit p-4 rounded-md bg-white"
        onClick={handlePropagation}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-md bg-gray-300 p-4 "
        >
          <InputField
            type="text"
            name="title"
            placeholder="Title ..."
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <InputField
            type="text"
            name="tagline"
            placeholder="Tag line ..."
            maxLength="20"
            value={tagLineInput}
            onChange={(e) => {
              setTagLineInput(e.target.value);
            }}
          />
          <div>
            <TextArea
              currentValue={noteInput}
              onChangeValue={handleNoteInput}
            />
          </div>

          <div className="flex gap-4 justify-end">
            <Button aria-label="Update Note" type="submit" text="Update" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardPopUp;
