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
  miles.innerText = `${milesLeft} miles until you reach ${currentLocation.dataset.location}` 

  // this animates the wagon. checks for spacebar. called by above that checks for keypress. coded to iterate path index
  let arrived = false;
  function animateKeyT(e, path) {
      if (e.key === ' ' && !arrived) {
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
          else {miles.innerText = `${milesLeft} miles until you reach ${currentLocation.dataset.location}` 
          }
      }
  };

  // this works. uses the location dataset name to pull correct info. will be better to use the classes when i get around to it.
  let flavorText = document.querySelector(".flavor-text");
  let options = document.querySelector(".options");
  function showLocation(location) {
    if (location.dataset.location === "Fort Kearney") {
      // document.body.insertAdjacentHTML("beforeend", `<h3>${fortKearney.flavorText}</h3>`);
      flavorText.innerText = `${fortKearney.flavorText}`;
      options.innerText = `${fortKearney.options}`;
      
      const safeClass = location.dataset.location.replace(/\s+/g, "-");
      // document.body.insertAdjacentHTML("beforeend", `<h3 class="${safeClass}">${fortKearney.options}</h3>`);
    }

    else if (location.dataset.location === "Fort Laramie") {
      document.body.insertAdjacentHTML("beforeend", `<h3>${fortLaramie.flavorText}</h3>`);
      // document.querySelector(`h3.${safeClass}`).innerText.replace = "poop"
      
      const safeClass = location.dataset.location.replace(/\s+/g, "-");
      // optionText.innerText(fortLaramie.flavorText);
      document.body.insertAdjacentHTML("beforeend", `<h3 class="${safeClass}">1. Buy Supplies<br>2. Continue</h3>`);optionText.innerText(fortLaramie.flavorText);
    }
  };

  // town logic to continue or use options
  document.addEventListener("keydown", (e) => {  
    if (e.key === "2") {
      let purchaseText = document.querySelector(".purchase-text");
      let purchaseOptions = document.querySelector(".purchase-options");
      // clearing arrival text
      flavorText.innerText = "";
      options.innerText = "";

      // assigning correct casing for allLocation.js lookup
      const fortData = {
        "FortKearney": fortKearney
      };

      // removes the - from class and converts to fortData retrievable
      const key = currentLocation.dataset.location.replace(/\s+/g, "");

      purchaseText.innerText = "What will you buy?";
      purchaseOptions.innerText = fortData[key].buySupplies;
    }
    else if (e.key === "1") {
      if (!arrived) return;  // only allow pressing "2" if arrived is true
      arrived = false;  // reset arrived for next path

      // updating things like getting rid of prior path etc
      path2.classList.remove("hide-path");
      loc2.classList.remove("hide-loc");
      route2.classList.remove("hide-route");
      flavorText.innerText = "";
      options.innerText = "";

      document.querySelector(`.route-${currentPathIndex + 1}`).style.display = 'none';  
      currentPathIndex++;
      // updates the location index
      currentLocationIndex++;
      currentLocation = document.getElementById(`loc-${currentLocationIndex + 1}`);

      const nextRoute = document.querySelector(`.route-${currentPathIndex + 1}`);
      if (nextRoute) {
        
        // nextRoute.style.display = 'block';
        milesLeft = allPaths[currentPathIndex].dataset.miles;
        miles.innerText = `${milesLeft} miles til ${currentLocation.dataset.location}`;
      } else {
        miles.innerText = `You have reached the end of the trail!`;
      }
    }
  });

// need to get option 1 working again. add couple more routes and can finally add random event logic. also make every leave option continue on the trail. can also code party generation. fun.