const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", function() {

    mainNav.classList.toggle("show");

    const isOpen = mainNav.classList.contains("show");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

});

const heroTitle = document.getElementById("heroTitle");
const heroText = document.getElementById("heroText");

if (heroTitle && heroText) {

const heroSlides = [
    {
        title: "Discover Amazing Figurines",
        text: "Explore collectible figurines for fans and collectors.",
        image: "images/hero-figurine.jpg"
    },
    {
        title: "Explore Fun Toys",
        text: "Find exciting toys for children and hobby lovers.",
        image: "images/hero-toys.jpg"
    },
    {
        title: "Enjoy Board Games",
        text: "Bring friends and family together with entertaining board games.",
        image: "images/hero=boardgames.jpg"
    },
    {
        title: "Collect Diecast Cars",
        text: "Discover detailed diecast model cars for collectors.",
        image: "images/hero-cars.jpg"
    }
];

    let currentSlide = 0;

    setInterval(function() {

        currentSlide++;

        if (currentSlide >= heroSlides.length) {
            currentSlide = 0;
        }

        heroTitle.textContent = heroSlides[currentSlide].title;
        heroText.textContent = heroSlides[currentSlide].text;
        document.querySelector(".hero").style.backgroundImage =
    `url("${heroSlides[currentSlide].image}")`;

    }, 3000);
}


if ("serviceWorker" in navigator) {

    window.addEventListener("load", function() {

        navigator.serviceWorker
            .register("service-worker.js")
            .then(function() {
                console.log("Service Worker registered successfully");
            })
            .catch(function(error) {
                console.log("Service Worker registration failed:", error);
            });

    });

}


const subscribeBtn = document.getElementById("subscribeBtn");
const newsletterEmail = document.getElementById("newsletterEmail");

if (subscribeBtn && newsletterEmail) {
    subscribeBtn.addEventListener("click", function () {
        const email = newsletterEmail.value.trim();

        if (email === "") {
            alert("Please enter your email address.");
        } else if (!newsletterEmail.checkValidity()) {
            alert("Please enter a valid email address.");
        } else {
            alert("Thank you for subscribing to Toy Haven!");
            newsletterEmail.value = "";
        }
    });
}