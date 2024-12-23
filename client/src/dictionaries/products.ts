// client/src/dictionaries/products.ts
import { Product } from "../Interfaces/interfaces";

export const products: Product[] = [
  // Dairy
  {
    id: "c55fa93a-93fc-46d3-8195-807666f05e30",
    name: "Whole Milk",
    description: "Fresh, pasteurized whole milk",
    category: "Dairy",
    tags: ["Organic", "Lactose"],
    price: 2.99,
    image:
      "https://static.meijer.com/Media/000/41250/0004125010201_1_A1C1_2000.png",
    quantityInStock: 50,
    lastUpdated: "2024-12-22T14:00:00",
  },
  {
    id: "cd832182-db3a-429d-9fe8-6d9d9538e0b5",
    name: "Greek Yogurt",
    description: "Creamy yogurt, high in protein",
    category: "Dairy",
    tags: ["Protein", "Low-Fat"],
    price: 1.49,
    image: "https://m.media-amazon.com/images/I/51gc4bxCBuL.jpg",
    quantityInStock: 70,
    lastUpdated: "2024-12-22T13:50:00",
  },
  {
    id: "e84a4055-ee31-447e-8dc1-f8b5a5852fd9",
    name: "Cheddar Cheese Block",
    description: "Sharp cheddar aged for 12 months",
    category: "Dairy",
    tags: ["Aged", "High-Protein"],
    price: 3.99,
    image:
      "https://i5.walmartimages.com/seo/Great-Value-Block-Sharp-Cheddar-Cheese-16-oz_1d30bb5f-11e0-439d-98b0-a43dccc9a8f5.bc418dff1da1d23cd5db80a5186cf6ce.jpeg",
    quantityInStock: 40,
    lastUpdated: "2024-12-22T13:45:00",
  },
  {
    id: "84aa23c1-a956-436a-b0b3-3ae82d68f201",
    name: "Unsalted Butter",
    description: "High-quality cooking butter",
    category: "Dairy",
    tags: ["Unsalted", "Baking"],
    price: 2.89,
    image:
      "https://cdn0.woolworths.media/content/wowproductimages/large/076651.jpg",
    quantityInStock: 35,
    lastUpdated: "2024-12-22T13:40:00",
  },
  {
    id: "40697522-27a8-4b19-80e3-934d3bd6391a",
    name: "Almond Milk",
    description: "Dairy-free almond milk",
    category: "Dairy",
    tags: ["Vegan", "Gluten-Free"],
    price: 3.29,
    image: "https://m.media-amazon.com/images/I/71kl6chtyTL.jpg",
    quantityInStock: 60,
    lastUpdated: "2024-12-22T13:35:00",
  },
  {
    id: "af4c6ea9-900a-4864-b936-f1654eef28bd",
    name: "Cottage Cheese",
    description: "Low-fat, creamy texture",
    category: "Dairy",
    tags: ["Low-Fat", "Protein"],
    price: 2.79,
    image:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/66478a7bfc37f9216d233503_2024-05-17_17-12-21_front.main.jpg",
    quantityInStock: 45,
    lastUpdated: "2024-12-22T13:30:00",
  },

  // Snacks
  {
    id: "a21faef4-f0a1-4fac-b1e8-270d7c02b844",
    name: "Potato Chips",
    description: "Classic salted potato chips",
    category: "Snacks",
    tags: ["Crispy", "Salty"],
    price: 1.99,
    image: "https://cdn.store-assets.com/s/377840/i/32382133.jpg",
    quantityInStock: 100,
    lastUpdated: "2024-12-22T13:50:00",
  },
  {
    id: "f0987ac6-329e-4779-9c03-a29ab76a10fe",
    name: "Chocolate Cookies",
    description: "Soft-baked chocolate cookies",
    category: "Snacks",
    tags: ["Sweet", "Dessert"],
    price: 3.49,
    image:
      "https://drumstickproducts.co.uk/content/uploads/2023/03/zy95fj6z_bi107.jpg",
    quantityInStock: 80,
    lastUpdated: "2024-12-22T13:40:00",
  },
  {
    id: "4a35778e-ccd3-4751-8a93-de0e6b915b33",
    name: "Popcorn",
    description: "Microwave butter popcorn",
    category: "Snacks",
    tags: ["Salty", "Quick-Snack"],
    price: 2.19,
    image: "https://m.media-amazon.com/images/I/81A07DppyvL.jpg",
    quantityInStock: 90,
    lastUpdated: "2024-12-22T13:45:00",
  },
  {
    id: "66be43a1-6515-47f0-b0da-c7219facdfa7",
    name: "Granola Bars",
    description: "Healthy oats and honey bars",
    category: "Snacks",
    tags: ["Healthy", "Energy"],
    price: 4.29,
    image:
      "https://m.media-amazon.com/images/I/71sYFaMFhpL._AC_UF1000,1000_QL80_.jpg",
    quantityInStock: 65,
    lastUpdated: "2024-12-22T13:55:00",
  },
  {
    id: "afda612f-7a69-45e3-aec1-d2f5a2ee935e",
    name: "Mixed Nuts",
    description: "Roasted nuts with sea salt",
    category: "Snacks",
    tags: ["Protein", "Keto-Friendly"],
    price: 5.99,
    image:
      "https://www.planters.com/wp-content/uploads/2022/04/Product_2022_PLANTERS-Deluxe-Unsalted-Mixed-Nuts-15.25-oz.png",
    quantityInStock: 50,
    lastUpdated: "2024-12-22T13:40:00",
  },
  {
    id: "5c3a194d-418c-44e3-bfa0-2e5896606fa4",
    name: "Rice Crackers",
    description: "Gluten-free rice-based crackers",
    category: "Snacks",
    tags: ["Gluten-Free", "Vegan"],
    price: 3.19,
    image:
      "https://www.na-natureaddicts.com/resources/files/2017/10/RC-85g-sel-vinaigre-564x420.png",
    quantityInStock: 70,
    lastUpdated: "2024-12-22T13:35:00",
  },

  // Beverages
  {
    id: "1f54a054-fd2c-40c6-a7f7-c845d7f4269f",
    name: "Orange Juice",
    description: "Freshly squeezed orange juice",
    category: "Beverages",
    tags: ["Vitamin C", "No Added Sugar"],
    price: 3.49,
    image:
      "https://eshop.kddc.com/image/cache//catalog/OrangeJuice250ML-en-800x800.png",
    quantityInStock: 80,
    lastUpdated: "2024-12-22T13:50:00",
  },
  {
    id: "fcdd18d2-8e04-4b82-83f2-e02ae547de10",
    name: "Green Tea",
    description: "Organic loose leaf green tea",
    category: "Beverages",
    tags: ["Caffeine-Free", "Antioxidant"],
    price: 4.99,
    image: "https://m.media-amazon.com/images/I/71VFLk-6LQL.jpg",
    quantityInStock: 60,
    lastUpdated: "2024-12-22T13:45:00",
  },
  {
    id: "dae8389e-93a2-42ed-a9e1-de333b4db711",
    name: "Sparkling Water",
    description: "Flavored sparkling water",
    category: "Beverages",
    tags: ["Low-Calorie", "Refreshing"],
    price: 2.49,
    image:
      "https://cdn.shoplightspeed.com/shops/609238/files/3191564/san-pellegrino-sparkling-water-750-ml.jpg",
    quantityInStock: 90,
    lastUpdated: "2024-12-22T13:55:00",
  },
  {
    id: "6a03430c-2b39-45a5-bb1e-f583a0b7b635",
    name: "Cold Brew Coffee",
    description: "Ready-to-drink cold brew coffee",
    category: "Beverages",
    tags: ["Caffeinated", "Bold Flavor"],
    price: 3.99,
    image:
      "https://images.heb.com/is/image/HEBGrocery/prd-medium/002116056.jpg",
    quantityInStock: 40,
    lastUpdated: "2024-12-22T13:50:00",
  },
  {
    id: "3aed58fe-f00b-4341-861a-30fa93fa4c69",
    name: "Apple Cider",
    description: "Natural apple cider",
    category: "Beverages",
    tags: ["Natural", "Sweet"],
    price: 4.49,
    image:
      "https://cdn.powered-by-nitrosell.com/product_images/26/6472/large-BraggsAppleCiderVinegar_02.jpg",
    quantityInStock: 50,
    lastUpdated: "2024-12-22T13:45:00",
  },
  {
    id: "0d24b83d-46bd-4011-a099-b9b9df373bc1",
    name: "Energy Drink",
    description: "Carbonated energy drink",
    category: "Beverages",
    tags: ["Boost", "High Caffeine"],
    price: 2.99,
    image:
      "https://www.instacart.com/assets/domains/product-image/file/large_84ec2487-bb92-4aee-8579-539df9ca0729.jpg",
    quantityInStock: 60,
    lastUpdated: "2024-12-22T13:50:00",
  },

  // Fruits & Vegetables
  {
    id: "3d1b93c8-6b16-47bf-a5d1-560eb4ca7202",
    name: "Bananas",
    description: "Fresh ripe bananas",
    category: "Fruits & Vegetables",
    tags: ["Organic", "Sweet"],
    price: 0.59,
    image:
      "https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920.jpg",
    quantityInStock: 100,
    lastUpdated: "2024-12-22T13:30:00",
  },
  {
    id: "173ce78f-0341-4fcf-84a7-b02ddc54d13f",
    name: "Spinach",
    description: "Fresh leafy spinach",
    category: "Fruits & Vegetables",
    tags: ["Vitamin-Rich", "Low-Calorie"],
    price: 2.49,
    image:
      "https://freshleafuae.com/wp-content/uploads/2024/08/spinach-freshleaf-dubai-uae-img01.jpg",
    quantityInStock: 50,
    lastUpdated: "2024-12-22T13:35:00",
  },
  {
    id: "3525b25a-e56c-4297-9485-b3753fa7aaee",
    name: "Carrots",
    description: "Crunchy orange carrots",
    category: "Fruits & Vegetables",
    tags: ["Vitamin A", "Sweet"],
    price: 1.79,
    image:
      "https://snodgrassking.com/wp-content/uploads/2019/06/ebeb8de1-590b-4a50-bcba-413b4bd3a1e6.jpg",
    quantityInStock: 80,
    lastUpdated: "2024-12-22T13:40:00",
  },
  {
    id: "4e6d4f04-541a-4213-a9c1-eb97c37e9049",
    name: "Tomatoes",
    description: "Juicy red tomatoes",
    category: "Fruits & Vegetables",
    tags: ["Organic", "Vitamin C"],
    price: 2.39,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
    quantityInStock: 70,
    lastUpdated: "2024-12-22T13:45:00",
  },
  {
    id: "1e82b353-4de3-4997-a206-2db06b60156e",
    name: "Apples",
    description: "Crisp, sweet apples",
    category: "Fruits & Vegetables",
    tags: ["Fresh", "Low-Calorie"],
    price: 0.99,
    image:
      "https://domf5oio6qrcr.cloudfront.net/medialibrary/11525/0a5ae820-7051-4495-bcca-61bf02897472.jpg",
    quantityInStock: 90,
    lastUpdated: "2024-12-22T13:55:00",
  },
  {
    id: "4a3b07d9-d49e-4094-b930-b6831b0824bf",
    name: "Broccoli",
    description: "Fresh broccoli florets",
    category: "Fruits & Vegetables",
    tags: ["Fiber-Rich", "Healthy"],
    price: 1.99,
    image:
      "https://domf5oio6qrcr.cloudfront.net/medialibrary/5390/h1218g16207258089583.jpg",
    quantityInStock: 60,
    lastUpdated: "2024-12-22T13:50:00",
  },

  // Household Items
  {
    id: "b512e7bb-ffa1-4b85-ad6b-dd76a2872035",
    name: "Dishwashing Liquid",
    description: "Lemon-scented dish soap",
    category: "Household Items",
    tags: ["Cleaning", "Eco-Friendly"],
    price: 3.29,
    image: "https://i.ebayimg.com/images/g/70EAAOSwOJ5mcbWP/s-l1200.jpg",
    quantityInStock: 30,
    lastUpdated: "2024-12-22T13:30:00",
  },
  {
    id: "d34cb4f9-5c54-4432-87ee-7d4cac93f57c",
    name: "Laundry Detergent",
    description: "Concentrated laundry detergent",
    category: "Household Items",
    tags: ["Fresh Scent", "Stain Remover"],
    price: 9.99,
    image:
      "https://www.seventhgeneration.com/sites/default/files/2022-08/732913228928_PLP_default_0.png",
    quantityInStock: 20,
    lastUpdated: "2024-12-22T13:35:00",
  },
  {
    id: "730019be-52e9-45cb-b960-477faaed9f54",
    name: "Paper Towels",
    description: "Absorbent paper towels",
    category: "Household Items",
    tags: ["Reusable", "Strong"],
    price: 4.99,
    image: "https://pics.walgreens.com/prodimg/654211/900.jpg",
    quantityInStock: 40,
    lastUpdated: "2024-12-22T13:40:00",
  },
  {
    id: "61279987-c825-484b-8bb7-4959247776fc",
    name: "Toilet Paper",
    description: "Soft and strong toilet paper",
    category: "Household Items",
    tags: ["Eco-Friendly", "Biodegradable"],
    price: 6.99,
    image:
      "https://m.media-amazon.com/images/I/61kHeD+0ugL._AC_UF1000,1000_QL80_.jpg",
    quantityInStock: 50,
    lastUpdated: "2024-12-22T13:45:00",
  },
  {
    id: "d4bc8d04-2993-4000-8122-45616802e5db",
    name: "Air Freshener",
    description: "Lavender-scented air freshener",
    category: "Household Items",
    tags: ["Aromatic", "Long-Lasting"],
    price: 2.99,
    image: "https://pics.walgreens.com/prodimg/596208/450.jpg",
    quantityInStock: 25,
    lastUpdated: "2024-12-22T13:50:00",
  },
  {
    id: "08677c4d-633a-4b0d-b40e-a78fc417d6aa",
    name: "Glass Cleaner",
    description: "Streak-free glass cleaner",
    category: "Household Items",
    tags: ["Shiny Finish", "Eco-Friendly"],
    price: 3.79,
    image:
      "https://www.athome-essentials.com/wp-content/uploads/2019/05/At-home-clean-glass-cleaner.jpg",
    quantityInStock: 35,
    lastUpdated: "2024-12-22T13:55:00",
  },
];
