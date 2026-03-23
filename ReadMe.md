# GenAI Web Application

A full-stack web application featuring AI-powered interview reports and user authentication.

## Project Structure

- **Backend/**: Node.js/Express server with authentication and AI services
- **Frontend/**: React application built with Vite

## Features

- User registration and login
- Protected routes
- AI-powered interview report generation
- File upload capabilities

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd Backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../Frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd Backend
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd Frontend
   npm run dev
   ```

The application will be available at `http://localhost:3000` (frontend) and backend at `http://localhost:5000` (adjust ports as needed).

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB (assumed from models)
- **Frontend**: React, Vite, SCSS
- **Authentication**: JWT tokens
- **AI Integration**: Custom AI service for report generation

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Reports
- `POST /api/reports` - Generate interview report
- `GET /api/reports` - Get user reports

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.