const joke = document.querySelector(".joke");
const btn = document.getElementById("joke-btn");
const url = "https://api.chucknorris.io/jokes/random";
const fetchJoke = () => {
  fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        return;
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      showjoke(data.value);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
const showjoke = (data) => {
  if (data) {
    joke.innerHTML = `<strong>${data}</strong>`;
  }
};
btn.addEventListener("click", fetchJoke);
