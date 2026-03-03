import Category from "../models/categorySchema.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Category name & description is required" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name,
      description,
    });

    return res.status(201).json(category);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .select("name");

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};