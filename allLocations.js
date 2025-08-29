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

export const testRiver = {
    isFort: "no",
    flavorText: "You have reached the Test River! It is 200 feet wide and 3.1 feet deep. What will you do?",
    options: "1. Attempt to ford the river\n2. Pay for a ferry ($15)\n3. Hire a native to find a suitable crossing ($8, lose 2 days)",
    width: 200,
    depth: 3.1,
    ferryCost: 15,
    nativeCost: 8,
    nativeDaysLost: 2
};

// un comment out after test river working.

// export const fortLaramie = {
//     isFort: "yes",
//     flavorText: "You have reached Fort Laramie! This is rugged town struggling to get by. What would you like to do?",
//     options: "1. Continue on the trail\n2. Buy Food\n3. Buy Supplies",
//     buyFood: 1500,
//     foodCost: 3,
//     buySupplies: "1. Leave\n2. Buy Food\n3. Buy Wagon Axle",
//     items: {"wagon wheels": 3, "ox yokes": 5, "medicine": 2},
//     itemCost: {"wagon wheels": 25, "ox yokes": 18, "medicine": 30}
// };

export const fortBridger = {
    isFort: "yes",
    flavorText: "You have reached Fort Bridger! It's nothing more than a wooden palisade and stray chickens. What would you like to do?",
    options: "1. Continue on the trail\n2. Buy Food\n3. Buy Supplies",
    buyFood: 1200,
    buySupplies: "1. Leave\n2. Buy Food\n3. Buy Wagon Yoke",
    items: {"wagon wheels": 3, "ox yokes": 5, "medicine": 2},
    itemCost: {"wagon wheels": 25, "ox yokes": 18, "medicine": 30}
};

export const theGreenRiver = {
    isFort: "no",
    flavorText: "You have reached the Green River! It is 160 feet wide and 1.6 feet deep. What will you do?",
    options: "1. Attempt to ford the river\n2. Pay for a ferry ($15)\n3. Hire a native to find a suitable crossing ($5, lose 1 days)",
    width: 160,
    depth: 1.6,
    ferryCost: 15,
    nativeCost: 5,
    nativeDaysLost: 1
};

export const fortHall = {
    isFort: "yes",
    flavorText: "You have reached Fort Hall! It's nothing more than a wooden palisade and stray chickens. What would you like to do?",
    options: "1. Continue on the trail\n2. Buy Food\n3. Buy Supplies",
    buyFood: 800,
    buySupplies: "1. Leave\n2. Buy Food\n3. Buy a Hall",
};

export const theSnakeRiver = {
    isFort: "no",
    flavorText: "You have reached the Snake River! It is 290 feet wide and 5.8 feet deep. What will you do?",
    options: "1. Attempt to ford the river\n2. Pay for a ferry ($27)\n3. Hire a native to find a suitable crossing ($10, lose 4 days)",
    width: 290,
    depth: 5.8,
    ferryCost: 27,
    nativeCost: 10,
    nativeDaysLost: 4
};

export const fortBoise = {
    isFort: "yes",
    flavorText: "You have reached Fort Boise! Turds alive! It's Built to Spill! What would you like to do?",
    options: "1. Continue on the trail\n2. Buy Food\n3. Buy Supplies",
    foodAvailable: 500,
    buySupplies: "1. Leave\n2. Buy Food\n3. Buy Perfect From Now On"
};


// RIVERSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
// RIVERSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS



// independence, kansas river, big blue river, fort kearney, chimney rock, fort laramie, independence rock, south pass == green river or fort bridger
// if green river, soda springs, fort hall, snake river, fort boise, blue mountains -- fort walla walla or the dulles
// if dulles, oregon city??