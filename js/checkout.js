const orderSummary = document.getElementById("orderSummary");
const checkoutTotal = document.getElementById("checkoutTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayOrderSummary() {

    orderSummary.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        orderSummary.innerHTML = "<p>Your cart is empty.</p>";
        checkoutTotal.textContent = "0";
        return;
    }

    cart.forEach(function(item) {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        const orderItem = document.createElement("div");

        orderItem.classList.add("order-item");

        orderItem.innerHTML = `
            <p>
                ${item.name} × ${item.quantity}
                - Rs. ${subtotal}
            </p>
        `;

        orderSummary.appendChild(orderItem);
    });

    checkoutTotal.textContent = total;
}

displayOrderSummary();

const checkoutForm = document.getElementById("checkoutForm");
const checkoutMessage = document.getElementById("checkoutMessage");

checkoutForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();

    const payment = document.querySelector(
        'input[name="payment"]:checked'
    );

    if (fullName === "" || email === "" || address === "") {
        checkoutMessage.textContent = "Please fill in all fields.";
        return;
    }

    if (!email.includes("@")) {
        checkoutMessage.textContent = "Please enter a valid email address.";
        return;
    }

    if (!payment) {
        checkoutMessage.textContent = "Please select a payment method.";
        return;
    }

    if (cart.length === 0) {
        checkoutMessage.textContent = "Your cart is empty.";
        return;
    }

    const order = {
    customerName: fullName,
    email: email,
    address: address,
    paymentMethod: payment.value,
    items: cart,
    total: Number(checkoutTotal.textContent),
    date: new Date().toLocaleString()
};

let orderHistory =
    JSON.parse(localStorage.getItem("orderHistory")) || [];

orderHistory.push(order);

localStorage.setItem(
    "orderHistory",
    JSON.stringify(orderHistory)
);

localStorage.removeItem("cart");

cart = [];

displayOrderSummary();

checkoutForm.reset();

checkoutMessage.textContent =
    "Order placed successfully! Thank you for shopping with Toy Haven.";
});