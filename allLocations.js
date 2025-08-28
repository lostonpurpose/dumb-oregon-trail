import { firstParty, updateFood } from "./createParty.js";
import { renderPassengers, fortData, eventDiv, infoDiv, days2, dayDiv, checkForDeath, gameState, newShowLocation } from "./script.js";

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
    buySupplies: "1. Leave\n2. Buy Food\n3. Buy Wagon Wheels",
    items: {"wagon wheels": 4, "ox yokes": 6},
    itemCost: {"wagon wheels": 20, "ox yokes": 10}
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



// RIVERSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
// RIVERSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS



// independence, kansas river, big blue river, fort kearney, chimney rock, fort laramie, independence rock, south pass == green river or fort bridger
// if green river, soda springs, fort hall, snake river, fort boise, blue mountains -- fort walla walla or the dulles
// if dulles, oregon city??