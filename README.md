# 📚 Book Review API

A RESTful Node.js + Express API for managing books, user authentication, reviews, and search functionality with JWT-based authentication and MySQL as the backend.

---

## 🚀 Features
- User Login with JWT Authentication
- Add, View Books
- Submit, Edit, and Delete Reviews (one per user per book)
- Pagination support for books and reviews
- Book search by title or author (partial & case-insensitive)

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT
- **Password Hashing**: bcrypt


📂 Folder Structure
- **controller/**       — All route controllers (login, register, books, reviews)  
- **repository/**       — DB connection file  
- **routes/**           — API route definitions  
- **service/**          — Middleware (e.g., authentication)  
- **.env**              — Environment variables  
- **.gitignore**        — Git ignore file  
- **README.md**         — Project documentation  
- **index.js**          — Entry point of the application  


📘 API Endpoints

📚 Books
| Method | Endpoint     | Description                                         | Auth |
| ------ | ------------ | --------------------------------------------------- | ---- |
| GET    | `/getAllBooks`     | Get all books (pagination + filter by author/genre) | ✅    |
| GET    | `/getBookById/:id` | Get a book by ID (with average rating + reviews)    | ✅    |
| POST   | `/addbook`     | Add a new book                                      | ✅    |


🔍 Search
| Method | Endpoint  | Description                     | Auth |
| ------ | --------- | ------------------------------- | ---- |
| GET    | `/search` | Search books by title or author | ✅    |


📝 Reviews
| Method | Endpoint             | Description                           | Auth |
| ------ | -------------------- | ------------------------------------- | ---- |
| POST   | `/submitReviewById/:id` | Submit a review (1 per user per book) | ✅    |
| PUT    | `/updateReviewById/:id`       | Update your own review                | ✅    |
| DELETE | `/deleteReviewById/:id`       | Delete your own review                | ✅    |


🔐 Auth
| Method | Endpoint    | Description                 |
| ------ | ----------- | --------------------------- |
| POST   | `/registerUser` | Register a new user         |
| POST   | `/login`    | User login to get JWT token |


## 🚀 How to Run

### 1. **Clone the repository**
```bash
git clone https://github.com/your-username/book-review-api.git
cd book-review-api
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Configure environment variables**
Create a `.env` file in the root directory with the following content (update credentials as needed):
```
JWT_SECRET="ADD_YOUR_JWT_SECRET"
HOST = "ADD_YOUR_HOST"
PORT = "ADD_YOUR_PORT"
USER = 'ADD_YOUR_USER'
PASSWORD = 'ADD_YOUR_PASSWORD'
DATABASE = "ADD_YOUR_DATABASE"
```

### 4. **Set up the MySQL database**
- Create a database:
```sql
CREATE DATABASE bookreview;
```

- Use the schema below to create the necessary tables:

## 🗃️ Database Schema
**Table: `users`**
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```
**Table: `books`**
```sql
CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  published_year INT,
  genre VARCHAR(100),
  user_id INT, -- foreign key (creator)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


```
**Table: `reviews`**
```sql
CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  book_id INT,
  user_id INT,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```
💡 You can execute these SQL statements to initialize your MySQL database for the Book Review API.


## 🔒 .gitignore
```
node_modules/
```
## API Curl Examples
🔐 Register a User
```
curl --location 'http://localhost:3000/registerUser' \
--header 'Content-Type: application/json' \
--data '{
    "userName": "Shivam",
    "password": "ldfkdslk"
}'
```

🔐 Login
```
curl --location 'http://localhost:3000/login' \
--header 'Content-Type: application/json' \
--data '{
    "userName": "Shivam",
    "password": "ldfkdslk"
}'


🔑 Response will include a JWT token like:
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTaGl2YW0iLCJpYXQiOjE3NDk5NjExMjgsImV4cCI6MTc0OTk2NDcyOH0.-i-T59gY69AdEZkfQV9mezo7y3GkNqS713n3YhEv038"
}

```
📚 Add a Book (Authenticated)
```
curl --location 'http://localhost:3000/addbook' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTaGl2YW0iLCJpYXQiOjE3NDk5NjEwNDAsImV4cCI6MTc0OTk2NDY0MH0.NDhF95NXi-cfNjB54b1eX4Vdwk2qjdS7ZdI4iumknBI' \
--header 'Content-Type: application/json' \
--data '{
  "title": "The ldfjlsdj",
  "author": "lkdfjlds",
  "published_year": 1250,
  "genre":"science"
}
'
````

📚 Get All Books (Authenticated)
```
curl --location 'http://localhost:3000/getAllBooks' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTaGl2YW0iLCJpYXQiOjE3NDk5NjEwNDAsImV4cCI6MTc0OTk2NDY0MH0.NDhF95NXi-cfNjB54b1eX4Vdwk2qjdS7ZdI4iumknBI'
```

📖 Get Book Details by ID with Reviews (Authenticated)
```
curl --location 'http://localhost:3000/getBookById/17' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTaGl2YW0iLCJpYXQiOjE3NDk5NjEwNDAsImV4cCI6MTc0OTk2NDY0MH0.NDhF95NXi-cfNjB54b1eX4Vdwk2qjdS7ZdI4iumknBI' \
--data ''
```

✍️ Submit a Review (Authenticated)
```
curl --location 'http://localhost:3000/submitReviewById/17' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTaGl2YW0iLCJpYXQiOjE3NDk5NjEwNDAsImV4cCI6MTc0OTk2NDY0MH0.NDhF95NXi-cfNjB54b1eX4Vdwk2qjdS7ZdI4iumknBI' \
--header 'Content-Type: application/json' \
--data '{
  "rating": 5,
  "comment": "Amazing book with great insight!"
}
'
```

✏️ Update Review (Authenticated)
```
curl --location --request PUT 'http://localhost:3000/updateReviewById/19' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTaGl2YW0iLCJpYXQiOjE3NDk5NjEwNDAsImV4cCI6MTc0OTk2NDY0MH0.NDhF95NXi-cfNjB54b1eX4Vdwk2qjdS7ZdI4iumknBI' \
--header 'Content-Type: application/json' \
--data '{
  "rating": 2,
  "comment": "Amazing !"
}
'
```

❌ Delete Review (Authenticated)
```
curl --location --request DELETE 'http://localhost:3000/deleteReviewById/19' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTaGl2YW0iLCJpYXQiOjE3NDk5NjEwNDAsImV4cCI6MTc0OTk2NDY0MH0.NDhF95NXi-cfNjB54b1eX4Vdwk2qjdS7ZdI4iumknBI'
```

🔍 Search Books by Title or Author (Authenticated)
```
curl --location 'http://localhost:3000/search?query=t' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTaGl2YW0iLCJpYXQiOjE3NDk5NjEwNDAsImV4cCI6MTc0OTk2NDY0MH0.NDhF95NXi-cfNjB54b1eX4Vdwk2qjdS7ZdI4iumknBI'
```
