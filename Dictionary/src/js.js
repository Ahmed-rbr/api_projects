const input = document.querySelector("input");
const btn = document.querySelector(".btn");
const word = document.querySelector(".word");
const sound = document.querySelector("audio");
const type = document.querySelector(".type");
const spill = document.querySelector(".spill");
const mean = document.querySelector(".mean");
const show = document.querySelector(".show");
const play = document.querySelector(".play");

const fetchWord = (input) => {
  if (!input.value.trim()) return;

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`, {
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        show.style.display = "flex";
        word.textContent = input.value;
        mean.textContent = "No word found";
        spill.textContent = "No word found";
        play.style.display = "none";
        throw new Error("Word not found");
      }
      return response.json();
    })
    .then((data) => {
      if (data) {
        show.style.display = "flex";
        word.textContent = data[0].word;
        if (data[0].phonetics[0]?.audio) {
          sound.src = data[0].phonetics[0].audio;
          play.style.display = "block";
        } else {
          play.style.display = "none";
        }

        type.textContent = data[0].meanings[0].partOfSpeech || "";
        spill.textContent =
          data[0].phonetics[0].text || "No phonetic available";
        const firstDefinition = data[0].meanings[0]?.definitions[0];
        mean.textContent =
          firstDefinition?.example ||
          firstDefinition?.definition ||
          "No definition found";
      }
    });
};
btn.addEventListener("click", () => fetchWord(input));
play.addEventListener("click", () => {
  sound.play();
});
