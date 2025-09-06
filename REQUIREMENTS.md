# Facebook Clone - Yêu Cầu Chi Tiết

## 1. Yêu Cầu Chức Năng (Functional Requirements)

### 1.1 Quản Lý Người Dùng

#### Đăng Ký
- Người dùng có thể đăng ký với email và mật khẩu
- Yêu cầu thông tin: Họ, Tên, Ngày sinh, Giới tính
- Xác thực email (optional cho MVP)
- Kiểm tra email/username đã tồn tại

#### Đăng Nhập/Đăng Xuất
- Đăng nhập bằng email/username và password
- Remember me functionality
- Quên mật khẩu (reset via email)
- Session management với JWT

#### Profile Management
- Xem và chỉnh sửa thông tin cá nhân
- Upload và thay đổi ảnh đại diện
- Upload và thay đổi ảnh bìa
- Cập nhật bio/status
- Thông tin: Nơi làm việc, học vấn, nơi sống

### 1.2 Bài Viết (Posts)

#### Tạo Bài Viết
- Đăng text status
- Upload nhiều ảnh (max 10)
- Upload video (max 100MB)
- Check-in location
- Tag friends
- Chọn privacy (Public/Friends/Private)
- Emoji và formatting

#### Quản Lý Bài Viết
- Chỉnh sửa bài viết của mình
- Xóa bài viết của mình
- Ẩn/hiện bài viết
- Pin/Unpin bài viết quan trọng

#### Tương Tác Bài Viết
- Like với 6 reactions (Like, Love, Haha, Wow, Sad, Angry)
- Comment (support nested comments)
- Share bài viết (với caption mới)
- Save/Bookmark bài viết

### 1.3 Bạn Bè (Friends)

#### Friend Requests
- Gửi lời mời kết bạn
- Chấp nhận/từ chối lời mời
- Hủy lời mời đã gửi
- Xem danh sách lời mời

#### Friend Management
- Xem danh sách bạn bè
- Unfriend
- Block/Unblock người dùng
- Theo dõi/Bỏ theo dõi

#### Friend Suggestions
- Gợi ý bạn bè (mutual friends)
- People you may know

### 1.4 News Feed

#### Timeline
- Hiển thị bài viết từ bạn bè
- Sắp xếp theo thời gian hoặc thuật toán
- Infinite scroll/Pagination
- Pull to refresh

#### Filtering
- Lọc theo loại bài viết (ảnh, video, text)
- Ẩn bài viết không muốn xem
- Ưu tiên bài viết từ close friends

### 1.5 Nhắn Tin (Messenger)

#### Chat Features
- Chat 1-1 real-time
- Gửi text, emoji, stickers
- Gửi ảnh/file
- Seen status
- Typing indicator
- Online/Offline status

#### Conversation Management
- Xem lịch sử chat
- Tìm kiếm trong conversation
- Delete messages
- Archive conversations

### 1.6 Thông Báo (Notifications)

#### Notification Types
- Friend requests
- Likes/Reactions on posts
- Comments on posts
- Mentions in posts/comments
- Birthday reminders
- Event invitations

#### Notification Settings
- Enable/Disable notification types
- Email notifications
- Push notifications (web)
- Mark as read/unread

### 1.7 Tìm Kiếm (Search)

- Tìm kiếm users
- Tìm kiếm posts
- Tìm kiếm trong groups
- Search history
- Search filters

### 1.8 Groups (Optional)

#### Group Management
- Tạo group (Public/Private)
- Join/Leave group
- Invite members
- Admin/Moderator roles

#### Group Features
- Post trong group
- Group rules
- Pin posts
- Group events

## 2. Yêu Cầu Phi Chức Năng (Non-Functional Requirements)

### 2.1 Performance
- Page load time < 3 seconds
- API response time < 500ms
- Support 1000+ concurrent users
- Smooth scrolling với lazy loading

### 2.2 Security
- Mã hóa password (BCrypt)
- HTTPS cho tất cả connections
- Rate limiting cho API
- Input validation
- XSS và SQL injection protection

### 2.3 Usability
- Responsive design (Mobile, Tablet, Desktop)
- Intuitive UI/UX
- Accessibility standards (WCAG 2.1)
- Multi-language support (VN/EN)

### 2.4 Reliability
- 99.9% uptime
- Data backup định kỳ
- Error handling và logging
- Graceful degradation

### 2.5 Scalability
- Horizontal scaling capability
- Microservices architecture ready
- CDN cho static content
- Database sharding ready

## 3. Yêu Cầu Kỹ Thuật

### 3.1 Frontend
- ReactJS 18+
- Redux/Context API cho state management
- React Router cho navigation
- Axios cho API calls
- TailwindCSS cho styling
- Socket.io client cho real-time

### 3.2 Backend
- Java 11+ với Spring Boot 2.7+
- Spring Security cho authentication
- JPA/Hibernate cho ORM
- MySQL 8.0+ database
- WebSocket cho real-time
- JWT cho authentication

### 3.3 Development Tools
- Git cho version control
- Maven/Gradle cho build management
- Docker cho containerization
- Postman cho API testing
- Jest/JUnit cho unit testing

## 4. User Stories

### Epic 1: User Authentication
```
As a new user
I want to create an account
So that I can use the social network

As a registered user
I want to log in securely
So that I can access my account
```

### Epic 2: Social Interaction
```
As a user
I want to create and share posts
So that I can express myself

As a user
I want to interact with others' posts
So that I can engage with the community
```

### Epic 3: Friend Connections
```
As a user
I want to connect with friends
So that I can build my network

As a user
I want to control my friend list
So that I can manage my connections
```

### Epic 4: Communication
```
As a user
I want to chat with friends
So that I can communicate privately

As a user
I want to receive notifications
So that I stay updated
```

## 5. Acceptance Criteria

### User Registration
- ✓ Email must be valid format
- ✓ Password minimum 8 characters
- ✓ All required fields must be filled
- ✓ Success message after registration
- ✓ Auto-login after registration

### Post Creation
- ✓ Post must have content or media
- ✓ Character limit 5000 for text
- ✓ Support multiple image upload
- ✓ Show loading state during upload
- ✓ Success feedback after posting

### Friend System
- ✓ Can't send duplicate requests
- ✓ Can't friend yourself
- ✓ Notification on friend request
- ✓ Update UI after accept/reject
- ✓ Show mutual friends count

## 6. MVP Scope (Phase 1)

### Must Have
- User registration/login
- Basic profile
- Create text/image posts
- View news feed
- Like and comment
- Friend requests
- Basic search

### Nice to Have
- Real-time chat
- Video posts
- Stories
- Groups
- Events
- Advanced privacy

### Won't Have (Phase 1)
- Video calls
- Marketplace
- Gaming
- Dating features
- Ads system