import { party } from "./createParty.js";

export const diseases = [" has measles", " has dysentery", " has severe diarrhea", " has a ruptured spleen", " has giant turds"];
export const accidents = [" has a broken axle", " caught on fire", " was attacked by bears", " was engulfed by magma from an erupting volcano"];

export function getRandomAccident() {
    const accidentIndex = Math.floor(Math.random() * accidents.length);
    const diseaseIndex = Math.floor(Math.random() * diseases.length);
    const chooseEventType = (Math.floor(Math.random() * 2)) + 1;
    const wagonIndex = Math.floor(Math.random() * party.wagons.length);
    const passengerIndex = Math.floor(Math.random() * party.wagons[wagonIndex].passengers.length);

    
    // decide what type of event it is
    if (chooseEventType === 1) {
        // select wagon to have accident happen to
        const chosenAccident = accidents[accidentIndex];
        return `${party.wagons[wagonIndex].name + chosenAccident}`;
    }
    else if (chooseEventType === 2) {
        // select passenger to have disease
        const chosenDisease = diseases[diseaseIndex];
        return `${party.wagons[wagonIndex].passengers[passengerIndex].name + chosenDisease}`;

    }
}

// export const lostDays = range(1, 10);