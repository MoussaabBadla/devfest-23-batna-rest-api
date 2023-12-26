# wa9i3 API

Welcome to the wa9i3 API! This API is crafted for seamless integration between our Flutter app and another API that focuses on generating AI content. Its primary purpose is centered around creating notifications, saving data to MongoDB, and facilitating communication with our AI generation service.

## Prerequisites

Before diving in, make sure you have the following installed:

- Node.js (version x.x.x)
- npm (version x.x.x)
- MongoDB (optional, if your API uses a database)

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/MoussaabBadla/devfest-23-batna-rest-api.git
    ```

2. **Navigate to the project folder:**

    ```bash
    cd devfest-23-batna-rest-api
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the root of your project and add the necessary environment variables:

    ```env
    PORT=3000
     DB_URL=mongodb:
    JWT_SECRET=2974f6fa43135c355f596131d51cd996
    email=email
    emailpassword=app password
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    load_local = true | false
    save_local = true  | false
    api_url_1 = "url" 
    ```

5. **Start the server:**

    ```bash
    npm run dev
    ```

    Your API will be running at http://localhost:8080 by default.

## API Documentation

Explore the API through Swagger UI, available at:

[http://localhost:8080/api-docs](http://localhost:8080/api-docs)

## Main Use Cases

The primary functionalities of this API include:

- Creating notifications
- Saving data to MongoDB
- Serving as an intermediary between Flutter and other APIs for AI generation

## Flutter Integration

For Flutter integration, send a request with generation parameters, and the API will respond with the saved story. Your role is to save the received story in MongoDB and send it back to the API for further processing. Enjoy building amazing experiences with the wa9i3 API!
