const Item = require("../models/item");
const asyncWrapper = require("../middleware/asyncWrapper");
const { createCustomAPIError } = require("../errors/customError");

const getItems = asyncWrapper(async (req, res) => {
  const items = await Item.find({});
  res.status(200).json({ items });
});

const getItem = asyncWrapper(async (req, res, next) => {
  const item = await Item.findOne({ _id: req.params.id });
  if (!item) {
    return next(createCustomAPIError("Item not found", 404));
  }
  res.status(200).json({ item });
});

const addItem = asyncWrapper(async (req, res, next) => {
  const item = await Item.create(req.body);
  res.status(201).json({ status: "success", item });
});

const updateItem = asyncWrapper(async (req, res, next) => {
  const item = await Item.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  console.log(item);
  if (!item) {
    return next(createCustomAPIError("Item not found", 404));
  }
  res.status(200).json({ item });
});

const removeItem = asyncWrapper(async (req, res, next) => {
  const item = await Item.findOneAndDelete({ _id: req.params.id });
  if (!item) {
    return next(createCustomAPIError("Item not found", 404));
  }
  res.status(204).json({ item });
});

module.exports = {
  getItems,
  getItem,
  addItem,
  updateItem,
  removeItem,
};
