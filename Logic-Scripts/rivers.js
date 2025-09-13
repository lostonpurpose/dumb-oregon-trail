import { firstParty, updateFood } from "../createParty.js";
import { fortData, eventDiv, infoDiv, days2, dayDiv, checkForDeath, gameState, newShowLocation } from "../script.js";
import { renderPassengers } from "./renderPassengers.js";


export function fordRiver(currentLocation) {
    const key = currentLocation.dataset.location.replace(/\s+/g, "");
    if (fortData[key].isFort === "yes") return console.error("This is a fort, but this should only work for rivers");
    if (fortData[key].depth >= 3.5) {
        // definite failure, lose a bunch of items

        lostItems(loseALot);

        infoDiv.innerText = "You attempt to ford the river. Huge mistake."
        eventDiv.innerText = `Guess what, you've just lost a bunch of stuff. Press Press 1 to continue.` // here insert what was lost via random loss function, not yet made
        renderPassengers(); // rebuild item list
        fortData[key].isFort = "yes" // lets you Press 1 to continue now
    }
    else if (fortData[key].depth >= 2.5) {
        // chance of failure, lose a few items
        infoDiv.innerText = "You attempt to ford the river. Risky, but possible."
        if (fordRiverSuccessChance()) {
            eventDiv.innerText = `You were lucky and made it across! Press 1 to continue.`
            fortData[key].isFort = "yes" // lets you Press 1 to continue now
        }
        else {

            lostItems(loseAFew);

            eventDiv.innerText = `You were unlucky! Press 1 to continue.` // if failed see above but lose less, have to code this
            renderPassengers(); // rebuild item list
            fortData[key].isFort = "yes" // lets you Press 1 to continue now
        }
    }
    else {
        // definite success
        infoDiv.innerText = "You attempt to ford the river."
        eventDiv.innerText = "You crossed successfully! Press 1 to continue."
        fortData[key].isFort = "yes" // lets you Press 1 to continue now
    }
    console.log(firstParty.items)
}

// 70% chance of success for rivers slightly deep
function fordRiverSuccessChance() {
    const result = Math.random()
    if (result <= .7) return true;
    else return false;
};


// determining which and how many items you lose
const loseALot = Math.floor((Math.random() * 5) + 3); // lose 3-5 item types
const loseAFew = Math.floor((Math.random() * 3) + 1); // lose 1-3 item types
function lostItems(amountToLose) {
    const numberOfItems = Object.keys(firstParty.items).length;
    console.log(`amountToLose: ${amountToLose}, numberOfItems: ${numberOfItems}`);
    
    if (amountToLose >= numberOfItems) {
        // use numberOfItems and lose from there
        Object.entries(firstParty.items).forEach(([key, value]) => {
            const loss = Math.floor((Math.random() * 2) + 1); // 1–2
            firstParty.items[key] = Math.max(value - loss, 0); // ensures 0 is the minimum
            console.log(`Item: ${key}, was: ${value}, lost: ${loss}`);
        });
    }
    else {
        // calc the difference, randomize which item types, then lose from there
        const keys = Object.keys(firstParty.items); // makes array of keys
        const shuffled = keys.sort(() => 0.5 - Math.random()); // returns pos or neg, reorders each pair based on this randomness, somehow
        const randomFew = shuffled.slice(0, amountToLose); // slices off the first few
        console.log("Selected randomFew keys:", randomFew); 
        randomFew.forEach((key) => {
            const value = firstParty.items[key];
            const loss = Math.floor((Math.random() * 2) + 1); // 1–2
            firstParty.items[key] = Math.max(value - loss, 0); // ensures 0 is the minimum
        });
    }
}


export function takeFerry(currentLocation) {
    if (gameState.mode !== "takeFerry") return;
    const key = currentLocation.dataset.location.replace(/\s+/g, "");
    infoDiv.innerText = `You take a nearby ferry to cross the river and lose ${fortData[key].ferryCost}.`
    firstParty.money -= fortData[key].ferryCost
    renderPassengers();
    fortData[key].isFort = "yes"
    eventDiv.innerText = "Press 1 to continue"
    gameState.mode = "default";
}

export function hireNative(currentLocation) {
    if (gameState.mode !== "hireNative") return;
    const key = currentLocation.dataset.location.replace(/\s+/g, "");
    infoDiv.innerText = `You hire a native guide to take you to a safe crossing. It takes ${fortData[key].nativeDaysLost} days and you lose ${fortData[key].nativeCost} dollars.`
    firstParty.money -= fortData[key].nativeCost
    generalLostDaysCalculator(fortData[key].nativeDaysLost)
    renderPassengers();
    fortData[key].isFort = "yes"
    eventDiv.innerText = "Press 1 to continue"
    gameState.mode = "default";
}


// general lost days calculator
let fakeMoveInterval = null;
export function generalLostDaysCalculator(daysLost) {
      let i = 0;
      fakeMoveInterval = setInterval(() => {
        if (i >= daysLost) {
          clearInterval(fakeMoveInterval);
          fakeMoveInterval = null;
        //   infoDiv.innerText = "Press 1 to continue"
          return;
        }
        days2.dayCounter ++;
        dayDiv.innerText = days2.dayCounter;
        i++;
        updateFood(1); // update for 1 day each tick
        renderPassengers();
        // NEW check for death
        checkForDeath();
        // END check    
    }, 500);
    }



//     🧨 But Here’s the Real Problem

// You’re calling townOptions(currentLocationKey) inside newShowLocation(), which is called every time you arrive at a new location, and it contains this:

// document.addEventListener("keydown", (e) => {
//   // ... handles keys 1, 2, 3
// });


// This means you're stacking multiple event listeners every time a new location is reached.

// So:

// You arrive at Kansas River → 1 listener

// Then Fort Kearney → 2 listeners

// Then Fort Laramie → 3 listeners

// Then Green River → now 4 listeners all firing in parallel.

// ➡️ Result: Even though the correct logic executes, a previous listener (from a fort) is also still alive, and its buyFoodInput() call is still running, because it's tied to an older closure.

// ✅ Solution: Remove old keydown listeners before adding new ones.

// Update your townOptions() function like this:

// ✅ Step 1: Move the handler to a named function
// let townKeyListener;

// export function townOptions(currentLocationKey) {
//   // Remove old listener if it exists
//   if (townKeyListener) {
//     document.removeEventListener("keydown", townKeyListener);
//   }

//   townKeyListener = function (e) {
//     if (gameState.mode !== "default") return;
//     if (!["1", "2", "3", " "].includes(e.key)) return;

//     const key = currentLocation.dataset.location.replace(/\s+/g, "");

//     if (e.key === "1") {
//       if (fortData[key].isFort === "no") {
//         fordRiver(currentLocation);
//       } else {
//         // advance to next path
//         // your existing code here
//       }
//     }

//     else if (e.key === "2") {
//       if (!fortData[key]) return console.warn(`Location "${key}" not found`);
//       if (fortData[key].isFort === "no") {
//         gameState.mode = "takeFerry";
//         takeFerry(currentLocation);
//         return;
//       } else {
//         gameState.mode = "buyFood";
//         buyFoodInput(location, currentLocation);
//       }
//     }

//     else if (e.key === "3") {
//       if (fortData[key].isFort === "no") {
//         gameState.mode = "hireNative";
//         hireNative(currentLocation);
//       } else {
//         gameState.mode = "buyItems";
//         buyItemsInput(location, currentLocation);
//       }
//     }
//   };

//   // Add the new listener
//   document.addEventListener("keydown", townKeyListener);
// }

// ✅ Why this works

// By saving the current key listener as a variable and removing it before adding a new one, you avoid accumulating zombie listeners from previous locations.

// 🧪 How to Verify

// Go to Green River

// Press "2"

// Only takeFerry() should fire

// buyFoodInput() should not trigger anymore

// No double or incorrect input handling should happen

// 🧼 Optional: Add Logging

// Add this temporarily in your key handler to see which listeners are firing:

// console.log("Key 2 pressed at", currentLocation.dataset.location);


// If you see multiple logs per press, that confirms the stacking issue.

// Let me know if you want to refactor the input mode system next — you've got a solid structure, and it wouldn't take much to make it airtight.