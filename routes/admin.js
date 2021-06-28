const express = require("express");
// const { body } = require("express-validator");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/orgs", adminController.getOrgs);

router.get("/org/:orgId", adminController.getOrg);

router.post("/create-org", adminController.createOrg);

router.put("/update-org", adminController.updateOrg);

router.delete("/org/:orgId", adminController.deleteOrg);

module.exports = router;
