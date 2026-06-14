# Cloud Blog API

A RESTful Blog API built with Node.js, Express.js, MongoDB Atlas, and Mongoose. This project demonstrates CRUD operations, database relationships using references, and data population with MongoDB.

Render link:https://cloud-blog-api-edkt.onrender.com

Vedio link:
---

## Features

* Create Users
* Create Posts
* Get All Posts
* Get Single Post
* Delete Post
* Get All Posts by Author
* Populate Author Details
* Top 3 Most Recent Posts
* MongoDB Atlas Cloud Database
* Environment Variable Security

---

## Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* dotenv
* Postman

---

## Project Structure

```bash
project/
│
├── models/
│   ├── User.js
│   └── Post.js
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate to the project directory:

```bash
cd cloud-blog-api
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

---

## Run the Server

Development Mode:

```bash
npm run dev
```

Production Mode:

```bash
node server.js
```

Server will run at:

```bash
http://localhost:5000
```

---

## API Endpoints

### Home Route

```http
GET /
```

Response:

```json
{
  "message": "MongoDB API Running"
}
```

---

### Create User

```http
POST /users
```

Request Body:

```json
{
  "name": "Aryan",
  "email": "aryan@gmail.com"
}
```

---

### Create Post

```http
POST /posts
```

Request Body:

```json
{
  "title": "MongoDB Atlas",
  "content": "Learning MongoDB Relationships",
  "authorId": "USER_ID"
}
```

---

### Get All Posts

```http
GET /posts
```

Returns all posts with populated author details.

---

### Get Single Post

```http
GET /posts/:id
```

Returns a specific post.

---

### Delete Post

```http
DELETE /posts/:id
```

Deletes a post by ID.

---

### Get Posts by Author

```http
GET /users/:userId/posts
```

Returns all posts created by a specific author.

---

### Top 3 Most Recent Posts

```http
GET /posts/recent/top3
```

Returns the latest three posts sorted by creation date.

---

## MongoDB Relationship

User Schema:

```javascript
{
  name: String,
  email: String
}
```

Post Schema:

```javascript
{
  title: String,
  content: String,
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}
```

Using populate():

```javascript
Post.find().populate("authorId", "name email");
```

---

## Testing

Use Postman to test all endpoints.

Recommended Flow:

1. Create User
2. Copy User ID
3. Create Post
4. Get All Posts
5. Get Posts by Author
6. Delete Post
7. Verify Data in MongoDB Atlas

---

## Deployment

Recommended Platforms:

* Render
* Railway

Do not expose your MongoDB credentials publicly.

Store all secrets inside `.env`.

---

## Learning Outcomes

* MongoDB Atlas Setup
* Mongoose ODM
* Schema Design
* CRUD Operations
* ObjectId References
* Populate Method
* Environment Variables
* REST API Development

---

## Author

Aryan 

Sprint 10 – Fullstack Developer Track
Node.js + Express + MongoDB Atlas
