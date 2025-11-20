const express = require("express");
const router = express.Router();
const { getReferrals, createReferral, updateReferral, deleteReferral } = require("../controllers/referralController");

router.get("/", getReferrals);
router.post("/", createReferral);
router.put("/:id", updateReferral);
router.delete("/:id", deleteReferral);

module.exports = router;
