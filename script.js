// WEATHER FUNCTIONALITY
const apiKey = "0cda992bb5aa39a2a5953829988c0cfe";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) return alert("City not found!");

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // ✅ FIXED — support for Indian weather types
    const weatherType = data.weather[0].main;

    const icons = {
      Clouds: "images/clouds.png",
      Clear: "images/clear.png",
      Rain: "images/rain.png",
      Drizzle: "images/drizzle.png",
      Mist: "images/mist.png",
      Haze: "images/mist.png",
      Smoke: "images/mist.png",
      Fog: "images/mist.png",
      Dust: "images/mist.png",

      Default: "images/clouds.png"
    };

    weatherIcon.src = icons[weatherType] || icons.Default;

    document.querySelector(".weather").style.display = "block";

  } catch {
    alert("Error fetching data!");
  }
}

// ✅ Search button click
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// ✅ Press Enter key to search
searchBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});


// RATING FUNCTIONALITY
let selectedRating = 0;
const stars = document.querySelectorAll(".star");
const ratingText = document.getElementById("rating-text");
const feedbackBox = document.getElementById("feedback");
const submitBtn = document.getElementById("submitFeedback");
const thankyouMessage = document.getElementById("thankyou-message");

stars.forEach(star => {
  star.addEventListener("click", () => {
    selectedRating = parseInt(star.dataset.value);
    updateStars(selectedRating);
    ratingText.textContent = `You rated ${selectedRating} star(s)`;
  });
});

function updateStars(rating) {
  stars.forEach(star => {
    star.src = parseInt(star.dataset.value) <= rating
      ? "images/star-filled.png"
      : "images/star.png";
  });
}

submitBtn.addEventListener("click", () => {
  const feedback = feedbackBox.value.trim();

  if (!selectedRating) return alert("Please select a star rating!");
  if (!feedback) return alert("Please enter your feedback!");

  thankyouMessage.style.display = "block";
  document.getElementById("backHomeBtn").style.display = "inline-block";

  selectedRating = 0;
  feedbackBox.value = "";
  ratingText.textContent = "You rated 0 star(s)";
  updateStars(0);
});

// ✅ Back Home Button
function switchToHome() {
  document.querySelector(".tab-btn:nth-child(1)").click();
}


// TAB SWITCHING
function showTab(event, tabName) {
  document.querySelectorAll(".tab-content").forEach(tab =>
    tab.classList.remove("active")
  );
  document.getElementById(tabName).classList.add("active");

  document.querySelectorAll(".tab-btn").forEach(btn =>
    btn.classList.remove("active")
  );
  event.target.classList.add("active");
}

function switchToWeather() {
  document.querySelector(".tab-btn:nth-child(2)").click();
}

function switchToFeedback() {
  document.querySelector(".tab-btn:nth-child(3)").click();
}