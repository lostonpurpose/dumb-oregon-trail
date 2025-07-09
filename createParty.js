import { Wagon, wagon1, wagon2, wagon3 } from "./Wagon.js";

export class Party {
    constructor(name, wagons, items={}) {
        this.name = name;
        this.wagons = wagons;
        this.items = items;
    }
};

export const firstParty = new Party("The Secret Druids", [wagon1, wagon2, wagon3], {"money": 600, "food": 500, "wagon wheel": 1, "ox yoke": 2, "medicine": 3})
console.log(firstParty);

export function updateFood(days) { 
    const foodPerPersonPerDay = 1;
    let passengerCount = 0;
    firstParty.wagons.forEach(wagon => {
        passengerCount += wagon.passengers.length
    });
    const foodConsumed = passengerCount * foodPerPersonPerDay * days;
    firstParty.items.food -= foodConsumed
    if (firstParty.items.food < 0) firstParty.items.food = 0; // avoids negative
};

export function isDead() {
    return firstParty.items.food <= 0;
};

// holy shit i wrote this in one go and it works perfectly!
export function diseaseToHealth(subtractedHealth) {
    firstParty.wagons.forEach((wagon) => {
        wagon.passengers.forEach((person) => {
            if (person.disease === "none") {
                return;
            }
            else {
                person.health -= subtractedHealth;
            }
        })
    }
)};