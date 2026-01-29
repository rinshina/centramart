const products = [
  // Laptops
  {
    id: 1,
    title: "Apple MacBook Air M4 13-inch",
    category: "laptops",
    brand: "Apple",
    price: 3599.99,
    oldPrice: 3999.00,
    rating: 5,
    reviews: 35,
    image: "../assets/products/laptops/Apple MacBook Air (2025) 13-inch M4 chip with 10-core CPU and 8-core .png"
  },
  {
    id: 2,
    title: "Acer Aspire 7 Intel Core i7-12650H 16GB RAM 512GB SSD",
    category: "laptops",
    brand: "Acer",
    price: 1899.99,
    oldPrice: 2199.00,
    rating: 4,
    reviews: 42,
    image: "../assets/products/laptops/Acer Aspire 7 Intel Core i7-12650H 16GB RAM 512GB SSD.png"
  },
  {
    id: 3,
    title: "Asus Vivobook 14 Intel Core i7-1355U 16GB RAM 1TB SSD",
    category: "laptops",
    brand: "Asus",
    price: 2499.99,
    oldPrice: 2899.00,
    rating: 5,
    reviews: 115,
    image: "../assets/products/laptops/Asus Vivobook 14 Intel Core i7-1355U 16GB RAM 1TB SSD Intel Iris Xe.png"
  },
  {
    id: 4,
    title: "Dell Inspiron 14 Plus 7441 Laptop",
    category: "laptops",
    brand: "Dell",
    price: 2299.99,
    oldPrice: 2699.00,
    rating: 5,
    reviews: 54,
    image: "../assets/products/laptops/Dell-Inspiron-14-Plus-7441-Laptop1.png"
  },
  {
    id: 5,
    title: "HP OmniBook 5 Flip 2-in-1 Intel Core 5-120U 16GB RAM 512GB SSD",
    category: "laptops",
    brand: "HP",
    price: 1599.99,
    oldPrice: 1899.00,
    rating: 4,
    reviews: 82,
    image: "../assets/products/laptops/HP OmniBook 5 Flip 2-in-1 Intel Core 5-120U 16GB RAM 512GB SSD Intel Graphics 14 inch 2K Windows 11 Home Convertible Laptop - Glacier Silver [14-fp0035ne+BUN].png"
  },
  {
    id: 6,
    title: "HP Victus 16 Intel Core i7-13700H 16GB RAM 1TB SSD RTX 4060",
    category: "laptops",
    brand: "HP",
    price: 2999.99,
    oldPrice: 3499.00,
    rating: 5,
    reviews: 76,
    image: "../assets/products/laptops/HP Victus 16 Intel Core i7-13700H 16GB RAM 1TB SSD RTX 4060.png"
  },
  {
    id: 7,
    title: "Lenovo IdeaPad Slim 3 15IRH10 Intel Core i7-13620H 16GB RAM 512GB",
    category: "laptops",
    brand: "Lenovo",
    price: 1999.99,
    oldPrice: 2499.00,
    rating: 5,
    reviews: 65,
    image: "../assets/products/laptops/Lenovo IdeaPad Slim 3 15IRH10 Intel Core i7-13620H 16GB RAM 512GB.png"
  },
  {
    id: 8,
    title: "MSI Modern 15 Intel Core i5-12450H 16GB RAM 512GB SSD",
    category: "laptops",
    brand: "MSI",
    price: 1499.99,
    oldPrice: 1799.00,
    rating: 4,
    reviews: 29,
    image: "../assets/products/laptops/MSI Modern 15 Intel Core i5-12450H 16GB RAM 512GB SSD.png"
  },

  // Mobiles
  {
    id: 9,
    title: "Apple iPhone 17 Pro Smartphone Deep Blue 256GB",
    category: "mobiles",
    brand: "Apple",
    price: 4299.99,
    oldPrice: 4699.00,
    rating: 5,
    reviews: 38,
    image: "../assets/products/mobiles/Apple iPhone 17 Pro Smartphone, Deep Blue, 256 GB.png"
  },
  {
    id: 10,
    title: "Apple iPhone Air Smartphone Sky Blue 256GB",
    category: "mobiles",
    brand: "Apple",
    price: 3699.99,
    oldPrice: 4399.00,
    rating: 5,
    reviews: 45,
    image: "../assets/products/mobiles/Apple iPhone Air Smartphone, Sky Blue, 256 GB.png"
  },
  {
    id: 11,
    title: "Honor Magic 8 Pro 5G Smartphone 12GB RAM Sunrise Gold 512GB",
    category: "mobiles",
    brand: "Honor",
    price: 3699.99,
    oldPrice: 3999.00,
    rating: 5,
    reviews: 76,
    image: "../assets/products/mobiles/Honor Magic 8 Pro 5G Smartphone 12GB RAM, Sunrise Gold, 512 GB.png"
  },
  {
    id: 12,
    title: "Samsung Galaxy S24 Ultra 5G Smartphone Black 256GB",
    category: "mobiles",
    brand: "Samsung",
    price: 2899.99,
    oldPrice: 3739.00,
    rating: 4,
    reviews: 52,
    image: "../assets/products/mobiles/Samsung Galaxy S24 Ultra 5G Smartphone, Black, 256 GB.png"
  },
  {
    id: 13,
    title: "Samsung Galaxy S25 Ultra 5G Titanium Black 512GB",
    category: "mobiles",
    brand: "Samsung",
    price: 2149.99,
    oldPrice: 2599.00,
    rating: 5,
    reviews: 67,
    image: "../assets/products/mobiles/Samsung Galaxy S25 Ultra 5G Titanium Black 512GB.png"
  },
  {
    id: 14,
    title: "Samsung Galaxy Z Flip7 FE 5G Smartphone 8GB",
    category: "mobiles",
    brand: "Samsung",
    price: 1899.99,
    oldPrice: 2299.00,
    rating: 4,
    reviews: 33,
    image: "../assets/products/mobiles/Samsung Galaxy Z Flip7 FE 5G Smartphone 8GB.png"
  },
  {
    id: 15,
    title: "Samsung Galaxy Z Fold7 5G Smartphone 12GB Blue Shadow 512GB",
    category: "mobiles",
    brand: "Samsung",
    price: 7649.99,
    oldPrice: 8099.00,
    rating: 5,
    reviews: 43,
    image: "../assets/products/mobiles/Samsung Galaxy Z Fold7 5G Smartphone 12GB, Blue Shadow, 512 GB.png"
  },

  // Personal Care
  {
    id: 16,
    title: "Beurer IPL Long-Lasting Hair Removal Device Cool Pro",
    category: "personal-care",
    brand: "Beurer",
    price: 949.99,
    oldPrice: 1219.00,
    rating: 4,
    reviews: 88,
    image: "../assets/products/personal-care/Beurer IPL Long-Lasting Hair Removal Device – Cool Pro.png"
  },
  {
    id: 17,
    title: "Beurer IPL Long-Lasting Hair Removal Device Pure Skin Pro",
    category: "personal-care",
    brand: "Beurer",
    price: 899.99,
    oldPrice: 1149.00,
    rating: 4,
    reviews: 72,
    image: "../assets/products/personal-care/Beurer IPL Long-Lasting Hair Removal Device – Pure Skin Pro.png"
  },
  {
    id: 18,
    title: "Beurer Lady Shaver for Gentle and Precise Hair Removal (HL36)",
    category: "personal-care",
    brand: "Beurer",
    price: 149.99,
    oldPrice: 189.00,
    rating: 4,
    reviews: 56,
    image: "../assets/products/personal-care/Beurer Lady Shaver for Gentle and Precise Hair Removal (HL36).png"
  },
  {
    id: 19,
    title: "Beurer Multigroomer for Beard Hair and Body Trimming",
    category: "personal-care",
    brand: "Beurer",
    price: 199.99,
    oldPrice: 249.00,
    rating: 5,
    reviews: 96,
    image: "../assets/products/personal-care/Beurer Multigroomer for Beard, Hair, and Body Trimming.png"
  },
  {
    id: 20,
    title: "Ducati Grooming Kit GK 818 Race",
    category: "personal-care",
    brand: "Ducati",
    price: 269.99,
    oldPrice: 289.00,
    rating: 4,
    reviews: 210,
    image: "../assets/products/personal-care/Ducati Grooming Kit GK 818 Race.png"
  },
  {
    id: 21,
    title: "PHILIPS Epilator Series 8000 Wet & Dry Epilator White",
    category: "personal-care",
    brand: "Philips",
    price: 199.99,
    oldPrice: 239.00,
    rating: 5,
    reviews: 142,
    image: "../assets/products/personal-care/PHILIPS Epilator Series 8000 Wet & Dry Epilator, White (PHI-BRE720).png"
  },
  {
    id: 22,
    title: "Wahl 3-in-1 Body Hair Remover",
    category: "personal-care",
    brand: "Wahl",
    price: 179.99,
    oldPrice: 219.00,
    rating: 4,
    reviews: 89,
    image: "../assets/products/personal-care/Wahl 3-in-1 Body Hair Remover (09685-4027).png"
  },
  {
    id: 23,
    title: "Wahl Pure Confidence Lady Grooming Kit",
    category: "personal-care",
    brand: "Wahl",
    price: 200.00,
    oldPrice: 289.00,
    rating: 5,
    reviews: 124,
    image: "../assets/products/personal-care/Wahl Pure Confidence Lady Grooming Kit (09865-127).png"
  },

  // Other Products
  {
    id: 24,
    title: "Canon EOS 1500D DSLR Camera",
    category: "cameras",
    brand: "Canon",
    price: 899.99,
    oldPrice: 1199.00,
    rating: 5,
    reviews: 67,
    image: "../assets/products/Canon EOS 1500D DSLR .png"
  },
  {
    id: 25,
    title: "Dyson V10 Absolute Vacuum Cleaner",
    category: "home-appliances",
    brand: "Dyson",
    price: 1299.99,
    oldPrice: 1599.00,
    rating: 5,
    reviews: 89,
    image: "../assets/products/Dyson V10 Absolute vacuum cleaner (SV27 V10 ABS (NEW 2022)).webp"
  },
  {
    id: 26,
    title: "Hisense Side by Side Smart Refrigerator Inox",
    category: "home-appliances",
    brand: "Hisense",
    price: 2499.99,
    oldPrice: 2899.00,
    rating: 4,
    reviews: 45,
    image: "../assets/products/Hisense Side by Side Smart Refrigerator - Inox (RS9P819GTB).webp"
  },
  {
    id: 27,
    title: "iPhone 17 Pro Silver Terra Cotta Silicone Case",
    category: "accessories",
    brand: "Apple",
    price: 79.99,
    oldPrice: 99.00,
    rating: 4,
    reviews: 156,
    image: "../assets/products/iphone_17_pro_silver_terra_cotta_silicone_case.png"
  },
  {
    id: 28,
    title: "Samsung Front Load Washer Dryer",
    category: "home-appliances",
    brand: "Samsung",
    price: 2899.99,
    rating: 5,
    reviews: 35,
    image: "../assets/products/Samsung Front Load Washer Dryer.webp"
  },
  {
    id: 29,
    title: "Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone",
    category: "mobiles",
    brand: "Samsung",
    price: 1599.99,
    oldPrice: 1899.00,
    rating: 4,
    reviews: 78,
    image: "../assets/products/Simple Mobile 5G LTE Galexy 12 Mini 512GB Gaming Phone.png"
  },
  {
    id: 30,
    title: "Smeg Single Door Refrigerator 38 Liters Pastel Blue",
    category: "home-appliances",
    brand: "Smeg",
    price: 1899.99,
    oldPrice: 2199.00,
    rating: 5,
    reviews: 23,
    image: "../assets/products/Smeg Single Door Refrigerator 38 Liters - Pastel Blue (FAB5RPB3GA).png"
  },
  {
    id: 31,
    title: "Sony PlayStation PS5 Standard Console",
    category: "gaming",
    brand: "Sony",
    price: 499.99,
    rating: 5,
    reviews: 234,
    image: "../assets/products/Sony PlayStation PS5 Standard Console (CFI2116A01Y).png"
  },
  {
    id: 32,
    title: "Sony ZV-1F Digital Still Camera with Shooting Grip",
    category: "cameras",
    brand: "Sony",
    price: 1799.99,
    oldPrice: 2099.00,
    rating: 5,
    reviews: 89,
    image: "../assets/products/Sony ZV-1F Digital Still Camera with Shooting Grip (DSCZV1F+GPVPT3-R).webp"
  }
];