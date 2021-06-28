const express = require("express");
// const { body } = require("express-validator");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/orgs", isAuth, adminController.getOrgs);

router.get("/org/:orgId", isAuth, adminController.getOrg);

router.post("/create-org", isAuth, adminController.createOrg);

router.put("/update-org", isAuth, adminController.updateOrg);

router.delete("/org/:orgId", isAuth, adminController.deleteOrg);

module.exports = router;
