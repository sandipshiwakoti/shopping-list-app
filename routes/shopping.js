const express = require("express");
const router = express.Router();
const {
  getItems,
  getItem,
  addItem,
  updateItem,
  removeItem,
} = require("../controllers/shopping");

router.route("/").get(getItems).post(addItem);
router.route("/:id").get(getItem).patch(updateItem).delete(removeItem);

module.exports = router;
