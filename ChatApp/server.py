import asyncio
import websockets

connected_clients = set()
message_queue = asyncio.Queue()

async def handle_client(websocket, path):
    connected_clients.add(websocket)
    
    # Send a welcome message to the client once connected
    await websocket.send("Welcome to the chat server!")
    
    try:
        while True:
            message = await websocket.recv()
            print(f"Received from client: {message}")
            # Handle the incoming message from the client if needed
            
            # Put the message in the message queue to be processed asynchronously
            await message_queue.put((websocket, message))
    except websockets.exceptions.ConnectionClosedError:
        pass
    finally:
        connected_clients.remove(websocket)

async def server_response_prompt():
    # Show the server prompt once a client is connected
    while True:
        await asyncio.sleep(0.1)  # Prevents high CPU usage
        print("Server: ", end="", flush=True)
        server_response = await asyncio.to_thread(input)
        # Broadcast the server response to all connected clients
        for websocket in connected_clients:
            await websocket.send(f"Server Response: {server_response}")

start_server = websockets.serve(handle_client, "0.0.0.0", 8765)

# Start the server response prompt task
asyncio.ensure_future(server_response_prompt())

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

