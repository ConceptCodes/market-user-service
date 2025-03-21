# Market User Service

This service is responsible for managing user profiles for the Market application. It provides endpoints to create and retrieve user information.

> ⚠️ **Work In Progress**: This service is currently under active development and not ready for production use. Features may change and some functionality might be incomplete.

## Architecture

```mermaid

```

## Prerequisites
- [Node.js](https://nodejs.org)
- [Docker](https://docker.com)
- [Bun](https://bun.sh)

## Features

## Technologies
- [Node.js](https://nodejs.org)
- [Bun](https://bun.sh)
- [Express.js](https://expressjs.com)
- [PostgreSQL](https://postgresql.org)
- [Drizzle](https://drizzle.org)

## Setup
1. Clone the repository

```bash
git clone https://github.com/conceptcodes/market-user-service.git
```

2. Install dependencies

```bash
bun install
```

3. Environment Setup
```bash
cp .env.example .env
```


3. Run the application

```bash
bun run docker
```

4. Access the application on `http://localhost:8000`

## API Endpoints

### Health Check

```
GET /api/health/alive
```
```json
{
  "message": "PONG",
}
```

### Get User Profile

```
POST /api/user/:userId
```
```json
{
  "data": {
    "email": "",
    "firstName": "",
    "lastName": "",
    "phoneNumber": "",
  },
  "message": "User profile retrieved successfully",
}
```

### Create User

```
POST /api/user 
 -d '{
    "email": "",
    "firstName": "",
    "lastName": "",
    "phoneNumber": "",
  }'
```
```json
{
  "message": "User created successfully",
}
```

### Update User

```
PUT /api/user/:userId 
 -d '{
    "email": "",
    "firstName": "",
    "lastName": "",
    "phoneNumber": "",
  }'
```
```json
{
  "message": "User updated successfully",
}
```

## Delete User

```
DELETE /api/user/:userId
```
```json
{
  "message": "User deleted successfully",
}
```

## Roadmap
- [ ] Unit Testing
- [ ] Database Sessions