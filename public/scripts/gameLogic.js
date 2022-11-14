//Character Assets
const defaultWalk = "./images/game_assets/characters/yellowDigimon/default.png"
const walkOneFront = "./images/game_assets/characters/yellowDigimon/walkOneFront.png"
const walkTwoFront= "./images/game_assets/characters/yellowDigimon/walkTwoFront.png"
const walkOneBack= "./images/game_assets/characters/yellowDigimon/walkOneBack.png"
const walkTwoBack = "./images/game_assets/characters/yellowDigimon/walkTwoBack.png"
const jumpSpriteImg = "./images/game_assets/characters/yellowDigimon/jump.png"

//Obstacle Assets
const singleCactus = "./images/game_assets/environment/cactus.png";
const multipleCactueses = "./images/game_assets/environment/cactuses.png";


//Using an object to pass by reference
const spriteInfo= {
    currSprite: 0
}
let spriteArr = [defaultWalk, walkOneFront, walkTwoFront, walkOneFront,
    defaultWalk, walkOneBack, walkTwoBack, walkOneBack];
let speed = 1;

let spriteAnimation = (characterElement,sprites) => {
    characterElement.src = spriteArr[
        keepWithinBoundsOfArray(spriteArr, spriteInfo)]
}

function keepWithinBoundsOfArray(arr, ind) {
    if(ind.currSprite == arr.length - 1){
        return ind.currSprite = 0;
    }
    return ind.currSprite= ind.currSprite + 1;
}

// spriteAnimation(document.querySelector(".player"), spriteArr);
// spriteAnimation(document.querySelector(".player"), spriteArr);
// spriteAnimation(document.querySelector(".player"), spriteArr);

let spriteAnimationInterval = setInterval(
    spriteAnimation.bind(this, document.querySelector(".player"), spriteArr
    ), 30)

const spawnObstacles = (obstacleImgSrc) =>{

}

function jumpSprite(spriteAnimationInterval, sprite) {
    let holdInterval = spriteAnimationInterval;
    //cancel the sprite Animation
    clearInterval(spriteAnimationInterval)

    //add jump sprite
    //add spriteAnimationAgain
    spriteAnimationInterval = holdInterval;
}

function jump() {
    let jumpingInProcess = false;
    const player = document.querySelector(".player");  

    //Listen for key pressed to jump
    window.addEventListener("keydown", (e) => {
        const key = e.code.toLowerCase();
        if (key === "space") {
            //Only jump when you're not already in the process of jumping
            if (!jumpingInProcess) {
                clearInterval(spriteAnimationInterval)
                player.src = jumpSpriteImg;
                player.style.animation = "jump 0.75s linear ";   
                jumpingInProcess = true;
            }
        }
    })

    player.addEventListener("animationend", () => {
        //Empty the animation to run it again later
        player.style.animation = "";
        jumpingInProcess = false;
        spriteAnimationInterval = setInterval(
        spriteAnimation.bind(this, document.querySelector(".player"), spriteArr
    ), 30)
    })

}
jump()
