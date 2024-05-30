document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.querySelectorAll('.cart-item');
    const subtotalElement = document.getElementById('subtotal');
    const discountElement = document.getElementById('discount');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    let subtotal = 0;
    let discount = 0;
    let tax = 0;
    let total = 0;
    function updateTotal() {
      total = subtotal - discount + tax;
      totalElement.textContent = '$' + total.toFixed(2);
    }
    cartItems.forEach(function(item) {
      const quantityElement = item.querySelector('.quantity');
      const priceElement = item.querySelector('.item-price');
      const removeButton = item.querySelector('.remove-btn');
      const increaseButton = item.querySelector('.quantity-btn.increase');
      const decreaseButton = item.querySelector('.quantity-btn.decrease');
      const price = parseFloat(priceElement.textContent.replace('$', ''));
      const maxQuantity = 10; 
      increaseButton.addEventListener('click', function() {
        let quantity = parseInt(quantityElement.textContent);
        if (quantity < maxQuantity) { 
          quantity++;
          quantityElement.textContent = quantity;
          subtotal += price;
          updateTotal();
        } else {
          alert('Ви досягли максимальної кількості для цього товару.');
        }
      });
      decreaseButton.addEventListener('click', function() {
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
          quantity--;
          quantityElement.textContent = quantity;
          subtotal -= price;
          updateTotal();
        } else {
          item.remove();
          subtotal -= price;
          updateTotal();
        }
      });
      removeButton.addEventListener('click', function() {
        const itemSubtotal = parseFloat(quantityElement.textContent) * price;
        subtotal -= itemSubtotal;
        item.remove();
        updateTotal();
      });
      subtotal += price * parseInt(quantityElement.textContent);
      updateTotal();
    });
    const applyPromoButton = document.querySelector('.promo-code button');
    applyPromoButton.addEventListener('click', function() {
      const promoCodeInput = document.querySelector('.promo-code input');
      const promoCode = promoCodeInput.value.trim().toLowerCase();
      if (promoCode === 'discount20') {
        discount = subtotal * 0.2;
        discountElement.textContent = '($' + discount.toFixed(2) + ')';
        updateTotal();
        promoCodeInput.value = '';
      } else {
        alert('Недійсний промокод');
      }
    });
    document.querySelectorAll('.item-quantity').forEach(function(itemQuantity) {
      const quantityElement = itemQuantity.querySelector('.quantity');
      const priceElement = itemQuantity.parentElement.querySelector('.item-price');
      const price = parseFloat(priceElement.textContent.replace('$', ''));
      quantityElement.addEventListener('change', function() {
        let quantity = parseInt(quantityElement.value);
        if (isNaN(quantity) || quantity < 1) {
          quantity = 1;
          quantityElement.value = 1;
        } else if (quantity > maxQuantity) {
          quantity = maxQuantity;
          quantityElement.value = maxQuantity;
          alert('Ви досягли максимальної кількості для цього товару.');
        }
        const itemSubtotal = quantity * price;
        const itemID = itemQuantity.parentElement.getAttribute('data-id');
        subtotal -= parseFloat(quantityElement.getAttribute('data-quantity')) * price;
        subtotal += itemSubtotal;
        quantityElement.setAttribute('data-quantity', quantity);
        updateTotal();
      });
    });
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(function(item) {
      const addToCartButton = item.querySelector('.add-to-cart-btn');
      const priceElement = item.querySelector('.item-price');
      const price = parseFloat(priceElement.textContent.replace('$', ''));
      addToCartButton.addEventListener('click', function() {
        const itemID = item.getAttribute('data-id');
        const cartItem = document.querySelector('.cart-item[data-id="' + itemID + '"]');
        if (cartItem) {
          const quantityElement = cartItem.querySelector('.quantity');
          let quantity = parseInt(quantityElement.textContent);
          if (quantity < maxQuantity) {
            quantity++;
            quantityElement.textContent = quantity;
            subtotal += price;
            updateTotal();
          } else {
            alert('Ви досягли максимальної кількості для цього товару.');
          }
        } else {
        }
      });
    });
  function decreaseQuantity(productId) {
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
    } else {
      cart = cart.filter(item => item.productId !== productId);
      const cartItemElement = document.querySelector(`[data-product-id="${productId}"]`);
      cartItemElement.remove();
    }
    updateCartTotal(); 
  }
  function removeItemFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    const cartItemElement = document.querySelector(`[data-product-id="${productId}"]`);
    cartItemElement.remove();
    updateCartTotal(); 
  }
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.closest('.cart-item').dataset.productId;
      removeItemFromCart(productId);
    });
  });
  });