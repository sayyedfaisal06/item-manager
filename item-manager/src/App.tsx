import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./app/store";
import { fetchItems } from "./features/items/itemsSlice";
import { connectWebSocket } from "./features/items/itemsAPI";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchItems());
    connectWebSocket(dispatch);
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1>Item Manager</h1>
      <ItemForm />
      <ItemList />
    </div>
  );
};

export default App;
