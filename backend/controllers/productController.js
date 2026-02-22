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
export const getProducts=async(req,res)=>{
    try {
        const {page=1, limit=20, brand, category, isActive}=req.query
        const query={}
        //filter by brand
        if(brand)
            query.brand=brand
        //filter by category
        if(category)
            query.category=category
        //filter by active status
        if(isActive!=undefined)
            query.isActive=isActive==='true'
        else
            query.isActive=true//default is active products only
        const pageNumber=Number(page)
        const pageSize=Number(limit)

        const total=await Product.countDocuments(query)
        const products=await Product.find(query)
        .populate('brand','name')
        .populate('category','name')
        .skip((pageNumber-1)*pageSize)
        .limit(pageSize)
        .sort({createdAt:-1})

        return res.json({
            totalProducts:total,
            currentPage: pageNumber,
            totalPages: Math.ceil(total/pageSize),
            products,
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}