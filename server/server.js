//sk_test_51Kf3HIB4EarYkjZK86h4KpsslHeNVmf54iqpAVNoOFPOlel7eyxsWkS8rR6MfRDxPfTYYQg2ISjCsiFzjVp3v2Ub005c8pOg9q
///coffee=price_1LyK6xB4EarYkjZK2UMDKfgI
//sunglasses=price_1LyK8DB4EarYkjZKHJswtgKD
///camera=price_1LyK8hB4EarYkjZKelv76JBZ
const express = require("express");
const cors = require("cors");
//intializing stripe Client for our account
const stripe = require("stripe")(
  "sk_test_51Kf3HIB4EarYkjZK86h4KpsslHeNVmf54iqpAVNoOFPOlel7eyxsWkS8rR6MfRDxPfTYYQg2ISjCsiFzjVp3v2Ub005c8pOg9q"
);
const app = express();
app.use(cors());
app.use(express.static("public"));

app.use(express.json());
app.post("/checkout", async (req, res) => {
  /*
getting data req.body.items
[
    {
        id:1,
        quantity:3
    }
]
stripe wants
[
    {
        price:1,
        quantity:3
    }
]
*/
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => {
  console.log("listing on port 4000");
});
