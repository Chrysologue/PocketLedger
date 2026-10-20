import 'dotenv/config';
import express from 'express';
import { Request, Response } from 'express';
import { connectToDB } from './config/db.js';
import userRoute from './routes/user.js';
import categoryRoute from './routes/category.js';

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/categories', categoryRoute);

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Welcome to Expense Tracker API' });
});

connectToDB()
  .then(() => {
    app.listen(port, () => {
      console.log('Listening on port', port);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
