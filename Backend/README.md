# GenAI Interview Report Generator - Backend

Robust Node.js/Express backend server providing AI-powered interview report generation, user authentication, and data management for the GenAI platform.

## 🎯 Features

- **User Authentication**: Secure JWT-based authentication with bcryptjs password hashing
- **AI Integration**: Google GenAI integration for intelligent report generation
- **PDF Processing**: Resume parsing from PDF files
- **Token Management**: JWT with blacklisting for logout functionality
- **RESTful API**: Clean, well-structured API endpoints
- **Error Handling**: Comprehensive error handling and logging
- **CORS Support**: Configured for specific frontend origins
- **Database**: MongoDB with Mongoose ODM

## 🛠 Tech Stack

| Technology   | Version | Purpose             |
| ------------ | ------- | ------------------- |
| Node.js      | 16+     | Runtime environment |
| Express.js   | 5.2.1   | Web framework       |
| MongoDB      | Latest  | Database            |
| Mongoose     | 9.3.1   | ODM                 |
| Google GenAI | 1.46.0  | AI integration      |
| LangChain    | Latest  | AI orchestration    |
| JWT          | 9.0.3   | Authentication      |
| Bcryptjs     | 3.0.3   | Password encryption |
| Multer       | 2.1.1   | File upload         |
| pdf-parse    | 2.4.5   | PDF parsing         |
| Puppeteer    | 24.40.0 | Web automation      |
| Zod          | 4.3.6   | Data validation     |

## 📁 Project Structure

```
Backend/
├── server.js                          # Main entry point
├── package.json                       # Dependencies
├── README.md                          # Backend documentation
├── Notes.txt                          # Development notes
├── .env                               # Environment variables (not in repo)
└── src/
    ├── app.js                         # Express app setup
    ├── config/
    │   └── database.js                # MongoDB connection
    ├── controllers/
    │   ├── auth.controller.js         # Auth logic
    │   └── report.controller.js       # Report generation logic
    ├── middlewares/
    │   ├── auth.middleware.js         # JWT verification & auth
    │   └── file.middleware.js         # Multer file upload config
    ├── models/
    │   ├── user.model.js              # User schema
    │   ├── report.model.js            # Interview report schema
    │   └── blacklist.model.js         # Token blacklist schema
    ├── routes/
    │   ├── auth.route.js              # Auth endpoints
    │   └── report.route.js            # Report endpoints
    └── services/
        └── ai.service.js              # AI report generation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Google GenAI API key

### Installation

1. **Clone and navigate**

   ```bash
   cd Backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment** (see [Environment Variables](#-environment-variables))

   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:3000`

## 🔧 Environment Variables

Create `.env` file in the `Backend` directory:

```env
# Server Configuration
PORT=3000                                    # Server port (default: 3000)
NODE_ENV=development                        # Environment (development/production)

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/genai
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/genai?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here   # Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_EXPIRY=7d                               # Token expiry (7d, 24h, etc.)

# Google GenAI Configuration
GOOGLE_API_KEY=your_google_genai_api_key    # Get from: https://makersuite.google.com/app/apikey

# LangSmith (Optional - for AI tracing)
LANGSMITH_API_KEY=your_langsmith_api_key

# CORS Configuration
FRONTEND_URL=http://localhost:5173          # Frontend URL (development)
# Production: https://your-frontend.vercel.app
```

### Generating JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📝 Available Scripts

```bash
npm start              # Start server (requires Node v16+)
npm run dev            # Start with nodemon (auto-reload)
npm test              # Run tests (not yet configured)
npm run lint          # Run linter (not yet configured)
```

To use `npm run dev`, install nodemon:

```bash
npm install --save-dev nodemon
```

Then update `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## 🔐 API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**

```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Logout User

```http
POST /api/auth/logout
Authorization: Bearer <jwt_token>
```

**Response (200):**

```json
{
  "message": "Logged out successfully"
}
```

### Report Routes (`/api/report`)

#### Generate Interview Report

```http
POST /api/report
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

FormData:
  - resume: [PDF file]
  - selfDescription: "I am a passionate full-stack developer..."
  - jobDescription: "Senior React Developer with 5+ years experience..."
```

**Response (201):**

```json
{
  "message": "Interview report generated successfully.",
  "interviewReport": {
    "_id": "report_id",
    "user": "user_id",
    "resume": "parsed_resume_text",
    "selfDescription": "...",
    "jobDescription": "...",
    "strengths": ["Strength 1", "Strength 2"],
    "weaknesses": ["Area 1", "Area 2"],
    "preparationTips": ["Tip 1", "Tip 2"],
    "interviewQuestions": ["Q1", "Q2"],
    "overallScore": 8.5,
    "createdAt": "2025-03-25T10:00:00.000Z"
  }
}
```

#### Get All User Reports

```http
GET /api/report/allreports
Authorization: Bearer <jwt_token>
```

**Response (200):**

```json
{
  "reports": [
    {
      "interviewReport": { ... }
    },
    ...
  ]
}
```

#### Get Specific Report

```http
GET /api/report/:interviewId
Authorization: Bearer <jwt_token>
```

**Response (200):**

```json
{
  "interviewReport": { ... }
}
```

## 🗄 Database Models

### User Schema

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

### Interview Report Schema

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  resume: String (required),
  selfDescription: String (required),
  jobDescription: String (required),
  strengths: [String],
  weaknesses: [String],
  preparationTips: [String],
  interviewQuestions: [String],
  overallScore: Number,
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

### Token Blacklist Schema

```javascript
{
  _id: ObjectId,
  token: String (required, unique),
  expiresAt: Date (required, TTL index),
  createdAt: Date (default: now)
}
```

## 🔍 Key Features Explained

### Authentication Flow

1. **Registration**
   - User provides name, email, password
   - Password hashed with bcryptjs (salt rounds: 10)
   - User stored in MongoDB
   - JWT token generated for immediate login

2. **Login**
   - Email and password verified
   - Password compared with bcryptjs
   - JWT token issued with user ID
   - Token stored in httpOnly cookie

3. **Protected Routes**
   - `authMiddleware` checks JWT in header or cookie
   - Verifies token signature and expiry
   - Attaches user data to request object

4. **Logout**
   - Token added to blacklist collection
   - Subsequent requests with that token rejected
   - Client clears local storage/cookies

### AI Report Generation

The `ai.service.js` uses:

1. **Google GenAI API** for intelligent analysis
2. **LangChain** for structured prompt engineering
3. **Zod** for output validation
4. **PDF Processing** with pdf-parse for resume extraction

**Process:**

1. Resume PDF parsed to text
2. User input (self-description, job description) collected
3. Structured prompt sent to Google GenAI
4. Response parsed and validated with Zod
5. Report data stored in MongoDB

### File Upload

**Multer Configuration** (`file.middleware.js`):

- Accepts only PDF files
- Maximum file size: 10MB (configurable)
- Files stored in memory buffer
- Automatic cleanup after request

## 🛡 Security Features

### Password Security

- Bcryptjs with 10 salt rounds
- Passwords never logged or exposed
- Secure password comparison

### JWT Security

- HMAC SHA-256 signature
- Configurable expiry (default: 7 days)
- Token blacklisting on logout
- Secure secret key required

### Input Validation

- Zod schema validation on all API inputs
- Email format validation
- File type and size validation
- Sanitization against injection attacks

### CORS Protection

- Restricted to specific frontend origin
- Credentials allowed (cookies)
- Specific headers allowed

### Environment Security

- Sensitive keys in `.env`
- Never commit `.env` to repository
- Use strong, random JWT secret
- Secure MongoDB credentials

## 🧪 Testing

No tests configured yet. Recommended setup:

```bash
npm install --save-dev jest supertest
```

**Example test structure:**

```javascript
// tests/auth.test.js
describe("Authentication", () => {
  test("should register new user", async () => {
    // Test implementation
  });
});
```

## 📊 Performance Tips

1. **Database Indexing**
   - Add index on `user` field in reports collection
   - Add index on `email` field in users collection
   - TTL index on blacklist for auto cleanup

2. **Caching**
   - Consider Redis for token validation
   - Cache frequently accessed reports

3. **Query Optimization**
   - Use `lean()` for read-only queries
   - Implement pagination for report lists
   - Use projection to limit fields

4. **API Optimization**
   - Compress responses with gzip
   - Implement request rate limiting
   - Add request timeout handling

## 🚀 Deployment

### Environment for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=very_long_random_secret_key
FRONTEND_URL=https://your-frontend.com
```

### Deployment Checklist

- [ ] All environment variables set
- [ ] MongoDB connection tested
- [ ] API keys validated
- [ ] CORS origins updated
- [ ] Error logging configured
- [ ] Rate limiting enabled
- [ ] HTTPS enforced
- [ ] Database backups configured

### Recommended Platforms

- **Railway**: `npm start` automatically detected
- **Render**: Free tier available
- **Heroku**: Easy deployment from GitHub
- **DigitalOcean**: Full control, affordable

## 🐛 Troubleshooting

### MongoDB Connection Issues

```bash
# Test connection
node -e "require('./src/config/database')()"
```

Solutions:

- Check MONGODB_URI format
- Verify MongoDB running locally
- Check MongoDB Atlas IP whitelist
- Verify username/password

### JWT Errors

```
Error: jwt malformed
Error: jwt expired
```

Solutions:

- Verify JWT_SECRET matches
- Check token format (should include "Bearer ")
- Regenerate token with fresh login

### AI Generation Failures

```
Error: API key invalid
Error: Rate limit exceeded
```

Solutions:

- Verify GOOGLE_API_KEY is correct
- Check API quota limits
- Implement exponential backoff retry
- Split large requests

### File Upload Issues

```
Error: File too large
Error: Invalid file type
```

Solutions:

- Check file is valid PDF
- Verify file size < 10MB
- Ensure correct Content-Type header

### CORS Errors

```
Error: CORS policy blocked request
```

Solutions:

- Update FRONTEND_URL in .env
- Ensure credentials: true in frontend axios

## 📚 Useful Commands

```bash
# Start development with auto-reload
npm run dev

# Test API endpoints
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"pass"}'

# Check running processes
lsof -i :3000

# Clear node modules
rm -rf node_modules && npm install
```

## 💡 Code Examples

### Using Authentication in Custom Routes

```javascript
const express = require("express");
const authMiddleware = require("./middlewares/auth.middleware");

const router = express.Router();

router.get("/protected", authMiddleware.authUser, (req, res) => {
  // req.user contains: { userId, email, name }
  res.json({ message: `Hello ${req.user.name}` });
});

module.exports = router;
```

### AI Service Integration

```javascript
const { generateInterviewReport } = require("./services/ai.service");

const report = await generateInterviewReport({
  resume: resumeText,
  selfDescription: userDescription,
  jobDescription: jobDesc,
});
// Returns: { strengths, weaknesses, preparationTips, interviewQuestions, overallScore }
```

## 🔗 Related Documentation

- [Main README](../README.md) - Project overview
- [Frontend README](../Frontend/README.md) - Frontend documentation
- [Express.js Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [Google GenAI API](https://ai.google.dev/)

## 📝 Development Notes

See [Notes.txt](Notes.txt) for development progress, TODOs, and changes.

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and test
3. Commit: `git commit -am 'Add feature'`
4. Push: `git push origin feature/your-feature`
5. Create Pull Request

## 📄 License

ISC License - See package.json for details

## 🆘Support

For issues:

1. Check `.env` configuration
2. Review error logs in console
3. Verify MongoDB connection
4. Check API key validity
5. See [Troubleshooting](#-troubleshooting) section

---

**Built with Express.js & MongoDB** | **Last Updated**: March 2025

For detailed project information, see the [main README](../README.md).
