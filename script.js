import { fortLaramie, fortKearney, fortBridger, fortHall, fortBoise } from "./allLocations.js";
import { diseases, accidents, getRandomAccident } from "./events.js";
import { firstParty } from "./createParty.js";

const wagon = document.querySelector("#wagon");
const paths = document.querySelectorAll(".paths");
const miles = document.querySelector(".miles");

const route1 = document.querySelector(".route-1");
const route2 = document.querySelector(".route-2");
const route3 = document.querySelector(".route-3");
const route4 = document.querySelector(".route-4");
const route5 = document.querySelector(".route-5");


const path1 = document.querySelector(".path-1");
const path2 = document.querySelector(".path-2");
const path3 = document.querySelector(".path-3");
const path4 = document.querySelector(".path-4");
const path5 = document.querySelector(".path-5");

const loc1 = document.getElementById("loc-1");
const loc2 = document.getElementById("loc-2");
const loc3 = document.getElementById("loc-3");
const loc4 = document.getElementById("loc-4");
const loc5 = document.getElementById("loc-5");

const infoDiv = document.querySelector(".info-div");

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
const wagonNames = [
  document.querySelector('.wagon-name-1'),
  document.querySelector('.wagon-name-2'),
  document.querySelector('.wagon-name-3')
];

function renderPassengers() {
  firstParty.wagons.forEach((wagon, i) => {
    wagonNames[i].innerText = wagon.name;
    const ul = passengerLists[i];
    ul.innerHTML = "";
    wagon.passengers.forEach(passenger => {
      const li = document.createElement("li");
      if (passenger.disease != "none") {
        li.textContent = `${passenger.name} ${passenger.disease}`;
        li.classList.add("passenger-info-text");
      }
      else { li.textContent = passenger.name};
      ul.appendChild(li);
    });
  });
};
setTimeout(() => {
  renderPassengers();
}, 100);

// render items dynamically
Object.entries(firstParty.items).forEach(([item, amount]) => {
  const itemLi = document.createElement("li");
  itemLi.textContent = `${item} : ${amount}`;
  items.appendChild(itemLi);
});


// assigning correct casing for allLocation.js lookup
const fortData = {
  "FortKearney": fortKearney,
  "FortLaramie": fortLaramie,
  "FortBridger": fortBridger,
  "FortHall": fortHall,
  "FortBoise": fortBoise,
};

// using this to check each path for miles left
const allPaths = [path1, path2, path3, path4, path5];
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
let milesLeft = currentPath.dataset.miles;
miles.innerText = `${milesLeft} miles until you reach ${currentLocation.dataset.location}` 



// old way of doing spacebar animation
// document.body.focus();
// let keyCheck = document.body.addEventListener("keyup", (e) => { console.log(e); 
//     // animate(e);
//     animateKeyT(e, allPaths[currentPathIndex]);
//     randomEvents(e);
// });




// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// new autoscroll function i didn't code::::::
let arrived = false;
let autoMoveInterval = null;

function autoMoveWagon(path, step = 10, interval = 500) {
    let distance = Math.round(parseFloat(getComputedStyle(path).width) / window.innerWidth * 100);
    infoDiv.innerText = ""
    autoMoveInterval = setInterval(() => {
        if (arrived || distance <= 0) {
            clearInterval(autoMoveInterval);
            autoMoveInterval = null;
            arrived = true;
            miles.innerText = `You have reached ${currentLocation.dataset.location}!`;
            newShowLocation(currentLocation);
            return;
        }
        distance -= step;
        path.style.width = `${distance}vw`;
        milesLeft -= step;
        miles.innerText = `${milesLeft} miles until you reach ${currentLocation.dataset.location}`;
        // triggers event function. can trigger ANY function in here!
        randomEvents();
    }, interval);
}

// Toggle animation with spacebar
document.body.addEventListener("keyup", (e) => {
    if (e.key === ' ' && !arrived) {
        if (autoMoveInterval) {
            clearInterval(autoMoveInterval);
            autoMoveInterval = null;
        } else {
            autoMoveWagon(allPaths[currentPathIndex]);
        }
    }
    randomEvents(e);
});
// end of autoscroll i didn't code:::::::::
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// this animates the wagon. checks for spacebar. called by above that checks for keypress. coded to iterate path index
// let arrived = false;
// function animateKeyT(e, path) {
//     if (e.key === ' ' && !arrived) {
//         let distance = Math.round(parseFloat(getComputedStyle(path).width) / window.innerWidth * 100);
//         distance -= 10;
//         console.log("Current path:", path);
//         path.style.width = `${distance}vw`
//         milesLeft -= 10;

//         // determines whether you reached a destination or not
//         if (milesLeft <= 0) {
//             arrived = true;
//             miles.innerText = `You have reached ${currentLocation.dataset.location}!`;
            
//             // calls the destination info
//             newShowLocation(currentLocation);
//         }
//         else {miles.innerText = `${milesLeft} miles until you reach ${currentLocation.dataset.location}` 
//         }
//     }
// };

// uses fortData to dynamically update every location. beautiful.
let flavorText = document.querySelector(".flavor-text");
let options = document.querySelector(".options");

function newShowLocation(location) {
  const key = location.dataset.location.replace(/\s+/g, "");

  flavorText.innerText = `${fortData[key].flavorText}`;
  options.innerText = `${fortData[key].options}`;
};


// town logic to continue or use options
document.addEventListener("keydown", (e) => {  
  if (e.key === "2") {
    let purchaseText = document.querySelector(".purchase-text");
    let purchaseOptions = document.querySelector(".purchase-options");
    // clearing arrival text
    flavorText.innerText = "";
    options.innerText = "";

    // removes the - from class and converts to fortData retrievable
    const key = currentLocation.dataset.location.replace(/\s+/g, "");

    purchaseText.innerText = "What will you buy?";
    purchaseOptions.innerText = fortData[key].buySupplies;
  }
  else if (e.key === "1") {
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

    const nextRoute = document.querySelector(`.route-${currentPathIndex + 1}`);
    if (nextRoute) {
      milesLeft = allPaths[currentPathIndex].dataset.miles;
      miles.innerText = `${milesLeft} miles til ${currentLocation.dataset.location}`;
    } else {
      miles.innerText = `You have reached the end of the trail!`;
    }
  }
});

const eventDiv = document.querySelector(".event");
function randomEvents(e) {
    eventDiv.innerText = "";
  const eventChance = (Math.floor(Math.random() * 10) + 1);
    if (eventChance >= 9) {
      let chosenAccident = getRandomAccident();
      eventDiv.innerText = `${chosenAccident}`;
      renderPassengers();

      // Pause the animation
        if (autoMoveInterval) {
            clearInterval(autoMoveInterval);
            autoMoveInterval = null;
            infoDiv.innerText = "Press spacebar to continue"
        }
      // end pause animation

      if (arrived === true) {
        eventDiv.innerText = "";
      }
    };
};


// TODO: add wagon accidents and inventory. link disease to health. allow recovery (doctor eventually) or spontaneous (random). 
// do to oxen exactly what i did to people. they have health too... certain diseases for people/oxen kill them outright. 
// if wagon destroyed move people to other wagons, but overcrowding affects health. 

// move passenger/wagon dynamic creation to party file, then import. simplify