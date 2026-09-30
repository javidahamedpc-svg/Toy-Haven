const wishlistContainer = document.getElementById("wishlistContainer");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function displayWishlist() {

    wishlistContainer.innerHTML = "";

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
        return;
    }

    wishlist.forEach(function(item) {

        const wishlistItem = document.createElement("div");

        wishlistItem.classList.add("wishlist-item");

        wishlistItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">

            <div class="wishlist-item-info">
                <h3>${item.name}</h3>
                <p>Category: ${item.category}</p>
                <p>Price: Rs. ${item.price}</p>

<label>Status:</label>

<select class="wishlist-status" data-id="${item.id}">
    <option value="Interested"
        ${item.status === "Interested" ? "selected" : ""}>
        Interested
    </option>

    <option value="Owned"
        ${item.status === "Owned" ? "selected" : ""}>
        Owned
    </option>

    <option value="Not Interested"
        ${item.status === "Not Interested" ? "selected" : ""}>
        Not Interested
    </option>
</select>

<button class="remove-wishlist-btn" data-id="${item.id}">
    Remove
</button>
        `;

        wishlistContainer.appendChild(wishlistItem);
    });
}

displayWishlist();

wishlistContainer.addEventListener("click", function(event) {

    if (event.target.classList.contains("remove-wishlist-btn")) {

        const productId = Number(
            event.target.getAttribute("data-id")
        );

        wishlist = wishlist.filter(function(item) {
            return item.id !== productId;
        });

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        displayWishlist();
    }

});

wishlistContainer.addEventListener("change", function(event) {

    if (event.target.classList.contains("wishlist-status")) {

        const productId = Number(
            event.target.getAttribute("data-id")
        );

        const product = wishlist.find(function(item) {
            return item.id === productId;
        });

        product.status = event.target.value;

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );
    }

});