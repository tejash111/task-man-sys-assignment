# Zod Validation Documentation

## Overview
This project uses Zod for runtime type validation on all API endpoints to ensure data integrity and provide clear error messages.

## Validation Structure

### 1. Authentication Validation (`validators/authValidator.js`)

#### Register Schema
```javascript
{
  name: string (2-50 chars, trimmed),
  email: string (valid email, lowercase, trimmed),
  password: string (6-100 chars)
}
```

#### Login Schema
```javascript
{
  email: string (valid email, lowercase, trimmed),
  password: string (required)
}
```

### 2. Task Validation (`validators/taskValidator.js`)

#### Create Task Schema
```javascript
{
  title: string (required, 1-200 chars, trimmed),
  description: string (optional, max 1000 chars),
  priority: enum ['Low', 'Medium', 'High'] (required),
  status: enum ['Todo', 'In Progress', 'Completed'] (default: 'Todo'),
  dueDate: string (optional, ISO 8601 or YYYY-MM-DD format)
}
```

#### Update Task Schema
- All fields are optional
- At least one field must be provided
- Same validation rules as create schema

#### Task ID Schema
```javascript
{
  id: string (24-character hex MongoDB ObjectId)
}
```

## Validation Middleware

The `validate` middleware (`middleware/validate.js`) can validate three sources:
- **body** (default) - Request body data
- **params** - URL parameters
- **query** - Query string parameters

### Usage Example
```javascript
route.post("/tasks", protect, validate(createTaskSchema), createTask);
route.get("/tasks/:id", protect, validate(taskIdSchema, 'params'), getSingleTask);
```

## Error Response Format

When validation fails, the API returns:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

## Protected Routes with Validation

### Auth Routes
- `POST /api/auth/register` - Validates: registerSchema (body)
- `POST /api/auth/login` - Validates: loginSchema (body)

### Task Routes
- `POST /api/tasks` - Validates: createTaskSchema (body)
- `GET /api/tasks/:id` - Validates: taskIdSchema (params)
- `PUT /api/tasks/:id` - Validates: taskIdSchema (params) + updateTaskSchema (body)
- `DELETE /api/tasks/:id` - Validates: taskIdSchema (params)

## Benefits

1. **Type Safety**: Ensures data matches expected structure
2. **Clear Errors**: Provides detailed validation error messages
3. **Data Sanitization**: Trims strings, converts emails to lowercase
4. **Security**: Prevents invalid data from reaching database
5. **Documentation**: Schemas serve as living documentation

## Testing Validation

### Valid Request
```bash
POST /api/tasks
{
  "title": "Complete project",
  "description": "Finish the task management system",
  "priority": "High",
  "status": "Todo",
  "dueDate": "2025-12-31"
}
```

### Invalid Request (triggers validation)
```bash
POST /api/tasks
{
  "title": "",
  "priority": "Invalid",
  "dueDate": "not-a-date"
}
```

Response:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    },
    {
      "field": "priority",
      "message": "Priority must be Low, Medium, or High"
    },
    {
      "field": "dueDate",
      "message": "Invalid date format (use YYYY-MM-DD or ISO 8601)"
    }
  ]
}
```
