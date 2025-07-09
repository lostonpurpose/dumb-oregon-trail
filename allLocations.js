import { Location } from "./Location.js";
import { firstParty } from "./createParty.js";
import { renderPassengers, fortData } from "./script.js";

export const theKansasRiver = {
    isFort: "no",
    flavorText: "You have reached the Kansas River! It is 200 feet wide and 3.1 feet deep. What will you do?",
    options: "1. Continue on the trail\n2. Attempt to ford the river\n3. Pay for a ferry ($15)",
    width: 200,
    depth: 3.1
    // buySupplies: "1. Leave\n2. Buy Food\n3. Buy Wagon Wheels"
};

export const fortKearney = {
    isFort: "yes",
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

export function buyFoodInput(location, currentLocation) {
    const key = currentLocation.dataset.location.replace(/\s+/g, "");
    if (fortData[key].isFort === "no") return

    let purchaseText = document.querySelector(".purchase-text");
    let purchaseOptions = document.querySelector(".purchase-options");
    purchaseText.innerText = "How much food will you buy?";
    purchaseOptions.innerText = `Food available: ${fortData[key].buyFood} \n Cost per pound: ${fortData[key].foodCost}`;
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
        const cost = amount * fortData[key].foodCost;
        if (firstParty.items.money < cost) return console.log("You do not have enough money");
        firstParty.items.money -= amount * fortData[key].foodCost;
        firstParty.items.food += amount;
        renderPassengers();
    });
    }, 0);
}
export function buyItemsInput() {

};

export function fordRiver(currentLocation) {
    const key = currentLocation.dataset.location.replace(/\s+/g, "");
    if (fortData[key].depth >= 3.5) {
        // definite fail, lose a lot of items
    }
    else if (fortData[key].depth >= 2.5) {
        // chance of failure, lose a few items
    }
    else {
        // definite success
    }
}

export function takeFerry() {
    
}

// independence, kansas river, big blue river, fort kearney, chimney rock, fort laramie, independence rock, south pass == green river or fort bridger
// if green river, soda springs, fort hall, snake river, fort boise, blue mountains -- fort walla walla or the dulles
// if dulles, oregon city??