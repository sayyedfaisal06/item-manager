import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const ItemList: React.FC = () => {
  const { items, status } = useSelector((state: RootState) => state.items);

  if (status === "loading") return <p>Loading...</p>;
  if (items.length === 0) return <p>No items yet. Add one!</p>;

  return (
    <ul className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <li
          className="p-2 shadow rounded flex  justify-between items-start"
          key={item.id}
        >
          <div>
            <p className="text-gray-500 text-sm">Item ID: {item.id}</p>
            <p>Item Name: {item.name}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
