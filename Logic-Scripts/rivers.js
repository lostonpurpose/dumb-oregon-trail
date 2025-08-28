import { firstParty, updateFood } from "../createParty.js";
import { renderPassengers, fortData, eventDiv, infoDiv, days2, dayDiv, checkForDeath, gameState, newShowLocation } from "../script.js";


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

export function takeFerry(currentLocation) {
    const key = currentLocation.dataset.location.replace(/\s+/g, "");
    infoDiv.innerText = `You take a nearby ferry to cross the river and lose ${fortData[key].ferryCost}.`
    firstParty.money -= fortData[key].ferryCost
    renderPassengers();
    fortData[key].isFort = "yes"
    eventDiv.innerText = "Press 1 to continue"
    gameState.mode = "default";
}

export function hireNative(currentLocation) {
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