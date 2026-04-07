document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject UI Elements into the DOM
    const uiContainer = document.createElement('div');
    uiContainer.innerHTML = `
        <!-- Search Overlay -->
        <div id="search-overlay" class="fixed inset-0 bg-[#001233]/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center opacity-0 pointer-events-none transition-opacity duration-500">
            <button id="close-search" class="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                <span class="material-symbols-outlined text-4xl">close</span>
            </button>
            <div class="w-full max-w-3xl px-8">
                <p class="font-['Noto_Serif'] text-[#C6C6C6] text-xl mb-4 text-center">What are you looking for?</p>
                <div class="relative">
                    <input type="text" placeholder="Search the collection..." class="w-full bg-transparent border-b border-[#44464E] focus:border-[#C6C6C6] outline-none text-3xl font-light text-white py-4 font-['Inter'] placeholder:text-white/20 transition-colors">
                    <span class="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-white/50 text-3xl">search</span>
                </div>
            </div>
        </div>

        <!-- Cart Drawer -->
        <div id="cart-overlay" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 opacity-0 pointer-events-none transition-opacity duration-500"></div>
        <div id="cart-drawer" class="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#001233]/95 backdrop-blur-md z-50 transform translate-x-full transition-transform duration-500 shadow-2xl border-l border-[#44464E]/30 p-8 flex flex-col">
            <div class="flex justify-between items-center mb-12">
                <h2 class="font-['Noto_Serif'] text-2xl text-white tracking-wide">Your Collection</h2>
                <button id="close-cart" class="text-white/50 hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-3xl">close</span>
                </button>
            </div>
            
            <div class="flex-1 overflow-y-auto">
                <!-- Example Item -->
                <div class="flex gap-6 mb-8 pb-8 border-b border-[#44464E]/30">
                    <div class="w-24 h-24 bg-[#041a3f]">
                       <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQe97oAEvA6_9X7lV7L1A_TfN7d8K2jXv2Y_k80lW5qY4J3LwO6i-E2zX3G0CQsQ_k-7X09B9jR3L2_R1X18kR3L2ZXZZ2k" class="w-full h-full object-cover grayscale opacity-80" alt="Silver Ring">
                    </div>
                    <div class="flex-1 flex flex-col justify-center">
                        <h3 class="font-['Noto_Serif'] text-white text-lg mb-1">Signature Silver Band</h3>
                        <p class="font-['Inter'] text-[#C6C6C6]/60 text-xs tracking-[0.15em] uppercase mb-3">925 Sterling</p>
                        <p class="font-['Inter'] text-white font-medium">₹18,500</p>
                    </div>
                </div>
            </div>
            
            <div class="pt-8 border-t border-[#44464E]/30 mt-auto">
                <div class="flex justify-between items-center mb-6">
                    <span class="font-['Inter'] text-[#C6C6C6]/80 tracking-widest text-sm uppercase">Subtotal</span>
                    <span class="font-['Noto_Serif'] text-xl text-white">₹18,500</span>
                </div>
                <button class="w-full py-4 bg-transparent border border-[#C6C6C6] hover:shadow-[0_0_20px_rgba(198,198,198,0.3)] transition-all flex items-center justify-center gap-2 group cursor-pointer" onclick="alert('Checkout integration pending!')">
                    <span class="font-['Inter'] uppercase tracking-[0.2em] text-[0.75rem] text-[#C6C6C6] font-medium group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(198,198,198,0.8)]">Proceed to Checkout</span>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(uiContainer);

    // 2. Bind Listeners for Search and Cart
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearch = document.getElementById('close-search');
    
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');

    document.querySelectorAll('.material-symbols-outlined').forEach(icon => {
        if (icon.textContent.trim() === 'search' || icon.getAttribute('data-icon') === 'search') {
            icon.classList.add('cursor-pointer');
            icon.addEventListener('click', () => {
                searchOverlay.classList.remove('opacity-0', 'pointer-events-none');
            });
        }
        if (icon.textContent.trim() === 'shopping_bag' || icon.getAttribute('data-icon') === 'shopping_bag') {
            icon.classList.add('cursor-pointer');
            icon.addEventListener('click', () => {
                cartOverlay.classList.remove('opacity-0', 'pointer-events-none');
                cartDrawer.classList.remove('translate-x-full');
            });
        }
    });

    closeSearch.addEventListener('click', () => {
        searchOverlay.classList.add('opacity-0', 'pointer-events-none');
    });

    closeCart.addEventListener('click', () => {
        cartOverlay.classList.add('opacity-0', 'pointer-events-none');
        cartDrawer.classList.add('translate-x-full');
    });

    cartOverlay.addEventListener('click', () => {
        cartOverlay.classList.add('opacity-0', 'pointer-events-none');
        cartDrawer.classList.add('translate-x-full');
    });

    // 3. Dynamic Products & Routing
    const products = window.PRODUCTS || [];
    
    // Formatter for Currency
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
    };

    if (window.location.pathname.includes('collections.html')) {
        const productGrid = document.getElementById('product-grid');
        const paginationContainer = document.getElementById('pagination-container');
        const itemsPerPage = 12;
        let currentPage = 1;

        const renderProducts = (page) => {
            if(!productGrid) return;
            productGrid.innerHTML = '';
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const paginatedItems = products.slice(start, end);

            paginatedItems.forEach((prod, index) => {
                // Add a top margin for alternating columns just like original design
                const marginClass = (index % 3 === 1) ? 'pt-12' : '';
                
                const article = document.createElement('article');
                article.className = `group cursor-pointer ${marginClass}`;
                article.onclick = () => window.location.href = `product_details.html?id=${prod.id}`;
                
                article.innerHTML = `
                    <div class="relative aspect-[4/5] bg-surface-container-low overflow-hidden mb-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                        <img class="w-full h-full object-cover grayscale brightness-90 group-hover:scale-110 group-hover:brightness-100 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]" src="${prod.image}" />
                        <div class="absolute inset-0 opacity-0 group-hover:opacity-100 border-[1px] border-white/10 transition-opacity duration-500"></div>
                    </div>
                    <div class="space-y-1">
                        <h2 class="font-headline text-lg text-white group-hover:silver-gradient-text transition-all duration-300">${prod.name}</h2>
                        <p class="font-label text-[0.7rem] tracking-[0.15em] text-on-surface-variant uppercase">${prod.material ? prod.material.split(' ')[0] : '925'} Sterling • ${formatPrice(prod.price)}</p>
                    </div>
                `;
                productGrid.appendChild(article);
            });
            renderPagination();
        };

        const renderPagination = () => {
            if(!paginationContainer) return;
            const totalPages = Math.ceil(products.length / itemsPerPage);
            paginationContainer.innerHTML = '';
            
            for(let i=1; i<=totalPages; i++) {
                // For simplicity, just show first 3 and last 1 if pages > 5
                if (totalPages > 5) {
                    if (i > 3 && i < totalPages) {
                        if (i === 4) {
                            const dots = document.createElement('span');
                            dots.className = "text-outline";
                            dots.innerText = "...";
                            paginationContainer.appendChild(dots);
                        }
                        continue;
                    }
                }
                
                const span = document.createElement('span');
                const iFormatted = i < 10 ? '0'+i : i;
                
                if (i === currentPage) {
                    span.className = "text-white border-b border-white pb-1 cursor-default";    
                } else {
                    span.className = "text-outline hover:text-white transition-colors cursor-pointer";
                    span.onclick = () => {
                        currentPage = i;
                        renderProducts(currentPage);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    };
                }
                span.innerText = iFormatted;
                paginationContainer.appendChild(span);
            }
        };

        renderProducts(currentPage);

    } else if (window.location.pathname.includes('product_details.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id') || 'prod-1'; // Default
        const product = products.find(p => p.id === productId) || products[0];

        const trySetText = (id, text) => { const el = document.getElementById(id); if (el) el.innerText = text; };
        const trySetImg = (id, src) => { const el = document.getElementById(id); if (el) el.src = src; };

        trySetText('detail-title', product.name);
        trySetText('detail-price', formatPrice(product.price));
        trySetText('detail-desc', product.description);
        trySetImg('detail-main-img', product.image);
        trySetText('detail-material', product.material);
        trySetText('detail-weight', product.weight);
        trySetText('detail-purity', product.purity);
        trySetText('detail-finish', product.finish);

        // Render Related Products (3 Random)
        const relatedGrid = document.getElementById('related-products-grid');
        if (relatedGrid) {
            relatedGrid.innerHTML = '';
            // Pick 3 random but not the current 
            const others = products.filter(p => p.id !== product.id);
            const shuffled = others.sort(() => 0.5 - Math.random()).slice(0, 3);
            
            shuffled.forEach((prod, index) => {
                const mtClass = (index === 1) ? 'mt-12' : '';
                const itemDiv = document.createElement('div');
                itemDiv.className = "group cursor-pointer";
                itemDiv.onclick = () => window.location.href = `product_details.html?id=${prod.id}`;
                itemDiv.innerHTML = `
                    <div class="bg-surface-container-low aspect-[3/4] overflow-hidden relative mb-6 ${mtClass}">
                        <img class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" src="${prod.image}" />
                    </div>
                    <div class="space-y-2">
                        <h3 class="text-xl font-headline text-white/90">${prod.name}</h3>
                        <p class="text-secondary/60 font-body text-sm tracking-widest uppercase">${formatPrice(prod.price)}</p>
                    </div>
                `;
                relatedGrid.appendChild(itemDiv);
            });
        }
    } else {
        // Fallback for indexing clicks anywhere else via products mapping (optional)
        const productImages = document.querySelectorAll('img.grayscale');
        productImages.forEach((img, i) => {
            const productContainer = img.closest('.group');
            if (productContainer && products[i]) {
                productContainer.style.cursor = 'pointer';
                productContainer.onclick = () => {
                    window.location.href = `product_details.html?id=${products[i].id}`;
                };
            } else if (productContainer) {
                productContainer.style.cursor = 'pointer';
                productContainer.onclick = () => {
                    window.location.href = `product_details.html?id=prod-1`;
                };
            }
        });
    }
});
