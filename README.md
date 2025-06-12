_Athlete Performance Insights Platform_

#Technology Stack

- Frontend: React.js with TypeScript
- Backend: FastAPI (Python)
- Middleware: CORSMiddleware
- Database: SQLite
- Authentication: JWT (JSON Web Tokens)
- Styling: Tailwind CSS
- Build Tool: Vite


#Project Structure and Setup

├── Backend/
│   ├── app/
│   │   ├── __pycache__/
│   │   ├── routers/
│   │   |   ├── __pycache__/
│   │   |   ├── athletes.py
│   │   |   ├── auth.py
│   │   |   ├── dashboard.py
│   │   |   ├── metrics.py
│   │   |   └── videos.py
│   │   ├── auth.py
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   ├── uploads/
│   |── app.db
│   └── requirements.txt
├── Frontend/
│   ├── athlete-dashboard/
|   │   ├── node_modules/
|   │   ├── public/
|   │   ├── src/
|   │   │   ├── api/
|   │   │   ├── assets/
|   │   │   ├── components/
|   │   │   ├── context/
|   │   │   ├── routes/
|   │   │   ├── App.css
|   │   │   ├── App.tsx
|   │   │   ├── index.css
|   │   │   ├── main.tsx
|   │   │   ├── Theme.ts
|   │   │   └── vite-env.d.ts
|   │   ├── .gitignore
|   │   |── eslint.config.js
|   │   |── index.html
|   │   |── package-lock.json
|   │   |── package.json
|   │   |── README.md
|   │   |── tsconfig.app.json
|   │   |── tsconfig.json
|   │   |── tsconfig.node.json
|   │   └── vite.config.ts
├── node_modules/
|── package-lock.json
|── package.json
└── README.md


#Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/OmarZain3/Mini-Platform-for-Athlete-Performance-Insights-.git
   cd Mini-Platform-for-Athlete-Performance-Insights-
   ```

2. Backend Setup
   ```bash
   cd Backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. Frontend Setup
   ```bash
   cd Frontend/athlete-dashboard
   npm install
   ```

4. Environment Setup
   Create a `.env` file in the Backend directory with the following variables:
   ```
   SECRET_KEY=supersecretkey
   DATABASE_URL=sqlite:///./app.db
   ```

5. Start the development servers
   ```bash
   -Start backend server
   cd Backend
   uvicorn app.main:app --reload

   -Start frontend server
   cd Frontend/athlete-dashboard
   npm run dev
   ```



#API Documentation:

#Authentication Endpoints

 - Login
```http
POST /auth/login
Content-Type: application/x-www-form-urlencoded

username=admin&password=password123
```

Response:
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer"
}
```

#Athlete Endpoints

-Create Athlete
```http
POST /athletes/
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "string",
  "sport": "string",
  "age": 25
}
```

-Get All Athletes
```http
GET /athletes/
Authorization: Bearer <token>
Query Parameters:
  - skip: int (default: 0)
  - limit: int (default: 100)
```

-Get Athlete by ID
```http
GET /athletes/{athlete_id}
Authorization: Bearer <token>
```

-Update Athlete
```http
PUT /athletes/{athlete_id}
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "string",
  "sport": "string",
  "age": 25
}
```

-Delete Athlete
```http
DELETE /athletes/{athlete_id}
Authorization: Bearer <token>
```

#Performance Metrics Endpoints

-Add Performance Metric
```http
POST /metrics/
Content-Type: application/json
Authorization: Bearer <token>

{
  "metric_name": "string",
  "value": 0.0,
  "athlete_id": "string",
  "video_id": "string"
}
```

-Get Athlete Metrics
```http
GET /metrics/athlete/{athlete_id}
Authorization: Bearer <token>
```

#Video Endpoints

-Upload Video
```http
POST /videos/
Content-Type: multipart/form-data
Authorization: Bearer <token>

file: <video_file>
athlete_ids: ["string"]
```

-List All Videos
```http
GET //videos/
Authorization: Bearer <token>
```

#Dashboard Endpoints

-Get Dashboard Data
```http
GET /dashboard/
Authorization: Bearer <token>
Query Parameters:
  - sport: string (optional)
  - from_date: datetime (optional)
  - to_date: datetime (optional)
```


#Development

_Backend Development
- FastAPI provides automatic API documentation at `/docs` when running the server
- SQLite database is used for development and testing
- JWT authentication is implemented for secure endpoints

_Frontend Development
- React with TypeScript for type safety
- Vite for fast development and building
- Tailwind CSS for styling
- Context API for state management



#Testing

```bash
#Backend tests
cd Backend
pytest

#Frontend tests
cd Frontend/athlete-dashboard
npm test
```
