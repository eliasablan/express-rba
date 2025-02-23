# rba-auth - Role-Based Authentication System

API authentication system with role-based access control using Bun runtime

## 🛠️ Core Technologies

- **Runtime**: Bun v1.2.2
- **Web Framework**: Express
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB with Mongoose ODM
- **Containerization**: Docker Compose

## 📥 Installation & Usage

Install dependencies:

```bash
bun install
```

Start server:

```bash
bun start
```

Development mode (with hot reload):

```bash
bun dev
```

## 🗄️ Database Configuration

The system uses MongoDB with Docker configuration:

```yaml:docker-compose.yml
services:
  mongo:
    image: mongo
    ports:
      - 27017:27017
    environment:
      MONGO_INITDB_ROOT_USERNAME: user
      MONGO_INITDB_ROOT_PASSWORD: password

  mongo-express:
    image: mongo-express
    ports:
      - 8081:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: user
      ME_CONFIG_MONGODB_ADMINPASSWORD: password
      ME_CONFIG_MONGODB_SERVER: mongo
      ME_CONFIG_BASICAUTH_USERNAME: admin-ui
      ME_CONFIG_BASICAUTH_PASSWORD: securepass123
    depends_on:
      - mongo
```

Start database and admin UI:

```bash
docker-compose up -d
```

Access MongoDB Express UI at: `http://localhost:8081` (credentials: admin-ui/securepass123)

Required environment variables (.env):

```env
MONGO_URI=mongodb://user:password@localhost:27017
JWT_SECRET=your_jwt_secret_here
```

## 🔐 Authentication System

`src/middlewares/authMiddleware.ts`

```typescript
// ... existing code ...
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // JWT verification logic
  // ... existing code ...
};
```

Workflow:

1. **Registration**:

```bash
POST /api/auth/register
Body: { "username": "admin", "password": "secret", "role": "admin" }
```

2. **Login**:

```bash
POST /api/auth/login
Body: { "username": "admin", "password": "secret" }
```

3. Access protected routes using the token in headers:

```bash
Authorization: Bearer <received_token>
```

## 👮 Access Policies

`src/middlewares/roleMiddleware.ts`

```typescript
// ... existing code ...
const authorizedRoles = (...allowedRoles: string[]) => {
  // Role validation logic
  // ... existing code ...
};
```

Available roles:

- **Admin**: Full access
- **Manager**: Administrative access
- **User**: Basic privileges

## 📍 Route Structure

Main routes in `src/index.ts`:

```typescript
// ... existing code ...
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
```

Protected endpoints:

- `GET /api/users/admin` - Admin only
- `GET /api/users/manager` - Admin & managers
- `GET /api/users/user` - All authenticated roles

## ⚙️ Environment Variables

| Variable   | Description                 | Required |
| ---------- | --------------------------- | -------- |
| MONGO_URI  | MongoDB connection URL      | Yes      |
| JWT_SECRET | JWT signing key             | Yes      |
| PORT       | Server port (default: 7002) | No       |

## 🚨 Error Handling

Centralized error system returns:

- 401: Unauthenticated (invalid/missing token)
- 403: Forbidden (insufficient privileges)
- 500: Internal server error

## 📋 Usage Examples

Get authentication token:

```bash
curl -X POST http://localhost:7002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"secret"}'
```

Access admin route:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:7002/api/users/admin
```

## 🧩 Project Structure

```
src/
├── config/       # Database configuration
├── controllers/  # Endpoint logic
├── middlewares/  # Auth & role validation
├── models/       # MongoDB schemas
├── routes/       # Route definitions
└── index.ts      # Main entry point
```

## 🔄 Key Features

- Password hashing with `Bun.password.hash()`
- JWT token expiration (1 hour)
- Type-safe Express routes
- MongoDB connection pooling
- Dockerized database setup
