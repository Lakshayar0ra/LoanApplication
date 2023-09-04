const express = require("express");
const { getBalanceSheet, getOutcome } = require("../controllers/api.controller");
const router = express.Router();

router.post("/getBalanceSheet", getBalanceSheet);
router.post("/getLoanOutcome", getOutcome);

module.exports = router;