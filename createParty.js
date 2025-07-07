import { Wagon, wagon1, wagon2, wagon3 } from "./Wagon.js";

export class Party {
    constructor(name, wagons, items={}) {
        this.name = name;
        this.wagons = wagons;
        this.items = items;
    }
};

export const firstParty = new Party("The Secret Druids", [wagon1, wagon2, wagon3], {"food": 300, "wagon wheel": 1, "ox yoke": 2, "medicine": 5})
console.log(firstParty);