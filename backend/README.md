# Al-Tariq Physical Therapy Center Management System Backend

This backend is being built phase by phase using Node.js, Express.js, MongoDB, and Mongoose.

## Phase 1 scope

Phase 1 contains only the project foundation:

- project scripts and dependencies
- environment configuration
- Express application setup
- MongoDB connection helper
- centralized error handling
- not-found middleware
- health-check endpoint

## Health endpoint

```http
GET /api/v1/health
```

Authentication: not required  
Allowed roles: public health check for internal monitoring  
Request body: none

Example response:

```json
{
  "status": "success",
  "message": "Al-Tariq Physical Therapy API is healthy",
  "data": {
    "service": "al-tariq-physical-therapy-backend",
    "environment": "development",
    "timestamp": "2026-08-13T00:00:00.000Z"
  }
}
```

## Running locally

1. Copy `.env.example` to `.env`.
2. Fill in the required environment variables.
3. Install dependencies with `npm install`.
4. Start development mode with `npm run dev`.
