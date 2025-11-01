import { firstParty } from "./createParty.js";
import { deadPerson } from "./createParty.js";

// make disease string simple (no leading space)
export const diseases = ["dysentery"];
export const deaths = [" fell off a cliff and died", " was struck by lightning and died", " was kicked in the head by an ox and died"];
export const boons = ["You found wild berries!", "You found an abandoned wagon!"];

// make an object with disease: days sick
// make the keys identical to the diseases list
// maybe make the values an object with days sick, cost to heal, chance to kill outright (after health drops below 80 or something)
export const accidents = [" has a broken axle", " caught on fire", " was attacked by bears", " was engulfed by magma from an erupting volcano"];
export const lostDays = Math.floor(Math.random() * 10) + 2;

export function getRandomAccident() {
    // Always produce a dysentery event (no deaths/accidents/boons)
    const wagonIndex = Math.floor(Math.random() * firstParty.wagons.length);
    const passengerIndex = Math.floor(Math.random() * firstParty.wagons[wagonIndex].passengers.length);
    const lostDays = Math.floor(Math.random() * 4) + 2;

    const passenger = firstParty.wagons[wagonIndex].passengers[passengerIndex];
    if (!passenger) return "No passenger available.";

    // increment dysentery counter and set appropriate disease string
    passenger.dysenteryCount = (passenger.dysenteryCount || 0) + 1;
    const count = passenger.dysenteryCount;

    if (count === 1) passenger.disease = "has dysentery";
    else if (count === 2) passenger.disease = "has Super Dysentery";
    else passenger.disease = "has Mega Dysentery";

    console.log(`Disease assigned -> ${passenger.name}: count=${count}, disease="${passenger.disease}"`);

    return `${passenger.name} ${passenger.disease}. You have lost ${lostDays} days.`;
}

export function getBoon() {
    let infoMessage; // don't need these??
    let eventMessage;
    const boonIndex = Math.floor(Math.random() * boons.length);
    const chooseBoon = (Math.floor(Math.random() * 100)) + 1;
    const foodAmountFound = (Math.floor(Math.random() * 52)) + 20;
    const wagonPartsFound = (Math.floor(Math.random() * 2)) + 1;

    if (chooseBoon >= 50) { // find food

        infoMessage = `${boons[0] + " You get " + foodAmountFound + " food!"}`;
        firstParty.items["food"] += foodAmountFound;
    }
    else { // find wagon wheels

        infoMessage = `${boons[1] + " You get " + wagonPartsFound + " wagon wheels!"}`
        firstParty.items["wagon wheels"] += wagonPartsFound;
    }
    return {
        infoMessage: infoMessage
    }

};

// apply disease damage per game tick
export function applyDiseaseTick() {
  // iterate every passenger and apply HP loss for dysentery variants
  firstParty.wagons.forEach(wagon => {
    wagon.passengers.forEach(passenger => {
      if (!passenger || passenger.isAlive === false) return;

      const raw = (passenger.disease || "").toString().toLowerCase();

      // determine damage per tick
      let dmg = 0;
      if (raw.includes("mega")) dmg = 4;
      else if (raw.includes("super")) dmg = 2;
      else if (raw.includes("dysentery")) dmg = 1;

      if (dmg > 0) {
        // ensure health initialized (assumes 100 start)
        if (typeof passenger.health !== "number") passenger.health = 100;
        passenger.health -= dmg;

        // clamp and handle death
        if (passenger.health <= 0) {
          passenger.health = 0;
          passenger.isAlive = false;
          // keep existing death handling call
          deadPerson();
        }
      }
    });
  });
}