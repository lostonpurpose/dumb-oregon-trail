import { Location } from "./Location.js";
import { firstParty } from "./createParty.js";
import { renderPassengers, fortData, eventDiv, infoDiv } from "./script.js";

export const theKansasRiver = {
    isFort: "no",
    flavorText: "You have reached the Kansas River! It is 200 feet wide and 3.1 feet deep. What will you do?",
    options: "1. Attempt to ford the river\n2. Pay for a ferry ($15)\n3. Hire a native to find a suitable crossing ($8, lose 2 days)",
    width: 200,
    depth: 3.1,
    ferryCost: 15,
    nativeCost: 8,
    nativeDaysLost: 2
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

// 70% chance of success for rivers slightly deep
function fordRiverSuccessChance() {
    const result = Math.random()
    if (result <= .7) return true;
    else return false;
};

// determining which and how many items you lose
function lostItems() {
    const numberOfItems = Object.keys(firstParty.items).length;
    const loseALot = Math.floor((Math.random() * 5) + 3); // lose 3-5 item types
    const loseAFew = Math.floor((Math.random() * 3) + 1); // lose 1-3 item types
};

export function fordRiver(currentLocation) {
    const key = currentLocation.dataset.location.replace(/\s+/g, "");
    if (fortData[key].isFort === "yes") return console.error("This is a fort, but this should only work for rivers");
    if (fortData[key].depth >= 3.5) {
        // definite failure, lose a bunch of items
        infoDiv.innerText = "You attempt to ford the river. Huge mistake."
        eventDiv.innerText = `Guess what, you've just lost a bunch of stuff.` // here insert what was lost via random loss function, not yet made
    }
    else if (fortData[key].depth >= 2.5) {
        // chance of failure, lose a few items
        infoDiv.innerText = "You attempt to ford the river. Risky, but possible."
        if (fordRiverSuccessChance()) {
            eventDiv.innerText = `You were lucky and made it across! Press 1 to continue.`
            fortData[key].isFort = "yes" // lets you press 1 to continue now
        }
        else {
            eventDiv.innerText = `You were unlucky! You lose the following: ` // if failed see above but lose less, have to code this
        }
    }
    else {
        // definite success
        infoDiv.innerText = "You attempt to ford the river."
        eventDiv.innerText = "You crossed successfully! Press 1 to continue."
        fortData[key].isFort = "yes" // lets you press 1 to continue now
    }
}

export function takeFerry(currentLocation) {
    const key = currentLocation.dataset.location.replace(/\s+/g, "");
    infoDiv.innerText = `You take a nearby ferry to cross the river and lose ${fortData[key].ferryCost}`
    firstParty.money -= fortData[key].ferryCost
}

export function hireNative() {

}

// independence, kansas river, big blue river, fort kearney, chimney rock, fort laramie, independence rock, south pass == green river or fort bridger
// if green river, soda springs, fort hall, snake river, fort boise, blue mountains -- fort walla walla or the dulles
// if dulles, oregon city??