import { theKansasRiver, bigBlueRiver, fortKearney, chimneyRock, fortLaramie, independenceRock, fortBridger, theGreenRiver, fortHall, theSnakeRiver, fortBoise, blueMountains, fortWallaWalla, oregonCity } from "./allLocations.js";
import { buyFoodInput, buyItemsInput } from "./Logic-Scripts/forts.js";
import { fordRiver, takeFerry, hireNative } from "./Logic-Scripts/rivers.js";
import { diseases, accidents, getRandomAccident, getBoon, lostDays, applyDiseaseTick } from "./events.js";
import { firstParty, updateFood, diseaseToHealth } from "./createParty.js";
import { renderPassengers } from "./Logic-Scripts/renderPassengers.js";
import { startGame } from "./Logic-Scripts/start-party.js";

// expose to console for debugging
window.firstParty = firstParty;

// turns the wagon brown if it has dysentery
const wagon = document.querySelector("#wagon");
let theWagonItself = "healthy";
if (theWagonItself === "dysentery") {
  wagon.classList.add("dysentery");
};


let gameOver = false;
export const gameState = { mode: "default" }; // moved this way up to use it for title screen
// export const gameState = { mode: "title" }; // moved this way up to use it for title screen --- enable for title screen

// startGame(); // BEGIN THE GAME!!!!! WITH A TITLE SCREEN
// uncomment so the listener works


function escalateDisease(existingDisease, baseDisease) {
  if (!existingDisease || existingDisease === "none") return baseDisease;
  const low = String(existingDisease).toLowerCase();
  const base = String(baseDisease).toLowerCase();
  if (low === base) return `super ${base}`;
  if (low === `super ${base}`) return `mega ${base}`;
  return existingDisease;
}


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
  const route9 = document.querySelector(".route-9");
  const route10 = document.querySelector(".route-10");
  const route11 = document.querySelector(".route-11");
  const route12 = document.querySelector(".route-12");
  const route13 = document.querySelector(".route-13");
  const route14 = document.querySelector(".route-14");


  const path1 = document.querySelector(".path-1");
  const path2 = document.querySelector(".path-2");
  const path3 = document.querySelector(".path-3");
  const path4 = document.querySelector(".path-4");
  const path5 = document.querySelector(".path-5");
  const path6 = document.querySelector(".path-6");
  const path7 = document.querySelector(".path-7");
  const path8 = document.querySelector(".path-8");
  const path9 = document.querySelector(".path-9");
  const path10 = document.querySelector(".path-10");
  const path11 = document.querySelector(".path-11");
  const path12 = document.querySelector(".path-12");
  const path13 = document.querySelector(".path-13");
  const path14 = document.querySelector(".path-14");


  const loc1 = document.getElementById("loc-1");
  const loc2 = document.getElementById("loc-2");
  const loc3 = document.getElementById("loc-3");
  const loc4 = document.getElementById("loc-4");
  const loc5 = document.getElementById("loc-5");
  const loc6 = document.getElementById("loc-6");
  const loc7 = document.getElementById("loc-7");
  const loc8 = document.getElementById("loc-8");
  const loc9 = document.querySelector(".loc-9");
  const loc10 = document.querySelector(".loc-10");
  const loc11 = document.querySelector(".loc-11");
  const loc12 = document.querySelector(".loc-12");
  const loc13 = document.querySelector(".loc-13");
  const loc14 = document.querySelector(".loc-14");


  export const infoDiv = document.querySelector(".info-div");



  renderPassengers();



  // assigning correct casing for allLocation.js lookup
  export const fortData = {
    "theKansasRiver": theKansasRiver,
    "BigBlueRiver": bigBlueRiver,
    "FortKearney": fortKearney,
    "ChimneyRock": chimneyRock,
    "FortLaramie": fortLaramie,
    "IndependenceRock": independenceRock,
    "FortBridger": fortBridger,
    "theGreenRiver": theGreenRiver,
    "FortHall": fortHall,
    "theSnakeRiver": theSnakeRiver,
    "FortBoise": fortBoise,
    "BlueMountains": blueMountains,
    "FortWallaWalla": fortWallaWalla,
    "OregonCity": oregonCity
  };




  // using this to check each path for miles left
  const allPaths = [path1, path2, path3, path4, path5, path6, path7, path8, path9, path10, path11, path12, path13, path14];
  let currentPathIndex = 0;
  // not using currently
  const allLocations = [loc1, loc2, loc3, loc4, loc5, loc6, loc7, loc8, loc9, loc10, loc11, loc12, loc13, loc14];
  export let currentLocationIndex = 0;
  // not using currently
  const allRoutes = [route1, route2, route3, route4, route5, route6, route7, route8, route9, route10, route11, route12, route13, route14];
  let currentRouteIndex = 0;

  export let currentLocation = document.getElementById(`loc-${currentLocationIndex + 1}`)

  // somehow the below gets us to 200. math.round rounds to 200. the other stuff is width in pixels, i think, then innerwidth converts to vh? i don't know
  let currentPath = allPaths[currentPathIndex];
  let currentRoute = allRoutes[currentRouteIndex]; // added this so i can apply width style to route container and shrink it with movement
  let milesLeft = parseInt(currentPath.dataset.miles, 10);
  miles.innerText = `${Math.max(milesLeft - 20, 0)} miles until ${currentLocation.dataset.location}` 



  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  // new autoscroll function i didn't code::::::
  let arrived = false;
  let autoMoveInterval = null;

  // let days = 0;
  export let days2 = { dayCounter: 0}
  export const dayDiv = document.querySelector(".days");
  infoDiv.innerText = "Press spacebar to continue" // sets this message at start of the game. 

  function autoMoveWagon(path, route, step = 10, interval = 500) {
    // don't clear messages if in a paused state
    if (gameState.mode === "default") {
      infoDiv.innerText = "";
      eventDiv.innerText = "";
    }

    autoMoveInterval = setInterval(() => {
      // pause if not in default mode (death, buyFood, etc.)
      if (gameState.mode !== "default") {
        clearInterval(autoMoveInterval);
        autoMoveInterval = null;
        return;
      }

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
      miles.innerText = `${Math.max(milesLeft - 20, 0)} miles until ${currentLocation.dataset.location}`;

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
      
      // handle death-pause: resume movement on spacebar
      if (e.key === ' ' && gameState.mode === "death-pause") {
        eventDiv.innerText = "";
        gameState.mode = "default";
        autoMoveWagon(allPaths[currentPathIndex], allRoutes[currentRouteIndex]);
        return;
      }

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
            miles.innerText = `${Math.max(milesLeft - 20, 0)} miles until ${currentLocation.dataset.location}`;
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

        // normalize isFort value for robust checks
        const isFortFlag = locData && typeof locData.isFort !== "undefined"
          ? String(locData.isFort).toLowerCase()
          : null;

        // explicitly check for "no" first (rivers)
        const isRiver = isFortFlag === "no" || isFortFlag === "false" || isFortFlag === "n";

        const isFort = !isRiver && Boolean(locData) &&
          (
            isFortFlag === "true" ||
            isFortFlag === "yes" ||
            isFortFlag === "y" ||
            isFortFlag === "1"
          );

        if (isRiver) {
          // River — take ferry
          gameState.mode = "takeFerry";
          console.log("takeFerry (river) for:", key, "locData:", locData);
          takeFerry(currentLocation);
        } else if (isFort) {
          // Fort — buy food
          gameState.mode = "buyFood";
          console.log("buyFoodInput firing for fort:", key, locData);
          if (locData) {
            flavorText.innerText = locData.flavorText || "";
            options.innerText = locData.options || "";
          } else {
            flavorText.innerText = "";
            options.innerText = "";
          }
          buyFoodInput(locData, currentLocation);
        } else {
          console.warn("Unknown location type for key 2:", key);
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

let fakeMoveInterval = null;
export const eventDiv = document.querySelector(".event");

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
    // dayDiv.innerText = days2.dayCounter; DON'T NEED TO SHOW DAYS CURRENTLY
    i++;
    updateFood(1); // update for 1 day each tick
    diseaseToHealth(2); // updates for diseases. change 2 to disease severity
    renderPassengers();
    // NEW check for death
    checkForDeath();
    // END check
  }, 500);
}
  // replace the existing randomEvents function with this hardened version
  function randomEvents(e) {
    // don't clear death messages
    if (gameState.mode !== "death-pause") {
      eventDiv.innerText = "";
    }
    let eventChance = (Math.floor(Math.random() * 20) + 1); // 1-20 chance

    if (eventChance >= 18 && eventChance < 20){ // currently 18-19 roll means accident
      let chosenAccident = getRandomAccident();
      if (!chosenAccident) return;


      // now i can assign dysentery to a wagon part (added disease to the wagon Class)

      // If it's a disease-type accident and there's no message, pick a local victim
      // need to add code to pick a wagon part after a certain currentLocationIndex (maybe index unnecessary, don't know)
      if (chosenAccident.disease && !chosenAccident.message) {
        // Get all passengers from all wagons and combine them into one list.
        // flatMap goes through each wagon, grabs its passengers array (or empty array if none),
        // and flattens it all into a single list of passengers.
        const passengers = firstParty.wagons.flatMap(w => w.passengers || []);
        const alive = passengers.filter(p => p && p.isAlive !== false);
        // If there are alive passengers, pick one at random. Otherwise fall back to the first passenger (even if dead).
        const victim = alive.length ? alive[Math.floor(Math.random() * alive.length)] : passengers[0]; // terneary operator
        if (victim) {
          // restore escalation: bump "dysentery" -> "super dysentery" -> "mega dysentery"
          const newDisease = escalateDisease(victim.disease, chosenAccident.disease);
          victim.disease = newDisease;
          chosenAccident.message = `${victim.name} got ${newDisease}`;
        } else {
          chosenAccident.message = `Someone got ${chosenAccident.disease}`;
        }
      }


      // display message and continue with lostDays logic as before
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

    // scripts to get a random wagon part that will get dysentery after a certain distance........
    
    else if (eventChance >= 15 && eventChance < 18) { // wagon part dysentery event
      const wagonParts = ["the wagon", "wagon wheels", "wagon axles", "ox yokes"]; // below will be the one to use, just testing wagon only dysentery for now
      // const wagonParts = ["the wagon", "wagon wheels", "wagon axles", "ox yokes"];

      function pickWagonPart() {
        return wagonParts[Math.floor(Math.random() * wagonParts.length)];
      }

      // grabbing the wagon part safely in separate wrapper
      function getWagonPartDysentery() {
        const diseasedPart = pickWagonPart();
        return diseasedPart;
      }

      const diseasedPart = getWagonPartDysentery();
      if (!diseasedPart) return;
      // prevent stacking dysentery on wagon parts
      if (firstParty.partStatus && firstParty.partStatus[diseasedPart] === "dysentery") return;

      if (diseasedPart === "the wagon") {
        theWagonItself = "dysentery";
        // need to pause animation so user can see eventdiv.innertext
        // reflect wagon disease visually
        if (wagon) {
          if (autoMoveInterval) { clearInterval(autoMoveInterval); autoMoveInterval = null; }
          eventDiv.innerText = "Your wagon got dysentery!";
          infoDiv.innerText = "Press spacebar to continue";
          wagon.classList.add("dysentery");
        }
      }
        
        else if (diseasedPart != "the wagon") {
        if (autoMoveInterval) { clearInterval(autoMoveInterval); autoMoveInterval = null; }

          // mark the wagon part as diseased in partStatus
          if (!firstParty.partStatus) firstParty.partStatus = {};
          firstParty.partStatus[diseasedPart] = "dysentery";

          eventDiv.innerText = `Your ${diseasedPart} got dysentery!`;
          infoDiv.innerText = "Press spacebar to continue";
          renderPassengers(); // update UI to show diseased part in red
        }

    // end wagon part dysentery code..........................................................



    // adding boons here ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (eventChance === 20) {
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
    }
};

export function totalDeath() {
  infoDiv.innerText = "You have made a huge mistake.";
  eventDiv.innerText = "Everyone is dead";
  gameOver = true;
};


// new notes dec 2025
// need to get wagon diseases set up after certain timing
// same with locations, start with the 3 options occasionally having a disease (2. buy food (has dysentery)
// then allow for the location itself to have dysentery after certain index (maybe 5 or 6) (ft kearney has dysentery, the snake river has dysentery, etc. )
// code sky color changes to poop colors as you go.
// code chance for healing at forts. 20% chance or something.
// code chance for healing randomly on trail. 5% chance per day or something.

 

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