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
        console.log("QUERY PARAMS:", req.query);
        const {page=1, limit=12, brand, category, search, minPrice, maxPrice, sort, isActive}=req.query
        const query={}
        //filter by brand
        if(brand){
            const brandIds=brand.split(",")
            query.brand={$in:brandIds}
        }
        //filter by category
        if (category) {
          const categoryIds = category.split(",");
          query.category = { $in: categoryIds };
        }
        //search
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }
        // Price filter
        if (minPrice || maxPrice) {
          query.discountedPrice = {};
          if (minPrice) query.discountedPrice.$gte = Number(minPrice);
          if (maxPrice) query.discountedPrice.$lte = Number(maxPrice);
        }

        //sort options
        let sortOptions={createdAt:-1}
        if(sort=="price-low") sortOptions={discountedPrice:1}
        if(sort=="price-high") sortOptions={discountedPrice:-1}
        if(sort=="name") sortOptions={name:1}
        if(sort=="rating") sortOptions={rating:1}

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
        .sort(sortOptions)
        .skip((pageNumber-1)*pageSize)
        .limit(pageSize)

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

export const getSingleProduct=async(req,res)=>{
    try {
        const {id}=req.params
        const product=await Product.findById(id)
        .populate('brand', 'name')
        .populate('category', 'name')
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateProduct=async(req,res)=>{
    try {
        const {id}=req.params
        const updates=req.body
        const product=await Product.findById(id)
        if(!product){
            return res.status(404).json({message:"Product not found"})
        }
        const allowedFields = [
          "name",
          "description",
          "price",
          "discountedPrice",
          "brand",
          "category",
          "stock",
          "images",
          "tags",
          "isActive",
        ];

        const filteredUpdates = {};

        for (let key of allowedFields) {
          if (updates[key] !== undefined) {
            filteredUpdates[key] = updates[key];
          }
        }
        //validate price logic
        if(filteredUpdates.price!=null && filteredUpdates.price<0 && filteredUpdates.discountedPrice!=null && filteredUpdates.discountedPrice>filteredUpdates.price){
            return res.status(400).json({message:"Price cannot be negative"})
        }
        // Validate brand if changed
        if (filteredUpdates.brand) {
            const brandExists = await Brand.findById(filteredUpdates.brand);
            if (!brandExists || !brandExists.isActive) {
                return res.status(400).json({ message: "Invalid brand" });
            }
        }
        // Validate category if changed
        if (filteredUpdates.category) {
            const categoryExists = await Category.findById(filteredUpdates.category);
            if (!categoryExists || !categoryExists.isActive) {
                return res.status(400).json({ message: "Invalid category" });
            }
        }
        const updatedProduct=await Product.findByIdAndUpdate(id, filteredUpdates, {new:true})
        .populate('brand', 'name')
        .populate('category', 'name')
        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }

}

export const deleteProduct=async(req,res)=>{
    try {
        const {id}=req.params
        const product=await Product.findById(id)
        if(!product){
            return res.status(404).json({message:"Product not found"})
        }
        product.isActive=false
        await product.save()
        return res.status(200).json({ message: "Product deactivated" });
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}