import { firstParty } from "../createParty.js";

// wagon and passengers
let allWagons = document.querySelectorAll(".wagons ul");

// select any passenger lists / wagon name elements present in the DOM
const passengerLists = Array.from(document.querySelectorAll('.passenger-list'));
const items = document.querySelector(".item-ul");
const itemTitle = document.querySelector(".item-span");
const partyHeader = document.getElementById("party-header");

// collect wagon name elements (generic)
const wagonNames = Array.from(document.querySelectorAll('.wagon-name'));

export function renderPassengers() {
  partyHeader.innerText = `${firstParty.name}`;
  partyHeader.style.color = "violet"

  firstParty.wagons.forEach((wagon, i) => {
    // defensive: ensure DOM slots exist for this wagon
    const nameEl = wagonNames[i];
    const ul = passengerLists[i];
    if (!ul) return; // nothing to render into

    if (nameEl) {
      nameEl.innerText = `${wagon.name}  \n\n`;
      nameEl.style.display = "block";
    }

    ul.innerHTML = "";
    wagon.passengers.forEach(passenger => {
      const li = document.createElement("li");
      if (passenger.disease != "none") {
        if (passenger.disease.includes(" a ")) {
          li.textContent = `${passenger.name}: ${passenger.disease.slice(3)}`;
          li.classList.add("passenger-info-text");
        } else {
          li.textContent = `${passenger.name}: ${passenger.disease}`;
          li.classList.add("passenger-info-text");
        }
      }
      else if (passenger.isAlive === false) {
        li.textContent = `${passenger.name}: "is dead"`
      }
      else { li.textContent = `${passenger.name}: healthy` };
      ul.appendChild(li);
    });
  });

  // items rendering unchanged
  items.innerHTML = "";
  const moneyLi = document.createElement("li");
  moneyLi.textContent = `Money : $${firstParty.money}`
  items.appendChild(moneyLi);
  itemTitle.innerText = "Items \n\n"
  Object.entries(firstParty.items).forEach(([item, amount]) => {
    const itemLi = document.createElement("li");
    if (item === "food") {
      itemLi.textContent = `${item} : ${amount} lbs`;
    } else {
      itemLi.textContent = `${item} : ${amount}`;
    }
    items.appendChild(itemLi);
  });
};
setTimeout(() => {
  renderPassengers();
}, 100);