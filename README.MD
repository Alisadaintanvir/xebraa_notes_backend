Here’s the updated **README.md** with a note about Docker deployment added under the **Setup and Installation** section:

---

# Xebraa Notes - A Real-Time Collaborative Note App Backend

This is the backend for a real-time note-taking application built with **Node.js**, **Express**, **MongoDB**, and **Socket.IO**. It provides APIs for user authentication, note management, and real-time collaboration.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Setup and Installation](#setup-and-installation)
5. [Environment Variables](#environment-variables)
6. [API Endpoints](#api-endpoints)
7. [Error Handling](#error-handling)
8. [Socket.IO Integration](#socketio-integration)
9. [Authentication](#authentication)
10. [Contributing](#contributing)
11. [License](#license)

---

## Features

- **User Authentication**: Register, login, and logout with JWT-based authentication.
- **Note Management**: Create, read, update, and delete notes.
- **Real-Time Collaboration**: Real-time updates and auto-saving using Socket.IO.
- **User Tracing**: Track active users in real-time.
- **Error Handling**: Custom middleware for 404 and common errors.
- **Security**: CORS configuration, HTTP-only cookies for refresh tokens, and access tokens stored in memory.
- **Logging**: HTTP request logging with Morgan.

---

## Technologies Used

- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **MongoDB**: Database for storing users and notes.
- **Mongoose**: MongoDB object modeling.
- **Socket.IO**: Real-time communication.
- **JWT (JSON Web Tokens)**: For secure authentication.
- **Bcryptjs**: For password hashing.
- **Cookie-parser**: For parsing HTTP cookies.
- **CORS**: For secure cross-origin requests.
- **Dotenv**: For managing environment variables.
- **Morgan**: For HTTP request logging.

---

## Project Structure

```
src
 ┣ constants
 ┃ ┗ value.constant.js
 ┣ helpers
 ┃ ┗ errorHandler.js
 ┣ middlewares
 ┃ ┗ auth.middleware.js
 ┣ modules
 ┃ ┣ auth
 ┃ ┃ ┣ auth.controller.js
 ┃ ┃ ┣ auth.routes.js
 ┃ ┃ ┗ auth.validator.js
 ┃ ┣ note
 ┃ ┃ ┣ note.controller.js
 ┃ ┃ ┣ note.routes.js
 ┃ ┃ ┗ note.validator.js
 ┃ ┗ app.router.js
 ┣ routers
 ┃ ┗ index.js
 ┣ schemas
 ┃ ┣ note.schema.js
 ┃ ┗ user.schema.js
 ┣ services
 ┃ ┗ token.service.js
 ┣ utility
 ┃ ┣ corsConfig.js
 ┃ ┣ socketHandler.js
 ┃ ┗ withErrorHandling.js
 ┗ app.js
```

---

## Setup and Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- NPM or Yarn
- Docker (optional, for containerized deployment)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Alisadaintanvir/xebraa_notes_backend.git
   cd real-time-note-app-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/note-app
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=15m
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
   JWT_REFRESH_EXPIRES_IN=30d
   ALLOWED_ORIGIN=http://localhost:3000
   ```

4. **Start the server**

   ```bash
   npm start
   ```

5. **Access the application**

   The server will be running on `http://localhost:5000`.

### **Docker Deployment**

The application is containerized using Docker. To deploy the app using Docker:

1. **Build the Docker image**

   ```bash
   docker build -t xebraa-notes-backend .
   ```

2. **Run the Docker container**

   ```bash
   docker run -p 5000:5000 --env-file .env xebraa-notes-backend
   ```

   The app will be accessible at `http://localhost:5000`.

---

## Environment Variables

| Variable                 | Description                                 | Example Value                        |
| ------------------------ | ------------------------------------------- | ------------------------------------ |
| `PORT`                   | Port for the server to run on               | `5000`                               |
| `MONGO_URI`              | MongoDB connection string                   | `mongodb://localhost:27017/note-app` |
| `ALLOWED_ORIGIN`         | Allowed origin for CORS                     | `http://localhost:3000`              |
| `JWT_SECRET`             | Secret key for JWT access token generation  | `your_jwt_secret_key`                |
| `JWT_EXPIRES_IN`         | Expiry for JWT access token                 | `15m`                                |
| `JWT_REFRESH_SECRET`     | Secret key for JWT refresh token generation | `your_jwt_refresh_secret_key`        |
| `JWT_REFRESH_EXPIRES_IN` | Expiry for JWT refresh token                | `30d`                                |

---

## API Endpoints

### Authentication

- **POST /v1/auth/register**: Register a new user.
- **POST /v1/auth/login**: Login an existing user.
- **POST /v1/auth/logout**: Logout the user.

### Notes

- **GET /v1/notes**: Get all notes for the authenticated user.
- **POST /v1/notes**: Create a new note.
- **GET /v1/notes/:id**: Get a specific note by ID.
- **PUT /v1/notes/:id**: Update a specific note by ID.
- **DELETE /v1/notes/:id**: Delete a specific note by ID.

---

## Error Handling

The application uses the following error-handling mechanisms:

1. **404 Not Found Handler**: Handles requests to undefined routes.
2. **Common Error Handler**: Handles all other errors and sends a structured response.
3. **withErrorHandling Utility**: Wraps asynchronous route handlers in a `try-catch` block and passes errors to the error-handling middleware.

---

## Socket.IO Integration

Socket.IO is used for real-time collaboration. Key features include:

- **Real-Time Updates**: Notes are updated in real-time across all connected clients.
- **Auto-Saving**: Changes are auto-saved in edit mode.
- **User Tracing**: Track active users in real-time.

### Events

- **`note-updated`**: Emitted when a note is created, updated, or deleted.
- **`edit-note`**: Emitted when a note is editing.
- **`users-in-room`**: Emitted all the users join in room based on note Id

---

## Authentication

The application uses **JWT-based authentication** with the following flow:

1. **Registration**: Users register with their name, email, and password. Passwords are hashed using `bcryptjs`.
2. **Login**: Users log in with their email and password. On successful login, they receive an **access token** (stored in memory) and a **refresh token** (stored in an HTTP-only cookie).
3. **Token Refresh**: When the access token expires, users can refresh it using the refresh token.
4. **Logout**: Users can log out, which invalidates the refresh token.

### Security Features

- **Password Hashing**: Passwords are hashed using `bcryptjs`.
- **HTTP-Only Cookies**: Refresh tokens are stored in secure, HTTP-only cookies.
- **Token Expiry**: Access tokens expire after 15 minutes; refresh tokens expire after 30 days.

---

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or need further assistance! 🚀

---

This version includes the Docker deployment note and maintains a clean, professional format. Let me know if you need further tweaks!
