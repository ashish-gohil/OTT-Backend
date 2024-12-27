# Movie API Project

This repository contains a RESTful API for managing a movie database. The project is built using **TypeScript**, **Node.js**, **Express.js**, **MongoDB** as the database, and **Redis** for caching. The API provides endpoints to perform CRUD operations on movies and includes a search functionality with caching for improved performance.

---

## Features

- **Database:** MongoDB is used for storing movie data.
- **Caching:** Redis is used to cache search results and improve response times.
- **TypeScript:** The project is written in TypeScript for better type safety and maintainability.
- **Endpoints:** Provides APIs for adding, updating, deleting, fetching, and searching movies.
- **Testing:** Includes Jest tests for all endpoints.

---

## Project Setup

Follow the steps below to set up and run the project locally:

### Prerequisites

1. **Install Node.js:** Make sure Node.js (v16 or later) is installed on your system.
2. **Install MongoDB:** Ensure MongoDB is installed and running locally or provide a connection URI.
3. **Install Redis:** Ensure Redis is installed and running locally.
4. **Install TypeScript:** TypeScript is required for development.

---
### Docker commands to set up and run MongoDB and Redis locally before running your Node.js project:

### Step 1: Run MongoDB Locally with Docker

```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
  mongo:latest
```

This command will:
- Start a MongoDB container in detached mode.
- Expose MongoDB on port `27017`.
- Set the root username as `admin` and password as `admin123`.

---

### Step 2: Run Redis Locally with Docker

```bash
docker run -d \
  --name redis \
  -p 6379:6379 \
  redis:latest
```

This command will:
- Start a Redis container in detached mode.
- Expose Redis on port `6379`.

---

### Step 3: Verify Running Containers

To ensure MongoDB and Redis are running, use the following command:

```bash
docker ps
```

You should see containers named `mongodb` and `redis` in the output.

---

### Step 4: Stop the Containers (Optional)

If you need to stop the MongoDB and Redis containers:

```bash
docker stop mongodb redis
```

To remove the containers after stopping:

```bash
docker rm mongodb redis
```

---

### Notes:
- Ensure your application’s `.env` file is configured correctly for the MongoDB URI and Redis connection. For example:
  ```plaintext
  MONGO_URI=mongodb://admin:admin123@localhost:27017/moviesdb?authSource=admin
  REDIS_HOST=localhost
  REDIS_PORT=6379
  ```
- Run the Docker commands above before executing the project startup commands (`npm install`, `npm run build`, `npm start`). This ensures the database and cache are operational before the Node.js app runs.


### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/ashish-gohil/OTT-Backend.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and provide the required configuration:
   ```env
   MONGO_URI=mongodb://admin:admin123@localhost:27017/moviesdb?authSource=admin
   ```

4. Build the project:
   ```bash
   npm run build
   ```
   
5. Seed data in database:
   ```bash
   npm run seed
   ```

6. Start the server:
   ```bash
   npm start
   ```

---

### Endpoints

#### Base URL: `http://localhost:3000`

1. **Get All Movies**
   - **GET** `/movies`
   - Response:
     ```json
     [
       {
         "_id": "123",
         "title": "Movie 1",
         "genre": "Action",
         "rating": 8.5,
         "streamingLink": "http://example.com/movie1"
       }
     ]
     ```

2. **Get Movies by Search**
   - **GET** `/search?q={query}`
   - Query Parameters:
     - `q` - Search keyword for title or genre.
   - Response:
     ```json
     [
       {
         "_id": "123",
         "title": "Movie 1",
         "genre": "Action",
         "rating": 8.5,
         "streamingLink": "http://example.com/movie1"
       }
     ]
     ```

3. **Add a Movie**
   - **POST** `/movies`
   - Request Body:
     ```json
     {
       "title": "Movie Title",
       "genre": "Genre",
       "rating": 7.5,
       "streamingLink": "http://example.com"
     }
     ```
   - Response:
     ```json
     {
       "message": "Movie added successfully",
       "movie": {
         "_id": "123",
         "title": "Movie Title",
         "genre": "Genre",
         "rating": 7.5,
         "streamingLink": "http://example.com"
       }
     }
     ```

4. **Update a Movie**
   - **PUT** `/movies/:id`
   - Request Body:
     ```json
     {
       "title": "Updated Title",
       "genre": "Updated Genre",
       "rating": 8.0,
       "streamingLink": "http://example.com"
     }
     ```
   - Response:
     ```json
     {
       "message": "Movie updated successfully",
       "movie": {
         "_id": "123",
         "title": "Updated Title",
         "genre": "Updated Genre",
         "rating": 8.0,
         "streamingLink": "http://example.com"
       }
     }
     ```

5. **Delete a Movie**
   - **DELETE** `/movies/:id`
   - Response:
     ```json
     {
       "message": "Movie deleted successfully",
       "movie": {
         "_id": "123",
         "title": "Movie Title",
         "genre": "Genre",
         "rating": 7.5,
         "streamingLink": "http://example.com"
       }
     }
     ```

---

### Development Scripts

- **Start development server:**
  ```bash
  npm run dev
  ```

- **Build project:**
  ```bash
  npm run build
  ```

- **Run tests:**
  ```bash
  npm test
  ```

---

## Project Structure

```
movie-api-project
├── src
│   ├── cache
│   │   └── redisCache.ts
│   ├── db
│   │   ├── connection.ts
│   │   └── models
│   │       └── moviesModel.ts
│   ├── controllers
│   │   └── moviesController.ts
│   ├── routes
│   │   └── moviesRoutes.ts
│   ├── tests
│   │   └── moviesController.test.ts
│   └── index.ts
├── .env
├── jest.config.js
├── package.json
└── tsconfig.json
```

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Open a pull request.

---

## License

This project is licensed under the MIT License.

