import { gameState } from "../script.js";
import { firstParty } from "../createParty.js";
import { renderPassengers } from "./renderPassengers.js";

// gameState.mode = "title";

const titleScreen = document.getElementById("title-screen");
const partyCreator = document.getElementById("party-creation");
const submitParty = document.getElementById("submit-party");

const partyName = document.getElementById("party-name");

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
          console.log(partyName.value);
          console.log(firstParty.name);
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