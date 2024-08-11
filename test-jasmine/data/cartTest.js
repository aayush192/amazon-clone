import { addToCart, removeFromCart, updateDeliveryOption, emptyCart, loadFromStorage, cartQuantity } from './yourModuleFileName';
describe('Cart Management', function() {
    let originalLocalStorage;
  
    beforeAll(function() {
      // Save the original localStorage
      originalLocalStorage = window.localStorage;
    });
  
    beforeEach(function() {
      // Mock localStorage
      const mockLocalStorage = {
        storage: {},
        getItem: function(key) {
          return this.storage[key] || null;
        },
        setItem: function(key, value) {
          this.storage[key] = value;
        },
        removeItem: function(key) {
          delete this.storage[key];
        },
        clear: function() {
          this.storage = {};
        }
      };
  
      spyOn(window, 'localStorage').and.callFake(mockLocalStorage);
      localStorage.clear();
    });
  
    afterAll(function() {
      // Restore the original localStorage
      window.localStorage = originalLocalStorage;
    });
  
    it('should add an item to the cart', function() {
      addToCart('product1');
      expect(cart.length).toBe(1);
      expect(cart[0].productId).toBe('product1');
      expect(cart[0].quantity).toBe(1);
      expect(localStorage.getItem('cartitem')).toContain('"productId":"product1"');
    });
  
    it('should update the quantity of an existing item', function() {
      addToCart('product1');
      addToCart('product1');
      expect(cart[0].quantity).toBe(2);
      expect(localStorage.getItem('cartitem')).toContain('"quantity":2');
    });
  
    it('should remove an item from the cart', function() {
      addToCart('product1');
      removeFromCart('product1');
      expect(cart.length).toBe(0);
      expect(localStorage.getItem('cartitem')).toBe('[]');
    });
  
    it('should update the delivery option of an item', function() {
      addToCart('product1');
      updateDeliveryOption('product1', '2');
      expect(cart[0].deliveryOptionId).toBe('2');
      expect(localStorage.getItem('cartitem')).toContain('"deliveryOptionId":"2"');
    });
  
    it('should empty the cart', function() {
      addToCart('product1');
      emptyCart();
      expect(cart.length).toBe(0);
      expect(localStorage.getItem('cartitem')).toBe('[]');
    });
  
    it('should load cart from localStorage', function() {
      localStorage.setItem('cartitem', JSON.stringify([{ productId: 'product1', quantity: 1, deliveryOptionId: '1' }]));
      loadFromStorage();
      expect(cart.length).toBe(1);
      expect(cart[0].productId).toBe('product1');
    });
  
    it('should calculate the total quantity in the cart', function() {
      addToCart('product1');
      addToCart('product2');
      addToCart('product1');
      expect(cartQuantity()).toBe(3);
    });
  });
  