import Brand from "../models/brandSchema.js";

export const createBrand = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Brand name & description is required" });
    }

    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      return res.status(400).json({ message: "Brand already exists" });
    }

    const brand = await Brand.create({
      name,
      description,
    });

    return res.status(201).json(brand);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getBrands=async (req,res)=>{
  try {
    const brands=await Brand.find({isActive:true}).select("name")
    res.json(brands)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}