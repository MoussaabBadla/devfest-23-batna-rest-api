# Sekai API

Welcome to the Sekai API! This API is designed for seamless integration between our Flutter application and another API that specializes in generating AI content. Its main functions revolve around creating notifications, storing data in MongoDB, and enabling communication with our AI generation service.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14.x.x)
- npm (version 6.x.x)
- MongoDB (optional, if your API uses a database)

## Getting Started

Follow these steps to set up the project:

1. Clone the repository:

git clone https://github.com/MoussaabBadla/devfest-23-batna-rest-api.git
Navigate to the project folder:

cd devfest-23-batna-rest-api
Install dependencies:

npm install
Set up environment variables:

Create a .env file in the root of your project and add the necessary environment variables:

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
Start the server:

npm run dev
Your API will be running at https://sekai-api.onrender.com by default.

## API Documentation
Explore the API through Swagger UI, available at:

https://sekai-api.onrender.com/api-docs

Main Use Cases
The primary functionalities of this API include:

connecting with our flutter app
Saving data to MongoDB
Serving as an intermediary between Flutter and other APIs for AI generation
Flutter Integration
For Flutter integration, send a request with generation parameters, and the API will respond with the saved story. Your role is to save the received story in MongoDB and send it back to the API for further processing. Enjoy building amazing experiences with the Sekai API!
