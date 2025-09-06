# Facebook Clone - Kiến Trúc Hệ Thống

## 1. Tổng Quan Dự Án

Facebook Clone là một ứng dụng mạng xã hội được xây dựng theo mô hình client-server, áp dụng các nguyên tắc OOP (Object-Oriented Programming) trong Java Backend.

### Tech Stack
- **Frontend**: ReactJS, Redux, TailwindCSS, Axios
- **Backend**: Java Spring Boot, JPA/Hibernate, MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: WebSocket (cho chat và notifications)
- **File Storage**: Local storage / Cloud (AWS S3)

## 2. Kiến Trúc Hệ Thống

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (ReactJS)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │   Auth   │  │   Feed   │  │ Profile  │  │  Chat  │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
└─────────────────────────────────────────────────────────┘
                            │
                     REST API │ WebSocket
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   Backend (Spring Boot)                  │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Controllers Layer                    │  │
│  │  UserController │ PostController │ ChatController│  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Services Layer                       │  │
│  │   UserService │ PostService │ NotificationService│  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Repository Layer                     │  │
│  │   UserRepo │ PostRepo │ CommentRepo │ LikeRepo   │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
              ┌────────────────────────┐
              │    MySQL Database      │
              └────────────────────────┘
```

## 3. Các Tính Năng Chính

### 3.1 Authentication & Authorization
- **Đăng ký**: Email, password, thông tin cá nhân
- **Đăng nhập**: Email/Username + Password
- **JWT Token**: Access token & Refresh token
- **Role-based access**: User, Admin

### 3.2 User Management
- **Profile**: Thông tin cá nhân, ảnh đại diện, ảnh bìa
- **Settings**: Privacy, notifications, account settings
- **Friends**: Add, remove, block friends
- **Follow/Unfollow**: Theo dõi người dùng khác

### 3.3 Posts & Feed
- **Create Post**: Text, images, videos, location, tags
- **News Feed**: Timeline với thuật toán sắp xếp
- **Interactions**: Like, comment, share
- **Privacy**: Public, friends, private

### 3.4 Social Features
- **Comments**: Nested comments, reactions
- **Likes**: Multiple reaction types (like, love, haha, wow, sad, angry)
- **Share**: Share posts với caption
- **Tags**: Tag friends trong posts và photos

### 3.5 Communication
- **Messenger**: Real-time chat
- **Notifications**: Real-time notifications
- **Groups**: Tạo và quản lý groups
- **Events**: Tạo events và mời friends

### 3.6 Media
- **Photos**: Albums, tags, comments
- **Videos**: Upload, stream, comments
- **Stories**: 24-hour stories

## 4. Database Schema

### Core Tables
```sql
-- Users
Users (
  id, email, username, password_hash, 
  first_name, last_name, birth_date, gender,
  profile_picture, cover_photo, bio,
  created_at, updated_at, last_login
)

-- Posts
Posts (
  id, user_id, content, privacy,
  location, created_at, updated_at
)

-- Comments
Comments (
  id, post_id, user_id, parent_comment_id,
  content, created_at, updated_at
)

-- Likes/Reactions
Reactions (
  id, user_id, target_id, target_type,
  reaction_type, created_at
)

-- Friendships
Friendships (
  id, user_id, friend_id, status,
  created_at, updated_at
)

-- Messages
Messages (
  id, sender_id, receiver_id, content,
  is_read, created_at
)

-- Groups
Groups (
  id, name, description, cover_photo,
  privacy, created_by, created_at
)

-- Notifications
Notifications (
  id, user_id, type, content, is_read,
  related_id, created_at
)
```

## 5. API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Đăng xuất

### Users
- `GET /api/users/{id}` - Get user profile
- `PUT /api/users/{id}` - Update profile
- `POST /api/users/{id}/avatar` - Upload avatar
- `GET /api/users/search` - Search users

### Posts
- `GET /api/posts/feed` - Get news feed
- `POST /api/posts` - Create post
- `GET /api/posts/{id}` - Get post details
- `PUT /api/posts/{id}` - Update post
- `DELETE /api/posts/{id}` - Delete post

### Interactions
- `POST /api/posts/{id}/like` - Like/React to post
- `POST /api/posts/{id}/comment` - Comment on post
- `POST /api/posts/{id}/share` - Share post

### Friends
- `GET /api/friends` - Get friends list
- `POST /api/friends/request` - Send friend request
- `PUT /api/friends/accept/{id}` - Accept request
- `DELETE /api/friends/{id}` - Remove friend

### Messages
- `GET /api/messages` - Get conversations
- `GET /api/messages/{userId}` - Get messages with user
- `POST /api/messages` - Send message

## 6. OOP Design Patterns

### Áp dụng trong Backend Java

#### 6.1 Singleton Pattern
- Database connection pool
- Configuration manager
- Cache manager

#### 6.2 Factory Pattern
- NotificationFactory (creates different notification types)
- PostFactory (creates different post types)

#### 6.3 Strategy Pattern
- Privacy strategies (Public, Friends, Private)
- Feed algorithm strategies

#### 6.4 Observer Pattern
- Real-time notifications
- WebSocket connections

#### 6.5 Decorator Pattern
- Post decorators (add media, location, tags)

#### 6.6 Repository Pattern
- Data access layer abstraction

## 7. Security Considerations

- **Password Security**: BCrypt hashing
- **SQL Injection**: Parameterized queries
- **XSS Protection**: Input sanitization
- **CSRF Protection**: CSRF tokens
- **Rate Limiting**: API rate limiting
- **File Upload**: File type validation, size limits
- **HTTPS**: SSL/TLS encryption

## 8. Performance Optimization

- **Caching**: Redis for session, feed cache
- **Pagination**: Lazy loading for feeds
- **Database Indexing**: Optimized queries
- **Image Optimization**: Thumbnail generation
- **CDN**: Static content delivery
- **Load Balancing**: Horizontal scaling

## 9. Development Phases

### Phase 1: Core Features (MVP)
- User registration/login
- Basic profile
- Create/view posts
- Simple likes/comments

### Phase 2: Social Features
- Friend system
- News feed algorithm
- Share functionality
- Notifications

### Phase 3: Communication
- Real-time chat
- Group functionality
- Events

### Phase 4: Advanced Features
- Stories
- Video support
- Advanced privacy settings
- Admin panel