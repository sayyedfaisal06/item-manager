// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const WebSocket = require("ws");
const app = express();
app.use(cors());
app.use(bodyParser.json());

let items = [];
// REST endpoint: get all items
app.get("/api/items", (req, res) => {
  res.json(items);
});
// REST endpoint: add a new item
app.post("/api/items", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });
  const newItem = { id: Date.now(), name };
  items.push(newItem);
  // Broadcast the new item to all WebSocket clients
  const message = JSON.stringify({ type: "new_item", payload: newItem });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
  res.status(201).json(newItem);
});

const server = app.listen(4000, () => {
  console.log("REST API listening on port 4000");
});

// Set up WebSocket server on port 4001
const wss = new WebSocket.Server({ port: 4001 });

console.log("WebSocket server listening on port 4001");

wss.on("connection", (ws) => {
  console.log("Client connected to WebSocket");
  // Send existing items immediately after connection
  ws.send(JSON.stringify({ type: "initial_items", payload: items }));
});
