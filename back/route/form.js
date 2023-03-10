const { get_form_field, add_form_field, getName } = require("../controller/form");
const isAdmin = require("../middleware/admin");
const authenticate = require("../middleware/auth");

const router = require("express").Router();

router.get("/", get_form_field);

router.get("/:id", getName);

router.post("/", authenticate, isAdmin, add_form_field)

module.exports = router;
