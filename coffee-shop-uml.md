# Coffee Shop UML Diagram

## Table of Contents
1. [Entity Relationship Diagram](#entity-relationship-diagram) - Database schema and relationships
2. [Domain Entities](#domain-entities) - Core business objects and models
3. [Data Access Layer](#data-access-layer) - Repositories and DbContext
4. [Business Logic Layer](#business-logic-layer) - Services and interfaces
5. [Presentation Layer](#presentation-layer) - Controllers and API endpoints
6. [Data Transfer Objects (DTOs)](#data-transfer-objects-dtos) - API request/response models
7. [Architecture Overview](#architecture-overview) - Full-stack application architecture
8. [Key Features & Patterns](#key-features--patterns) - Implementation details

---

## Entity Relationship Diagram

```mermaid
erDiagram
    %% Identity Framework Entities
    IdentityUser ||--|| AppUser : extends
    IdentityRole ||--o{ AppUser : "has roles"
    
    %% Core Entities
    AppUser {
        string Id PK
        string DisplayName
        string Email
        string ImageUrl "nullable"
        string RefreshToken "nullable"
        DateTime RefreshTokenExpiry "nullable"
        string UserName
        string PasswordHash
        bool EmailConfirmed
        string PhoneNumber "nullable"
    }
    
    MenuItem {
        string Id PK
        string Name
        decimal Price
        int ItemPhotoId FK "nullable"
    }
    
    Photo {
        int Id PK
        string Url
        string PublicId "nullable"
    }
    
    Order {
        int Id PK
        string UserId FK
        DateTime Created
        DateTime Completed "nullable"
        OrderStatus Status
        decimal TotalAmount "computed"
    }
    
    OrderItem {
        int Id PK
        int OrderId FK
        string MenuItemId FK
        int Quantity
        decimal PriceAtTime
    }
    
    %% Relationships
    AppUser ||--o{ Order : places
    Order ||--o{ OrderItem : contains
    MenuItem ||--o{ OrderItem : ordered_as
    MenuItem ||--o| Photo : has_photo
    
    %% Enums
    OrderStatus {
        Pending
        Confirmed
        Preparing
        Ready
        Completed
        Cancelled
    }
```

## Domain Entities

Core business objects that represent the application's data model.

```mermaid
classDiagram
    %% ASP.NET Identity Classes
    class IdentityUser {
        <<framework>>
        +string Id
        +string UserName
        +string Email
        +string PasswordHash
        +bool EmailConfirmed
        +string PhoneNumber
    }
    
    class IdentityRole {
        <<framework>>
        +string Id
        +string Name
        +string NormalizedName
    }
    
    %% Domain Entities
    class AppUser {
        +string DisplayName
        +string? ImageUrl
        +string? RefreshToken
        +DateTime? RefreshTokenExpiry
        +ToDto(ITokenService) UserDto
    }
    
    class MenuItem {
        +string Id
        +string Name
        +decimal Price
        +Photo? ItemPhoto
    }
    
    class Photo {
        +int Id
        +string Url
        +string? PublicId
    }
    
    class Order {
        +int Id
        +List~OrderItem~ OrderItems
        +DateTime Created
        +DateTime? Completed
        +OrderStatus Status
        +string UserId
        +AppUser User
        +decimal TotalAmount
    }
    
    class OrderItem {
        +int Id
        +int OrderId
        +Order Order
        +string MenuItemId
        +MenuItem MenuItem
        +int Quantity
        +decimal PriceAtTime
    }
    
    class OrderStatus {
        <<enumeration>>
        Pending
        Confirmed
        Preparing
        Ready
        Completed
        Cancelled
    }
    
    %% Relationships
    IdentityUser <|-- AppUser
    AppUser "1" --> "*" Order
    Order "1" --> "*" OrderItem
    MenuItem "1" --> "*" OrderItem
    MenuItem "1" --> "0..1" Photo
    Order --> OrderStatus
```

## Data Access Layer

Repository pattern implementation and Entity Framework DbContext for database operations.

```mermaid
classDiagram
    class AppDbContext {
        <<Entity Framework>>
        +DbSet~AppUser~ Users
        +DbSet~MenuItem~ MenuItems
        +DbSet~Order~ Orders
        +DbSet~OrderItem~ OrderItems
        +DbSet~Photo~ Photos
        +OnModelCreating(ModelBuilder) void
    }
    
    class UserManager {
        <<Identity Framework>>
        +CreateAsync(AppUser, string) Task~IdentityResult~
        +FindByEmailAsync(string) Task~AppUser?~
        +CheckPasswordAsync(AppUser, string) Task~bool~
        +AddToRoleAsync(AppUser, string) Task~IdentityResult~
        +UpdateAsync(AppUser) Task~IdentityResult~
    }
    
    class SignInManager {
        <<Identity Framework>>
        +SignInAsync(AppUser, bool) Task
        +SignOutAsync() Task
        +CheckPasswordSignInAsync(AppUser, string, bool) Task~SignInResult~
    }
    
    %% Relationships
    AppDbContext --> AppUser
    AppDbContext --> MenuItem
    AppDbContext --> Order
    AppDbContext --> OrderItem
    AppDbContext --> Photo
    UserManager --> AppUser
    SignInManager --> AppUser
```

## Business Logic Layer

Services and interfaces that implement business logic and domain operations.

```mermaid
classDiagram
    class ITokenService {
        <<interface>>
        +CreateToken(AppUser) Task~string~
    }
    
    class TokenService {
        -SymmetricSecurityKey key
        -UserManager~AppUser~ userManager
        +CreateToken(AppUser) Task~string~
    }
    
    class Seed {
        <<static>>
        +SeedUsers(UserManager~AppUser~) Task
        +SeedMenuItems(AppDbContext) Task
    }
    
    class ExceptionMiddleware {
        -RequestDelegate next
        -ILogger logger
        -IHostEnvironment env
        +InvokeAsync(HttpContext) Task
    }
    
    class AppUserExtensions {
        <<static>>
        +ToDto(AppUser, ITokenService) Task~UserDto~
    }
    
    class ClaimsPrincipalExtensions {
        <<static>>
        +GetUserId(ClaimsPrincipal) string
        +GetUserEmail(ClaimsPrincipal) string
    }
    
    %% Relationships
    ITokenService <|.. TokenService
    TokenService --> UserManager
    Seed --> UserManager
    Seed --> AppDbContext
    AppUserExtensions --> ITokenService
```

## Presentation Layer

Controllers that handle HTTP requests and coordinate between the presentation and business layers.

```mermaid
classDiagram
    class BaseApiController {
        <<abstract>>
    }
    
    class AccountController {
        -UserManager~AppUser~ userManager
        -ITokenService tokenService
        +Register(RegisterDto) Task~ActionResult~UserDto~~
        +Login(LoginDto) Task~ActionResult~UserDto~~
        +RefreshToken() Task~ActionResult~UserDto~~
        +GetCurrentUser() Task~ActionResult~UserDto~~
    }
    
    class MenuItemsController {
        -AppDbContext context
        +GetMenuItems() Task~ActionResult~List~MenuItem~~~
        +GetMenuItem(string) Task~ActionResult~MenuItem~~
        +CreateMenuItem(MenuItemCreationDto) Task~ActionResult~MenuItem~~
        +UpdateMenuItem(string, MenuItemCreationDto) Task~ActionResult~
        +DeleteMenuItem(string) Task~ActionResult~
    }
    
    class OrderController {
        -AppDbContext context
        +CreateOrder(OrderCreationDto) Task~ActionResult~Order~~
        +GetOrders() Task~ActionResult~List~Order~~~
        +GetOrderById(int) Task~ActionResult~Order~~
        +UpdateOrderStatus(int, OrderStatus) Task~ActionResult~
    }
    
    class UsersController {
        -UserManager~AppUser~ userManager
        +GetUsers() Task~ActionResult~IEnumerable~AppUser~~~
        +GetUser(string) Task~ActionResult~AppUser~~
    }
    
    class AdminController {
        -UserManager~AppUser~ userManager
        +GetUsersWithRoles() Task~ActionResult~
        +EditRoles(string, string) Task~ActionResult~
    }
    
    %% Relationships
    BaseApiController <|-- AccountController
    BaseApiController <|-- MenuItemsController
    BaseApiController <|-- OrderController
    BaseApiController <|-- UsersController
    BaseApiController <|-- AdminController
    
    AccountController --> UserManager
    AccountController --> ITokenService
    MenuItemsController --> AppDbContext
    OrderController --> AppDbContext
    UsersController --> UserManager
    AdminController --> UserManager
```

## Data Transfer Objects (DTOs)

```mermaid
classDiagram
    %% Authentication DTOs
    class UserDto {
        +string Id
        +string Email
        +string DisplayName
        +string? ImageUrl
        +string Token
    }
    
    class RegisterDto {
        +string DisplayName
        +string Email
        +string Password
    }
    
    class LoginDto {
        +string Email
        +string Password
    }
    
    %% Order DTOs
    class OrderCreationDto {
        +string UserId
        +List~OrderItemDto~ OrderItems
    }
    
    class OrderItemDto {
        +string MenuItemId
        +int Quantity
    }
    
    class OrderDto {
        +int Id
        +List~OrderItemDto~ OrderItems
        +DateTime Created
        +DateTime? Completed
        +OrderStatus Status
        +decimal TotalAmount
    }
    
    %% Menu Item DTOs
    class MenuItemCreationDto {
        +string Name
        +decimal Price
    }
    
    class SeedMenuItemDto {
        +string Id
        +string Name
        +decimal Price
    }
    
    %% User Seed DTO
    class SeedUserDto {
        +string Id
        +string Email
        +DateOnly DateOfBirth
        +string? ImageUrl
        +string DisplayName
        +DateTime Created
        +DateTime LastActive
        +string Gender
        +string? Description
        +string City
        +string Country
    }
    
    %% DTO Relationships
    OrderCreationDto "1" --> "*" OrderItemDto
    OrderDto "1" --> "*" OrderItemDto
```

## Architecture Overview

```mermaid
graph TB
    %% Frontend Layer
    subgraph "Frontend (Angular)"
        A[Angular Client]
        A1[Components]
        A2[Services]
        A3[Types/Models]
    end
    
    %% API Layer
    subgraph "API Layer (.NET Core)"
        B[Controllers]
        B1[Account Controller]
        B2[Menu Items Controller] 
        B3[Order Controller]
        B4[Admin Controller]
    end
    
    %% Service Layer
    subgraph "Business Logic Layer"
        C[Services]
        C1[Token Service]
        C2[User Repository]
        D[Middleware]
        D1[Exception Middleware]
        D2[JWT Authentication]
    end
    
    %% Data Layer
    subgraph "Data Layer"
        E[Entity Framework Core]
        E1[App DbContext]
        E2[Identity DbContext]
        F[(SQLite Database)]
    end
    
    %% External Services
    subgraph "External"
        G[JWT Tokens]
        H[Swagger/OpenAPI]
    end
    
    %% Connections
    A --> B
    A2 --> A1
    A3 --> A2
    
    B1 --> C1
    B2 --> E1
    B3 --> E1
    B --> D1
    B --> D2
    
    C2 --> E1
    C1 --> G
    
    E1 --> E2
    E --> F
    
    B --> H
    
    %% Styling
    classDef frontend fill:#e1f5fe
    classDef api fill:#f3e5f5
    classDef business fill:#e8f5e8
    classDef data fill:#fff3e0
    classDef external fill:#fce4ec
    
    class A,A1,A2,A3 frontend
    class B,B1,B2,B3,B4 api
    class C,C1,C2,D,D1,D2 business
    class E,E1,E2,F data
    class G,H external
```

## Key Features & Patterns

### 1. **Authentication & Authorization**
- ASP.NET Core Identity integration
- JWT token-based authentication
- Role-based authorization (Customer, Employee, Admin)
- Refresh token support

### 2. **Entity Framework Patterns**
- Code-First approach with migrations
- Foreign key + Navigation property pattern
- Repository pattern implementation
- DbContext inheritance from IdentityDbContext

### 3. **API Design Patterns**
- RESTful API endpoints
- DTO (Data Transfer Object) pattern
- Controller inheritance from BaseApiController
- Swagger/OpenAPI documentation

### 4. **Domain Model**
- Rich domain entities with computed properties (TotalAmount)
- Enum usage for type safety (OrderStatus)
- Proper entity relationships and foreign keys
- Photo entity for file management

### 5. **Cross-Cutting Concerns**
- Global exception handling middleware
- CORS configuration for Angular client
- JSON serialization configuration
- Reference cycle handling