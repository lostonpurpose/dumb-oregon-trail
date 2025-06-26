  import { fart, fortLaramie, fortKearney, fortBridger } from "./allLocations.js";

  const wagon = document.querySelector("#wagon");
  const paths = document.querySelectorAll(".paths");
  const miles = document.querySelector(".miles");
  
  const route2 = document.querySelector(".route-2");

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

  let currentLocation = document.getElementById(`loc-${currentLocationIndex + 1}`)

  document.body.focus();
  let keyCheck = document.body.addEventListener("keyup", (e) => { console.log(e); 
      // animate(e);
      animateKeyT(e, allPaths[currentPathIndex]);
  });



  // somehow the below gets us to 200. math.round rounds to 200. the other stuff is width in pixels, i think, then innerwidth converts to vh? i don't know
  let currentPath = allPaths[currentPathIndex];
  let milesLeft = currentPath.dataset.miles;
  miles.innerText = `${milesLeft} miles til next landmark` 

  // this is the old animate function
  // function animate(e) {
  //     paths.forEach(path => {
  //     let distance = parseFloat(getComputedStyle(path).right) / window.innerWidth * 100;
  //     if (e.key === ' ') {
  //         distance += 10;
  //         path.style.right = `${distance}vw`
          
  //     }
  //     })
  //     };
      // if (milesLeft <= 0) {
      //     milesLeft = 200;
      //     miles.innerText = `${milesLeft} miles til next landmark` 
      // }
      // else {miles.innerText = `${milesLeft} miles til next landmark` 
      // milesLeft -= 10;
      // }
      


  // this animate has path as argument. now coded to interate path index
  let arrived = false;
  function animateKeyT(e, path) {
      if (e.key === 't' && !arrived) {
          let distance = Math.round(parseFloat(getComputedStyle(path).width) / window.innerWidth * 100);
          distance -= 10;
          console.log("Current path:", path);
          path.style.width = `${distance}vw`
          milesLeft -= 10;

          // determines whether you reached a destination or not
          if (milesLeft <= 0) {
              arrived = true;
              miles.innerText = `You have reached ${currentLocation.dataset.location}!`;
              // calls the destination info
              showLocation(currentLocation);
          }
          else {miles.innerText = `${milesLeft} miles til next landmark` 
          }
      }
  };

  // this works. uses the location dataset name to pull correct info. will be better to use the classes when i get around to it.
  function showLocation(location) {
    if (location.dataset.location === "Fort Kearney") {
      document.body.insertAdjacentHTML("beforeend", `<h3>${fortKearney.flavorText}</h3>`);
      
      const safeClass = location.dataset.location.replace(/\s+/g, "-");
      document.body.insertAdjacentHTML("beforeend", `<h3 class="${safeClass}">1. Buy Supplies<br>2. Continue</h3>`);
    }

    else if (location.dataset.location === "Fort Laramie") {
      document.body.insertAdjacentHTML("beforeend", `<h3>${fortLaramie.flavorText}</h3>`);
      
      const safeClass = location.dataset.location.replace(/\s+/g, "-");
      document.body.insertAdjacentHTML("beforeend", `<h3 class="${safeClass}">1. Buy Supplies<br>2. Continue</h3>`);
    }
  };

  // town logic to continue or use options
  document.addEventListener("keydown", (e) => {  
    if (e.key === "1") {
      const safeClass = location.dataset.location.replace(/\s+/g, "-");
      let locationOptions = document.querySelector(`h3.${safeClass}`);
      if (locationOptions) {
        locationOptions.innerText = `${location.dataset.location.replace(/\s+/g, "-").buySupplies}`;
      }
    }
    else if (e.key === "2") {
      if (!arrived) return;  // only allow pressing "2" if arrived is true

      arrived = false;  // reset arrived for next path

      path2.classList.remove("hide-path");
      loc2.classList.remove("hide-loc");
      route2.classList.remove("hide-route");

      document.querySelector(`.route-${currentPathIndex + 1}`).style.display = 'none';  
      currentPathIndex++;
      // updates the location index
      currentLocationIndex++;
      currentLocation = document.getElementById(`loc-${currentLocationIndex + 1}`);

      const nextRoute = document.querySelector(`.route-${currentPathIndex + 1}`);
      if (nextRoute) {
        
        // nextRoute.style.display = 'block';
        milesLeft = allPaths[currentPathIndex].dataset.miles;
        miles.innerText = `${milesLeft} miles til next landmark`;
      } else {
        miles.innerText = `You have reached the end of the trail!`;
      }
    }
  });