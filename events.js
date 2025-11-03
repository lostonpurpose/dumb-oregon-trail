import { firstParty } from "./createParty.js";

// restore exported lostDays so other modules (script.js) can import it
export let lostDays = 0;

// make disease string simple (no leading space)
export const diseases = ["dysentery"];
export const deaths = [" fell off a cliff and died", " was struck by lightning and died", " was kicked in the head by an ox and died"];
export const boons = ["You found wild berries!", "You found an abandoned wagon!"];

// accidents should be objects so consumers can read message/disease/lostDays reliably
// add a `weight` field for weighted random selection (higher = more likely)
export const accidents = [
  { id: "broken_axle", message: "A wagon axle broke", lostDays: 2, weight: 1 },
  { id: "caught_fire", message: "A wagon caught fire", lostDays: 3, weight: 0.5 }, // less likely
  { id: "bear_attack", message: "You were attacked by bears", lostDays: 4, weight: 0.5 }, // less likely
  // disease-type accident: dysentery made slightly more likely via higher weight
  { id: "dysentery", disease: "dysentery", lostDays: 2, weight: 12 }
];

// helper: pick a weighted random element from an array with `weight` props
function pickWeighted(arr) {
  const total = arr.reduce((s, a) => s + (Number(a.weight) || 0), 0);
  if (total <= 0) return arr[Math.floor(Math.random() * arr.length)] || null;
  let r = Math.random() * total;
  for (const item of arr) {
    r -= (Number(item.weight) || 0);
    if (r <= 0) return item;
  }
  return arr[arr.length - 1] || null;
}

// safer getRandomAccident implementation (uses weighted pick)
export function getRandomAccident() {
  if (!Array.isArray(accidents) || accidents.length === 0) return null;
  const raw = pickWeighted(accidents);
  if (!raw) return null;

  // shallow copy so we don't mutate the template
  const chosen = { ...raw };

  // preserve existing behavior: do NOT assign disease to victims here (script.js handles that)
  return chosen;
}

export function getBoon() {
    let infoMessage;
    const chooseBoon = (Math.floor(Math.random() * 100)) + 1;
    const foodAmountFound = (Math.floor(Math.random() * 52)) + 20;
    const wagonPartsFound = (Math.floor(Math.random() * 2)) + 1;

    // reduce chance to find berries/food (now ~50% food, 50% wagon parts)
    if (chooseBoon <= 50) { // find food (berries)
        infoMessage = `${boons[0] + " You get " + foodAmountFound + " food!"}`;
        firstParty.items["food"] += foodAmountFound;
    }
    else { // find wagon wheels (more likely than before)
        infoMessage = `${boons[1] + " You get " + wagonPartsFound + " wagon wheels!"}`
        firstParty.items["wagon wheels"] += wagonPartsFound;
    }
    return {
        infoMessage: infoMessage
    }
};

// apply disease damage per game tick
export function applyDiseaseTick() {
  // iterate every passenger and apply HP loss for dysentery variants
  firstParty.wagons.forEach(wagon => {
    wagon.passengers.forEach(passenger => {
      if (!passenger || passenger.isAlive === false) return;

      const raw = (passenger.disease || "").toString().toLowerCase();

      // determine damage per tick
      let dmg = 0;
      if (raw.includes("mega")) dmg = 4;
      else if (raw.includes("super")) dmg = 2;
      else if (raw.includes("dysentery")) dmg = 1;

      if (dmg > 0) {
        // ensure health initialized (assumes 100 start)
        if (typeof passenger.health !== "number") passenger.health = 100;
        passenger.health -= dmg;

        // clamp and handle death
        if (passenger.health <= 0) {
          passenger.health = 0;
          passenger.isAlive = false;
          // keep existing death handling call
          deadPerson();
        }
      }
    });
  });
}

// keep old callers working: provide diseaseToHealth alias if other modules call that
export function diseaseToHealth(...args) {
  // ignore args for now; preserve previous behavior
  return applyDiseaseTick(...args);
}