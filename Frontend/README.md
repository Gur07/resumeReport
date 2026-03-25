# GenAI Interview Report Generator - Frontend

Modern React frontend application built with Vite for the GenAI Interview Report Generator platform. This application enables users to generate AI-powered interview preparation reports by uploading their resume and providing job context.

## 🎯 Features

- **User Authentication**: Secure login and registration with JWT
- **Interview Report Generation**: Submit resume and job details to generate AI insights
- **Report History**: View all previously generated reports
- **Report Details**: Access comprehensive analysis of generated reports
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Protected Routes**: Authenticated-only access to report features
- **State Management**: React Context API for auth and interview data

## 🛠 Tech Stack

- **Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.1
- **Routing**: React Router 7.13.1
- **HTTP Client**: Axios 1.13.6
- **Styling**: Tailwind CSS 4.2.2 with Vite plugin
- **Code Quality**: ESLint 9.39.4
- **Node Version**: 16+ required

## 📁 Project Structure

```
src/
├── main.jsx                           # React DOM rendering entry point
├── App.jsx                            # Root app component with providers
├── app.routes.jsx                     # Route configuration
├── index.css                          # Global Tailwind styles
├── assets/                            # Static images and files
└── features/
    ├── auth/                          # Authentication feature module
    │   ├── auth.context.jsx           # Auth context provider & state
    │   ├── components/
    │   │   └── protected.jsx          # Route permission guard
    │   ├── hooks/
    │   │   └── useAuth.js             # Hook for auth context usage
    │   ├── pages/
    │   │   ├── Login.jsx              # Login page
    │   │   └── Register.jsx           # Registration page
    │   └── services/
    │       └── auth.api.js            # Authentication API calls
    └── report/                        # Interview report feature module
        ├── interview.context.jsx      # Interview data & state
        ├── components/                # Reusable report components
        ├── hooks/
        │   └── useInterview.js        # Hook for interview context
        ├── pages/
        │   ├── Home.jsx               # Report generation page
        │   └── Interview.jsx          # View reports page
        └── services/
            └── reports.api.js         # Report API calls
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Backend API running on `http://localhost:3000`

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**
   Create `.env` file in root:

   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Application opens at `http://localhost:5173`

## 📝 Available Scripts

### Development

```bash
npm run dev
```

- Starts Vite dev server with HMR (Hot Module Replacement)
- File changes automatically refresh the browser

### Build

```bash
npm run build
```

- Creates optimized production build in `dist/` folder
- Outputs minified assets and optimized chunks

### Preview

```bash
npm run preview
```

- Locally preview the production build
- Useful for testing before deployment

### Lint

```bash
npm run lint
```

- Runs ESLint to check code quality
- Shows warnings and errors in code

## 🏗 Architecture

### Feature-Based Structure

The frontend uses a feature-based folder structure for better organization and scalability:

- **Each feature is self-contained** with its own:
  - Context/State Management (`.context.jsx`)
  - Custom Hooks (`.js` in `hooks/`)
  - Page Components (in `pages/`)
  - Sub-components (in `components/`)
  - API Services (in `services/`)

### State Management with Context API

**Authentication Context** (`auth.context.jsx`)

- Manages user login state
- Stores JWT token
- Provides auth utility functions
- Accessible via `useAuth()` hook

**Interview Context** (`interview.context.jsx`)

- Manages interview report data
- Stores generated reports
- Handles report submission state
- Accessible via `useInterview()` hook

### Protected Routes

Routes requiring authentication use the `<Protected>` component:

```jsx
<Route
  element={
    <Protected>
      <ReportPage />
    </Protected>
  }
  path="/report"
/>
```

## 🔌 API Integration

All API calls are configured through service files:

### Auth Service (`features/auth/services/auth.api.js`)

```javascript
// Available functions:
register(email, password, name);
login(email, password);
logout();
getCurrentUser();
```

### Report Service (`features/report/services/reports.api.js`)

```javascript
// Available functions:
generateReport(formData); // FormData with resume, selfDescription, jobDescription
getAllReports();
getReportById(id);
```

### Axios Configuration

- Base URL: Set via `VITE_API_URL` environment variable
- Credentials: Included in requests (cookies, auth headers)
- Error handling: Global interceptors for 401/403 responses

## 🎨 Styling with Tailwind CSS

- **Tailwind CSS 4.2.2** integrated with Vite plugin
- **Utility-first approach** for rapid UI development
- **Global styles** in `index.css`
- **Dark mode** support available (can be enabled in `tailwind.config.js`)

## 🔐 Authentication Flow

1. **Register**: User provides email and password
2. **Login**: Credentials validated, JWT token returned
3. **Token Storage**: JWT stored in state and local storage
4. **Protected Routes**: Routes check auth context before rendering
5. **Logout**: Token cleared, user redirected to login

## 📱 Responsive Design

- Mobile-first Tailwind CSS approach
- Responsive breakpoints for tablet and desktop
- Touch-friendly interface elements
- Optimized performance on mobile devices

## 🧹 Code Quality

### ESLint Configuration

- React hooks rules enabled
- React refresh/Fast Refresh rules
- Global variables configured
- Extends recommended rules from `@eslint/js`

### Linting

```bash
npm run lint
```

### Future Improvements

- Add TypeScript for type safety
- Implement React Compiler (when stable)
- Add unit tests with Vitest
- Add component library (Storybook)

## ⚡ Performance Optimizations

- **Code Splitting**: React Router v7 automatic route-based splitting
- **Lazy Loading**: Dynamic imports for feature modules
- **Vite HMR**: Near-instant updates during development
- **Production Build**: Minification and tree-shaking included
- **Image Optimization**: Consider using `<img>` with lazy loading

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables:
   ```env
   VITE_API_URL=https://your-backend-api.com/api
   ```
4. Deploy (automatic on push to main branch)

### Other Platforms (Netlify, Firebase, etc.)

1. Run build:
   ```bash
   npm run build
   ```
2. Deploy `dist/` folder
3. Configure environment variables in platform settings
4. Set up redirects for SPA routing (example: `_redirects` file)

### Build Output

The `dist/` folder contains:

- `index.html` - Entry point
- `assets/` - Bundled JavaScript and CSS with content hashing
- `manifest.json` - Chunk manifest for SPA routing

## 🔧 Troubleshooting

### Port 5173 Already in Use

```bash
# Use a different port
npm run dev -- --port 3001
```

### CORS Errors

- Ensure backend `.env` has correct FRONTEND_URL
- Check `VITE_API_URL` points to running backend
- Verify backend CORS configuration

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Check for TypeScript/syntax errors
npm run lint

# Clear Vite cache
rm -rf dist node_modules/.vite
npm install && npm run build
```

## 📚 Learning Resources

- [React 19 Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Axios Documentation](https://axios-http.com/)

## 🤝 Development Guidelines

### Component Naming

- Use PascalCase for component files: `HomePage.jsx`
- Use camelCase for utility/hook files: `useAuth.js`

### Folder Structure

- One component per file
- Group related files in feature folders
- Keep services separate from components

### State Management

- Use Context API for global state
- Use `useState` for local component state
- Use custom hooks to extract logic

### API Calls

- Centralize API calls in service files
- Use axios instances with default config
- Handle errors consistently

## 📄 Package.json Scripts

| Script            | Purpose                           |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start development server with HMR |
| `npm run build`   | Create production build           |
| `npm run preview` | Preview production build locally  |
| `npm run lint`    | Check code quality with ESLint    |

## 🐛 Known Issues & Limitations

- No TypeScript: Consider TypeScript migration for large projects
- No automated tests: Add Jest/Vitest for test coverage
- No state persistence: Add localStorage for state persistence
- No offline support: Consider PWA integration

## 🔮 Future Enhancements

- [ ] TypeScript migration
- [ ] Unit and integration tests
- [ ] Local storage for offline support
- [ ] PDF download for reports
- [ ] Report sharing/export features
- [ ] Dark mode toggle
- [ ] User profile management
- [ ] Advanced filtering for report history

## 📞 Support

For issues or questions:

1. Check existing GitHub issues
2. Review error messages in browser console
3. Check backend logs for API errors
4. Refer to main [README.md](../README.md)

---

**Built with React 19 & Vite** | **Last Updated**: March 2025
