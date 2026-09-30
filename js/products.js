const products = [
    {
        id: 1,
        name: "Batman Figurine",
        category: "Figurines",
        price: 4500,
        image: "images/batman.jpj.webp"
    },

    {
        id: 2,
        name: "Remote Control Car",
        category: "Toys",
        price: 6500,
        image: "images/toy-car.jpj.avif"
    },

    {
        id: 3,
        name: "Family Board Game",
        category: "Board Games",
        price: 5000,
        image: "images/family-game.jpj.jpg"
    },

    {
        id: 4,
        name: "Hot Wheels Car",
        category: "Diecast Cars",
        price: 3200,
        image: "images/hot-weel.jpj.jpg"
    },

    {
        id: 5,
        name: "Iron Man Figurine",
        category: "Figurines",
        price: 5200,
        image: "images/iornman.jpg"
    },

    {
        id: 6,
        name: "Spider-Man Figurine",
        category: "Figurines",
        price: 4800,
        image: "images/spiderman.jpg"
    },

    {
        id: 7,
        name: "Toy Drone",
        category: "Toys",
        price: 8500,
        image: "images/drone.jpg"
    },

    {
        id: 8,
        name: "Robot Toy",
        category: "Toys",
        price: 7200,
        image: "images/robot.png"
    },

    {
        id: 9,
        name: "Monopoly Board Game",
        category: "Board Games",
        price: 6200,
        image: "images/monopoly.webp"
    },

    {
        id: 10,
        name: "Chess Set",
        category: "Board Games",
        price: 4300,
        image: "images/chess.jpg"
    },

    {
        id: 11,
        name: "Lamborghini Model Car",
        category: "Diecast Cars",
        price: 5500,
        image: "images/lamborgini.jpg"
    },

    {
        id: 12,
        name: "Porsche Model Car",
        category: "Diecast Cars",
        price: 5800,
        image: "images/porsche.webp"
    }
];

const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");

function displayProducts(productList) {

    productsContainer.innerHTML = "";

    productList.forEach(function(product) {

        const productCard = document.createElement("div");

        productCard.classList.add("product-card");

productCard.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>Category: ${product.category}</p>
    <p>Price: Rs. ${product.price}</p>

    <button class="add-cart-btn" data-id="${product.id}">
        Add to Cart
    </button>
 
    <button class="add-wishlist-btn" data-id="${product.id}">
        Add to Wishlist
    </button>
`;
        productCard.addEventListener("click", function() {

        modalImage.src = product.image;
        modalName.textContent = product.name;
        modalCategory.textContent = "Category: " + product.category;
        modalPrice.textContent = "Price: Rs. " + product.price;

        productModal.style.display = "flex";
    });
        productsContainer.appendChild(productCard);

        const addCartButton = productCard.querySelector(".add-cart-btn");

        addCartButton.addEventListener("click", function(event) {

        event.stopPropagation();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(function(item) {
        return item.id === product.id;
    });

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(product.name + " added to cart!");
});

const wishlistButton = productCard.querySelector(".add-wishlist-btn");

wishlistButton.addEventListener("click", function(event) {

    event.stopPropagation();

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadyExists = wishlist.find(function(item) {
        return item.id === product.id;
    });

    if (alreadyExists) {
        alert(product.name + " is already in your wishlist!");
        return;
    }

    wishlist.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image
    });

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    alert(product.name + " added to wishlist!");
});
    });
}

displayProducts(products);

searchInput.addEventListener("input", function() {

    const searchText = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(function(product) {
        return product.name.toLowerCase().includes(searchText);
    });

    displayProducts(filteredProducts);
});



const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const selectedCategory = button.getAttribute("data-category");

        if (selectedCategory === "All") {
            displayProducts(products);
        } else {
            const filteredProducts = products.filter(function(product) {
                return product.category === selectedCategory;
            });

            displayProducts(filteredProducts);
        }
    });
});

const productModal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");
const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalCategory = document.getElementById("modalCategory");
const modalPrice = document.getElementById("modalPrice");

closeModal.addEventListener("click", function() {
    productModal.style.display = "none";
});

productModal.addEventListener("click", function(event) {

    if (event.target === productModal) {
        productModal.style.display = "none";
    }

});

const featuredProductContainer = document.getElementById("featuredProduct");

const today = new Date();

const productIndex = today.getDate() % products.length;

const featuredProduct = products[productIndex];

featuredProductContainer.innerHTML = `
    <div class="product-card">
        <img src="${featuredProduct.image}" alt="${featuredProduct.name}">
        <h3>${featuredProduct.name}</h3>
        <p>Category: ${featuredProduct.category}</p>
        <p>Price: Rs. ${featuredProduct.price}</p>
    </div>
`;