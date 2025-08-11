import { firstParty } from "./createParty.js";
import { deadPerson } from "./createParty.js";

export const diseases = [" measles", " dysentery", " severe diarrhea", " a ruptured spleen", " giant turds", " a buttock rash", " a rotten tooth"];
export const deaths = [" fell off a cliff and died", " was struck by lightning and died", " was kicked in the head by an ox and died"]
// make an object with disease: days sick
// make the keys identical to the diseases list
// maybe make the values an object with days sick, cost to heal, chance to kill outright (after health drops below 80 or something)
export const accidents = [" has a broken axle", " caught on fire", " was attacked by bears", " was engulfed by magma from an erupting volcano"];
export const lostDays = Math.floor(Math.random() * 10) + 2;

export function getRandomAccident() {
    const accidentIndex = Math.floor(Math.random() * accidents.length);
    const diseaseIndex = Math.floor(Math.random() * diseases.length);
    const deathIndex = Math.floor(Math.random() * diseases.length);
    const chooseEventType = (Math.floor(Math.random() * 100)) + 1; // choose between wagon accident or disease
    // hmm, alter this to 100 and make it 3% chance for death, 20% for ox issue, etc. better, right? disease should be more prevalent
    const wagonIndex = Math.floor(Math.random() * firstParty.wagons.length);
    const passengerIndex = Math.floor(Math.random() * firstParty.wagons[wagonIndex].passengers.length);
    const lostDays = (Math.floor(Math.random() * 4) + 2); // made this shorter to ease testing

    let message = "";

    // decide what type of event it is
    if (chooseEventType >= 8) { // outright passenger death
    // select passenger to die
    const chosenDeath = deaths[deathIndex];
    firstParty.wagons[wagonIndex].passengers[passengerIndex].isAlive = false;
    deadPerson();
    message =  `${firstParty.wagons[wagonIndex].passengers[passengerIndex].name + chosenDeath}`;
    }
    else if (chooseEventType >= 92 && chooseEventType < 98) { // outright ox death
    // select wagon ox to die
    const chosenDisease = diseases[diseaseIndex];
    firstParty.wagons[wagonIndex].passengers[passengerIndex].disease = chosenDisease;
    message =  `${firstParty.wagons[wagonIndex].passengers[passengerIndex].name + " has" + chosenDisease + ". You have lost " + lostDays + " days."}`;
    }
    else if (chooseEventType >= 62 && chooseEventType < 92) { // wagon breakdown
        // select wagon to have accident happen to
        const chosenAccident = accidents[accidentIndex];
        firstParty.wagons[wagonIndex].accident = chosenAccident;
        message = `${firstParty.wagons[wagonIndex].name + chosenAccident + ". You have lost " + lostDays + " days."}`;
    }
    else if (chooseEventType < 62) { // passenger disease
        // select passenger to have disease
        const chosenDisease = diseases[diseaseIndex];
        firstParty.wagons[wagonIndex].passengers[passengerIndex].disease = chosenDisease;
        message =  `${firstParty.wagons[wagonIndex].passengers[passengerIndex].name + " has" + chosenDisease + ". You have lost " + lostDays + " days."}`;
    }

    return { message, lostDays };
}