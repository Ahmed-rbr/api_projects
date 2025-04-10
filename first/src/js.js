const btn = document.querySelector(".btn");
const txt = document.querySelector(".txt");
const url = "https://icanhazdadjoke.com/";

const fetchJoke = (url) => {
  fetch(url, {
    headers: { Accept: "application/json" },
  })
    .then((response) => response.json())
    .then((data) => (txt.textContent = data.joke));
};

btn.addEventListener("click", () => fetchJoke(url));
