const express = require("express");
const router = express.Router();

router.get("/", (_, res) => {
  res.status(200).send({ response: "Server is up and running." });
});

module.exports = router;
