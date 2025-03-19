# Xebraa Notes- A Real Time Collaborative Note App Backend

This is the backend for a real-time note-taking application built with **Node.js**, **Express**, **MongoDB**, and **Socket.IO**. It provides APIs for user authentication, note management, and real-time updates.

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
9. [Contributing](#contributing)
10. [License](#license)

---

## Features

- User authentication (login, registration, logout)
- CRUD operations for notes
- Real-time updates using Socket.IO with auto saving on edit mode
- Real-time user tracing
- Error handling middleware
- CORS configuration for secure cross-origin requests
- Logging with Morgan
- JWT based authentication where access token stored in memory for security and refresh token stored in http Cookie

---

## Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Express Validator**: Validator
- **MongoDB**: Database
- **Mongoose**: MongoDB object modeling
- **Socket.IO**: Real-time communication
- **Cookie-parser**: Parse HTTP cookies
- **CORS**: Cross-origin resource sharing
- **Dotenv**: Environment variable management
- **Morgan**: HTTP request logger

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

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/real-time-note-app-backend.git
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
   ```

4. **Start the server**

   ```bash
   npm start
   ```

5. **Access the application**

   The server will be running on `http://localhost:5000`.

---

## Environment Variables

| Variable                 | Description                                 | Example Value                        |
| ------------------------ | ------------------------------------------- | ------------------------------------ |
| `PORT`                   | Port for the server to run on               | `8000`                               |
| `MONGO_URI`              | MongoDB connection string                   | `mongodb://localhost:27017/note-app` |
| `ALLOWED_ORIGIN`         | Origin which will be allowed by cors        | `http://localhost:8000`              |
| `JWT_SECRET`             | Secret key for JWT Access token generation  | `your_jwt_secret_key`                |
| `JWT_EXPIRES_IN`         | Expiry for JWT token generation             | `15m`                                |
| `JWT_REFRESH_SECRET`     | Secret key for JWT Refresh token generation | `your_jwt_secret_key`                |
| `JWT_REFRESH_EXPIRES_IN` | Expiry for JWT Refresh token generation     | `30d`                                |

---

## API Endpoints

### Authentication

- **POST /v1/auth/register**: Register a new user
- **POST /v1/auth/login**: Login an existing user
- **POST /v1/auth/logout**: Logout the user

### Notes

- **GET /v1/notes**: Get all notes for the authenticated user
- **POST /v1/notes**: Create a new note
- **GET /v1/notes/:id**: Get a specific note by ID
- **PUT /v1/notes/:id**: Update a specific note by ID
- **DELETE /v1/notes/:id**: Delete a specific note by ID

---

## Error Handling

The application uses two custom error handlers:

1. **404 Not Found Handler**: Handles requests to undefined routes.
2. **Common Error Handler**: Handles all other errors and sends a structured response.
3.

---

## Socket.IO Integration

Socket.IO is used for real-time updates. When a note is created, updated, or deleted, the changes are broadcast to all connected clients.

- **Event: `note-update`**: Emitted when a note is created, updated, or deleted.
- **Event: `note-delete`**: Emitted when a note is deleted.

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
