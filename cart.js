/* =====================================================
   Achija Jewellers — Cart State (localStorage)
   ===================================================== */
const CART_KEY = 'achija_cart';

const Cart = {
    get() {
        try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
        catch { return []; }
    },
    save(items) {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
    },
    add(product) {
        const items = this.get();
        const existing = items.find(i => i.id === product.id);
        if (existing) {
            existing.qty += 1;
        } else {
            items.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
        }
        this.save(items);
        return items;
    },
    remove(productId) {
        const items = this.get().filter(i => i.id !== productId);
        this.save(items);
        return items;
    },
    updateQty(productId, delta) {
        const items = this.get();
        const item = items.find(i => i.id === productId);
        if (item) {
            item.qty = Math.max(1, item.qty + delta);
            this.save(items);
        }
        return items;
    },
    total() {
        return this.get().reduce((sum, i) => sum + i.price * i.qty, 0);
    },
    count() {
        return this.get().reduce((sum, i) => sum + i.qty, 0);
    }
};
window.Cart = Cart; 
