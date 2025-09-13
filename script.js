import { theKansasRiver, fortKearney, fortLaramie, fortBridger, theGreenRiver, fortHall, theSnakeRiver, fortBoise } from "./allLocations.js";
import { buyFoodInput, buyItemsInput } from "./Logic-Scripts/forts.js";
import { fordRiver, takeFerry, hireNative } from "./Logic-Scripts/rivers.js";
import { diseases, accidents, getRandomAccident, lostDays } from "./events.js";
import { firstParty, updateFood, diseaseToHealth } from "./createParty.js";

let gameOver = false;


export function checkForDeath() {
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

// to change sky color as you go.
const sky = document.getElementById("sky");
sky.style.backgroundColor = "rgb(211, 211, 255)";
const skyEnd = "rgb(0, 6, 69)"

// write function to increment sky color. tie it to miles. will have to figure out entire length of trail first. see above for colors.

const wagon = document.querySelector("#wagon");
const paths = document.querySelectorAll(".paths");
const miles = document.querySelector(".miles");

const route1 = document.querySelector(".route-1");
const route2 = document.querySelector(".route-2");
const route3 = document.querySelector(".route-3");
const route4 = document.querySelector(".route-4");
const route5 = document.querySelector(".route-5");
const route6 = document.querySelector(".route-6");
const route7 = document.querySelector(".route-7");
const route8 = document.querySelector(".route-8");


const path1 = document.querySelector(".path-1");
const path2 = document.querySelector(".path-2");
const path3 = document.querySelector(".path-3");
const path4 = document.querySelector(".path-4");
const path5 = document.querySelector(".path-5");
const path6 = document.querySelector(".path-6");
const path7 = document.querySelector(".path-7");
const path8 = document.querySelector(".path-8");

const loc1 = document.getElementById("loc-1");
const loc2 = document.getElementById("loc-2");
const loc3 = document.getElementById("loc-3");
const loc4 = document.getElementById("loc-4");
const loc5 = document.getElementById("loc-5");
const loc6 = document.getElementById("loc-6");
const loc7 = document.getElementById("loc-7");
const loc8 = document.getElementById("loc-8");

export const infoDiv = document.querySelector(".info-div");

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
partyHeader.innerText = `${firstParty.name}`;
partyHeader.style.color = "violet"

const wagonNames = [
  document.querySelector('.wagon-name-1'),
  document.querySelector('.wagon-name-2'),
  document.querySelector('.wagon-name-3')
];

export function renderPassengers() {
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




// assigning correct casing for allLocation.js lookup
export const fortData = {
  "theKansasRiver": theKansasRiver,
  "FortKearney": fortKearney,
  "FortLaramie": fortLaramie,
  "FortBridger": fortBridger,
  "theGreenRiver": theGreenRiver,
  "FortHall": fortHall,
  "theSnakeRiver": theSnakeRiver,
  "FortBoise": fortBoise,
};




// using this to check each path for miles left
const allPaths = [path1, path2, path3, path4, path5, path6, path7, path8];
let currentPathIndex = 0;
// not using currently
const allLocations = [loc1, loc2, loc3, loc4, loc5, loc6, loc7, loc8];
let currentLocationIndex = 0;
// not using currently
const allRoutes = [route1, route2, route3, route4, route5, route6, route7, route8];
let currentRouteIndex = 0;

export let currentLocation = document.getElementById(`loc-${currentLocationIndex + 1}`)

// somehow the below gets us to 200. math.round rounds to 200. the other stuff is width in pixels, i think, then innerwidth converts to vh? i don't know
let currentPath = allPaths[currentPathIndex];
let currentRoute = allRoutes[currentRouteIndex]; // added this so i can apply width style to route container and shrink it with movement
let milesLeft = parseInt(currentPath.dataset.miles, 10);
miles.innerText = `${milesLeft} miles until ${currentLocation.dataset.location}` 



// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// new autoscroll function i didn't code::::::
let arrived = false;
let autoMoveInterval = null;
// let days = 0;
export let days2 = { dayCounter: 0}
export const dayDiv = document.querySelector(".days");
infoDiv.innerText = "Press spacebar to continue" // sets this message at start of the game. 

function autoMoveWagon(path, route, step = 10, interval = 500) {
  infoDiv.innerText = "";
  eventDiv.innerText = "";

  autoMoveInterval = setInterval(() => {
    // NEW check for death
    checkForDeath();
    // END check for death

    // days += 1;
    days2.dayCounter += 1;
    // dayDiv.innerText = days;
    dayDiv.innerText = days2.dayCounter;
    updateFood(1);
    diseaseToHealth(2) // new function does it work?? it does! from create party. need to remove 2 and add in the disease severity
    // currently subtracts health if character is dead, but fixing the above will fix this issue (dead severity = 0, ironically)
    renderPassengers();
    milesLeft -= step;
    if (milesLeft < 20) milesLeft = 20; // THIS WORKS WITH LINE BELOW TO ENTER LOC AND WAGON DOESN'T OBSCURE LOC!!

    path.style.width = `${milesLeft}vw`;
    route.style.width = `${milesLeft + 10}vw`;
    miles.innerText = `${milesLeft} miles until ${currentLocation.dataset.location}`;

    if (arrived || milesLeft <= 20) { // THIS FIXED WAGON OBSCURING THE LOC!!!! 
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
            infoDiv.innerText = "Press spacebar to continue" // added this and works as intended but only when pausing with spacebar first, not at start of trail
        } else {
            autoMoveWagon(allPaths[currentPathIndex], allRoutes[currentRouteIndex]); // added allRoutes to make mountains continue to scroll
        }
    }
    // randomEvents(e);
});
// end of autoscroll i didn't code:::::::::
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// uses fortData to dynamically update every location. beautiful.
let flavorText = document.querySelector(".flavor-text");
let options = document.querySelector(".options");

export function newShowLocation(location) {
  const key = location.dataset.location.replace(/\s+/g, "");
  const currentLocationKey = fortData[key];
  flavorText.innerText = `${fortData[key].flavorText}`;
  options.innerText = `${fortData[key].options}`;

  townOptions(currentLocationKey);
};

// i just moved townOptions call into newShowLocation func b/c it should only happen after you've reached a place. this way it also 
// has access to location


export const gameState = { mode: "default" };

// global spacebar - return to fort menu listener. only fires when not in 'default mode', aka only when in a location
document.addEventListener("keydown", (e) => {
  if (e.key === " " && gameState.mode !== "default") {
    gameState.mode = "default";
    newShowLocation(currentLocation);
  }
});

// this might solve the stacked event listeners...
let townKeyListener;

// town logic to continue or use options
export function townOptions(currentLocationKey) {

  // Remove old listener if it exists
  if (townKeyListener) {
  document.removeEventListener("keydown", townKeyListener);
  }

  // document.addEventListener("keydown", (e) => {  

    townKeyListener = function (e) { // NEW
    // only works if in default mode
    if (gameState.mode !== "default") return;

    // safety check
    if (!["1", "2", "3", " "].includes(e.key)) {
      return console.error("That is not a valid input");
    }
    
    // KEY 1 = this is always 'leave' and you move on to the next route !!!!!!!!!!!!!!!!!!!!!!!!!1
    // need to if this. if isfort, continue. if not isfort, ford river.
    // change to spacebar
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
        infoDiv.innerText = "Press spacebar to continue" // this makes spacebar appear correctly after crossing a river!

        // checks if nextRoute exists, if not you've reached the end
        // need to punch this up, it means you've beaten the game!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const nextRoute = document.querySelector(`.route-${currentPathIndex + 1}`);
        if (nextRoute) {
          milesLeft = parseInt(allPaths[currentPathIndex].dataset.miles, 10);
          miles.innerText = `${milesLeft} miles until ${currentLocation.dataset.location}`;
        } else {
          miles.innerText = `You have reached the end of the trail!`;
        }
      }
    }

    // KEY 2 = depends on if it's a fort (buy food) or a river (ford river)
    // adjust. if isfort buy food, if no isfort buy ferry (lose money)
    else if (e.key === "2") {
      const key = currentLocation.dataset.location.replace(/\s+/g, "");

      if (fortData[key].isFort === "no") {
        gameState.mode = "takeFerry";
        console.log("takeFerry only");
        takeFerry(currentLocation);
        return; // STOP here
      }
      else {
      // FORTS only—never rivers
      gameState.mode = "buyFood";
      console.log("buyFoodInput firing");
      flavorText.innerText = "";
      options.innerText = "";
      buyFoodInput(location, currentLocation);
      }
    }



    // KEY 3 = buys supplies options (if fort) and take ferry (if river)
    // adjust. if isfort buy supplies. if not isfort hire native (lose time and money)
    else if (e.key === "3") {
      gameState.mode = "buyItems";
      let purchaseText = document.querySelector(".purchase-text");
      let purchaseOptions = document.querySelector(".purchase-options");
      // clearing arrival text
      flavorText.innerText = "";
      options.innerText = "";

      // removes the - from class and converts to fortData retrievable
      const key = currentLocation.dataset.location.replace(/\s+/g, "");

      if (fortData[key].isFort === "yes") {
        buyItemsInput(location, currentLocation);
        // purchaseText.innerText = "What will you buy?";
        // purchaseOptions.innerText = fortData[key].buySupplies;
      }
      else if (fortData[key].isFort === "no") {
        gameState.mode = "hireNative"
        hireNative(currentLocation);
      }
    }
  };

  // Add the new listener
  document.addEventListener("keydown", townKeyListener);
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
        // days ++
        days2.dayCounter ++;
        // dayDiv.innerText = days;
        dayDiv.innerText = days2.dayCounter;
        i++;
        updateFood(1); // update for 1 day each tick
        diseaseToHealth(2) // updates for diseases. change 2 to disease severity
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
  const eventChance = (Math.floor(Math.random() * 20) + 1);
    if (eventChance >= 21) { // currently no events for testing ******************* important to change this back
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

    // adding boons here
    else if (eventChance >= 10 && eventChance <= 20) {
        let chosenBoon = getBoon();
        eventDiv.innerText = `${chosenBoon.message}`;
    }
    // end boons test

    };
};

export function totalDeath() {
  infoDiv.innerText = "You have made a huge mistake.";
  eventDiv.innerText = "Everyone is dead";
  gameOver = true;
};


// i need to rethink the next steps in terms of mvp
// FIXED:: big one visually - right now when you reach a loc the wagon covers it. extend each path by 2 or something so it's in front of you.
// FIXED:: new visual issue - route needs to shrink with progress so background mountains don't stop.
// FIXED:: snake river strange behavior. miles not counting down. does not stop when reached (former prob causes latter) - forgot to add to route list!
// FIXED:: new visual issue - 1. some forts not appearing. FIXED:: 2. long routes - left side mountians don't extend to right all the way to fort/river
// FIXED:: new visual issue - right side mountains scroll, but don't always stretch to right side of screen (had to turn off no-repeat)
// right now person can only have one disease. have to change it to [] and display that (foreach)

// food makes you die. need to make it make your health drop, just like a disease, which works
// health = 0 = death. code removal of person, probably easy
// code minimum people per wagon, or transfer of people to other wagons. think it out on paper.
// code speed based on oxen. might get into floor division. 
// give player choices on pause screen. give medicine (chance of cure). what else? don't know.
// make new town options - visit doctor, buy oxen, extra - add member to party (brings money and food). or ditch a person ha ha.
// make some boons - abandoned wagon, berries
// visuals - start with prarie background. switch to hills. finally mountains. something like that.
// FIXED:: yeah the town text at rivers is a game breaker right now. have possible solution in rivers file. event listener is getting multiplied i guess 
// big one - i could just make a starting town where you buy everything from the start like any other town. just need three buttons to 
// choose what your background is. eventually... (not mvp) allow lots of choices, like you're a doctor (super easy).
// you know what? if i think about this as a way to get a job, just make it suuuuuper simple to start. could even cut medicine to match OG game


// next steps
// death stuff is coded. works. but, eventDiv text doesn't show and wagon moves one more step. the latter prob causes the former
// also, it doesn't work. i can keep pressing spacebar and game continues after death.


// TODO: 
// diseases affect health until death based on disease severity
// make passenger die after reaching 0 health or just dying outright
// make event like 'attacked by mountain lion' which kills passenger outright

// allow recovery (doctor eventually) or spontaneous (random). 
// do to oxen exactly what i did to people. they have health too... certain diseases for people/oxen kill them outright. 
// if wagon destroyed move people to other wagons, but overcrowding affects health. 

// need to make spacebar not available while waiting out an event