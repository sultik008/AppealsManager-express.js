import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/route.js';

const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
app.use(express.json());
app.use(routes);
mongoose.connect('mongodb://127.0.0.1:27017/todo')
.then(() => {
    console.log('MongoDB connected');
})

