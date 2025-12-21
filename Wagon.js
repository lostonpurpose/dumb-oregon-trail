import { Person, will, ayaka, billy, pooper, fart, dookie, turd, crapper, dapper, calvin, annalisa, dennis, christine, melissa, isaac, carter, penelope } from "./Person.js";

export class Wagon {
    constructor(name, passengers, oxen, accident = "", disease = "none") {
        this.name = name;
        this.passengers = passengers;
        this.oxen = oxen;
        this.accident = accident; // initialize from parameter
        this.disease = disease;   // initialize from parameter
    }
};

export const ogwagon1 = new Wagon("Wagon 1", [will, ayaka, billy, calvin], 4, "", "");
export const ogwagon2 = new Wagon("Wagon 2", [pooper, fart, dookie, turd], 6, "", "");
export const ogwagon3 = new Wagon("Wagon 3", [crapper, dapper], 3, "", "");

export const wagon1 = new Wagon("Wagon 1", [will, ayaka, billy, calvin, crapper, dapper], 4, "", ""); // currently used for testing
export const wagon2 = new Wagon("Wagon 2", [calvin, annalisa, dennis, christine], 6, "", "");
export const wagon3 = new Wagon("Wagon 3", [melissa, isaac, carter, penelope], 3, "", "");