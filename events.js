import { firstParty } from "./createParty.js";

export const diseases = [" measles", " dysentery", " severe diarrhea", " a ruptured spleen", " giant turds", " a buttock rash", " a rotten tooth"];
export const accidents = [" has a broken axle", " caught on fire", " was attacked by bears", " was engulfed by magma from an erupting volcano"];
export const lostDays = Math.floor(Math.random() * 10) + 2;

export function getRandomAccident() {
    const accidentIndex = Math.floor(Math.random() * accidents.length);
    const diseaseIndex = Math.floor(Math.random() * diseases.length);
    const chooseEventType = (Math.floor(Math.random() * 2)) + 1;
    const wagonIndex = Math.floor(Math.random() * firstParty.wagons.length);
    const passengerIndex = Math.floor(Math.random() * firstParty.wagons[wagonIndex].passengers.length);
    const lostDays = (Math.floor(Math.random() * 4) + 2); // made this shorter to ease testing

    let message = "";

    // decide what type of event it is
    if (chooseEventType === 1) {
        // select wagon to have accident happen to
        const chosenAccident = accidents[accidentIndex];
        firstParty.wagons[wagonIndex].accident = chosenAccident;
        message = `${firstParty.wagons[wagonIndex].name + chosenAccident + ". You have lost " + lostDays + " days."}`;
    }
    else if (chooseEventType === 2) {
        // select passenger to have disease
        const chosenDisease = diseases[diseaseIndex];
        firstParty.wagons[wagonIndex].passengers[passengerIndex].disease = chosenDisease;
        message =  `${firstParty.wagons[wagonIndex].passengers[passengerIndex].name + " has" + chosenDisease + ". You have lost " + lostDays + " days."}`;
    }

    return { message, lostDays };
}