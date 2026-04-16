/* =====================================================
   Achija Jewellers — Features Script
   • Real cart (localStorage)
   • Active filters (category + price) — fixed & unified
   • Staggered product card animations
   • Quick-view modal
   • Search overlay
   • Razorpay checkout
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── Helpers ─────────────────────────────────────── */
    const $ = id => document.getElementById(id);
    const fmt = price => new Intl.NumberFormat('en-IN', {
        style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(price);

    /* ─── 1. Inject Global UI ───────────────────────────── */
    const uiRoot = document.createElement('div');
    uiRoot.innerHTML = `
        <!-- Search Overlay -->
        <div id="search-overlay" class="fixed inset-0 bg-[#001233]/97 backdrop-blur-xl z-[70] flex flex-col items-center justify-center opacity-0 pointer-events-none transition-opacity duration-500">
            <button id="close-search" class="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors">
                <span class="material-symbols-outlined text-4xl">close</span>
            </button>
            <div class="w-full max-w-3xl px-6 md:px-8">
                <p class="font-['Noto_Serif'] text-[#C6C6C6] text-lg md:text-xl mb-4 text-center">What are you looking for?</p>
                <div class="relative">
                    <input id="search-input" type="text" placeholder="Search the collection..." autocomplete="off"
                        class="w-full bg-transparent border-b border-[#44464E] focus:border-[#C6C6C6] outline-none text-2xl md:text-3xl font-light text-white py-4 font-['Inter'] placeholder:text-white/20 transition-colors">
                    <span class="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-white/50 text-3xl">search</span>
                </div>
                <div id="search-results" class="mt-6 space-y-2 max-h-[50vh] overflow-y-auto"></div>
            </div>
        </div>

        <!-- Cart Overlay -->
        <div id="cart-overlay" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] opacity-0 pointer-events-none transition-opacity duration-500"></div>
        
        <!-- Cart Drawer -->
        <div id="cart-drawer" class="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#00091f]/97 backdrop-blur-md z-[65] transform translate-x-full transition-transform duration-500 shadow-2xl border-l border-[#44464E]/20 flex flex-col">
            <div class="flex justify-between items-center p-6 md:p-8 border-b border-[#44464E]/20">
                <div class="flex items-center gap-3">
                    <h2 class="font-['Noto_Serif'] text-xl md:text-2xl text-white tracking-wide">Your Collection</h2>
                    <span id="cart-header-count" class="bg-blue-600/80 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"></span>
                </div>
                <button id="close-cart" class="text-white/50 hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-2xl">close</span>
                </button>
            </div>
            <div id="cart-items-list" class="flex-1 overflow-y-auto p-6 md:p-8 space-y-6"></div>
            <div class="p-6 md:p-8 border-t border-[#44464E]/20">
                <div class="flex justify-between items-center mb-5">
                    <span class="font-['Inter'] text-[#C6C6C6]/70 tracking-widest text-xs uppercase">Subtotal</span>
                    <span id="cart-total" class="font-['Noto_Serif'] text-xl text-white">₹0</span>
                </div>
                <div id="cart-empty-msg" class="hidden text-center text-[#C6C6C6]/40 font-['Inter'] text-sm pb-4">Your collection is empty.</div>
                <button id="checkout-btn" class="w-full py-4 bg-transparent border border-[#C6C6C6] hover:shadow-[0_0_25px_rgba(198,198,198,0.25)] transition-all flex items-center justify-center gap-2 group cursor-pointer">
                    <span class="font-['Inter'] uppercase tracking-[0.2em] text-[0.75rem] text-[#C6C6C6] font-medium group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(198,198,198,0.8)] transition-all">Proceed to Checkout</span>
                    <span class="material-symbols-outlined text-[#C6C6C6]/60 group-hover:text-white text-lg transition-colors">arrow_forward</span>
                </button>
                <p class="text-center text-[#C6C6C6]/30 text-[0.6rem] tracking-widest uppercase mt-3 font-['Inter']">Secure Payment via Razorpay</p>
            </div>
        </div>

        <!-- Quick-View Modal -->
        <div id="qv-overlay" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80] opacity-0 pointer-events-none transition-opacity duration-400"></div>
        <div id="qv-modal" class="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 w-auto md:w-[820px] bg-[#00091f] border border-[#44464E]/30 z-[85] opacity-0 pointer-events-none transition-all duration-400 scale-95 p-0 shadow-[0_40px_100px_rgba(0,0,0,0.6)] max-h-[90vh] overflow-y-auto">
            <button id="close-qv" class="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10">
                <span class="material-symbols-outlined text-2xl">close</span>
            </button>
            <div class="grid grid-cols-1 md:grid-cols-2">
                <div class="aspect-square md:aspect-auto md:min-h-[400px] overflow-hidden relative bg-[#060d1f]">
                    <img id="qv-img" class="w-full h-full object-cover" src="" alt="">
                </div>
                <div class="p-6 md:p-10 flex flex-col justify-center space-y-4">
                    <span class="text-[#C6C6C6]/50 text-xs tracking-[0.2em] uppercase font-['Inter']" id="qv-cat"></span>
                    <h2 id="qv-name" class="font-['Noto_Serif'] text-2xl md:text-3xl text-white leading-tight"></h2>
                    <p id="qv-price" class="text-xl silver-gradient-text font-['Noto_Serif']"></p>
                    <p id="qv-desc" class="text-[#C6C6C6]/60 text-sm leading-relaxed font-['Inter']"></p>
                    <div class="grid grid-cols-2 gap-3 text-xs font-['Inter'] text-[#C6C6C6]/50 pt-2 border-t border-[#44464E]/20">
                        <div><span class="block uppercase tracking-widest mb-1">Material</span><span id="qv-material" class="text-white/80"></span></div>
                        <div><span class="block uppercase tracking-widest mb-1">Weight</span><span id="qv-weight" class="text-white/80"></span></div>
                        <div><span class="block uppercase tracking-widest mb-1">Purity</span><span id="qv-purity" class="text-white/80"></span></div>
                        <div><span class="block uppercase tracking-widest mb-1">Finish</span><span id="qv-finish" class="text-white/80"></span></div>
                    </div>
                    <div class="flex flex-col gap-3 pt-2">
                        <button id="qv-add-cart" data-id="" class="w-full py-4 border border-[#C6C6C6]/60 hover:border-white text-[#C6C6C6] hover:text-white font-['Inter'] uppercase tracking-[0.15em] text-xs transition-all hover:shadow-[0_0_20px_rgba(198,198,198,0.2)] flex items-center justify-center gap-2">
                            <span class="material-symbols-outlined text-base">shopping_bag</span>
                            Add to Collection
                        </button>
                        <a id="qv-view-btn" href="#" class="w-full py-3 text-center font-['Inter'] uppercase tracking-[0.15em] text-[0.7rem] text-[#C6C6C6]/40 hover:text-white transition-colors">
                            View Full Details →
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Toast notification -->
        <div id="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] opacity-0 pointer-events-none transition-all duration-400 translate-y-4">
            <div class="bg-[#001233] border border-[#C6C6C6]/20 text-white font-['Inter'] text-sm tracking-wide px-6 py-3 flex items-center gap-3 shadow-2xl">
                <span class="material-symbols-outlined text-[#C6C6C6] text-base">check_circle</span>
                <span id="toast-msg">Added to collection</span>
            </div>
        </div>

        <!-- Cart Badge on nav -->
        <style>
            .cart-badge { display:none; position:absolute; top:-6px; right:-6px; background:#1d4ed8; color:#fff; font-size:10px; font-weight:700; width:16px; height:16px; border-radius:50%; align-items:center; justify-content:center; }
            .cart-badge.visible { display:flex; }
            .cart-icon-wrap { position:relative; display:inline-flex; }

            /* ── Product card entrance animation ── */
            @keyframes card-in {
                from { opacity: 0; transform: translateY(22px); }
                to   { opacity: 1; transform: translateY(0); }
            }
            .product-card-anim {
                opacity: 0;
                animation: card-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            }

            /* ── Active filter tag pulse-in ── */
            @keyframes tag-in {
                from { opacity: 0; transform: scale(0.88); }
                to   { opacity: 1; transform: scale(1); }
            }
            .filter-tag-anim {
                animation: tag-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }

            /* ── Category sidebar active state ── */
            [data-category].active-cat > span:first-child {
                color: #ffffff;
                font-weight: 600;
            }
        </style>
    `;
    document.body.appendChild(uiRoot);

    /* ─── 2. Cart Badge (wrap every shopping_bag icon) ──── */
    document.querySelectorAll('.material-symbols-outlined').forEach(icon => {
        const txt = icon.textContent.trim();
        if (txt === 'shopping_bag') {
            const wrap = document.createElement('span');
            wrap.className = 'cart-icon-wrap cursor-pointer';
            icon.parentNode.insertBefore(wrap, icon);
            wrap.appendChild(icon);
            const badge = document.createElement('span');
            badge.className = 'cart-badge';
            badge.id = 'cart-badge-' + Math.random().toString(36).slice(2, 7);
            wrap.appendChild(badge);
            wrap.addEventListener('click', openCart);
        }
        if (txt === 'search') {
            icon.classList.add('cursor-pointer');
            icon.addEventListener('click', openSearch);
        }
    });

    function updateCartBadges() {
        const count = Cart.count();
        document.querySelectorAll('.cart-badge').forEach(b => {
            b.textContent = count;
            b.classList.toggle('visible', count > 0);
        });
        const hc = $('cart-header-count');
        if (hc) { hc.textContent = count; hc.style.display = count > 0 ? 'flex' : 'none'; }
    }

    /* ─── 3. Cart Drawer Logic ────────────────────────────── */
    function openCart() {
        $('cart-overlay').classList.remove('opacity-0', 'pointer-events-none');
        $('cart-drawer').classList.remove('translate-x-full');
        renderCartItems();
    }
    function closeCartFn() {
        $('cart-overlay').classList.add('opacity-0', 'pointer-events-none');
        $('cart-drawer').classList.add('translate-x-full');
    }

    $('close-cart').addEventListener('click', closeCartFn);
    $('cart-overlay').addEventListener('click', closeCartFn);

    function renderCartItems() {
        const items = Cart.get();
        const list = $('cart-items-list');
        const total = $('cart-total');
        const emptyMsg = $('cart-empty-msg');
        const checkoutBtn = $('checkout-btn');

        list.innerHTML = '';
        if (items.length === 0) {
            emptyMsg.classList.remove('hidden');
            checkoutBtn.disabled = true;
            checkoutBtn.classList.add('opacity-40', 'pointer-events-none');
            total.textContent = '₹0';
        } else {
            emptyMsg.classList.add('hidden');
            checkoutBtn.disabled = false;
            checkoutBtn.classList.remove('opacity-40', 'pointer-events-none');
            items.forEach(item => {
                const div = document.createElement('div');
                div.className = 'flex gap-4 pb-5 border-b border-[#44464E]/20';
                div.innerHTML = `
                    <div class="w-20 h-20 flex-shrink-0 bg-[#060d1f] overflow-hidden">
                        <img src="${item.image}" class="w-full h-full object-cover grayscale opacity-80" alt="${item.name}">
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-['Noto_Serif'] text-white text-sm mb-0.5 truncate">${item.name}</h3>
                        <p class="font-['Inter'] text-[#C6C6C6]/50 text-[0.65rem] tracking-[0.1em] uppercase mb-2">925 Sterling Silver</p>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2 border border-[#44464E]/40 px-2 py-0.5">
                                <button class="text-[#C6C6C6]/50 hover:text-white transition-colors" onclick="Cart.updateQty('${item.id}',-1); document.dispatchEvent(new Event('cart-updated'))">
                                    <span class="material-symbols-outlined text-sm">remove</span>
                                </button>
                                <span class="font-['Inter'] text-white text-xs w-4 text-center">${item.qty}</span>
                                <button class="text-[#C6C6C6]/50 hover:text-white transition-colors" onclick="Cart.updateQty('${item.id}',1); document.dispatchEvent(new Event('cart-updated'))">
                                    <span class="material-symbols-outlined text-sm">add</span>
                                </button>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="font-['Inter'] text-white text-sm">${fmt(item.price * item.qty)}</span>
                                <button class="text-[#C6C6C6]/30 hover:text-red-400 transition-colors" onclick="Cart.remove('${item.id}'); document.dispatchEvent(new Event('cart-updated'))">
                                    <span class="material-symbols-outlined text-base">delete_outline</span>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                list.appendChild(div);
            });
            total.textContent = fmt(Cart.total());
        }
        updateCartBadges();
    }

    document.addEventListener('cart-updated', () => renderCartItems());
    window.Cart = Cart;

    /* ─── 4. Razorpay Checkout ───────────────────────────── */
    const RAZORPAY_KEY = 'rzp_test_SZLIBsr5d3H2uH'; // ← Replace with your key

    $('checkout-btn').addEventListener('click', () => {
        const items = Cart.get();
        if (items.length === 0) return;
        const totalPaise = Cart.total() * 100;
        if (typeof Razorpay === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => openRazorpay(totalPaise, items);
            script.onerror = () => {
                const itemsList = items.map(i => `${i.name} (qty:${i.qty})`).join(', ');
                const text = `*Order Inquiry | Achija Jewellers*%0A%0A*Items:* ${encodeURIComponent(itemsList)}%0A*Total:* ${fmt(Cart.total())}`;
                window.open(`https://wa.me/919265318453?text=${text}`, '_blank');
            };
            document.head.appendChild(script);
        } else {
            openRazorpay(totalPaise, items);
        }
    });

    function openRazorpay(amountPaise, items) {
        const options = {
            key: RAZORPAY_KEY,
            amount: amountPaise,
            currency: 'INR',
            name: 'Achija Jewellers',
            description: `${items.length} item${items.length > 1 ? 's' : ''} from Achija Collection`,
            theme: { color: '#001233' },
            modal: { ondismiss: () => {} },
            handler: function(response) {
                showToast('✓ Payment successful! Order confirmed.');
                Cart.save([]);
                renderCartItems();
                closeCartFn();
                setTimeout(() => {
                    alert(`🎉 Order confirmed!\nPayment ID: ${response.razorpay_payment_id}\n\nThank you for choosing Achija Jewellers.`);
                }, 300);
            },
            prefill: { name: '', email: '', contact: '' },
            notes: { items: items.map(i => `${i.name} x${i.qty}`).join(' | ') }
        };
        const rzp = new Razorpay(options);
        rzp.on('payment.failed', resp => alert('Payment failed: ' + resp.error.description));
        rzp.open();
    }

    /* ─── 5. Search ──────────────────────────────────────── */
    function openSearch() {
        $('search-overlay').classList.remove('opacity-0', 'pointer-events-none');
        setTimeout(() => $('search-input')?.focus(), 100);
    }
    $('close-search').addEventListener('click', () => {
        $('search-overlay').classList.add('opacity-0', 'pointer-events-none');
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            $('search-overlay').classList.add('opacity-0', 'pointer-events-none');
            closeQV();
        }
    });

    const searchInput = $('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const q = searchInput.value.trim().toLowerCase();
            const results = $('search-results');
            results.innerHTML = '';
            if (q.length < 2) return;
            const allProducts = window.PRODUCTS || [];
            const matches = allProducts.filter(p =>
                p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
            ).slice(0, 8);
            if (matches.length === 0) {
                results.innerHTML = `<p class="text-[#C6C6C6]/30 text-sm font-['Inter'] text-center pt-4">No results found.</p>`;
                return;
            }
            matches.forEach(p => {
                const a = document.createElement('a');
                a.href = `product_details.html?id=${p.id}`;
                a.className = 'flex items-center gap-4 p-3 hover:bg-white/5 transition-colors group';
                a.innerHTML = `
                    <img src="${p.image}" class="w-12 h-12 object-cover grayscale opacity-60 flex-shrink-0">
                    <div>
                        <p class="font-['Noto_Serif'] text-white text-sm group-hover:text-[#C6C6C6] transition-colors">${p.name}</p>
                        <p class="font-['Inter'] text-[#C6C6C6]/40 text-xs tracking-widest uppercase">${p.category} · ${fmt(p.price)}</p>
                    </div>
                `;
                results.appendChild(a);
            });
        });
    }

    /* ─── 6. Quick-View Modal ──────────────────────────────── */
    function openQV(product) {
        $('qv-img').src = product.image;
        $('qv-img').alt = product.name;
        $('qv-cat').textContent = product.category;
        $('qv-name').textContent = product.name;
        $('qv-price').textContent = fmt(product.price);
        $('qv-desc').textContent = product.description;
        $('qv-material').textContent = product.material;
        $('qv-weight').textContent = product.weight;
        $('qv-purity').textContent = product.purity;
        $('qv-finish').textContent = product.finish;
        $('qv-add-cart').dataset.id = product.id;
        $('qv-view-btn').href = `product_details.html?id=${product.id}`;
        $('qv-overlay').classList.remove('opacity-0', 'pointer-events-none');
        const modal = $('qv-modal');
        modal.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
    }
    function closeQV() {
        $('qv-overlay').classList.add('opacity-0', 'pointer-events-none');
        const modal = $('qv-modal');
        modal.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
    }
    $('close-qv').addEventListener('click', closeQV);
    $('qv-overlay').addEventListener('click', closeQV);

    $('qv-add-cart').addEventListener('click', () => {
        const id = $('qv-add-cart').dataset.id;
        const product = (window.PRODUCTS || []).find(p => p.id === id);
        if (!product) return;
        Cart.add(product);
        showToast(`"${product.name}" added to your collection`);
        document.dispatchEvent(new Event('cart-updated'));
        closeQV();
    });

    /* ─── 7. Toast notification ──────────────────────────── */
    function showToast(msg) {
        const toast = $('toast');
        $('toast-msg').textContent = msg;
        toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        setTimeout(() => toast.classList.add('opacity-0', 'translate-y-4'), 3000);
    }

    /* ─── 8. Collections Page: Filters + Animated Product Grid ── */
    const allProducts = window.PRODUCTS || [];

    if (window.location.pathname.includes('collections.html')) {
        const productGrid = $('product-grid');
        const paginationContainer = $('pagination-container');
        const activeFiltersBar = $('active-filters-bar');
        const itemsPerPage = 12;
        let currentPage = 1;

        // ── Filter state ──
        let activeCategory = 'All';
        let maxPrice = 200000;
        let filteredProducts = [...allProducts];

        // ── Sidebar elements ──
        const categoryItems = document.querySelectorAll('[data-category]');
        const priceRange = $('price-range');
        const priceDisplay = $('price-display');

        /* ── Active Filter Tags ── */
        function renderActiveFilters() {
            if (!activeFiltersBar) return;
            activeFiltersBar.innerHTML = '';

            const tags = [];
            if (activeCategory !== 'All') tags.push({ label: `Category: ${activeCategory}`, type: 'cat' });
            if (maxPrice < 200000) tags.push({ label: `Under ${fmt(maxPrice)}`, type: 'price' });

            if (tags.length === 0) {
                activeFiltersBar.classList.add('hidden');
                return;
            }
            activeFiltersBar.classList.remove('hidden');

            tags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'filter-tag-anim inline-flex items-center gap-1.5 bg-blue-900/40 border border-blue-500/30 text-blue-200 font-["Inter"] text-[0.65rem] tracking-widest uppercase px-3 py-1.5 cursor-pointer hover:bg-red-900/30 hover:border-red-500/30 hover:text-red-200 transition-all duration-300';
                span.innerHTML = `${tag.label} <span class="material-symbols-outlined text-xs leading-none">close</span>`;
                span.addEventListener('click', () => {
                    if (tag.type === 'cat') {
                        activeCategory = 'All';
                        setActiveCategoryUI(null);
                    } else {
                        maxPrice = 200000;
                        if (priceRange) priceRange.value = 200000;
                        if (priceDisplay) priceDisplay.textContent = '₹2,00,000+';
                    }
                    applyFilters();
                });
                activeFiltersBar.appendChild(span);
            });
        }

        /* ── Highlight active sidebar category ── */
        function setActiveCategoryUI(selectedEl) {
            categoryItems.forEach(el => {
                el.classList.remove('active-cat');
                const span = el.querySelector('span:first-child');
                if (span) {
                    span.classList.remove('text-white', 'font-semibold');
                    span.classList.add('text-on-surface-variant');
                }
            });
            if (selectedEl) {
                selectedEl.classList.add('active-cat');
                const span = selectedEl.querySelector('span:first-child');
                if (span) {
                    span.classList.add('text-white', 'font-semibold');
                    span.classList.remove('text-on-surface-variant');
                }
            } else {
                // Highlight "All Pieces"
                const allEl = document.querySelector('[data-category="All"]');
                if (allEl) {
                    allEl.classList.add('active-cat');
                    const span = allEl.querySelector('span:first-child');
                    if (span) {
                        span.classList.add('text-white', 'font-semibold');
                        span.classList.remove('text-on-surface-variant');
                    }
                }
            }
        }

        /* ── Apply Filters & Re-render ── */
        function applyFilters() {
            filteredProducts = allProducts.filter(p => {
                const catMatch = activeCategory === 'All' || p.category === activeCategory;
                const priceMatch = p.price <= maxPrice;
                return catMatch && priceMatch;
            });
            currentPage = 1;
            renderProductsPage(currentPage);
            renderActiveFilters();
        }

        // Category click
        categoryItems.forEach(el => {
            el.addEventListener('click', () => {
                activeCategory = el.dataset.category;
                setActiveCategoryUI(activeCategory === 'All' ? null : el);
            });
        });

        // Price slider live display
        if (priceRange) {
            priceRange.addEventListener('input', () => {
                maxPrice = parseInt(priceRange.value);
                if (priceDisplay) {
                    priceDisplay.textContent = maxPrice >= 200000 ? '₹2,00,000+' : fmt(maxPrice);
                }
            });
        }

        // Apply button
        const applyBtn = $('apply-filters-btn');
        if (applyBtn) applyBtn.addEventListener('click', applyFilters);

        // Clear button
        const clearBtn = $('clear-filters-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                activeCategory = 'All';
                maxPrice = 200000;
                if (priceRange) priceRange.value = 200000;
                if (priceDisplay) priceDisplay.textContent = '₹2,00,000+';
                setActiveCategoryUI(null);
                applyFilters();
            });
        }

        /* ── Product Card Renderer with staggered animation ── */
        function renderProductsPage(page) {
            if (!productGrid) return;

            // Fade out grid before re-render
            productGrid.style.transition = 'opacity 0.2s ease';
            productGrid.style.opacity = '0';

            setTimeout(() => {
                productGrid.innerHTML = '';
                productGrid.style.opacity = '1';

                const start = (page - 1) * itemsPerPage;
                const pageItems = filteredProducts.slice(start, start + itemsPerPage);

                if (pageItems.length === 0) {
                    productGrid.innerHTML = `
                        <div class="col-span-3 py-24 text-center text-[#C6C6C6]/40 font-['Inter'] tracking-widest uppercase text-sm">
                            No pieces match your filters.
                        </div>`;
                    renderPagination();
                    return;
                }

                pageItems.forEach((prod, index) => {
                    const marginClass = (index % 3 === 1) ? 'md:pt-12' : '';
                    const article = document.createElement('article');
                    // Stagger: each card delayed by 60ms × index (cap at 8 for large grids)
                    const delay = Math.min(index, 8) * 60;
                    article.className = `group cursor-pointer product-card-anim ${marginClass}`;
                    article.style.animationDelay = `${delay}ms`;

                    article.innerHTML = `
                        <div class="relative aspect-[4/5] overflow-hidden mb-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-[#060d1f]">
                            <div class="absolute inset-0 bg-[#0a1f5c] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>
                            <img class="relative z-10 w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-[30%] group-hover:scale-110 group-hover:brightness-110 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                                src="${prod.image}" alt="${prod.name}" loading="lazy" />
                            <div class="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 border border-blue-400/20 transition-opacity duration-500 pointer-events-none"></div>
                            <div class="absolute bottom-0 left-0 right-0 h-1/3 z-20 bg-gradient-to-t from-[#0a1f5c]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                            <!-- Overlay buttons -->
                            <div class="absolute inset-0 z-30 flex flex-col items-center justify-end pb-5 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button class="qv-btn bg-[#00091f]/80 backdrop-blur-sm border border-white/20 text-white font-['Inter'] text-[0.6rem] tracking-[0.15em] uppercase px-5 py-2.5 hover:bg-white hover:text-[#00091f] transition-all" data-prod-id="${prod.id}">
                                    <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-sm">visibility</span>Quick View</span>
                                </button>
                                <button class="atc-btn bg-blue-700/90 backdrop-blur-sm border border-blue-500/40 text-white font-['Inter'] text-[0.6rem] tracking-[0.15em] uppercase px-5 py-2.5 hover:bg-blue-600 transition-all" data-prod-id="${prod.id}">
                                    <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-sm">shopping_bag</span>Add to Collection</span>
                                </button>
                            </div>
                        </div>
                        <div class="space-y-1">
                            <h2 class="font-headline text-base md:text-lg text-white group-hover:silver-gradient-text transition-all duration-300">${prod.name}</h2>
                            <p class="font-label text-[0.65rem] tracking-[0.15em] text-on-surface-variant uppercase">${prod.category} • ${fmt(prod.price)}</p>
                        </div>
                    `;

                    // Navigate to product detail (not when clicking action buttons)
                    article.addEventListener('click', e => {
                        if (e.target.closest('.qv-btn') || e.target.closest('.atc-btn')) return;
                        window.location.href = `product_details.html?id=${prod.id}`;
                    });

                    productGrid.appendChild(article);
                });

                // Bind Quick View buttons
                productGrid.querySelectorAll('.qv-btn').forEach(btn => {
                    btn.addEventListener('click', e => {
                        e.stopPropagation();
                        const p = (window.PRODUCTS || []).find(x => x.id === btn.dataset.prodId);
                        if (p) openQV(p);
                    });
                });

                // Bind Add to Cart buttons
                productGrid.querySelectorAll('.atc-btn').forEach(btn => {
                    btn.addEventListener('click', e => {
                        e.stopPropagation();
                        const p = (window.PRODUCTS || []).find(x => x.id === btn.dataset.prodId);
                        if (!p) return;
                        Cart.add(p);
                        showToast(`"${p.name}" added to your collection`);
                        document.dispatchEvent(new Event('cart-updated'));
                        btn.innerHTML = `<span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-sm">check</span>Added!</span>`;
                        setTimeout(() => {
                            btn.innerHTML = `<span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-sm">shopping_bag</span>Add to Collection</span>`;
                        }, 1500);
                    });
                });

                renderPagination();
            }, 200); // matches fade-out duration
        }

        /* ── Pagination ── */
        function renderPagination() {
            if (!paginationContainer) return;
            const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
            paginationContainer.innerHTML = '';
            if (totalPages <= 1) return;

            for (let i = 1; i <= totalPages; i++) {
                if (totalPages > 5 && i > 3 && i < totalPages) {
                    if (i === 4) {
                        const dots = document.createElement('span');
                        dots.className = 'text-outline';
                        dots.innerText = '...';
                        paginationContainer.appendChild(dots);
                    }
                    continue;
                }
                const span = document.createElement('span');
                span.innerText = i < 10 ? '0' + i : '' + i;
                if (i === currentPage) {
                    span.className = 'text-white border-b border-white pb-1 cursor-default';
                } else {
                    span.className = 'text-outline hover:text-white transition-colors cursor-pointer';
                    span.onclick = () => {
                        currentPage = i;
                        renderProductsPage(i);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    };
                }
                paginationContainer.appendChild(span);
            }
        }

        // Arrow pagination
        document.querySelector('.material-symbols-outlined.cursor-pointer[class*="arrow_back"]') ||
        document.querySelectorAll('.material-symbols-outlined.cursor-pointer').forEach(icon => {
            if (icon.textContent.trim() === 'arrow_back') {
                icon.addEventListener('click', () => {
                    if (currentPage > 1) { currentPage--; renderProductsPage(currentPage); window.scrollTo({ top: 0, behavior: 'smooth' }); }
                });
            }
            if (icon.textContent.trim() === 'arrow_forward') {
                icon.addEventListener('click', () => {
                    const total = Math.ceil(filteredProducts.length / itemsPerPage);
                    if (currentPage < total) { currentPage++; renderProductsPage(currentPage); window.scrollTo({ top: 0, behavior: 'smooth' }); }
                });
            }
        });

        // Set "All Pieces" as default active on load
        setActiveCategoryUI(null);
        renderProductsPage(1);

    } else if (window.location.pathname.includes('product_details.html')) {
        /* ── Product Details Page ── */
        const params = new URLSearchParams(window.location.search);
        const pid = params.get('id') || (allProducts[0] && allProducts[0].id);
        const product = allProducts.find(p => p.id === pid) || allProducts[0];
        if (!product) return;

        const set = (id, val) => { const el = $(id); if (el) el.innerText = val; };
        const setImg = (id, src) => { const el = $(id); if (el) el.src = src; };
        set('detail-title', product.name);
        set('detail-price', fmt(product.price));
        set('detail-desc', product.description);
        setImg('detail-main-img', product.image);
        set('detail-material', product.material);
        set('detail-weight', product.weight);
        set('detail-purity', product.purity);
        set('detail-finish', product.finish);

        const addToCartBtn = $('detail-add-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                Cart.add(product);
                showToast(`"${product.name}" added to your collection`);
                document.dispatchEvent(new Event('cart-updated'));
                addToCartBtn.innerHTML = `<span class="material-symbols-outlined text-base">check</span> Added to Collection`;
                setTimeout(() => {
                    addToCartBtn.innerHTML = `<span class="material-symbols-outlined text-base">shopping_bag</span> Add to Collection`;
                }, 2000);
            });
        }

        const buyNowBtn = $('detail-buy-now');
        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', () => {
                Cart.save([{ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 }]);
                document.dispatchEvent(new Event('cart-updated'));
                openCart();
            });
        }

        const relatedGrid = $('related-products-grid');
        if (relatedGrid) {
            relatedGrid.innerHTML = '';
            const others = allProducts.filter(p => p.id !== product.id);
            const shuffled = others.sort(() => 0.5 - Math.random()).slice(0, 3);
            shuffled.forEach((prod, index) => {
                const mtClass = index === 1 ? 'md:mt-12' : '';
                const div = document.createElement('div');
                div.className = `group cursor-pointer product-card-anim ${mtClass}`;
                div.style.animationDelay = `${index * 80}ms`;
                div.innerHTML = `
                    <div class="aspect-[3/4] overflow-hidden relative mb-5 bg-[#060d1f]">
                        <div class="absolute inset-0 bg-[#0a1f5c] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>
                        <img class="relative z-10 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-[30%] group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            src="${prod.image}" alt="${prod.name}" />
                        <div class="absolute bottom-0 left-0 right-0 h-1/3 z-20 bg-gradient-to-t from-[#0a1f5c]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    </div>
                    <div class="space-y-1">
                        <h3 class="text-lg font-headline text-white/90 group-hover:text-blue-200 transition-colors duration-300">${prod.name}</h3>
                        <p class="text-secondary/60 font-body text-xs tracking-widest uppercase">${fmt(prod.price)}</p>
                    </div>
                `;
                div.addEventListener('click', () => window.location.href = `product_details.html?id=${prod.id}`);
                relatedGrid.appendChild(div);
            });
        }
    } else {
        // Home / other pages
        document.querySelectorAll('img.grayscale').forEach((img, i) => {
            const container = img.closest('.group');
            if (container && allProducts[i]) {
                container.style.cursor = 'pointer';
                container.addEventListener('click', () => window.location.href = `product_details.html?id=${allProducts[i].id}`);
            }
        });
    }

    /* ─── 9. Init ────────────────────────────────────── */
    updateCartBadges();
});