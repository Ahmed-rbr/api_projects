const pokname = document.querySelector(".name");
const pic = document.querySelector(".pic");
const hp = document.querySelector(".hp");
const type = document.querySelector(".type");
const att = document.querySelector(".att");
const def = document.querySelector(".def");
const spd = document.querySelector(".spd");
const btn = document.querySelector(".btn");

async function fetchPoke(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: error");
    throw error;
  }
}

btn.addEventListener("click", () => {
  document.querySelector(".tct").style.display = "none";
  document.querySelector(".div").style.display = "flex";

  let rndm = Math.floor(Math.random() * 898);
  console.log(rndm);
  fetchPoke(`https://pokeapi.co/api/v2/pokemon/${rndm}`)
    .then((data) => {
      console.log(data);
      pokname.textContent = data.name;
      hp.textContent = data.stats[0].base_stat;
      pic.src = data.sprites.front_default || data.sprites.back_default;
      type.textContent = data.types.map((t) => t.type.name).join(" / ");
      def.textContent = data.stats[1].base_stat;
      att.textContent = data.stats[3].base_stat;
      spd.textContent = data.stats[5].base_stat;
    })
    .catch((error) => console.error("Failed to load data:", error));
});
