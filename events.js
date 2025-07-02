export const diseases = ["measles", "dysentery", "severe diarrhea", "ruptured spleen", "giant turds"];
export const accidents = ["wagon axle broke", "wagon caught on fire", "attacked by bears", "volcano erupted and engulfed a wagon"];

export function getRandomAccident() {
    const accidentIndex = Math.floor(Math.random() * accidents.length);
    const diseaseIndex = Math.floor(Math.random() * diseases.length);
    const chooseEvent = (Math.floor(Math.random() * 2)) + 1;
    
    // decide what type of event it is
    if (chooseEvent === 1) {
        return accidents[accidentIndex];
    }
    else if (chooseEvent === 2) {
        return diseases[diseaseIndex];
    }
}

// export const lostDays = range(1, 10);