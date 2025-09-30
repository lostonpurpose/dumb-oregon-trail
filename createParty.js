import { Wagon, wagon1, wagon2, wagon3 } from "./Wagon.js";
import { totalDeath } from "./script.js";

export class Party {
    constructor(name, wagons, money, items={}) {
        this.name = name;
        this.wagons = wagons;
        this.money = money;
        this.items = items;
        this.occupation = this.occupation;
    }
};

export const firstParty = new Party("The Pontipee Family", [wagon1, wagon2, wagon3], 1200, {"food": 850, "wagon wheels": 3, "ox yokes": 2, "medicine": 3}, "banker")
export const OGfirstParty = new Party("The Secret Druids", [wagon1, wagon2, wagon3], 1200, {"food": 850, "wagon wheels": 3, "ox yokes": 2, "medicine": 3}, "banker")
console.log(firstParty);

export function updateFood(days) { 
    const foodPerPersonPerDay = 1;
    let passengerCount = 0;
    firstParty.wagons.forEach(wagon => {
        passengerCount += wagon.passengers.length
    });
    const foodConsumed = passengerCount * foodPerPersonPerDay * days;
    firstParty.items.food -= foodConsumed
    if (firstParty.items.food < 0) {
        firstParty.items.food = 0; // avoids negative
        totalDeath();
    }
};

// being replaced by totalDeath and gameOver functions.
// export function isDeadFromFood() {
//     return firstParty.items.food <= 0;
// };

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

export function deadPerson() {
    firstParty.wagons.forEach(wagon => {
        wagon.passengers.forEach(person => {
            if (!person.isAlive) {
                person.disease = "dead";
                person.health = 0;
                person.age = null;
                person.sex = null;
            }
        })
    });
};