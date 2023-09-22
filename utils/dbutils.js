const mongoose = require("mongoose");

const initDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true, // Enable SSL/TLS
      tlsAllowInvalidCertificates: true, // Allow connections with invalid SSL certificates (for development)
    })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Database connection error:", error);
    });
};

const disconnectDB = () => {
  mongoose.disconnect();
  console.log("Database disconnected successfully");
};

module.exports = { initDB, disconnectDB };
