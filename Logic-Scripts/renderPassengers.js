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

function formatDisease(disease) {
  if (!disease || disease === "none") return null;
  // remove leading "a " or "has a " and trim
  return String(disease).replace(/^(?:has\s+)?a\s+/i, '').trim();
}

export function renderPassengers() {
  partyHeader.innerText = `${firstParty.name}`;
  partyHeader.style.color = "violet"

  firstParty.wagons.forEach((wagon, i) => {
    // defensive: ensure DOM slots exist for this wagon
    const nameEl = wagonNames[i];
    const ul = passengerLists[i];
    if (!ul) return; // nothing to render into

    if (nameEl) {
      // nameEl.innerText = `${wagon.name}  \n\n`;
      nameEl.innerText = `Party Members  \n\n`; // new one

      nameEl.style.display = "block";
    }

    ul.innerHTML = "";
    wagon.passengers.forEach(passenger => {
      const li = document.createElement("li");

      // show dead if flagged or health has dropped to 0
      if (passenger.isAlive === false || (typeof passenger.health === "number" && passenger.health <= 0)) {
        li.textContent = `${passenger.name}: dead`;
        li.classList.add("passenger-dead");
      } else {
        const disease = formatDisease(passenger.disease);
        if (disease) {
          li.textContent = `${passenger.name}: ${disease}`;
          li.classList.add("passenger-info-text");
        } else {
          li.textContent = `${passenger.name}: healthy`;
        }
      }

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