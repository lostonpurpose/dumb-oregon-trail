import { firstParty } from "./createParty.js";

// restore exported lostDays so other modules (script.js) can import it
export let lostDays = 0;

// make disease string simple (no leading space)
export const diseases = ["dysentery"];
export const deaths = [" fell off a cliff and died", " was struck by lightning and died", " was kicked in the head by an ox and died"];
export const boons = ["You found wild berries!", "You found an abandoned wagon!"];

// accidents should be objects so consumers can read message/disease/lostDays reliably
export const accidents = [
  { id: "broken_axle", message: "A wagon axle broke", lostDays: 2 },
  { id: "caught_fire", message: "A wagon caught fire", lostDays: 3 },
  { id: "bear_attack", message: "You were attacked by bears", lostDays: 4 },
  // disease-type accident: no message on purpose so we synthesize "Tom got dysentery"
  { id: "dysentery", disease: "dysentery", lostDays: 2 }
];

// safer getRandomAccident implementation
export function getRandomAccident() {
  if (!Array.isArray(accidents) || accidents.length === 0) return null;
  const raw = accidents[Math.floor(Math.random() * accidents.length)];
  if (!raw) return null;

  // shallow copy so we don't mutate the template
  const chosen = { ...raw };

  // if chosen specifies lostDays, expose it via the exported variable
  if (Number.isFinite(chosen.lostDays)) {
    lostDays = chosen.lostDays;
  } else {
    lostDays = 0;
  }

  // If this is a disease-type accident and there's no human-readable message,
  // pick a living passenger and synthesize the message, and assign the disease.
  if (chosen.disease && !chosen.message) {
    try {
      const passengers = (firstParty && firstParty.wagons)
        ? firstParty.wagons.flatMap(w => w.passengers || [])
        : [];

      const alive = passengers.filter(p => p && p.isAlive !== false);
      const victim = alive.length ? alive[Math.floor(Math.random() * alive.length)] : passengers[0];

      if (victim) {
        // assign the disease to the victim so other code will observe it
        victim.disease = chosen.disease;
        chosen.message = `${victim.name} got ${chosen.disease}`;
      } else {
        chosen.message = `Someone got ${chosen.disease}`;
      }
    } catch (err) {
      chosen.message = chosen.message || `An incident involving ${chosen.disease} occurred`;
      console.error("getRandomAccident: failed to assign disease to a victim", err);
    }
  } else if (!chosen.message && !chosen.disease) {
    // fallback: ensure we always have a readable message
    chosen.message = String(raw) || "An incident occurred";
  }

  return chosen;
}

export function getBoon() {
    let infoMessage;
    const chooseBoon = (Math.floor(Math.random() * 100)) + 1;
    const foodAmountFound = (Math.floor(Math.random() * 52)) + 20;
    const wagonPartsFound = (Math.floor(Math.random() * 2)) + 1;

    if (chooseBoon >= 50) { // find food
        infoMessage = `${boons[0] + " You get " + foodAmountFound + " food!"}`;
        firstParty.items["food"] += foodAmountFound;
    }
    else { // find wagon wheels
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