import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { addItem } from "../features/items/itemsSlice";

const ItemForm: React.FC = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch(addItem(name));
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-5">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter item name"
        className="w-96 border border-r-0 p-2 rounded-tl-3xl rounded-bl-3xl pl-4 outline-0"
      />
      <button
        className="w-16 p-2 text-white bg-blue-500 border-blue-500 hover:bg-blue-600 cursor-pointer border rounded-tr-3xl rounded-br-3xl"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default ItemForm;
