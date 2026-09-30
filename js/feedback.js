const feedbackForm = document.getElementById("feedbackForm");
const feedbackMessage = document.getElementById("feedbackMessage");

feedbackForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("feedbackName").value.trim();
    const email = document.getElementById("feedbackEmail").value.trim();
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("feedbackComment").value.trim();

    if (name === "" || email === "" || rating === "" || comment === "") {
        feedbackMessage.textContent = "Please fill in all fields.";
        return;
    }

    if (!email.includes("@")) {
        feedbackMessage.textContent = "Please enter a valid email address.";
        return;
    }

    const feedback = {
    name: name,
    email: email,
    rating: rating,
    comment: comment,
    date: new Date().toLocaleString()
};

let feedbackList =
    JSON.parse(localStorage.getItem("feedbackList")) || [];

feedbackList.push(feedback);

localStorage.setItem(
    "feedbackList",
    JSON.stringify(feedbackList)
);

feedbackMessage.textContent = "Thank you for your feedback!";

feedbackForm.reset();

displayFeedback();
});

const feedbackContainer =
    document.getElementById("feedbackContainer");

function displayFeedback() {

    const feedbackList =
        JSON.parse(localStorage.getItem("feedbackList")) || [];

    feedbackContainer.innerHTML = "";

    if (feedbackList.length === 0) {
        feedbackContainer.innerHTML =
            "<p>No feedback submitted yet.</p>";
        return;
    }

    feedbackList.forEach(function(item) {

        const feedbackItem = document.createElement("div");

        feedbackItem.classList.add("feedback-item");

        feedbackItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Rating: ${item.rating}/5</p>
            <p>${item.comment}</p>
            <small>${item.date}</small>
        `;

        feedbackContainer.appendChild(feedbackItem);
    });
}

displayFeedback();

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function(question) {

    question.addEventListener("click", function() {

        const answer = question.nextElementSibling;

        if (answer.style.display === "block") {
            answer.style.display = "none";
        } else {
            answer.style.display = "block";
        }

    });

});