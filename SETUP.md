# Setup Instructions

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd octabyte
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:3001`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory (optional):

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### 4. Access the Application

Open your browser and navigate to:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:3001/api/portfolio`
- Health Check: `http://localhost:3001/health`

## Building for Production

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
npm start
```

## Troubleshooting

### Port Already in Use

If port 3000 or 3001 is already in use, you can change it:

**Backend:**
- Update `PORT` in `backend/.env`

**Frontend:**
- Update the port in `frontend/package.json` scripts or use:
  ```bash
  npm run dev -- -p 3002
  ```

### API Connection Issues

- Ensure the backend is running before starting the frontend
- Check that `NEXT_PUBLIC_API_URL` matches your backend URL
- Verify CORS settings in `backend/.env`

### Module Not Found Errors

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### TypeScript Errors

- Ensure all dependencies are installed
- Run `npm install` in both frontend and backend directories
- Check that TypeScript version is compatible

## Development Notes

- The application uses mock data when API calls fail (for development/demo)
- Real-time updates occur every 15 seconds
- Caching is implemented to reduce API calls
- Error handling includes fallback mechanisms

## Project Structure

```
octabyte/
├── backend/          # Express.js backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── types/
│   └── package.json
├── frontend/         # Next.js frontend
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── types/
└── README.md
```

## Next Steps

1. Review the code structure
2. Test the application
3. Customize the portfolio data
4. Deploy to production (if needed)

## Support

For issues or questions, please refer to:
- `README.md` - General project information
- `TECHNICAL_DOCUMENTATION.md` - Technical details and challenges
- `backend/README.md` - Backend-specific documentation
- `frontend/README.md` - Frontend-specific documentation

