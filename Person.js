export class Person {
    constructor(name, disease, health, age, sex) {
        this.name = name;
        this.disease = disease;
        this.health = health;
        this.age = age;
        this.flavorText = sex;
    }
};

export const will = new Person("Will", "none", 100, 45, "male");
export const ayaka = new Person("Ayaka", "none", 100, 36, "female");
export const billy = new Person("Billy", "none", 100, 1, "male");

export const turd = new Person("Turd", "none", 100, 25, "male");
export const fart = new Person("Fart", "none", 100, 23, "female");
export const dookie = new Person("Dookie", "none", 100, 12, "male");
export const pooper = new Person("Pooper", "none", 100, 8, "female");

export const crapper = new Person("Crapper", "none", 100, 32, "male");
export const dapper = new Person("Dapper", "none", 100, 30, "female");