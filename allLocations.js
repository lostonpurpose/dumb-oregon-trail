import { Location } from "./Location.js";
import { firstParty } from "./createParty.js";
import { renderPassengers, fortData } from "./script.js";

export const fortKearney = {
    flavorText: "You have reached Fort Kearney! The small fort town bustles with activity. What would you like to do?",
    options: "1. Continue on the trail\n2. Buy Food\n3. Buy Supplies",
    buyFood: 1800,
    foodCost: 2,
    buySupplies: "1. Leave\n2. Buy Food\n3. Buy Wagon Wheels"
};

export const fortLaramie = {
    flavorText: "You have reached Fort Laramie! This is rugged town struggling to get by. What would you like to do?",
    options: "1. Continue on the trail\n2. Buy Supplies",
    buyFood: 1500,
    buySupplies: "1. Leave\n2. Buy Food\n3. Buy Wagon Axle"
};

export const fortBridger = {
    flavorText: "You have reached Fort Bridger! It's nothing more than a wooden palisade and stray chickens. What would you like to do?",
    options: "1. Continue on the trail\n2. Buy Supplies",
    buyFood: 1200,
    buySupplies: "1. Leave\n2. Buy Food\n3. Buy Wagon Yoke"
};

export const fortHall = {
    flavorText: "You have reached Fort Hall! It's nothing more than a wooden palisade and stray chickens. What would you like to do?",
    options: "1. Continue on the trail\n2. Buy Supplies",
    buyFood: 800,
    buySupplies: "1. Leave\n2. Buy Food\n3. Buy a Hall",
};

export const fortBoise = {
    flavorText: "You have reached Fort Boise! Turds alive! It's Built to Spill! What would you like to do?",
    options: "1. Continue on the trail\n2. Buy Supplies",
    foodAvailable: 500,
    buySupplies: "1. Leave\n2. Buy Food\n3. Buy Perfect From Now On"
};

// need the buy supplies function here. 1. leave, 2. buy food, 3. buy supplies (becomes a new menu with wagon parts, medicine, etc)
// start with 2, update part food. then make new menu, code number options to throw items into array

// on buySupplies screen, logic to purchase things or leave

// town logic to continue or use options

export function buyFoodInput(location, currentLocation) {
    const key = currentLocation.dataset.location.replace(/\s+/g, "");
    let purchaseText = document.querySelector(".purchase-text");
    let purchaseOptions = document.querySelector(".purchase-options");
        purchaseText.innerText = "How much food will you buy?";
        purchaseOptions.innerText = `${fortData[key].buyFood} \n ${fortData[key].foodCost}`;
    console.log("purchaseOptions exists?", purchaseOptions);
    purchaseOptions.insertAdjacentHTML("beforeend", `<form id="foodForm">
        <label for="foodAmount">Enter the amount of food you want:</label>
        <input type="text" id="foodAmountField" name="foodField"><br><br>
        <input type="submit" value="Submit">
        </form>`);

    

    // Wait for DOM to update
    setTimeout(() => {
    const form = document.getElementById("foodForm");
    if (!form) return console.error("Form not found.");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const amount = parseInt(document.getElementById("foodAmountField").value, 10);
        console.log("User entered:", amount);
        firstParty.items.money -= amount * fortData[key].foodCost;
        firstParty.items.food += amount;
        renderPassengers();
    });
  }, 0);
}

// independence, kansas river, big blue river, fort kearney, chimney rock, fort laramie, independence rock, south pass == green river or fort bridger
// if green river, soda springs, fort hall, snake river, fort boise, blue mountains -- fort walla walla or the dulles
// if dulles, oregon city??