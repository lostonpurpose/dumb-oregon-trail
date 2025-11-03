import { theKansasRiver, fortKearney, fortLaramie, fortBridger, theGreenRiver, fortHall, theSnakeRiver, fortBoise } from "./allLocations.js";
import { buyFoodInput, buyItemsInput } from "./Logic-Scripts/forts.js";
import { fordRiver, takeFerry, hireNative } from "./Logic-Scripts/rivers.js";
import { diseases, accidents, getRandomAccident, getBoon, lostDays, applyDiseaseTick } from "./events.js";
import { firstParty, updateFood, diseaseToHealth } from "./createParty.js";
import { renderPassengers } from "./Logic-Scripts/renderPassengers.js";
import { startGame } from "./Logic-Scripts/start-party.js";

let gameOver = false;
export const gameState = { mode: "title" }; // moved this way up to use it for title screen

startGame(); // BEGIN THE GAME!!!!! WITH A TITLE SCREEN



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



  renderPassengers();



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
      // dayDiv.innerText = days2.dayCounter; // hiding days for now.
      updateFood(1);
      diseaseToHealth(2) // new function does it work?? it does! from create party. need to remove 2 and add in the disease severity
      // currently subtracts health if character is dead, but fixing the above will fix this issue (dead severity = 0, ironically)



      // NEW CHANGES VIBE CODING
      applyDiseaseTick();
      renderPassengers(); // update UI to show lowered health / deaths
      // END NEW CHANGES



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
  console.log("alex 1")
  document.body.addEventListener("keyup", (e) => {
    
      console.log("alex 2")
      if (e.key === ' ' && !arrived && !checkForDeath()) {
        
          console.log("alex 3")
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

  export function newShowLocation(location) { // THANK YOU ALEX!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (arrived) {
    const key = location.dataset.location.replace(/\s+/g, "");
    const currentLocationKey = fortData[key];
    flavorText.innerText = `${fortData[key].flavorText}`;
    options.innerText = `${fortData[key].options}`;

    townOptions(currentLocationKey);
  };
}

  // i just moved townOptions call into newShowLocation func b/c it should only happen after you've reached a place. this way it also 
  // has access to location




// global spacebar - return to fort menu listener. only fires when not in 'default mode', aka only when in a location
document.addEventListener("keydown", (e) => {
  if (e.key === " " && gameState.mode !== "default") {
    // return from a modal/menu (buyFood/buyItems/etc.) back to the town main menu
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

      // KEY 2 = depends on if it's a fort (buy food) or a river (ford/ferry)
      else if (e.key === "2") {
        const datasetLoc = currentLocation && currentLocation.dataset && currentLocation.dataset.location;
        const key = datasetLoc ? String(datasetLoc).replace(/\s+/g, "") : "";
        const locData = (typeof fortData !== "undefined" && fortData) ? fortData[key] : null;

        // normalize isFort value for robust checks (handles "yes"/"no"/true/false/legacy)
        const isFortFlag = locData && typeof locData.isFort !== "undefined"
          ? String(locData.isFort).toLowerCase()
          : null;

        const isFort =
          Boolean(locData) &&
          (
            isFortFlag === "true" ||
            isFortFlag === "yes" ||
            isFortFlag === "y" ||
            isFortFlag === "1" ||
            (locData.type && String(locData.type).toLowerCase() === "fort") ||
            Boolean(locData.buySupplies) // legacy indicator for a fort
          );

        if (isFort) {
          // show fort text from the data and pass the data object to the buy handler
          gameState.mode = "buyFood";
          console.log("buyFoodInput firing for fort:", key, locData);
          if (locData) {
            flavorText.innerText = locData.flavorText || "";
            options.innerText = locData.options || "";
          } else {
            flavorText.innerText = "";
            options.innerText = "";
          }
          // pass locData first (older buyFoodInput expects the fort object)
          buyFoodInput(locData, currentLocation);
        } else {
          // River (or unknown location) — take ferry / ford
          gameState.mode = "takeFerry";
          console.log("takeFerry (river) for:", key, "locData:", locData);
          takeFerry(currentLocation);
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

  export function lostDaysCalculator(chosenAccident) {
  // use the outer fakeMoveInterval so it can be cleared elsewhere
  if (!chosenAccident || !Number.isFinite(chosenAccident.lostDays) || chosenAccident.lostDays <= 0) {
    return;
  }

  let i = 0;
  fakeMoveInterval = setInterval(() => {
    if (i >= chosenAccident.lostDays) {
      clearInterval(fakeMoveInterval);
      fakeMoveInterval = null;
      infoDiv.innerText = "Press spacebar to continue";
      return;
    }
    // days ++
    days2.dayCounter ++;
    dayDiv.innerText = days2.dayCounter;
    i++;
    updateFood(1); // update for 1 day each tick
    diseaseToHealth(2); // updates for diseases. change 2 to disease severity
    renderPassengers();
    // NEW check for death
    checkForDeath();
    // END check
  }, 500);
  }

  let fakeMoveInterval = null;
  export const eventDiv = document.querySelector(".event");
  // replace the existing randomEvents function with this hardened version
  function randomEvents(e) {
      eventDiv.innerText = "";
      let eventChance = (Math.floor(Math.random() * 20) + 1);

      if (eventChance >= 18) {
        let chosenAccident = getRandomAccident();
        if (!chosenAccident) return;

        // If it's a disease-type accident and there's no message, pick a local victim
        if (chosenAccident.disease && !chosenAccident.message) {
          const passengers = firstParty.wagons.flatMap(w => w.passengers || []);
          const alive = passengers.filter(p => p && p.isAlive !== false);
          const victim = alive.length ? alive[Math.floor(Math.random() * alive.length)] : passengers[0];
          if (victim) {
            victim.disease = chosenAccident.disease;
            chosenAccident.message = `${victim.name} got ${chosenAccident.disease}`;
          } else {
            chosenAccident.message = `Someone got ${chosenAccident.disease}`;
          }
        }

        eventDiv.innerText = chosenAccident.message || chosenAccident.infoMessage || "";
        if (Number.isFinite(chosenAccident.lostDays) && chosenAccident.lostDays > 0) {
          if (autoMoveInterval) { clearInterval(autoMoveInterval); autoMoveInterval = null; }
          lostDaysCalculator(chosenAccident);
        } else {
          infoDiv.innerText = "Press spacebar to continue";
          if (autoMoveInterval) { clearInterval(autoMoveInterval); autoMoveInterval = null; }
        }
        if (arrived === true) eventChance = 0;
        return;
      }

      // adding boons here
      else if (eventChance >= 15 && eventChance < 18) {
        console.log(eventChance + "this should fire");
        let chosenBoon = getBoon();
        console.log("chosenBoon:", chosenBoon);
        infoDiv.innerText = `${chosenBoon.infoMessage}`;
        renderPassengers();

        console.log("state is:", autoMoveInterval);
        // Pause the animation while displaying boon message
        if (autoMoveInterval) {
          clearInterval(autoMoveInterval);
          autoMoveInterval = null;
        }
        console.log("state is:", autoMoveInterval);

        if (arrived === true) {
          eventChance = 0;
        }
        eventDiv.innerText = 'Press spacebar to continue';
      } else {
        return;
      }
  };

  export function totalDeath() {
    infoDiv.innerText = "You have made a huge mistake.";
    eventDiv.innerText = "Everyone is dead";
    gameOver = true;
  };


  // rethinking my inks. going to pare down the game to pure comedy. no one is going to play this often. 
  // they'll play one time through and enjoy the humor. everyone gets dysentery needs to be real
  // so, the only disease is dysentery. oxen can get it. the wagon can get it. rivers can get it.
  // if a char gets it twice it's 'super dysentery', their health drops quicker.
  // that's the whole game. sky turns brown by the end and if they reach oregon valley, the valley has dysentery too. everyone dies. 
  // it's a fun, funny parody. yes i should allow healing at forts. that's about it. 
  // so NEW TODO:::
    // change default party items. no medicine or yokes. back to just one wagon. 5 or 6 party members. that's it.
    // change to one disease. code that disease stacking.
    // code health drops based on dysentery severity.
    // at end - redo location distances.

  // i need to rethink the next steps in terms of mvp
  // FIXED:: big one visually - right now when you reach a loc the wagon covers it. extend each path by 2 or something so it's in front of you.
  // FIXED:: new visual issue - route needs to shrink with progress so background mountains don't stop.
  // FIXED:: snake river strange behavior. miles not counting down. does not stop when reached (former prob causes latter) - forgot to add to route list!
  // FIXED:: new visual issue - 1. some forts not appearing. FIXED:: 2. long routes - left side mountians don't extend to right all the way to fort/river
  // FIXED:: new visual issue - right side mountains scroll, but don't always stretch to right side of screen (had to turn off no-repeat)
  // right now person can only have one disease. have to change it to [] and display that (foreach)
  // if wagon breaks down and you have a spare part, use it and continue. if not, "waiting for wagon to pass" or "waiting for dad who went to the 
  // next town" 

  // food makes you die. need to make it make your health drop, just
  // code minimum people per wagon, or transfer of people to other wagons. think it out on paper.
  // code speed based on oxen. might get into floor division. 
  // give player choices on pause screen. give medicine (chance of cure). what else? don't know.
  // make new town options - visit doctor, buy oxen, extra - add member to party (brings money and food). or ditch a person ha ha.
  // FIXED MAYBE:: make some boons - abandoned wagon, berries

  // FIXED:: yeah the town text at rivers is a game breaker right now. have possible solution in rivers file. event listener is getting multiplied i guess 
  // big one - i could just make a starting town where you buy everything from the start like any other town. just need three buttons to 
  // choose what your background is. eventually... (not mvp) allow lots of choices, like you're a doctor (super easy).
  // you know what? if i think about this as a way to get a job, just make it suuuuuper simple to start
  // in town if purchase screen, nothing says spacebar will return you to main town menu

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