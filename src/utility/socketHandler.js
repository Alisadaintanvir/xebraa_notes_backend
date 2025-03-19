const Note = require("../schemas/note.schema");
const { Server } = require("socket.io");
const corsOptions = require("./corsConfig");

let io;
const usersInRooms = new Map();

const initSocket = (server) => {
  io = new Server(server, {
    cors: corsOptions,
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join-note", (noteId, userEmail) => {
      socket.join(noteId);

      // Initialize the room's user list if it doesn't exist
      if (!usersInRooms.has(noteId)) {
        usersInRooms.set(noteId, new Set()); // Use a Set to ensure unique users
      }

      // Add the user to the room's user list
      const usersInRoom = usersInRooms.get(noteId);
      usersInRoom.add(userEmail); // Add the user ID to the Set
      usersInRooms.set(noteId, usersInRoom);

      console.log(`User ${socket.id} joined note room: ${noteId}`);

      // Emit current users in room to everyone (live update)
      io.to(noteId).emit("users-in-room", Array.from(usersInRoom));
    });

    // Leave the room when the user stops editing
    socket.on("leave-note", (noteId, userEmail) => {
      socket.leave(noteId);

      // Remove the user from the room's user list
      if (usersInRooms.has(noteId)) {
        const usersInRoom = usersInRooms.get(noteId);
        usersInRoom.delete(userEmail);
        usersInRooms.set(noteId, usersInRoom);

        // Emit the updated list of users in the room to all clients in the room
        socket.to(noteId).emit("users-in-room", Array.from(usersInRoom));
      }
      console.log(`User ${socket.id} left note room ${noteId}`);
    });

    socket.on("edit-note", async (noteId, noteData) => {
      try {
        // Update the note in the database
        const note = await Note.findByIdAndUpdate(noteId, noteData, {
          new: true,
        });

        // Broadcast the updated note to all users in the room
        socket.to(noteId).emit("note-updated", {
          noteId,
          noteData: note, // send the updated note data
        });

        console.log(`Note ${noteId} updated by ${socket.id}`);
      } catch (error) {
        console.error(`Error updating note ${noteId}:`, error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = { initSocket, getIO };
