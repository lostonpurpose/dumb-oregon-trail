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
          wagon1.passengers[0] = passenger1;
          

          renderPassengers();

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