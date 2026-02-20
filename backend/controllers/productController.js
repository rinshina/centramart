import Brand from "../models/brandSchema.js";
import Category from "../models/categorySchema.js";
import Product from "../models/productSchema.js";

export const createProduct = async(req,res)=>{
    try{
        const {
            name,
            description,
            price,
            discountedPrice,
            brand,
            category,
            stock,
            images,
            tags,
        } = req.body;

        //basic validations
        if(!name || price == null || !description || !category || !brand)
            return res.status(400).json({message: "Required fields are missing"})
        if(price<0)
            return res.status(400).json({message: "Price cannot be negative"})
        if(discountedPrice!=null && discountedPrice>price){
            return res.status(400).json({message: "Discounted price cannot be greater than price"})
        }
        if(stock!=null && stock <0)
            return res.status(400).json({message: "Stock cannot be negative"})

        //checking if brand exists
        const brandExists=await Brand.findById(brand)

        if(!brandExists || !brandExists.isActive)
            return res.status(400).json({message: "Invalid or inactive brand"})
        // validate category existence
        const categoryExists = await Category.findById(category);
        if (!categoryExists || !categoryExists.isActive) {
          return res.status(400).json({ message: "Invalid or inactive category" });
        }

        const product = await Product.create({
            name,
            description,
            price,
            discountedPrice,
            brand,
            category,
            stock,
            images,
            tags,
        });

        return res.status(201).json(product);

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}