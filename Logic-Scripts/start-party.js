import { gameState } from "../script.js";
import { firstParty } from "../createParty.js";
import { renderPassengers } from "./renderPassengers.js";
import { wagon1 } from "../Wagon.js";
import { Person } from "../Person.js";

// gameState.mode = "title";

const genericNames = [
  "Alice","Bob","Charlie","Diana","Ethan","Fiona","George","Hannah",
  "Ivy","Jack","Kara","Liam","Maya","Noah","Olivia","Peter",
  "Quinn","Rosa","Sam","Tara","Uma","Victor","Wendy","Xander",
  "Yara","Zane","Bea","Cal","Drew","Elsa","Finn","Gus"
];

const genericPartyNames = [
  "The Adventurers","The Trailblazers","The Pioneers","The Wanderers",
  "The Explorers","The Nomads","The Pathfinders","The Journeyers",
  "The Seekers","The Roamers", "The Chachees", "The Pontipees", "The Trail Mixers", "The Burgundys", "The Vagabonds", "The Donners"
];

// helper: pick a random name not in exclude list
function getRandomName(exclude = []) {
  const pool = genericNames.filter(n => !exclude.includes(n));
  if (pool.length === 0) return genericNames[Math.floor(Math.random() * genericNames.length)];
  return pool[Math.floor(Math.random() * pool.length)];
}

// title screen variables
const titleScreen = document.getElementById("title-screen");
const partyCreator = document.getElementById("party-creation");
const submitParty = document.getElementById("submit-party");

// party info inputs
const partyName = document.getElementById("party-name");
const name1 = document.getElementById("1");
const name2 = document.getElementById("2");
const name3 = document.getElementById("3");
// food
const foodPurchased = document.getElementById("food-purchased");
const foodText = document.getElementById("foodH4");
// spare parts
const wheelsPurchased = document.getElementById("wagon-wheels");
const axlesPurchased = document.getElementById("wagon-axles");


export function startGame() { // chatgpt did stuff here
  if (gameState.mode === "title") {
    function titleKeyListener(e) {
      if (e.key !== "Enter") {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      } else {
        // Pressed Enter
        titleScreen.classList.add("hide-title");
        gameState.mode = "creator";
        partyCreator.classList.remove("activate-creator");
        submitParty.addEventListener("click", (e) => {
          e.preventDefault(); // stop form submitting and reloading page

          // connect values to party info
          // give a generic party name if left blank
          if (!partyName.value.trim()) {
            partyName.value = genericPartyNames[Math.floor(Math.random() * genericPartyNames.length)];
          }
          firstParty.name = partyName.value;

          // populate blank name fields with generic names (avoid duplicates)
          const used = [];
          if (!name1.value.trim()) { name1.value = getRandomName(used); used.push(name1.value); } else used.push(name1.value);
          if (!name2.value.trim()) { name2.value = getRandomName(used); used.push(name2.value); } else used.push(name2.value);
          if (!name3.value.trim()) { name3.value = getRandomName(used); used.push(name3.value); } else used.push(name3.value);

          const passenger1 = new Person(`${name1.value}`, "none", 100, 45, "male", true);
          const passenger2 = new Person(`${name2.value}`, "none", 100, 45, "male", true);
          const passenger3 = new Person(`${name3.value}`, "none", 100, 45, "male", true);
          wagon1.passengers[0] = passenger1;
          wagon1.passengers[1] = passenger2;
          wagon1.passengers[2] = passenger3;

          // jobs
          const selectedOccupation = document.querySelector('input[name="occupation"]:checked');
          if (!selectedOccupation) {
            alert("Please select an occupation!");
            return;
          }
          // attach job to firstParty
          firstParty.occupation = selectedOccupation.value;

          // starting funds
          let startingFunds;
          if (selectedOccupation.value === "farmer") {startingFunds = 550}
          else if (selectedOccupation.value === "trader") {startingFunds = 880}
          else if (selectedOccupation.value === "banker") {startingFunds = 1105}

          console.log("Funds assigned:", startingFunds);
          console.log("Occupation raw value:", selectedOccupation.value);
          console.log("Equal to 'farmer'?", selectedOccupation.value === "farmer");

          firstParty.money = startingFunds;

          // food and spare puchasing
          let foodCost = (foodPurchased.value * 2)
          
          let wheelsCost = (wheelsPurchased.value * 9);
          let axlesCost = (axlesPurchased.value * 6);
          console.log("You got to 76")

          if ((foodCost + wheelsCost + axlesCost) > firstParty.money) {
            foodText.innerText = "How much food and/or spare parts will you purchase? (You can't afford that much!)"
            return;
          }
          else {
          firstParty.items.food = foodPurchased.value;
          firstParty.items.wagonWheels = wheelsPurchased.value;
          firstParty.items.wagonAxles = axlesPurchased.value;
          firstParty.money -= (foodCost + wheelsCost + axlesCost);
          }
          console.log("You got to 87")



          renderPassengers();

          console.log("job:", selectedOccupation.value);
          console.log(firstParty);

          gameState.mode = "default"
          partyCreator.classList.add("activate-creator");
          console.log("Classes now:", partyCreator.className);
        });

        // Remove this listener so it stops blocking other keys
        document.body.removeEventListener("keyup", titleKeyListener);
        // unhide the creator
        // partyCreator.classList.remove("activate-creator");


      }
    }

    document.body.addEventListener("keyup", titleKeyListener);
  }
}