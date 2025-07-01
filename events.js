export const diseases = ["measles", "dysentery", "severe diarrhea", "ruptured spleen", "giant turds"];

export const accidents = ["wagon axle broke", "wagon caught on fire", "attacked by bears", "volcano erupted and engulfed a wagon"];
export function getRandomAccident() {
    const index = Math.floor(Math.random() * accidents.length);
    return accidents[index];
}

// export const lostDays = range(1, 10);