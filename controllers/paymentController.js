const { catchAsync } = require("../utils/catchAsync");
const stripe = require("stripe")(
  "sk_test_51NgrsnL2Qmt08zd2DADyH10Ikqt8VJW0rJJnwtHHw7Yh57T6513Y4DWH68NybYlgcP2YwNKEq6xE10fZy5NTaIWA00gAFCLlcE"
);

const createPaymentIntent = catchAsync(async (req, res) => {
  const { price } = req.body;
  const amount = parseFloat(price) * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = { createPaymentIntent };
