import { fart } from "./allLocations.js";
import { fortSumpter } from "./allLocations.js";

const wagon = document.querySelector("#wagon");
const paths = document.querySelectorAll(".paths");
const miles = document.querySelector(".miles");

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


const allPaths = [path1, path2, path3, path4, path5];
let currentPathIndex = 0;
const allLocations = [loc1, loc2, loc3, loc4, loc5];
let currentLocationIndex = 0;

const currentLocation = document.getElementById(`loc-${currentLocationIndex + 1}`)

document.body.focus();
let keyCheck = document.body.addEventListener("keyup", (e) => { console.log(e); 
    animate(e);
    animateKeyT(e, allPaths[currentPathIndex]);
});



// somehow the below gets us to 200. math.round rounds to 200. the other stuff is width in pixels, i think, then innerwidth converts to vh? i don't know
let currentPath = allPaths[currentPathIndex];
let milesLeft = currentPath.dataset.miles;
miles.innerText = `${milesLeft} miles til next landmark` 

// this is the old animate function
function animate(e) {
    paths.forEach(path => {
    let distance = parseFloat(getComputedStyle(path).right) / window.innerWidth * 100;
    if (e.key === ' ') {
        distance += 10;
        path.style.right = `${distance}vw`
        
    }
    })
    // if (milesLeft <= 0) {
    //     milesLeft = 200;
    //     miles.innerText = `${milesLeft} miles til next landmark` 
    // }
    // else {miles.innerText = `${milesLeft} miles til next landmark` 
    // milesLeft -= 10;
    // }
    
};

// this animate has path as argument. now coded to interate path index
let arrived = false;
function animateKeyT(e, path) {
    if (e.key === 't' && !arrived) {
        let distance = Math.round(parseFloat(getComputedStyle(path).width) / window.innerWidth * 100);
        distance -= 10;
        console.log("Current path:", path);
        path.style.width = `${distance}vw`
        milesLeft -= 10;
    
        if (milesLeft <= 0) {
            arrived = true;
            miles.innerText = `You have reached ${currentLocation.dataset.location}!`;
            // trying to get this to work, showing current location options
            showLocation(currentLocation);
        }
        else {miles.innerText = `${milesLeft} miles til next landmark` 
        }
    }
};

// this works. uses the location dataset name to pull correct info. will be better to use the classes when i get around to it.
function showLocation(location) {
  if (location.dataset.location === "Fort Sumpter") {
    document.body.insertAdjacentHTML("beforeend", `<h3>${fortSumpter.flavorText}</h3>`);

    
    const safeClass = location.dataset.location.replace(/\s+/g, "-");
    document.body.insertAdjacentHTML("beforeend", `<h3 class="${safeClass}">1. Buy Supplies<br>2. Continue</h3>`);
  }
  
}

// town logic to continue
document.addEventListener("keydown", (e) => {  
  if (e.key === "1") {
    const safeClass = "Fort-Sumpter"; // or generate dynamically
    let locationOptions = document.querySelector(`h3.${safeClass}`);
    if (locationOptions) {
      locationOptions.innerText = `What will you buy?\n\n1. Food\n2. Wagon wheel\n3. Leave`;
    }
  }
  else if (e.key === "2") {
    if (!arrived) return;  // only allow pressing "2" if arrived is true

    arrived = false;  // reset arrived for next path

    document.querySelector(`.route-${currentPathIndex + 1}`).style.display = 'none';  
    currentPathIndex++;

    const nextRoute = document.querySelector(`.route-${currentPathIndex + 1}`);
    if (nextRoute) {
      path2.classList.remove("display");
      loc2.classList.remove("display");
      nextRoute.style.display = 'block';
      milesLeft = allPaths[currentPathIndex].dataset.miles;
      miles.innerText = `${milesLeft} miles til next landmark`;
    } else {
      miles.innerText = `You have reached the end of the trail!`;
    }
  }
});