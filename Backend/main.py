from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import time


app = FastAPI()


app.add_middleware(CORSMiddleware,
                   allow_origins=["http://localhost:5173"],  # Assuming your React app runs on port 3000
                   allow_credentials=True,
                   allow_methods=["GET", "POST", "PUT", "DELETE"],
                   allow_headers=["*"],
                   )


class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[int, WebSocket] = {}

    async def create(self, websocket: WebSocket):
        chat_id = str(int(time.time() * 1000))
        await websocket.accept()
        self.active_connections[chat_id] = websocket
        return chat_id

    async def connect(self, websocket: WebSocket):
        print("CREATE NEW WEBSOCKET", 'id:', id)

    def disconnect(self, websocket: WebSocket):
        print('DISCONNECT USER')
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()


@app.websocket("/ws/{chat_id}")
async def websocket_endpoint(websocket: WebSocket, chat_id):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(f"You wrote: {data}", websocket)
            await manager.broadcast(f"Client #{chat_id} says: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client #{chat_id} has left the chat")


@app.get("/create_chat/")
async def create_chat():
    chat_id = manager.create()
    return {"chat_id": chat_id}
