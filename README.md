# ☕ Coffee Shop Demo Application

A full-stack web application demonstrating modern web development practices using .NET Core and Angular. This project showcases enterprise-level architecture patterns, authentication systems, and containerized deployment.

🌐 **Live Demo:** [coffee.andylile.com](https://coffee.andylile.com)

## 📋 Overview & Skills Demonstrated

This application is a comprehensive demonstration of full-stack development capabilities, implementing:

- **RESTful API Development** with .NET Core 9
- **Enterprise Architecture Patterns** including Repository Pattern
- **Authentication & Authorization** using JWT tokens
- **Database Management** with Entity Framework Core 
- **Modern Frontend Development** with Angular and TypeScript
- **Client-Side State Management** with custom service architecture
- **Containerization** with Docker and Docker Compose
- **Production Deployment** with Nginx reverse proxy and SSL

## ✨ Current Features

### 🔐 User Management
- User registration and login with JWT authentication
- Secure password handling and validation
- Role-based access control (Customer/Employee roles planned)

### 🍕 Menu System
- Dynamic menu item display with pricing
- Categorized menu items (Coffee, Tea, Snacks)
- Backend validation for menu items and pricing

### 🛒 Order Management
- Client-side shopping cart service
- Order creation with automatic total calculation
- Backend order validation and persistence
- Order confirmation system

### 🔧 Technical Features
- Comprehensive input validation and error handling
- Custom exception middleware for API error management
- Database seeding with sample data
- Swagger API documentation
- CORS configuration for cross-origin requests

## 🛠️ Tech Stack

### Backend (.NET Core API)
- **Framework:** .NET Core 8/9, ASP.NET Core Web API
- **Database:** Entity Framework Core with SQLite
- **Authentication:** JWT Bearer tokens
- **Architecture:** Repository Pattern, Dependency Injection
- **Documentation:** Swagger/OpenAPI
- **Validation:** Custom DTOs with model validation

### Frontend (Angular)
- **Framework:** Angular with TypeScript
- **State Management:** Custom service-based architecture
- **HTTP Client:** Angular HttpClient with interceptors
- **Styling:** Modern CSS with responsive design
- **Build System:** Angular CLI with production optimization

### DevOps & Deployment
- **Containerization:** Docker with multi-stage builds
- **Orchestration:** Docker Compose
- **Web Server:** Nginx with SSL termination
- **Database:** SQLite with automatic migrations
- **Environment:** Production deployment with custom domain

## 🏗️ Project Structure

```
├── API/                          # .NET Core Web API
│   ├── Controllers/              # API endpoints
│   ├── Data/                     # Entity Framework context and repositories
│   ├── DTOs/                     # Data Transfer Objects
│   ├── Entities/                 # Database models
│   ├── Interfaces/               # Service contracts
│   ├── Services/                 # Business logic implementation
│   ├── Middleware/               # Custom middleware
│   └── Extensions/               # Extension methods
├── client/                       # Angular frontend application
│   ├── src/app/                  # Angular application code
│   ├── src/core/                 # Core services and interceptors
│   ├── src/features/             # Feature modules
│   ├── src/shared/               # Shared components
│   └── src/types/                # TypeScript type definitions
└── docker-compose.yml            # Container orchestration
```

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose
- Git

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ajlile98/dotnet-coffee-shop.git
   cd dotnet-coffee-shop
   ```

2. **Set up SSL certificates (for HTTPS):**
   ```bash
   # Create SSL directory and add your certificates
   mkdir ssl
   # Place your localhost.crt and localhost.key files in the ssl directory
   ```

3. **Start the application:**
   ```bash
   docker-compose up --build
   ```

4. **Access the application:**
   - **Frontend:** http://localhost (redirects to https://localhost)
   - **API:** http://localhost:5001
   - **API Documentation:** http://localhost:5001/swagger

### Development URLs
- **Angular Dev Server:** http://localhost:4200
- **API Swagger UI:** http://localhost:5001/swagger
- **Database:** SQLite database automatically created and seeded

## 📈 Work in Progress - Upcoming Features

### 🚧 Currently Implementing
- **Menu Management System:** CRUD operations for menu items with price updates
- **Employee Order Queue:** Real-time order management for staff
- **Admin Configuration:** Role assignment and system administration

### 📋 Planned Enhancements
- Order status tracking (Pending → In Progress → Ready)
- Customer order history
- Email notifications for order updates
- Advanced reporting and analytics
- Mobile-responsive design improvements

## 🏭 Production Deployment

The application is containerized and deployed using:
- **Docker multi-stage builds** for optimized production images
- **Nginx reverse proxy** with SSL termination
- **Custom domain** with proper SSL certificate management
- **Environment-specific configurations** for development and production

## 📝 API Documentation

When running locally, visit http://localhost:5001/swagger to explore the API endpoints with interactive documentation.

---

**Note:** This is a demonstration project showcasing modern web development practices and is continuously being enhanced with new features and improvements.