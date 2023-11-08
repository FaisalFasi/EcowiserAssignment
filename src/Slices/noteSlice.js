// notesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../services/api";

const initialState = {
  notes: [],
  status: "idle",
  error: null,
};

function sortNotesPrioPinned(notes) {
  notes.sort((a, b) => {
    let pinVal = 0;
    if ((b.is_pinned && a.is_pinned) || (!b.is_pinned && !a.is_pinned)) {
    } else if (b.is_pinned && !a.is_pinned) {
      pinVal = 1;
    } else if (!b.is_pinned && a.is_pinned) {
      pinVal = -1;
    }
    pinVal = pinVal * 100;

    let dateVal = b.inserted_at.localeCompare(a.inserted_at);

    return pinVal + dateVal;
  });
  return notes;
}

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  try {
    const { data, error } = await supabase.from("notes").select("*");

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
});

export const createNote = createAsyncThunk(
  "notes/createNote",

  async (noteData) => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .insert([noteData])
        .select("*");

      if (error) {
        throw new Error(error.message);
      }
      return data[0];
    } catch (error) {
      throw error;
    }
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async (noteData) => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .upsert([noteData])
        .select("*");

      if (error) {
        throw new Error(error.message);
      }
      return data[0];
    } catch (error) {
      throw error;
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (noteId) => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .delete()
        .eq("id", noteId);
      if (error) {
        throw new Error(error.message);
      }
      return noteId;
    } catch (error) {
      throw error;
    }
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;

        state.notes = sortNotesPrioPinned(state.notes);
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNote.fulfilled, (state, action) => {
        // sort by is_pinned and then by inserted_at
        state.notes = [...state.notes, action.payload];

        state.notes = sortNotesPrioPinned(state.notes);
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const updatedNote = action.payload;
        const existingNoteIndex = state.notes.findIndex(
          (note) => note.id === updatedNote.id
        );
        if (existingNoteIndex !== -1) {
          state.notes[existingNoteIndex] = updatedNote;
        }
        // sort by is_pinned and then by inserted_at
        state.notes = sortNotesPrioPinned(state.notes);
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        const deletedNoteId = action.payload;
        state.notes = state.notes.filter((note) => note.id !== deletedNoteId);
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default notesSlice.reducer;
