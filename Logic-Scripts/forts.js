import { firstParty, updateFood } from "../createParty.js";
import { renderPassengers, fortData, eventDiv, infoDiv, days2, dayDiv, checkForDeath, gameState, newShowLocation } from "../script.js";

export function buyFoodInput(location, currentLocation) {
    const key = currentLocation.dataset.location.replace(/\s+/g, "");
    if (fortData[key].isFort === "no") return;
    if (gameState.mode != buyFood) return; // I just fixed the issue of ferrying a river making the buy food options display!!!!!!!!

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
    const cost = amount * fortData[key].foodCost;

    if (firstParty.money < cost) {
        eventDiv.innerText = "You don't have enough money!";
        return;
    }

    firstParty.money -= cost;
    firstParty.items.food += amount;
    fortData[key].buyFood -= cost;
    renderPassengers();

    eventDiv.innerText = `${amount} pounds of food purchased!`;

    function handleReturn(e) {
        if (e.key === " ") {
        gameState.mode = "default";
        newShowLocation(currentLocation);
        document.removeEventListener("keydown", handleReturn);
        }
    }

    document.addEventListener("keydown", handleReturn);
    });
    }, 0);
}



export function buyItemsInput(location, currentLocation) {
    const key = currentLocation.dataset.location.replace(/\s+/g, ""); // this creates a key to get the current location's object info (above)
    if (fortData[key].isFort === "no") return // safeguard, if it's not a fort then you can't run this buyItems function

    let purchaseText = document.querySelector(".purchase-text"); // grabs that dom element
    let purchaseOptions = document.querySelector(".purchase-options"); // grabs that dom element
    purchaseText.innerText = "What will you buy?"; // rewrites for buying items
    let itemsHtml = ""; // placeholder before we iterate through the available items at this location
    Object.entries(fortData[key].items).forEach(([itemName, itemAmount]) => { // start iterating through items
        const itemPrice = fortData[key].itemCost[itemName]; // gets the cost for each item
        itemsHtml += `<label>${itemName}: $${itemPrice} - (${itemAmount} available)</label><input type="text" id="${itemName}" name="${itemName}"><br><br>`; // builds the type, price, and amount available for each item that exists with a field to input
    });

    purchaseOptions.insertAdjacentHTML("beforeend", `
    <form id="itemForm">
        <label for="itemAmount">${itemsHtml}</label><br>
        <input type="submit" value="Submit">
    </form>
    `); // this generates the form and inputs the item info built above


    // Wait for DOM to update
    setTimeout(() => {
    const form = document.getElementById("itemForm"); // grabs the form element created above
    if (!form) return console.error("Form not found."); // if there isn't an element, throw error

    form.addEventListener("submit", (e) => { // listens for when the form is submitted
    e.preventDefault(); // i think prevents refresh

    let totalCost = 0; // starts counting cost of items
    let purchasedItems = {}; // starts making an object of purchased items

    Object.entries(fortData[key].items).forEach(([itemName]) => { // starts iterating through the fort's items again
        const input = form.elements[itemName]; // trying to take the name of each item (key)
        const quantity = parseInt(input.value, 10) || 0; // trying to get the number for each available item user inputted
        const price = fortData[key].itemCost[itemName]; // trying to get the cost for a specific item, using its key

        totalCost += quantity * price; // updates total cost based on overall items bought
        purchasedItems[itemName] = quantity; // attempting to update the blank object with what was bought and how many
    });

    // iterate through purchased and add them to existing
    // on submit must say 'you purchased X'

    if (totalCost > firstParty.money) {
        eventDiv.innerText = "You don't have enough money!";
        return;
    }; // warning in case you try to buy too much

    firstParty.money -= totalCost; // otherwise, spend the money

    let addedText2 = []; // if this works get rid of the first one


    Object.entries(purchasedItems).forEach(([itemName, itemCount]) => { // now we get to the purchased items object and itemCount is how many

        if (!firstParty.items[itemName]) {
        firstParty.items[itemName] = 0; // safeguard in case nothing is entered
        }

        // add to existing
        firstParty.items[itemName] += itemCount;

        // write what was purchased
        addedText2.push(`${itemCount} ${itemName}`)

    });
    renderPassengers(); // rebuild party info after object.entries loop (it worked inside the loop)
    let youBoughtText2 = "You bought: " + addedText2.join(", ")

    eventDiv.innerText = youBoughtText2;
        }

    , 0)})};




    // if less, lose some of each
    // if more, randomly choose which ones to lose
    // iterate through lost types, randomly lose 1 or 2 or whatever
