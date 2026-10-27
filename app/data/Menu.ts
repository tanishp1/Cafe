export type Category = { id: string; name: string };

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  veg: boolean;
  tag?: string;
  desc: string;
  image: string;
};

export const categories: Category[] = [
  { id: "drinks", name: "Drinks" },
  { id: "bakes", name: "Bakes" },
  { id: "bites", name: "Bites" },
];

export const menuItems: MenuItem[] = [
  {
    id: "cardamom-chai",
    name: "Cardamom Chai",
    category: "drinks",
    price: 80,
    veg: true,
    tag: "Bestseller",
    desc: "Strong Assam, crushed green cardamom, full-cream milk.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  },
  {
    id: "filter-kaapi",
    name: "Filter Kaapi",
    category: "drinks",
    price: 110,
    veg: true,
    desc: "South Indian decoction, frothed milk, served in a steel dabara set.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
  },
  {
    id: "hot-chocolate",
    name: "Dark Hot Chocolate",
    category: "drinks",
    price: 170,
    veg: true,
    desc: "70% cocoa melted into steamed milk. Not too sweet.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop",
  },
  {
    id: "iced-latte",
    name: "Iced Latte",
    category: "drinks",
    price: 180,
    veg: true,
    desc: "Double espresso over ice and cold milk. Add vanilla or caramel for Rs 20.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
  },
  {
    id: "mango-cold-brew",
    name: "Mango Cold Brew",
    category: "drinks",
    price: 200,
    veg: true,
    tag: "Seasonal",
    desc: "18-hour cold brew with Alphonso mango pulp and a squeeze of lime.",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&h=300&fit=crop",
  },
  {
    id: "butter-croissant",
    name: "Butter Croissant",
    category: "bakes",
    price: 120,
    veg: true,
    desc: "Baked every morning at 6. Flaky outside, soft inside.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
  },
  {
    id: "banana-walnut-cake",
    name: "Banana Walnut Cake",
    category: "bakes",
    price: 150,
    veg: true,
    desc: "Moist banana loaf with toasted walnuts and brown butter glaze.",
    image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&h=300&fit=crop",
  },
  {
    id: "blueberry-cheesecake",
    name: "Blueberry Cheesecake",
    category: "bakes",
    price: 220,
    veg: true,
    tag: "Bestseller",
    desc: "Baked New York style on a biscuit base with blueberry compote.",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop",
  },
  {
    id: "masala-grilled-sandwich",
    name: "Masala Grilled Sandwich",
    category: "bites",
    price: 160,
    veg: true,
    desc: "Spiced potato, cucumber, tomato and green chutney on grilled bread.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop",
  },
  {
    id: "chilli-cheese-toast",
    name: "Chilli Cheese Toast",
    category: "bites",
    price: 140,
    veg: true,
    desc: "Sourdough, three cheeses, green chilli and black pepper.",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop",
  },
  {
    id: "peri-peri-fries",
    name: "Peri Peri Fries",
    category: "bites",
    price: 150,
    veg: true,
    desc: "Crisp fries tossed in house peri peri seasoning with garlic mayo.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
  },
  {
    id: "paneer-tikka-wrap",
    name: "Paneer Tikka Wrap",
    category: "bites",
    price: 210,
    veg: true,
    desc: "Tandoori paneer, pickled onion and mint yoghurt in a toasted roti wrap.",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop",
  },
  {
    id: "chicken-club-sandwich",
    name: "Chicken Club Sandwich",
    category: "bites",
    price: 260,
    veg: false,
    desc: "Grilled chicken, fried egg, lettuce and tomato on triple-decker toast.",
    image: "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=400&h=300&fit=crop",
  },
];
