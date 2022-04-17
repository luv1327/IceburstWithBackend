const express = require('express');
const app = express();
const Razorpay = require('razorpay');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const razorpay = new Razorpay({
  key_id: 'rzp_test_VirZ7ip2oBYPMX',
  key_secret: 'zZCYWtYZMuSjmoBKYhshgee1',
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.post('/order', (req, res) => {
  const { amount } = req.body;
  let options = {
    amount: amount * 100,
    currency: 'INR',
  };
  razorpay.orders.create(options, (err, order) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(order);
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
