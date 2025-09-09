import type { AppDispatch } from "../../app/store";
import { setInitialItems, addItemFromSocket, type Item } from "./itemsSlice";

let socket: WebSocket | null = null;

export const connectWebSocket = (dispatch: AppDispatch) => {
  socket = new WebSocket("ws://localhost:4001");

  socket.onopen = () => {
    console.log("✅ WebSocket connected");
  };

  socket.onmessage = (event: MessageEvent) => {
    const message = JSON.parse(event.data);

    if (message.type === "initial_items") {
      dispatch(setInitialItems(message.payload as Item[]));
    }

    if (message.type === "new_item") {
      dispatch(addItemFromSocket(message.payload as Item));
    }
  };

  socket.onclose = () => {
    console.log("⚠️ WebSocket disconnected. Retrying in 3s...");
    setTimeout(() => connectWebSocket(dispatch), 3000);
  };
};
