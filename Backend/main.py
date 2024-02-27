from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import time


app = FastAPI()


chats: dict[int, list[int]] = {}


def add_to_chat(chat_id, client_id):
    if chat_id not in chats:
        chats[chat_id] = []

    if client_id not in chats[chat_id]:  
        chats[chat_id].append(client_id)


def find_chat_by_client_id(client_id):
    for chat_id, users_in_chat in chats.items():
        if client_id in users_in_chat:
            return chat_id
    return None


app.add_middleware(CORSMiddleware,
                   allow_origins=["http://localhost:5173"],  # Assuming your React app runs on port 3000
                   allow_credentials=True,
                   allow_methods=["GET", "POST", "PUT", "DELETE"],
                   allow_headers=["*"],
                   )


class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[int, WebSocket] = {}

    async def connect(self, websocket: WebSocket, client_id: int):
        await websocket.accept()
        self.active_connections[client_id] = websocket
        print("ACCEPT NEW WEBSOCKET")

    def disconnect(self, websocket: WebSocket):
        print('DISCONNECT USER')
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str, client_id: int):
        chat_id = find_chat_by_client_id(client_id)
        print(chats)

        for clients_id in chats[chat_id]:
            websocket = self.active_connections[clients_id]
            await websocket.send_text(message)

    async def add_to_chat(self, client_id, chat_id):
        pass


manager = ConnectionManager()


@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id):
    await manager.connect(websocket, client_id=client_id)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(f"You wrote: {data}", websocket)
            await manager.broadcast(f"Client {client_id}, says: {data}", client_id=client_id)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast("Client has left the chat")


@app.get("/create_chat/{client_id}")
async def create_chat(client_id):
    chat_id = str(int(time.time() * 1000))
    add_to_chat(chat_id=chat_id, client_id=client_id)
    return {"chat_id": chat_id}


@app.get("/connect_to_chat/{client_id}/{chat_id}")
async def connect_to_chat(client_id, chat_id):
    print("CONNECT TO CHAT user: ", client_id, "chat: ", chat_id)
    add_to_chat(chat_id=chat_id, client_id=client_id)
    return True
