/**
 * Restaurant Modern Showcase - Gourmet Menu Database
 * Includes tasting notes, dietary flags, pairings, and photography
 */

const MENU_ITEMS = [
  {
    id: "dish-1",
    name: "A5 Miyazaki Wagyu Striploin",
    category: "mains",
    price: 88,
    badge: "Chef's Signature",
    tag: "Gluten-Free",
    calories: "620 kcal",
    image: "assets/images/wagyu.jpg",
    description: "Charcoal-seared A5 Wagyu beef, Perigord black truffle shavings, 24k edible gold flakes, pomme mousseline, and 48-hour bone marrow jus reduction.",
    pairing: "2018 Château Margaux Premier Grand Cru Classé",
    ingredients: ["A5 Miyazaki Wagyu", "Black Perigord Truffle", "Fingerling Potato Mousseline", "Rosemary Infused Bone Broth", "Fleur de Sel", "Edible Gold Leaf"],
    popular: true
  },
  {
    id: "dish-2",
    name: "Pan-Seared Duck Breast & Foie Gras",
    category: "mains",
    price: 64,
    badge: "Michelin Awarded",
    tag: "Signature",
    calories: "540 kcal",
    image: "assets/images/hero.jpg",
    description: "Crispy skin dry-aged duck breast, caramelized foie gras medallion, beet-hibiscus purée, heirloom glazed baby beets, and borage blossoms.",
    pairing: "2020 Domaine de la Romanée-Conti Pinot Noir",
    ingredients: ["Dry-aged Moulard Duck", "Hudson Valley Foie Gras", "Beetroot-Hibiscus Reduction", "Star Anise Gastrique", "Micro Herbs"],
    popular: true
  },
  {
    id: "dish-3",
    name: "Valrhona Noir Chocolate Geode",
    category: "desserts",
    price: 28,
    badge: "Artisan Pastry",
    tag: "Vegetarian",
    calories: "410 kcal",
    image: "assets/images/dessert.jpg",
    description: "72% Grand Cru dark chocolate sphere cracked open to reveal roasted hazelnut praline, raspberry coulis ribbon, spun golden sugar, and Madagascar vanilla gelato.",
    pairing: "2015 Taylor Fladgate Vintage Port",
    ingredients: ["Valrhona 72% Chocolate", "Piedmont Hazelnuts", "Wild Raspberry Coulis", "Spun Sugar Arch", "Madagascar Bourbon Vanilla"],
    popular: true
  },
  {
    id: "dish-4",
    name: "The Smoked Botanist Old Fashioned",
    category: "drinks",
    price: 26,
    badge: "Cocktail of the Year",
    tag: "Handcrafted",
    calories: "190 kcal",
    image: "assets/images/cocktail.jpg",
    description: "Small-batch Kentucky bourbon, charred cinnamon smoke, Angostura & orange bitters, flamed peel oils, hand-carved crystal ice sphere.",
    pairing: "Accompanies Wagyu & Rich Desserts",
    ingredients: ["12-Year Small Batch Bourbon", "Demerara Syrup", "Cinnamon Wood Smoke", "Flamed Seville Orange Peel", "Crystal Ice Sphere"],
    popular: true
  },
  {
    id: "dish-5",
    name: "Hokkaido Scallop Crudo",
    category: "starters",
    price: 36,
    badge: "Seasonal Catch",
    tag: "Gluten-Free",
    calories: "280 kcal",
    image: "assets/images/wagyu.jpg",
    description: "Thinly sliced wild diver scallops, finger lime pearls, compressed cucumber, Oscietra royal caviar, white truffle oil droplets, and yuzu ponzu broth.",
    pairing: "2021 Chablis Grand Cru Les Clos",
    ingredients: ["Wild Hokkaido Scallop", "Royal Oscietra Caviar", "Finger Lime", "Cold-pressed White Truffle", "Cucumber Ribbon", "Yuzu"],
    popular: false
  },
  {
    id: "dish-6",
    name: "Wild Morel & Chanterelle Risotto",
    category: "mains",
    price: 48,
    badge: "Organic Farm",
    tag: "Vegetarian",
    calories: "460 kcal",
    image: "assets/images/hero.jpg",
    description: "Acquerello aged carnaroli rice, foraged forest mushrooms, aged 36-month Parmigiano-Reggiano, thyme emulsion, and shaved Umbrian truffles.",
    pairing: "2019 Barolo Pio Cesare DOCG",
    ingredients: ["Acquerello Carnaroli", "Foraged Morels & Chanterelles", "Parmigiano-Reggiano 36 Mo", "Shallot Butter", "Umbrian Truffle"],
    popular: false
  },
  {
    id: "dish-7",
    name: "Blue Fin Tuna Tartare Imperial",
    category: "starters",
    price: 42,
    badge: "Prime Cut",
    tag: "Pescatarian",
    calories: "310 kcal",
    image: "assets/images/wagyu.jpg",
    description: "Sustainably caught bluefin akami, avocado emulsion, pickled shallots, crispy nori tuile, white sesame ponzu vinaigrette, and micro coriander.",
    pairing: "Dom Pérignon Vintage Champagne 2013",
    ingredients: ["Bluefin Tuna", "Hass Avocado", "Crispy Nori Crisp", "White Sesame Vinaigrette", "Micro Cilantro", "Gold Leaf"],
    popular: true
  },
  {
    id: "dish-8",
    name: "Golden Saffron Roasted Turbot",
    category: "mains",
    price: 72,
    badge: "Chef's Special",
    tag: "Pescatarian",
    calories: "490 kcal",
    image: "assets/images/hero.jpg",
    description: "Wild Brittany turbot fillet, saffron-infused velouté, baby sea asparagus, confit leeks, and roasted fennel pollen crisp.",
    pairing: "2019 Meursault Premier Cru Charmes",
    ingredients: ["Brittany Wild Turbot", "Kashmiri Saffron", "Sea Asparagus", "Braised Confit Leeks", "Fennel Pollen Crust"],
    popular: false
  },
  {
    id: "dish-9",
    name: "Yuzu & White Peach Pavlova",
    category: "desserts",
    price: 24,
    badge: "Pastry Craft",
    tag: "Vegetarian",
    calories: "340 kcal",
    image: "assets/images/dessert.jpg",
    description: "Crisp vanilla meringue shell, Japanese yuzu curd, poached white peach compote, fresh mint pearls, and elderflower sorbet quenelle.",
    pairing: "2020 Moscato d'Asti Saracco",
    ingredients: ["Crisp Meringue", "Yuzu Curd", "White Peach Compote", "Elderflower Sorbet", "Mint Essence"],
    popular: false
  },
  {
    id: "dish-10",
    name: "Imperial Saffron Elixir Fizz",
    category: "drinks",
    price: 22,
    badge: "Zero-Proof / Mocktail",
    tag: "Alcohol-Free",
    calories: "120 kcal",
    image: "assets/images/cocktail.jpg",
    description: "Cold-extracted Kashmiri saffron, clarified Meyer lemon juice, sparkling elderflower tonic, rosemary sprig, and edible gold shimmer dust.",
    pairing: "Refreshing aperitif for all courses",
    ingredients: ["Clarified Meyer Lemon", "Kashmiri Saffron Syrup", "Fever-Tree Elderflower Tonic", "Rosemary", "Edible Shimmer"],
    popular: true
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MENU_ITEMS };
}
