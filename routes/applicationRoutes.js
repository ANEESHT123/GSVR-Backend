const express = require("express");
const { applyJob } = require("../controllers/applicationController");
const upload = require("../middleware/multerConfig");

const router = express.Router();

router.post("/apply", upload.single("resume"), applyJob);

module.exports = router;
