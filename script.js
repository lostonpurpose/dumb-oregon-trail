import { theKansasRiver, fortLaramie, fortKearney, fortBridger, fortHall, fortBoise, buyFoodInput, fordRiver, takeFerry, hireNative, buyItemsInput } from "./allLocations.js";
import { diseases, accidents, getRandomAccident, lostDays } from "./events.js";
import { firstParty, updateFood, diseaseToHealth } from "./createParty.js";

let gameOver = false;

function checkForDeath() {
  console.log("checkForDeath called, gameOver =", gameOver);
    if (gameOver) {
      if (fakeMoveInterval) {
        clearInterval(fakeMoveInterval);
        fakeMoveInterval = null;
      }
      if (autoMoveInterval) {
        clearInterval(autoMoveInterval);
        autoMoveInterval = null;
    }
    return true;
    }
  return false;
};

const wagon = document.querySelector("#wagon");
const paths = document.querySelectorAll(".paths");
const miles = document.querySelector(".miles");

const route1 = document.querySelector(".route-1");
const route2 = document.querySelector(".route-2");
const route3 = document.querySelector(".route-3");
const route4 = document.querySelector(".route-4");
const route5 = document.querySelector(".route-5");
const route6 = document.querySelector(".route-6");


const path1 = document.querySelector(".path-1");
const path2 = document.querySelector(".path-2");
const path3 = document.querySelector(".path-3");
const path4 = document.querySelector(".path-4");
const path5 = document.querySelector(".path-5");
const path6 = document.querySelector(".path-6");

const loc1 = document.getElementById("loc-1");
const loc2 = document.getElementById("loc-2");
const loc3 = document.getElementById("loc-3");
const loc4 = document.getElementById("loc-4");
const loc5 = document.getElementById("loc-5");
const loc6 = document.getElementById("loc-6");

export const infoDiv = document.querySelector(".info-div");

// wagon and passengers
let allWagons = document.querySelectorAll(".wagons ul");

const passengerLists = [
  document.querySelector('.passenger-list-1'),
  document.querySelector('.passenger-list-2'),
  document.querySelector('.passenger-list-3')
];

const items = document.querySelector(".item-ul");

// sets the wagon names dynamically MY way, but maybe using the existing class firstParty.wagons would be better
// let wagonIndex = 0;
// allWagons.forEach(element => {
//   element.innerText = firstParty.wagons[wagonIndex].name;
//   wagonIndex++;
// });

// sets the wagons and passengers dynamically
const partyHeader = document.getElementById("party-header");
partyHeader.innerText = `${firstParty.name} \n`;
partyHeader.style.color = "blue"
const wagonNames = [
  document.querySelector('.wagon-name-1'),
  document.querySelector('.wagon-name-2'),
  document.querySelector('.wagon-name-3')
];

export function renderPassengers() {
  firstParty.wagons.forEach((wagon, i) => {
    wagonNames[i].innerText = wagon.name;
    const ul = passengerLists[i];
    ul.innerHTML = "";
    wagon.passengers.forEach(passenger => {
      const li = document.createElement("li");
      if (passenger.disease != "none") {
        li.textContent = `${passenger.name} ${passenger.disease} ${passenger.health}`;
        li.classList.add("passenger-info-text");
      }
      else { li.textContent = `${passenger.name}: (${passenger.health})`}; // eventually fix this, make two separate columns for each, aligned
      ul.appendChild(li);
    });
  });

  // updates items dynamically
  items.innerHTML = "";
  Object.entries(firstParty.items).forEach(([item, amount]) => {
  const itemLi = document.createElement("li");
  itemLi.textContent = `${item} : ${amount}`;
  items.appendChild(itemLi);
});

};
setTimeout(() => {
  renderPassengers();
}, 100);


// assigning correct casing for allLocation.js lookup
export const fortData = {
  "theKansasRiver": theKansasRiver,
  "FortKearney": fortKearney,
  "FortLaramie": fortLaramie,
  "FortBridger": fortBridger,
  "FortHall": fortHall,
  "FortBoise": fortBoise,
};

// using this to check each path for miles left
const allPaths = [path1, path2, path3, path4, path5, path6];
let currentPathIndex = 0;
// not using currently
const allLocations = [loc1, loc2, loc3, loc4, loc5];
let currentLocationIndex = 0;
// not using currently
const allRoutes = [route1, route2, route3, route4, route5];
let currentRouteIndex = 0;

let currentLocation = document.getElementById(`loc-${currentLocationIndex + 1}`)

// somehow the below gets us to 200. math.round rounds to 200. the other stuff is width in pixels, i think, then innerwidth converts to vh? i don't know
let currentPath = allPaths[currentPathIndex];
let milesLeft = parseInt(currentPath.dataset.miles, 10);
miles.innerText = `${milesLeft} miles until you reach ${currentLocation.dataset.location}` 



// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// new autoscroll function i didn't code::::::
let arrived = false;
let autoMoveInterval = null;
let days = 0;
const dayDiv = document.querySelector(".days");

function autoMoveWagon(path, step = 10, interval = 500) {
  infoDiv.innerText = "";
  eventDiv.innerText = "";

  autoMoveInterval = setInterval(() => {
    // NEW check for death
    checkForDeath();
    // END check for death

    days += 1;
    dayDiv.innerText = days;
    updateFood(1);
    diseaseToHealth(2) // new function does it work??
    renderPassengers();
    milesLeft -= step;
    if (milesLeft < 0) milesLeft = 0;

    path.style.width = `${milesLeft}vw`;
    miles.innerText = `${milesLeft} miles until you reach ${currentLocation.dataset.location}`;

    if (arrived || milesLeft <= 0) {
      clearInterval(autoMoveInterval);
      autoMoveInterval = null;
      arrived = true;
      miles.innerText = `You have reached ${currentLocation.dataset.location}!`;
      newShowLocation(currentLocation);
      return;
    }

    randomEvents();
  }, interval);
}

// DID I JUST FIX IT? added !checkfordeath and can't do anything after death... so far at least
// Toggle animation with spacebar
document.body.addEventListener("keyup", (e) => {
    if (e.key === ' ' && !arrived && !checkForDeath()) {
        if (autoMoveInterval) {
            clearInterval(autoMoveInterval);
            autoMoveInterval = null;
        } else {
            autoMoveWagon(allPaths[currentPathIndex]);
        }
    }
    // randomEvents(e);
});
// end of autoscroll i didn't code:::::::::
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// uses fortData to dynamically update every location. beautiful.
let flavorText = document.querySelector(".flavor-text");
let options = document.querySelector(".options");

function newShowLocation(location) {
  const key = location.dataset.location.replace(/\s+/g, "");
  const currentLocationKey = fortData[key];
  flavorText.innerText = `${fortData[key].flavorText}`;
  options.innerText = `${fortData[key].options}`;

  townOptions(currentLocationKey);
};

// i just moved townOptions call into newShowLocation func b/c it should only happen after you've reached a place. this way it also 
// has access to location



// town logic to continue or use options
function townOptions(currentLocationKey) {
  document.addEventListener("keydown", (e) => {  
    // safety check
    if (!["1", "2", "3", " "].includes(e.key)) {
      return console.error("That is not a valid input");
    }
    
    // KEY 1 = this is always 'leave' and you move on to the next route
    // need to if this. if isfort, continue. if not isfort, ford river.
    if (e.key === "1") {
      if (currentLocationKey.isFort === "no") {
      fordRiver(currentLocation);
      }

      else {
        if (!arrived) return;  // only allow pressing "2" if arrived is true
        arrived = false;  // reset arrived for next path

        flavorText.innerText = "";
        options.innerText = "";

        // hides current route.
        document.querySelector(`.route-${currentPathIndex + 1}`).style.display = 'none';
      
        // am not using route 1's index bc it's not hidden by default. updates all routes/paths/locs
        currentRouteIndex++;
        currentPathIndex++;
        currentLocationIndex++;
        // unhides next route. TESTING. WORKING
        const nextRouteEl = document.querySelector(`.route-${currentRouteIndex + 1}`);
        if (nextRouteEl) {
          nextRouteEl.classList.remove("hide-route");
        }
        // unhides next path. TESTING. WORKING
        const nextPathEl = document.querySelector(`.path-${currentPathIndex + 1}`);
        if (nextPathEl) {
          nextPathEl.classList.remove("hide-path");
        }
        currentLocation = document.getElementById(`loc-${currentLocationIndex + 1}`); 
        // unhides next location. TESTING. WORKING.
        const nextLocEl = document.querySelector(`#loc-${currentLocationIndex + 1}`);
        if (nextLocEl) {
          nextLocEl.classList.remove("hide-loc");
        }
        // clears the text after fording the river or whatever, upon loading next path
        infoDiv.innerText = ""
        eventDiv.innerText = ""

        // checks if nextRoute exists, if not you've reached the end
        // need to punch this up, it means you've beaten the game!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const nextRoute = document.querySelector(`.route-${currentPathIndex + 1}`);
        if (nextRoute) {
          milesLeft = allPaths[currentPathIndex].dataset.miles;
          miles.innerText = `${milesLeft} miles til ${currentLocation.dataset.location}`;
        } else {
          miles.innerText = `You have reached the end of the trail!`;
        }
      }
    }

    // KEY 2 = depends on if it's a fort (buy food) or a river (ford river)
    // adjust. if isfort buy food, if no isfort buy ferry (lose money)
    else if (e.key === "2") {
      // if (currentLocationKey.isFort !== "yes") {
      // takeFerry(currentLocation);
      // }

      // else {
      let purchaseText = document.querySelector(".purchase-text");
      let purchaseOptions = document.querySelector(".purchase-options");
      // clearing arrival text
      flavorText.innerText = "";
      options.innerText = "";

      // removes the - from class and converts to fortData retrievable
      const key = currentLocation.dataset.location.replace(/\s+/g, "");

      if (fortData[key].isFort === "yes") {
        buyFoodInput(location, currentLocation);
      }
      else if (fortData[key].isFort === "no") {
        takeFerry();
      }
    }

    // KEY 3 = buys supplies options (if fort) and take ferry (if river)
    // adjust. if isfort buy supplies. if not isfort hire native (lose time and money)
    else if (e.key === "3") {
      let purchaseText = document.querySelector(".purchase-text");
      let purchaseOptions = document.querySelector(".purchase-options");
      // clearing arrival text
      flavorText.innerText = "";
      options.innerText = "";

      // removes the - from class and converts to fortData retrievable
      const key = currentLocation.dataset.location.replace(/\s+/g, "");

      purchaseText.innerText = "What will you buy?";
      purchaseOptions.innerText = fortData[key].buySupplies;

      if (fortData[key].isFort === "yes") {
        buyItemsInput(location, currentLocation);
      }
      else if (fortData[key].isFort === "no") {
        hireNative();
      }
    }
  });
};

// accidents and diseases

export function lostDaysCalculator(fakeMoveInterval, chosenAccident) {
      let i = 0;
      fakeMoveInterval = setInterval(() => {
        if (i >= chosenAccident.lostDays) {
          clearInterval(fakeMoveInterval);
          fakeMoveInterval = null;
          infoDiv.innerText = "Press spacebar to continue"
          return;
        }
        days ++;
        dayDiv.innerText = days;
        i++;
        updateFood(1); // update for 1 day each tick
        renderPassengers();
        // NEW check for death
        checkForDeath();
        // END check    
      }, 500);
    }

let fakeMoveInterval = null;
export const eventDiv = document.querySelector(".event");
function randomEvents(e) {
    eventDiv.innerText = "";
  const eventChance = (Math.floor(Math.random() * 10) + 1);
    if (eventChance >= 5) { // currently no events for testing ******************* important to change this back
      let chosenAccident = getRandomAccident();
      eventDiv.innerText = `${chosenAccident.message}`;


      // faking time for days lost
      lostDaysCalculator(fakeMoveInterval, chosenAccident)
      

      // Pause the animation
        if (autoMoveInterval) {
            clearInterval(autoMoveInterval);
            autoMoveInterval = null;
            
        }
      // end pause animation
      
      if (arrived === true) {
        // eventDiv.innerText = "";
        eventChance = 0;
      }
    };
};

export function totalDeath() {
  infoDiv.innerText = "You have made a huge mistake.";
  eventDiv.innerText = "Everyone is dead";
  gameOver = true;
};


// next steps
// death stuff is coded. works. but, eventDiv text doesn't show and wagon moves one more step. the latter prob causes the former
// also, it doesn't work. i can keep pressing spacebar and game continues after death.

// i got hung up on the above while coding the fording and ferry stuff. somehow. need to finish that
// and of course remove option 1 from rivers. hmm. that eliminates the possibility of having every location have 1,2,3 key options because
// 1 is invalid for rivers. damn it. need to split my key login into iRiver or isNotRiver

// TODO: add rivers, options. code success/failure chances.
// ok i started on moving purchase options to alllocations, but i'm separating out food to option 2, but that will get overridden by
// the '2' in this file, so i should move all the town logic to locations. i need to make 2 be food, 3 be buy supplies and go from there. 
// but ran out of time at the moment. 
// make buying supplies possible, add to inventory
// add money!
// allow recovery (doctor eventually) or spontaneous (random). 
// do to oxen exactly what i did to people. they have health too... certain diseases for people/oxen kill them outright. 
// if wagon destroyed move people to other wagons, but overcrowding affects health. 

// move passenger/wagon dynamic creation to party file, then import. simplify

// need to make spacebar not available while waiting out an event