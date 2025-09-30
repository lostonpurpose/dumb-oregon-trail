import { firstParty } from "../createParty.js";

// wagon and passengers
let allWagons = document.querySelectorAll(".wagons ul");

const passengerLists = [
  document.querySelector('.passenger-list-1'),
  document.querySelector('.passenger-list-2'),
  document.querySelector('.passenger-list-3')
];

const items = document.querySelector(".item-ul");
const itemTitle = document.querySelector(".item-span");

// sets the wagons and passengers dynamically
const partyHeader = document.getElementById("party-header");


const wagonNames = [
  document.querySelector('.wagon-name-1'),
  document.querySelector('.wagon-name-2'),
  document.querySelector('.wagon-name-3')
];

export function renderPassengers() {

  partyHeader.innerText = `${firstParty.name}`; // moved party.name here so you can create your own
  partyHeader.style.color = "violet"

  firstParty.wagons.forEach((wagon, i) => {
    // wagonNames[i].innerText = `${wagon.name} \n\nName:  Health \n\n`; //original formatting
    wagonNames[i].innerText = `${wagon.name}  \n\n`; // do i even NEED 'name'?

    // the following 2 alter the css of each wagon contents
    wagonNames[i].style.display = "block";  // or "inline-block"
    // wagonNames[i].style.textAlign = "center"   // removed centering of wagon names

    const ul = passengerLists[i];
    ul.innerHTML = "";
    wagon.passengers.forEach(passenger => {
      const li = document.createElement("li");
      if (passenger.disease != "none") { // this is when they have a disease
        if (passenger.disease.includes(" a ")) { // this is to make the disease in party details grammatically sound, wow, works
          // li.textContent = `${passenger.name}: ${passenger.disease.slice(3)} ${passenger.health}`; // for testing, includes health number
          li.textContent = `${passenger.name}: ${passenger.disease.slice(3)}`; // production, no health number
          li.classList.add("passenger-info-text");
        }
        else {
          // li.textContent = `${passenger.name}: ${passenger.disease} ${passenger.health}`; // for testing, includes health number
          li.textContent = `${passenger.name}: ${passenger.disease}`; // production, no health number
          li.classList.add("passenger-info-text");
        }
      }
      else if (passenger.isAlive === false) { // if passenger is dead
        li.textContent = `${passenger.name}: "is dead"`
      }
      else { li.textContent = `${passenger.name}: healthy` }; // displays 'healthy'
      // else { li.textContent = `${passenger.name}: (${passenger.health})`}; // displays health amount from 100

      ul.appendChild(li);
    });
  });

  // updates items dynamically
  items.innerHTML = "";
  const moneyLi = document.createElement("li");
  moneyLi.textContent = `Money : $${firstParty.money}`
  items.appendChild(moneyLi);
  // moneyLi.style.color = "gold"; money color change? looks bad
  itemTitle.innerText = "Items \n\n"
  Object.entries(firstParty.items).forEach(([item, amount]) => {
  const itemLi = document.createElement("li");
  if (item === "food") { // this makes it so food has lbs as a suffix
    itemLi.textContent = `${item} : ${amount} lbs`;
    items.appendChild(itemLi);
  }
  else {
  itemLi.textContent = `${item} : ${amount}`;
  items.appendChild(itemLi);
  }
});

};
setTimeout(() => {
  renderPassengers();
}, 100);