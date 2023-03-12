require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require("./routes/user")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
const paymentRoutes = require("./routes/payment")

const app = express()

app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next(); // necesitamos next porque cualquier cosa .use es middleware, y necesita el next para seguir con el proximo
})

app.use("/api/product", productRoutes)
app.use("/api/user", userRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/payment", paymentRoutes)

// database connection
mongoose.connect(`${process.env.MONGO_URI}`)
  .then(() => {
    app.listen(8080, () => {
      console.log("Connected to DB and listening to port " + process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error);
  })
