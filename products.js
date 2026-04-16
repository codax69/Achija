// products.js — Stable Product Data Layer

(function () {
  const images = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD9DAqjB3wcDVmfahviI_ykQifXsOe1z42THqX4T-9DPPqeCgMgQcgK1LpsFOqSqeX0oCfpiCCc5fsFCp1XzexJZWTJAJVLCDUl8mH3qKegZoaP5ccrA77qB8qhoDdwmdzX7DvyZQw5EjRutNzA5iP9x8ttuydp8hk-JMNiGcsAuZdJ3kXs2H5oadUtRYGqXSAMJaueGCtKgG-k7uEsYDwFNy2fLs3_I657mUPmikq97QqYqqbYWZEwjPQTLpmTEamdOgSOTyQqy2zH",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB02-ann4-h2lYuSC4gRUMXOyZ9rLgXYlYBmTvzQmEGFA2J8vE6pTjHxXuW1GqvuNPPdqOAzjlCzHZR39VSW8N51WI8W6UUdb3fJlWGE1kZCbPsHKaX8kcxbuuUYg8H-m3YyVa2Mymygd_ifLEMBPa_Kibx3Tmlm7fyXmOF-JEmBVTBUKmhDpyZfI2lkzQM4UIusqM8V5vljrYbNd-Uy7hFJrZ6jq8yFbBsOr3NymRNKVM57Hcf0bmkx5QseCAZh_LKUvf7WiB6GhF5",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBJj7ulvFj63d6DBiKLBwnksDJSKt5NGm0pzxfKxGBnrklwXEbMM68e8QJc65hbDI34ihj5xOWEAi8hPMhCNEKHG8dUZo9xv0HuHR9V7Ij11YpjEMJ2Bb8Un4fH0UPApGaaSwoltsrE8y19y_7OT_cY3TWmmyyYhZAbKgnH-tTjQAPUdQFLfgtZl2eQ5cuoO_S2XPTdmy1Y8NPWYLMQTLBqkO0HwYOTXNp41F_gSgzuVDcjdBM9DmrkOQpK-OuFpXcJ795JogGHVC8Z",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAmVDGUdgPAKoaJKcO-3QOD2m8pHDdRpWuDW_ZiGQLFVLYQYoSfIw4o5rhrye56NVA6U-9AbKKvkL_oV3_pCPmSNEtLlGplUU_U80TtD8dAqr5jP_bMSJ22KIIrKAlMZbV3VMDBwwEsQBIuBeqF8J8B5dv5MHFenkBeMpdP7swn4uuDgV4AycuDeiZ2yd89-xCOpfj5anxmAQnAL7WZJ6j-7QsV_kbKdKX1Bc7wD_P6pLWi5vLqV8HBsX3NrLE0w5rytRuZnYnxLLAD",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAEQaPXC0B4FMYraBjQVtr4TC_d_s7Cff4_ffVn4hDBfSYF0fyCdDsXhqnTKW5SGDXErURNN1qFW0Y-biG59UkYq8IhzSUemiohFrf4YCxBimYxi-NGjudz1Zwu8cC0NhC0T9W-gSLUljhZxMGalUZJN6CN69PIUCoSgw4YvSG_fWz-2OGEg3MMANxs_wrIFSJBgOoeyzCYvB3hRsc9vgPF5JnZGgEOM_ksC2pzsoGs97OpR5zdVIRaaJSIT3gD7k4aZptnpKp_fWjm",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuATPo8rFiI524NhI4i-2RCHVg_OLkUq0R7fx7IyotgK76EiH9ptCJuFgeBkvKU6C1Gc7CkKL0UK_5962kiJGjZ1lMy-ykv9BKWlQ90oxGL7ETZl6Xks0s3DcE5Q04t3rw2M2Ayb1uWASUSxuNhfnDWj3apOSLSsz-o9cYpiP6njYMQ_H3wGUvFVgotjnBFB_LsK_15BSrPUS_kNlpsl0_C21fg0DkBzdtbMbeKctrYL0QT4ouGgPga-T1OlnDTHf3kIwcCZKf5mhmwT",
  ];
  const categories = [
    "Signature Rings",
    "Artisan Chains",
    "Cuffs & Bangles",
    "Pendants",
    "Earrings",
  ];

  const adjectives = [
    "Aeon",
    "Heritage",
    "Prism",
    "Legacy",
    "Lunar",
    "Nocturne",
    "Solar",
    "Apex",
  ];
  const nouns = [
    "Band",
    "Chain",
    "Cuff",
    "Pendant",
    "Ring",
    "Bracelet",
    "Stud",
  ];

  const materialDesc =
    "Crafted in 925 sterling silver with precision finishing and timeless design.";

  const products = [];

  // Seed products (fixed)
  const baseProducts = [
    {
      id: "prod-1",
      name: "Aeon Band",
      category: "Signature Rings",
      price: 38400,
    },
    {
      id: "prod-2",
      name: "Heritage Chain",
      category: "Artisan Chains",
      price: 100000,
    },
    { id: "prod-3", name: "Prism Studs", category: "Earrings", price: 25600 },
    {
      id: "prod-4",
      name: "Tectonic Cuff",
      category: "Cuffs & Bangles",
      price: 71200,
    },
    {
      id: "prod-5",
      name: "Legacy Pendant",
      category: "Pendants",
      price: 51200,
    },
    {
      id: "prod-6",
      name: "Trace Ring",
      category: "Signature Rings",
      price: 44000,
    },
  ];

  baseProducts.forEach((p, i) => {
    products.push({
      ...p,
      image: images[i % images.length],
      description: materialDesc,
      material: "925 Sterling Silver",
      weight: (Math.random() * 20 + 5).toFixed(1) + "g",
      purity: "92.5%",
      finish: "High Polish",
    });
  });

  // Generate more products
  for (let i = 7; i <= 120; i++) {
    const cat = categories[Math.floor(Math.random() * categories.length)];
    const name =
      adjectives[Math.floor(Math.random() * adjectives.length)] +
      " " +
      nouns[Math.floor(Math.random() * nouns.length)];

    const price = Math.floor(Math.random() * (150000 - 10000)) + 10000;

    products.push({
      id: "prod-" + i,
      name,
      category: cat,
      price: Math.round(price / 100) * 100,
      image: images[Math.floor(Math.random() * images.length)],
      description: materialDesc,
      material: "925 Sterling Silver",
      weight: (Math.random() * 40 + 5).toFixed(1) + "g",
      purity: "92.5%",
      finish: "High Polish",
    });
  }

  // ✅ CRITICAL: expose globally (for features.js)
  window.PRODUCTS = products;

  // ✅ DEBUG VISIBILITY
  console.log("✅ Products initialized:", products.length);
})();
