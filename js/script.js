const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


const processItems = document.querySelectorAll(".process-item");
const processTriggers = document.querySelectorAll(".process-trigger");

processTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
        const item = trigger.parentElement;

        processItems.forEach((card) => {
            if (card !== item) {
                card.classList.remove("active");
            }
        });

        item.classList.toggle("active");
    });
});

const faqSearch = document.getElementById("faqSearch");
const faqItems = document.querySelectorAll(".faq-list details");

if (faqSearch) {
  faqSearch.addEventListener("input", () => {
    const value = faqSearch.value.trim().toLowerCase();

    faqItems.forEach((item) => {
      const question = item.querySelector("summary").textContent.toLowerCase();
      const answer = item.querySelector("p").textContent.toLowerCase();
      const isMatch = question.includes(value) || answer.includes(value);

      if (isMatch) {
        item.style.display = "block";
        if (value !== "") {
          item.open = true;
        }
      } else {
        item.style.display = "none";
        item.open = false;
      }

      if (value === "") {
        item.style.display = "block";
        item.open = false;
      }
    });
  });
}
const locationCards = document.querySelectorAll(".location-card");
const prevLocationBtn = document.getElementById("prevLocation");
const nextLocationBtn = document.getElementById("nextLocation");

let currentLocation = 0;

function showLocation(index) {
  locationCards.forEach((card) => card.classList.remove("active"));
  locationCards[index].classList.add("active");
}

if (prevLocationBtn && nextLocationBtn && locationCards.length > 0) {
  prevLocationBtn.addEventListener("click", () => {
    currentLocation = (currentLocation - 1 + locationCards.length) % locationCards.length;
    showLocation(currentLocation);
  });

  nextLocationBtn.addEventListener("click", () => {
    currentLocation = (currentLocation + 1) % locationCards.length;
    showLocation(currentLocation);
  });
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        window.location.href = "thanks.html";
      } else {
        alert("משהו השתבש בשליחה. נסו שוב.");
      }
    } catch (error) {
      alert("יש בעיה בחיבור. נסו שוב.");
    }
  });
}