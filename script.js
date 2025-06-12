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
// somehow the below gets us to 200. math.round rounds to 200. the other stuff is width in pixels, i think, then innerwidth converts to vh? i don't know
let milesLeft = Math.round(parseFloat(getComputedStyle(path1).width) / window.innerWidth * 100);
miles.innerText = `${milesLeft} miles til next landmark` 

function animate(e) {
    paths.forEach(path => {
    let distance = parseFloat(getComputedStyle(path).right) / window.innerWidth * 100;
    if (e.key === ' ') {
        distance += 10;
        path.style.right = `${distance}vw`
        
    }
})
    if (milesLeft <= 0) {
        milesLeft = 200;
        miles.innerText = `${milesLeft} miles til next landmark` 
    }
    else {miles.innerText = `${milesLeft} miles til next landmark` 
    milesLeft -= 10;
    
}
    
};