import { party } from "./createParty.js";

export const diseases = ["measles", "dysentery", "severe diarrhea", "a ruptured spleen", "giant turds"];
export const accidents = [" has a broken axle", " caught on fire", " was attacked by bears", " was engulfed by magma from a erupting volcano"];

export function getRandomAccident() {
    const accidentIndex = Math.floor(Math.random() * accidents.length);
    const diseaseIndex = Math.floor(Math.random() * diseases.length);
    const chooseEventType = (Math.floor(Math.random() * 2)) + 1;
    
    // decide what type of event it is
    if (chooseEventType === 1) {
        // select wagon to have accident happen to
        const wagonIndex = Math.floor(Math.random() * party.wagons.length);
        const chosenAccident = accidents[accidentIndex];
        return `${party.wagons[wagonIndex].name + chosenAccident}`;


        // return accidents[accidentIndex];
    }
    else if (chooseEventType === 2) {
        return diseases[diseaseIndex];
    }
}

// export const lostDays = range(1, 10);