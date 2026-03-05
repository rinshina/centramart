import mongoose from "mongoose";

const specificationSchema = new mongoose.Schema(
  {
    warranty: {
      type: String,
      trim: true,
      default: "",
    },
    dimensions: {
      type: String,
      trim: true,
      default: "",
    },
    wattage: {
      type: String,
      trim: true,
      default: "",
    },
    speed: {
      type: String,
      trim: true,
      default: "",
    },
    capacity: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountedPrice: {
      type: Number,
      min: 0,
      default: 0,
      validate: {
        validator: function (value) {
          return value <= this.price;
        },
        message: "Discounted price cannot be greater than price",
      },
    },

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
      index: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    images: [
      {
        type: String,
        trim: true,
      },
    ],

    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    highlights: [
      {
        type: String,
        trim: true,
      },
    ],

    specifications: {
      type: specificationSchema,
      default: () => ({}),
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;