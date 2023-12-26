import express from 'express';
import cors from 'cors';
import ConnectDB from './src/config/db.js';
import AuthRoutes from './src/routes/AuthRoutes.js';
import UserRoutes from './src/routes/UserRoutes.js';
import StoryRoutes from './src/routes/StoryRoutes.js';
import PodcastRoutes from './src/routes/PodcastRoutes.js'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import fcmTokenRoutes from './src/routes/firebaseTokensRoute.js';


const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "*",
    exposedHeaders: "*",
    credentials: true,
  })
);

app.use(express.json());


app.use('/auth',AuthRoutes );
app.use('/fcmToken',fcmTokenRoutes);
app.use('/users',UserRoutes)
app.use('/stories',StoryRoutes)
app.use('/podcasts',PodcastRoutes)
app.get('/', (req, res) => {
    res.send('wa9i3 Rest API');
}
);

const PORT = process.env.PORT || 8080;
ConnectDB();
const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "wa9i3 Rest Api Docs",
        version: "0.1.0",
        description:
          "This is The API for wa9i3 made with Express and documented with Swagger",
      },
      components:{
        secritySchemas:{
            bearerAuth:{
                type:"http",
                schema: 'bearer',
                bearerFormat:"JWT",
            }
        },
        security:[{
            bearerAuth:[],
        }]
      },
      servers: [
        {
          url: "http://localhost:8080",
        },
      ],
    },
    apis: ["./src/routes/*.js","src/schema/*.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
app.listen(PORT, () =>
    console.log(`wa9i3 app listening on port ${PORT}!`),
);


