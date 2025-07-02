import { Person, will, ayaka, billy, pooper, fart, dookie, turd, crapper, dapper } from "./Person.js";

export class Wagon {
    constructor(name, passengers) {
        this.name = name;
        this.passengers = passengers;
    }
};

export const wagon1 = new Wagon("Wagon 1", [will, ayaka, billy]);
export const wagon2 = new Wagon("Wagon 2", [pooper, fart, dookie, turd]);
export const wagon3 = new Wagon("Wagon 3", [crapper, dapper]);
