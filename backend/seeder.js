import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import Brand from "./models/brandSchema.js";
import Category from "./models/categorySchema.js";
import Product from "./models/productSchema.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await Brand.deleteMany();
    await Category.deleteMany();

    const brands = await Brand.insertMany([
      { name: "Apple", description: "Premium electronics" },
      { name: "Samsung", description: "Tech brand" },
      { name: "Nike", description: "Sports brand" },
    ]);

    const categories = await Category.insertMany([
      { name: "Smartphones" },
      { name: "Laptops" },
      { name: "Shoes" },
    ]);

    const products = [];

    for (let i = 1; i <= 30; i++) {
      products.push({
        name: `Product ${i}`,
        description: `Description ${i}`,
        price: 1000 + i * 10,
        discountedPrice: 900 + i * 5,
        brand: brands[i % brands.length]._id,
        category: categories[i % categories.length]._id,
        stock: 10 + i,
        isActive: i % 2 === 0, // half active, half inactive
      });
    }

    await Product.insertMany(products);

    console.log("Database seeded");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
