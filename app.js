import express from 'express';
import cors from 'cors';
import ConnectDB from './src/config/db.js';
import AuthRoutes from './src/routes/AuthRoutes.js';
import UserRoutes from './src/routes/UserRoutes.js';



const app = express();

app.use(cors(
    {
        origin : "*"
    }
));

app.use(express.json());


app.use('/auth',AuthRoutes );

app.use('/users',UserRoutes)
app.get('/', (req, res) => {
    res.send('frely Rest API');
}
);

const PORT = process.env.PORT || 8080;
ConnectDB();
app.listen(PORT, () =>
    console.log(`DEVFESTAPP app listening on port ${PORT}!`),
);





