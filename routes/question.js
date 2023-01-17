const express = require("express");

const router = express.Router();

const questionController = require("../controllers/questions_controller");

router.post("/create", questionController.create);
router.post("/:id/options/create", questionController.createOption);
router.get("/:id", questionController.viewQuestion);
router.get("/:id/delete", questionController.deleteQuestion);

module.exports = router;
