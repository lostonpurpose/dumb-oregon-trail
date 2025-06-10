const stop = document.querySelector(".stop");
stop.addEventListener("click", () => {console.log("poop")});
const wagon = document.querySelector("#wagon");
const paths = document.querySelectorAll(".paths");
const miles = document.querySelector(".miles");

document.body.focus();
let keyCheck = document.body.addEventListener("keyup", (e) => { console.log(e); 
    animate(e);
});

const path1 = document.querySelector(".path-1")
let milesLeft = Math.round(parseFloat(getComputedStyle(path1).width) / window.innerWidth * 100);
console.log(milesLeft)

function animate(e) {
    paths.forEach(path => {
    let distance = parseFloat(getComputedStyle(path).right) / window.innerWidth * 100;
    if (e.key === ' ') {
        distance += 10;
        milesLeft -= 10;
        path.style.right = `${distance}vw`
        miles.innerText = `${milesLeft - distance} miles til next landmark` 
    }
})
};