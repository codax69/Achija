// Generate 200 mock products 
(function() {
    const images = [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD9DAqjB3wcDVmfahviI_ykQifXsOe1z42THqX4T-9DPPqeCgMgQcgK1LpsFOqSqeX0oCfpiCCc5fsFCp1XzexJZWTJAJVLCDUl8mH3qKegZoaP5ccrA77qB8qhoDdwmdzX7DvyZQw5EjRutNzA5iP9x8ttuydp8hk-JMNiGcsAuZdJ3kXs2H5oadUtRYGqXSAMJaueGCtKgG-k7uEsYDwFNy2fLs3_I657mUPmikq97QqYqqbYWZEwjPQTLpmTEamdOgSOTyQqy2zH",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB02-ann4-h2lYuSC4gRUMXOyZ9rLgXYlYBmTvzQmEGFA2J8vE6pTjHxXuW1GqvuNPPdqOAzjlCzHZR39VSW8N51WI8W6UUdb3fJlWGE1kZCbPsHKaX8kcxbuuUYg8H-m3YyVa2Mymygd_ifLEMBPa_Kibx3Tmlm7fyXmOF-JEmBVTBUKmhDpyZfI2lkzQM4UIusqM8V5vljrYbNd-Uy7hFJrZ6jq8yFbBsOr3NymRNKVM57Hcf0bmkx5QseCAZh_LKUvf7WiB6GhF5",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBJj7ulvFj63d6DBiKLBwnksDJSKt5NGm0pzxfKxGBnrklwXEbMM68e8QJc65hbDI34ihj5xOWEAi8hPMhCNEKHG8dUZo9xv0HuHR9V7Ij11YpjEMJ2Bb8Un4fH0UPApGaaSwoltsrE8y19y_7OT_cY3TWmmyyYhZAbKgnH-tTjQAPUdQFLfgtZl2eQ5cuoO_S2XPTdmy1Y8NPWYLMQTLBqkO0HwYOTXNp41F_gSgzuVDcjdBM9DmrkOQpK-OuFpXcJ795JogGHVC8Z",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAmVDGUdgPAKoaJKcO-3QOD2m8pHDdRpWuDW_ZiGQLFVLYQYoSfIw4o5rhrye56NVA6U-9AbKKvkL_oV3_pCPmSNEtLlGplUU_U80TtD8dAqr5jP_bMSJ22KIIrKAlMZbV3VMDBwwEsQBIuBeqF8J8B5dv5MHFenkBeMpdP7swn4uuDgV4AycuDeiZ2yd89-xCOpfj5anxmAQnAL7WZJ6j-7QsV_kbKdKX1Bc7wD_P6pLWi5vLqV8HBsX3NrLE0w5rytRuZnYnxLLAD",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAEQaPXC0B4FMYraBjQVtr4TC_d_s7Cff4_ffVn4hDBfSYF0fyCdDsXhqnTKW5SGDXErURNN1qFW0Y-biG59UkYq8IhzSUemiohFrf4YCxBimYxi-NGjudz1Zwu8cC0NhC0T9W-gSLUljhZxMGalUZJN6CN69PIUCoSgw4YvSG_fWz-2OGEg3MMANxs_wrIFSJBgOoeyzCYvB3hRsc9vgPF5JnZGgEOM_ksC2pzsoGs97OpR5zdVIRaaJSIT3gD7k4aZptnpKp_fWjm",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuATPo8rFiI524NhI4i-2RCHVg_OLkUq0R7fx7IyotgK76EiH9ptCJuFgeBkvKU6C1Gc7CkKL0UK_5962kiJGjZ1lMy-ykv9BKWlQ90oxGL7ETZl6Xks0s3DcE5Q04t3rw2M2Ayb1uWASUSxuNhfnDWj3apOSLSsz-o9cYpiP6njYMQ_H3wGUvFVgotjnBFB_LsK_15BSrPUS_kNlpsl0_C21fg0DkBzdtbMbeKctrYL0QT4ouGgPga-T1OlnDTHf3kIwcCZKf5mhmwT"
    ];

    const categories = [
        "Signature Rings",
        "Artisan Chains",
        "Cuffs & Bangles",
        "Pendants",
        "Earrings"
    ];

    const adjectives = ["Aeon", "Heritage", "Prism", "Raw Tectonic", "Legacy", "Trace", "Lunar", "Nocturne", "Solar", "Apex"];
    const nouns = ["Band", "Link", "Studs", "Cuff", "Amulet", "Ring Set", "Chain", "Bracelet", "Drop"];

    const materialDesc = "A testament to heritage craftsmanship, this solid sterling silver piece features intricate details. Each piece is hand-finished to achieve our signature mirror polish, reflecting the cool brilliance of moonlight on dark waters.";

    const products = [];

    // First, push the original 6 items that were hardcoded so they remain present
    products.push({
        id: "prod-1",
        name: "Aeon Band",
        category: "Signature Rings",
        price: 38400,
        image: images[0],
        description: materialDesc,
        material: "925 Sterling Silver",
        weight: "12.5 Grams",
        purity: "92.5% Fine Silver",
        finish: "High-Polish Rhodium"
    });
    products.push({
        id: "prod-2",
        name: "Heritage Link",
        category: "Artisan Chains",
        price: 100000,
        image: images[1],
        description: materialDesc,
        material: "925 Sterling Silver",
        weight: "45.0 Grams",
        purity: "92.5% Fine Silver",
        finish: "High-Polish Rhodium"
    });
    products.push({
        id: "prod-3",
        name: "Prism Studs",
        category: "Earrings",
        price: 25600,
        image: images[2],
        description: materialDesc,
        material: "925 Sterling Silver",
        weight: "8.2 Grams",
        purity: "92.5% Fine Silver",
        finish: "High-Polish Rhodium"
    });
    products.push({
        id: "prod-4",
        name: "Raw Tectonic Cuff",
        category: "Cuffs & Bangles",
        price: 71200,
        image: images[3],
        description: materialDesc,
        material: "925 Sterling Silver",
        weight: "32.0 Grams",
        purity: "92.5% Fine Silver",
        finish: "Matte Finish"
    });
    products.push({
        id: "prod-5",
        name: "Legacy Amulet",
        category: "Pendants",
        price: 51200,
        image: images[4],
        description: materialDesc,
        material: "925 Sterling Silver",
        weight: "18.5 Grams",
        purity: "92.5% Fine Silver",
        finish: "High-Polish Rhodium"
    });
    products.push({
        id: "prod-6",
        name: "Trace Ring Set",
        category: "Signature Rings",
        price: 44000,
        image: images[5],
        description: materialDesc,
        material: "925 Sterling Silver",
        weight: "16.0 Grams",
        purity: "92.5% Fine Silver",
        finish: "High-Polish Rhodium"
    });

    // Generate 194 more items to reach 200
    for(let i = 7; i <= 200; i++) {
        const cat = categories[Math.floor(Math.random() * categories.length)];
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const img = images[Math.floor(Math.random() * images.length)];
        
        let minPrice = 10000;
        let maxPrice = 150000;
        const price = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
        
        // Round price to nearest 100
        const roundedPrice = Math.round(price / 100) * 100;

        products.push({
            id: `prod-${i}`,
            name: `${adj} ${noun}`,
            category: cat,
            price: roundedPrice,
            image: img,
            description: materialDesc,
            material: "925 Sterling Silver",
            weight: (Math.random() * 40 + 5).toFixed(1) + " Grams",
            purity: "92.5% Fine Silver",
            finish: "High-Polish Rhodium"
        });
    }

    window.PRODUCTS = products;
})();
