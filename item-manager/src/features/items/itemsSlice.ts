import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

export interface Item {
  id: number;
  name: string;
}

interface ItemsState {
  items: Item[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  status: "idle",
  error: null,
};

const API_URL = "http://localhost:4000/api/items";

// Fetch all items
export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const res = await axios.get<Item[]>(API_URL);
  return res.data;
});

// Add new item
export const addItem = createAsyncThunk(
  "items/addItem",
  async (name: string) => {
    const res = await axios.post<Item>(API_URL, { name });
    return res.data;
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setInitialItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
    addItemFromSocket: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setInitialItems, addItemFromSocket } = itemsSlice.actions;
export default itemsSlice.reducer;
