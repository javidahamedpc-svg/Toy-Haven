const cartContainer = document.getElementById("cartContainer");
const cartTotal = document.getElementById("cartTotal");
const clearCartBtn = document.getElementById("clearCartBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {

    cartContainer.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "0";
        return;
    }

    cart.forEach(function(item) {

        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");

        const subtotal = item.price * item.quantity;

        total += subtotal;

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">

            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>Price: Rs. ${item.price}</p>
            <div class="quantity-controls">
                <button class="minus-btn" data-id="${item.id}">−</button>

                <span>${item.quantity}</span>

                <button class="plus-btn" data-id="${item.id}">+</button>
            </div>

            <p>Subtotal: Rs. ${subtotal}</p>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    cartTotal.textContent = total;
}

displayCart();

cartContainer.addEventListener("click", function(event) {

    const productId = Number(event.target.getAttribute("data-id"));

    if (event.target.classList.contains("plus-btn")) {

        const product = cart.find(function(item) {
            return item.id === productId;
        });

        product.quantity += 1;

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();
    }

    if (event.target.classList.contains("minus-btn")) {

        const product = cart.find(function(item) {
            return item.id === productId;
        });

        if (product.quantity > 1) {
            product.quantity -= 1;
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();
    }

});

clearCartBtn.addEventListener("click", function() {

    cart = [];

    localStorage.removeItem("cart");

    displayCart();

});