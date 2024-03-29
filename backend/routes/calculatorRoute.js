const express = require('express');
const {isAuthenticatedUser} = require("../middleware/auth");
const { newCalculate, getAllCalculates, updateCalculate, deleteCalculate } = require('../controllers/calculatorController');
const router = express.Router();

// router.route("/calculate/new").post(isAuthenticatedUser, newCalculate);
// router.route("/calculates").get(isAuthenticatedUser, getAllCalculates);
// router.route("/calculates/:id").post(isAuthenticatedUser, updateCalculate);
// router.route("/calculates/:id").delete(isAuthenticatedUser, deleteCalculate);

router.route("/calculate/new").post(newCalculate);
router.route("/calculates").get(getAllCalculates);
router.route("/calculates/:id").post(updateCalculate);
router.route("/calculates/:id").delete(deleteCalculate);

module.exports = router;