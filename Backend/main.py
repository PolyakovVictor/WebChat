from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import time


app = FastAPI()

chats: dict[int, list[int]] = {}


def add_to_chat(chat_id, client_id):
    if chat_id in client_id:
        chats[chat_id].append(client_id)
    else:
        chats[chat_id] = [client_id]


app.add_middleware(CORSMiddleware,
                   allow_origins=["http://localhost:5173"],  # Assuming your React app runs on port 3000
                   allow_credentials=True,
                   allow_methods=["GET", "POST", "PUT", "DELETE"],
                   allow_headers=["*"],
                   )


class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[int, WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        print("ACCEPT NEW WEBSOCKET")

    def disconnect(self, websocket: WebSocket):
        print('DISCONNECT USER')
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(f"You wrote: {data}", websocket)
            await manager.broadcast(f"Client says: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast("Client has left the chat")


@app.get("/create_chat/{client_id}")
async def create_chat(client_id):
    chat_id = str(int(time.time() * 1000))
    add_to_chat(chat_id=chat_id, client_id=client_id)
    return {"chat_id": chat_id}
