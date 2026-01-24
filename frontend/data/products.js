const products = [
  // Laptops
  {
    id: 1,
    title: "MacBook Air 13\" M4",
    category: "laptops",
    brand: "Apple",
    price: 3599.99,
    oldPrice: 3999.00,
    rating: 5,
    reviews: 35,
    image: "assets/products/laptops/Apple MacBook Air (2025) 13-inch M4 chip with 10-core CPU and 8-core .png"
  },
  {
    id: 2,
    title: "Lenovo IdeaPad Slim 3 i7",
    category: "laptops",
    brand: "Lenovo",
    price: 1999.99,
    oldPrice: 2499.00,
    rating: 5,
    reviews: 65,
    image: "assets/products/laptops/Lenovo IdeaPad Slim 3 15IRH10 Intel Core i7-13620H 16GB RAM 512GB.png"
  },
  {
    id: 3,
    title: "Asus Vivobook 14 i7",
    category: "laptops",
    brand: "Asus",
    price: 2499.99,
    oldPrice: 2899.00,
    rating: 5,
    reviews: 115,
    image: "assets/products/laptops/Asus Vivobook 14 Intel Core i7-1355U 16GB RAM 1TB SSD Intel Iris Xe.png"
  },
  {
    id: 4,
    title: "HP OmniBook 5 Flip 2-in-1",
    category: "laptops",
    brand: "HP",
    price: 1599.99,
    oldPrice: 1899.00,
    rating: 4,
    reviews: 82,
    image: "assets/products/laptops/HP OmniBook 5 Flip 2-in-1 Intel Core 5-120U 16GB RAM 512GB SSD Intel Graphics 14 inch 2K Windows 11 Home Convertible Laptop - Glacier Silver [14-fp0035ne+BUN].png"
  },
  {
    id: 5,
    title: "Dell Inspiron 14 Plus i7",
    category: "laptops",
    brand: "Dell",
    price: 2299.99,
    oldPrice: 2699.00,
    rating: 5,
    reviews: 54,
    image: "assets/products/laptops/Dell-Inspiron-14-Plus-7441-Laptop1.png"
  },
  {
    id: 6,
    title: "HP Victus 16 i7 RTX 4060",
    category: "laptops",
    brand: "HP",
    price: 2999.99,
    oldPrice: 3499.00,
    rating: 5,
    reviews: 76,
    image: "assets/products/laptops/HP Victus 16 Intel Core i7-13700H 16GB RAM 1TB SSD RTX 4060.png"
  },
  {
    id: 7,
    title: "MSI Modern 15 i5",
    category: "laptops",
    brand: "MSI",
    price: 1499.99,
    oldPrice: 1799.00,
    rating: 4,
    reviews: 29,
    image: "assets/products/laptops/MSI Modern 15 Intel Core i5-12450H 16GB RAM 512GB SSD.png"
  },

  // Mobiles
  {
    id: 8,
    title: "Apple iPhone Air Smartphone Sky Blue 256GB",
    category: "mobiles",
    brand: "Apple",
    price: 3699,
    oldPrice: 4399,
    rating: 5,
    reviews: 45,
    image: "assets/products/mobiles/Apple iPhone Air Smartphone, Sky Blue, 256 GB.png"
  },
  {
    id: 9,
    title: "Apple iPhone 17 Pro Deep Blue 256GB",
    category: "mobiles",
    brand: "Apple",
    price: 4299,
    oldPrice: 4699,
    rating: 5,
    reviews: 38,
    image: "assets/products/mobiles/Apple iPhone 17 Pro Smartphone, Deep Blue, 256 GB.png"
  },
  {
    id: 10,
    title: "Samsung Galaxy S24 Ultra 5G Black 256GB",
    category: "mobiles",
    brand: "Samsung",
    price: 2899,
    oldPrice: 3739,
    rating: 4,
    reviews: 52,
    image: "assets/products/mobiles/Samsung Galaxy S24 Ultra 5G Smartphone, Black, 256 GB.png"
  },
  {
    id: 11,
    title: "Samsung Galaxy S25 Ultra 5G Titanium Black 512GB",
    category: "mobiles",
    brand: "Samsung",
    price: 2149,
    oldPrice: 2599,
    rating: 5,
    reviews: 67,
    image: "assets/products/mobiles/Samsung Galaxy S25 Ultra 5G Titanium Black 512GB.png"
  },
  {
    id: 12,
    title: "Samsung Galaxy Z Fold7 5G 12GB Blue Shadow 512GB",
    category: "mobiles",
    brand: "Samsung",
    price: 7649,
    oldPrice: 8099,
    rating: 5,
    reviews: 43,
    image: "assets/products/mobiles/Samsung Galaxy Z Fold7 5G Smartphone 12GB, Blue Shadow, 512 GB.png"
  },
  {
    id: 13,
    title: "Honor Magic 8 Pro 5G 12GB Sunrise Gold 512GB",
    category: "mobiles",
    brand: "Honor",
    price: 3699,
    oldPrice: 3999,
    rating: 5,
    reviews: 76,
    image: "assets/products/mobiles/Honor Magic 8 Pro 5G Smartphone 12GB RAM, Sunrise Gold, 512 GB.png"
  },

  // Grooming
  {
    id: 14,
    title: "Wahl Pure Confidence Lady Grooming Kit",
    category: "grooming",
    brand: "Wahl",
    price: 200.00,
    oldPrice: 289.00,
    rating: 5,
    reviews: 124,
    image: "assets/products/personal-care/Wahl Pure Confidence Lady Grooming Kit (09865-127).png"
  },
  {
    id: 15,
    title: "Beurer Multigroomer for Beard Hair and Body",
    category: "grooming",
    brand: "Beurer",
    price: 199.99,
    oldPrice: 249.00,
    rating: 5,
    reviews: 96,
    image: "assets/products/personal-care/Beurer Multigroomer for Beard, Hair, and Body Trimming.png"
  },
  {
    id: 16,
    title: "Ducati Grooming Kit GK 818 Race",
    category: "grooming",
    brand: "Ducati",
    price: 269.99,
    oldPrice: 289.00,
    rating: 4,
    reviews: 210,
    image: "assets/products/personal-care/Ducati Grooming Kit GK 818 Race.png"
  },
  {
    id: 17,
    title: "Beurer IPL Hair Removal Device Cool Pro",
    category: "grooming",
    brand: "Beurer",
    price: 949.99,
    oldPrice: 1219.00,
    rating: 4,
    reviews: 88,
    image: "assets/products/personal-care/Beurer IPL Long-Lasting Hair Removal Device – Cool Pro.png"
  },
  {
    id: 18,
    title: "PHILIPS Epilator Series 8000 Wet & Dry",
    category: "grooming",
    brand: "Philips",
    price: 199.99,
    oldPrice: 239.00,
    rating: 5,
    reviews: 142,
    image: "assets/products/personal-care/PHILIPS Epilator Series 8000 Wet & Dry Epilator, White (PHI-BRE720).png"
  },

  // Home Appliances
  {
    id: 19,
    title: "Samsung Front Load Washer Dryer",
    category: "home-appliances",
    brand: "Samsung",
    price: 2899.99,
    rating: 5,
    reviews: 35,
    image: "assets/products/Samsung Front Load Washer Dryer.webp"
  },
  {
    id: 20,
    title: "Dyson V10 Absolute Vacuum Cleaner",
    category: "home-appliances",
    brand: "Dyson",
    price: 1299.99,
    oldPrice: 1599.00,
    rating: 5,
    reviews: 89,
    image: "assets/products/Dyson V10 Absolute vacuum cleaner (SV27 V10 ABS (NEW 2022)).webp"
  }
];