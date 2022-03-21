import express from 'express';
import cors from 'cors';
import router from './router';

const app = express();
app.use(cors())
app.use(express.json());
app.use(router);


//app.get('/', (req, res) => res.send('Hello World!'));


app.listen(3001, () => console.log('listening on port 3001'));