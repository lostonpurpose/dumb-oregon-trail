import { Location } from "./Location.js";

export const fortKearney = {
    flavorText: "You have reached Fort Kearney! The small fort town bustles with activity. What would you like to do?",
    options: "1. Continue on the trail\n2. Buy Food\n3. Buy Supplies",
    buySupplies: "1. Leave\n2. Buy Food\n3. Buy Wagon Wheels"
};

export const fortLaramie = {
    flavorText: "You have reached Fort Laramie! This is rugged town struggling to get by. What would you like to do?",
    options: "1. Continue on the trail\n2. Buy Supplies",
    buySupplies: "1. Leave\n2. Buy Food\n3. Buy Wagon Axle"
};

export const fortBridger = {
    flavorText: "You have reached Fort Bridger! It's nothing more than a wooden palisade and stray chickens. What would you like to do?",
    options: "1. Continue on the trail\n2. Buy Supplies",
    buySupplies: "1. Leave\n2. Buy Food\n3. Buy Wagon Yoke"
};

export const fortHall = {
    flavorText: "You have reached Fort Hall! It's nothing more than a wooden palisade and stray chickens. What would you like to do?",
    options: "1. Continue on the trail\n2. Buy Supplies",
    buySupplies: "1. Leave\n2. Buy Food\n3. Buy a Hall",
    selectedItem: ""
};

export const fortBoise = {
    flavorText: "You have reached Fort Boise! Turds alive! It's Built to Spill! What would you like to do?",
    options: "1. Continue on the trail\n2. Buy Supplies",
    foodAvailable: 1800,
    buySupplies: "1. Leave\n2. Buy Food\n3. Buy Perfect From Now On"
};

// need the buy supplies function here. 1. leave, 2. buy food, 3. buy supplies (becomes a new menu with wagon parts, medicine, etc)
// start with 2, update part food. then make new menu, code number options to throw items into array

// on buySupplies screen, logic to purchase things or leave

document.addEventListener("keydown", (e) => {  
    if (e.key === "1") {
        // code to go back to main option screen
    }
    else if (e.key === 2) {
        let selectedItem = document.querySelector(".purchase-text");
        let amountToBuy = document.querySelector(".purchase-options");
        // clearing arrival text
        selectedItem.innerText = "";
        amountToBuy.innerText = "";

        // removes the - from class and converts to fortData retrievable
        const key = currentLocation.dataset.location.replace(/\s+/g, "");

        selectedItem.innerText = "How much food will you buy?";
        amountToBuy.innerText = "There is", fortData[key].foodAvailable, "available.";
    }
    else if (e.key === "3") { // somehow have to make the selected item appear dynamically in the how many line below
        let selectedItem = document.querySelector(".purchase-text");
        let amountToBuy = document.querySelector(".purchase-options");
        // clearing arrival text
        selectedItem.innerText = "";
        amountToBuy.innerText = "";

    // removes the - from class and converts to fortData retrievable
    const key = currentLocation.dataset.location.replace(/\s+/g, "");

    selectedItem.innerText = "How many ?";
    amountToBuy.innerText = fortData[key].buySupplies;
  }
});


// independence, kansas river, big blue river, fort kearney, chimney rock, fort laramie, independence rock, south pass == green river or fort bridger
// if green river, soda springs, fort hall, snake river, fort boise, blue mountains -- fort walla walla or the dulles
// if dulles, oregon city??