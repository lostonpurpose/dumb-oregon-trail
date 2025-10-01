import { gameState } from "../script.js";
import { firstParty } from "../createParty.js";
import { renderPassengers } from "./renderPassengers.js";
import { wagon1 } from "../Wagon.js";
import { Person } from "../Person.js";

// gameState.mode = "title";

const titleScreen = document.getElementById("title-screen");
const partyCreator = document.getElementById("party-creation");
const submitParty = document.getElementById("submit-party");

const partyName = document.getElementById("party-name");
const name1 = document.getElementById("1");
const name2 = document.getElementById("2");
const name3 = document.getElementById("3");
// food
const foodPurchased = document.getElementById("food-purchased");
const foodText = document.getElementById("foodH4");



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
          firstParty.name = partyName.value;

          const passenger1 = new Person(`${name1.value}`, "none", 100, 45, "male", true);
          const passenger2 = new Person(`${name2.value}`, "none", 100, 45, "male", true);
          const passenger3 = new Person(`${name3.value}`, "none", 100, 45, "male", true);
          wagon1.passengers[0] = passenger1;
          wagon1.passengers[1] = passenger2;
          wagon1.passengers[2] = passenger3;

          // jobs
          const selectedOccupation = document.querySelector('input[name="occupation"]:checked');
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

          // food puchasing
          let foodCost = (foodPurchased.value * 2)
          if (foodCost > firstParty.money) {
            foodText.innerText = "How much food will you purchase? (You can't afford that much)"
            return;
          }
          else {
          firstParty.items.food = foodPurchased.value;
          firstParty.money -= foodCost;
          }

          renderPassengers();
          console.log("job:", selectedOccupation.value);
          console.log(firstParty);

          gameState.mode = "default"
          partyCreator.classList.add("activate-creator");
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