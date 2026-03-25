# GenAI Interview Report Generator

A full-stack web application that leverages AI to generate comprehensive interview preparation reports. Users can upload their resume, provide context about themselves and the job they're applying for, and receive AI-powered insights and recommendations.

## 🎯 Project Overview

GenAI Interview Report Generator is an intelligent platform designed to help job seekers prepare for interviews by:

- Analyzing their resume and job description
- Generating tailored interview insights and preparation strategies
- Providing actionable recommendations based on AI analysis
- Maintaining a history of generated reports for future reference

## ✨ Features

### User Management

- **User Registration & Login**: Secure authentication with JWT tokens
- **Password Encryption**: bcryptjs for secure password hashing
- **Protected Routes**: Role-based access control with auth middleware
- **Session Management**: Cookie-based session handling with token blacklisting

### Interview Report Generation

- **Resume Upload**: Support for PDF file uploads with automatic parsing
- **AI-Powered Analysis**: Google GenAI integration for intelligent report generation
- **Multi-Factor Input**: Analyzes resume, self-description, and job requirements
- **Comprehensive Reports**: Structured insights including strengths, weaknesses, preparation tips

### Report Management

- **Report History**: View all previously generated interview reports
- **Report Retrieval**: Access specific reports by ID with user isolation
- **Data Persistence**: MongoDB storage for reliable data management

## 🛠 Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: MongoDB with Mongoose (v9.3.1)
- **Authentication**: JWT (jsonwebtoken v9.0.3), bcryptjs (v3.0.3)
- **AI Integration**: Google GenAI (v1.46.0), LangChain
- **File Processing**: Multer (v2.1.1), pdf-parse (v2.4.5)
- **Web Automation**: Puppeteer (v24.40.0)
- **Data Validation**: Zod (v4.3.6)
- **Utilities**: CORS, Cookie Parser, dotenv

### Frontend

- **Framework**: React (v19.2.4) with Vite (v8.0.1)
- **Routing**: React Router (v7.13.1)
- **HTTP Client**: Axios (v1.13.6)
- **Styling**: Tailwind CSS (v4.2.2)
- **Build Tool**: Vite
- **Code Quality**: ESLint

## 📁 Project Structure

```
GenAi/
├── README.md                          # Main project documentation
├── Backend/                           # Node.js/Express server
│   ├── server.js                      # Entry point
│   ├── package.json                   # Backend dependencies
│   ├── Notes.txt                      # Development notes
│   └── src/
│       ├── app.js                     # Express app configuration
│       ├── config/
│       │   └── database.js            # MongoDB connection
│       ├── controllers/
│       │   ├── auth.controller.js     # Authentication logic
│       │   └── report.controller.js   # Report generation logic
│       ├── middlewares/
│       │   ├── auth.middleware.js     # JWT verification
│       │   └── file.middleware.js     # File upload handling
│       ├── models/
│       │   ├── user.model.js          # User schema
│       │   ├── report.model.js        # Interview report schema
│       │   └── blacklist.model.js     # Token blacklist schema
│       ├── routes/
│       │   ├── auth.route.js          # Auth endpoints
│       │   └── report.route.js        # Report endpoints
│       └── services/
│           └── ai.service.js          # AI report generation logic
└── Frontend/                          # React + Vite application
    ├── package.json                   # Frontend dependencies
    ├── vite.config.js                 # Vite configuration
    ├── eslint.config.js               # ESLint rules
    ├── index.html                     # HTML entry point
    ├── README.md                      # Frontend documentation
    └── src/
        ├── main.jsx                   # React entry point
        ├── App.jsx                    # Root component
        ├── app.routes.jsx             # Route definitions
        ├── index.css                  # Global styles
        ├── assets/                    # Static assets
        └── features/
            ├── auth/                  # Authentication feature
            │   ├── auth.context.jsx   # Auth state management
            │   ├── components/
            │   │   └── protected.jsx  # Route guard component
            │   ├── hooks/
            │   │   └── useAuth.js     # Auth hook
            │   ├── pages/
            │   │   ├── Login.jsx      # Login page
            │   │   └── Register.jsx   # Registration page
            │   └── services/
            │       └── auth.api.js    # Auth API calls
            └── report/                # Interview report feature
                ├── interview.context.jsx  # Report state management
                ├── components/        # Reusable components
                ├── hooks/
                │   └── useInterview.js    # Interview hook
                ├── pages/
                │   ├── Home.jsx       # Report submission page
                │   └── Interview.jsx  # Report viewing page
                └── services/
                    └── reports.api.js # Report API calls
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v16 or higher
- **npm**: v7 or higher (comes with Node.js)
- **MongoDB**: Local instance or MongoDB Atlas connection string
- **Google GenAI API Key**: [Get it here](https://makersuite.google.com/app/apikey)

### Environment Variables

#### Backend (.env file in `/Backend`)

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/genai
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/genai

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY=7d

# Google GenAI Configuration
GOOGLE_API_KEY=your_google_genai_api_key

# LangSmith (optional for tracing)
LANGSMITH_API_KEY=your_langsmith_api_key

# CORS Configuration
FRONTEND_URL=https://resume-report.vercel.app
```

#### Frontend (.env file in `/Frontend`)

```env
VITE_API_URL=http://localhost:3000/api
```

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd GenAi
   ```

2. **Install Backend Dependencies**

   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**

   ```bash
   cd ../Frontend
   npm install
   ```

4. **Configure Environment Variables**
   - Create `.env` file in `/Backend` with required variables
   - Create `.env` file in `/Frontend` with API URL

## 📖 Running the Application

### Development Mode

**Terminal 1 - Start Backend Server:**

```bash
cd Backend
npm start
# Server will run on http://localhost:3000
```

**Terminal 2 - Start Frontend Development Server:**

```bash
cd Frontend
npm run dev
# Frontend will run on http://localhost:5173 (or specified port)
```

### Production Build

**Build Frontend:**

```bash
cd Frontend
npm run build
# Creates optimized build in dist/
```

**Start Backend in Production:**

```bash
cd Backend
NODE_ENV=production npm start
```

## 📡 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}

Response: 201
{
  "message": "User registered successfully",
  "user": { "id": "...", "email": "...", "name": "..." }
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}

Response: 200
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": { "id": "...", "email": "...", "name": "..." }
}
```

### Interview Report Endpoints

#### Generate Interview Report

```http
POST /api/report
Content-Type: multipart/form-data
Authorization: Bearer <jwt_token>

FormData:
- resume: [PDF file]
- selfDescription: "I am a passionate developer with..."
- jobDescription: "Looking for a senior developer with..."

Response: 201
{
  "message": "Interview report generated successfully.",
  "interviewReport": {
    "_id": "...",
    "user": "...",
    "resume": "...",
    "selfDescription": "...",
    "jobDescription": "...",
    "strengths": [...],
    "weaknesses": [...],
    "preparationTips": [...],
    "createdAt": "ISO_DATE"
  }
}
```

#### Get All User Reports

```http
GET /api/report/allreports
Authorization: Bearer <jwt_token>

Response: 200
{
  "reports": [
    { "interviewReport": {...} },
    ...
  ]
}
```

#### Get Specific Report

```http
GET /api/report/:interviewId
Authorization: Bearer <jwt_token>

Response: 200
{
  "interviewReport": { ... }
}
```

## 🔐 Security Features

- **JWT Authentication**: Stateless token-based authentication
- **Password Hashing**: bcryptjs with salt rounds for secure password storage
- **CORS Protection**: Configured for specific frontend origins
- **Token Blacklisting**: Revoked tokens stored in database for logout
- **Protected Routes**: Middleware-based access control
- **File Validation**: Multer middleware for file type and size validation
- **Input Validation**: Zod schema validation for API inputs

## 📊 Data Models

### User Model

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Interview Report Model

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  resume: String,
  selfDescription: String,
  jobDescription: String,
  strengths: [String],
  weaknesses: [String],
  preparationTips: [String],
  interviewQuestions: [String],
  overallScore: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

Currently, no automated tests are configured. To add test coverage:

```bash
# Backend testing (recommended: Jest)
npm install --save-dev jest supertest

# Frontend testing (recommended: Vitest)
npm install --save-dev vitest @testing-library/react
```

## 📈 Performance Optimization

- **Frontend**: Vite for fast HMR and optimized builds
- **Caching**: Consider implementing Redis for session caching
- **API Optimization**: Implement pagination for large report lists
- **Code Splitting**: Automatic code splitting with React Router v7

## 🔄 Deployment

### Backend Deployment (Recommended: Railway, Render, or Heroku)

1. Push code to GitHub
2. Connect repository to deployment platform
3. Set environment variables
4. Deploy

### Frontend Deployment (Recommended: Vercel)

1. Connect GitHub repository to Vercel
2. Set `VITE_API_URL` environment variable
3. Deploy automatically on push

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/your-feature`)
2. Commit changes (`git commit -am 'Add new feature'`)
3. Push to branch (`git push origin feature/your-feature`)
4. Create Pull Request

## 📝 Development Notes

See [Backend/Notes.txt](Backend/Notes.txt) for additional development notes and TODOs.

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running locally or connection string is correct
- Check firewall settings for MongoDB Atlas

### CORS Errors

- Verify `CORS_ORIGIN` matches your frontend URL in `.env`
- Check browser console for specific origin being blocked

### AI Generation Failures

- Verify Google GenAI API key is valid
- Check API rate limits
- Review AI service logs for detailed errors

### File Upload Issues

- Ensure PDF file is valid
- Check file size doesn't exceed multer limits
- Verify file MIME type is correct

## 📚 Resource Links

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Google GenAI API](https://ai.google.dev/)
- [JWT.io](https://jwt.io/)

## 📄 License

This project is licensed under the ISC License. See package.json for details.

## 👨‍💻 Author

Created as a full-stack AI-powered interview preparation platform.

---

**Last Updated**: March 2025

For questions or support, please create an issue in the repository.

The application will be available at `http://localhost:3000` (frontend) and backend at `http://localhost:5000` (adjust ports as needed).

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB (assumed from models)
- **Frontend**: React, Vite, Tailwind
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
