# Jan Ruwell Menque Portfolio

This package contains the redesigned React portfolio and the FastAPI contact API.

## What is inside

- `frontend/` — the React portfolio (Create React App), ready to publish on Vercel. Includes the merged portfolio assets under `frontend/public/legacy`.
- `backend/` — the FastAPI contact API. It saves contact messages to MongoDB and emails every enquiry to the portfolio owner.
- This README.

## Frontend on Vercel

1. Import this project into Vercel (upload the folder or connect a Git repo).
2. Set the project root to `frontend`.
3. Vercel uses `yarn build` and the `build` output directory from `frontend/vercel.json` automatically.
4. In Vercel project settings → Environment Variables, add:
   - `REACT_APP_BACKEND_URL` = the public URL where the FastAPI backend is running (for example your Emergent preview/live URL, without a trailing slash).
5. Redeploy. The contact form posts to `REACT_APP_BACKEND_URL/api/contact`.

## Backend

The backend is a standard FastAPI server. Vercel is for the frontend; run the API on any Python-capable host (or keep it on Emergent, where it already runs).

```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001
```

The contact endpoint is `POST /api/contact` with `name`, `email`, and `message` fields. Messages are stored in MongoDB and an email notification is sent to the owner.

Required environment variables for the backend (create a `.env` file in `backend/`, values are NOT included in this package for security):

```
MONGO_URL="mongodb://localhost:27017"
DB_NAME="your_database_name"
CORS_ORIGINS="https://your-vercel-domain.vercel.app"
EMERGENT_EMAIL_KEY="..."        # provided by Emergent managed email; omit to disable email
EMAIL_FROM_NAME="Jan Ruwell Menque Portfolio"
EMAIL_REPLY_TO="your-email@example.com"
OWNER_EMAIL="your-email@example.com"   # where contact enquiries are emailed
```

Set `CORS_ORIGINS` to your deployed Vercel URL so the frontend can reach the API.

## Local development

```bash
cd frontend
yarn install
yarn start
```

The previous portfolio information merged into this version includes Jan Ruwell Menque's project archive, Zamboanga City location, ZPPSU education, experience timeline, skills, GitHub, LinkedIn, Facebook, and email details.
