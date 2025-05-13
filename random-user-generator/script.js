const card = document.querySelector(".card");
const pic = document.querySelector(".pic");
const spinner = document.querySelector(".spinner");
const btn = document.getElementById("generate");
const fetchUser = () => {
  shpwSpinner();
  fetch("https://randomuser.me/api")
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("failed to load user");
      }
      return res.json();
    })

    .then((userData) => {
      hideSpinner();
      const user = userData.results[0];
      displayUser(user);
      console.log(userData);
      console.log(user);
    });
};

const shpwSpinner = () => {
  spinner.style.display = "block";
};
const hideSpinner = () => {
  spinner.style.display = "none";
};

const displayUser = (user) => {
  document.querySelector("body").style.backgroundColor =
    user.gender === "male" ? "#0280fe" : "pink";

  card.innerHTML = `
<p class="text-xl">
                <span class="font-bold">Name: </span>${user.name.first}  ${user.name.last}
              </p>
              <p class="text-xl">
                <span class="font-bold">Email: </span> ${user.email}
              </p>
              <p class="text-xl">
                <span class="font-bold">Phone: </span> ${user.phone}
              </p>
              <p class="text-xl">
                <span class="font-bold">Location: </span> ${user.location.city}
              </p>
              <p class="text-xl"><span class="font-bold">Age: </span> ${user.dob.age}</p>
`;

  pic.src = user.picture.large;
};

fetchUser();
btn.addEventListener("click", fetchUser);
