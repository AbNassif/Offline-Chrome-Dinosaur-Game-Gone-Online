let defaultWalk = "./images/game_assets/characters/yellowDigimon/default.png"
let walkOneFront = "./images/game_assets/characters/yellowDigimon/walkOneFront.png"
let walkTwoFront= "./images/game_assets/characters/yellowDigimon/walkTwoFront.png"
let walkOneBack= "./images/game_assets/characters/yellowDigimon/walkOneBack.png"
let walkTwoBack = "./images/game_assets/characters/yellowDigimon/walkTwoBack.png"


//Using an object to pass by reference
const spriteInfo= {
    currSprite: 0
}
let spriteArr = [defaultWalk, walkOneFront, walkTwoFront, walkOneFront,
    defaultWalk, walkOneBack, walkTwoBack, walkOneBack];
let speed = 1;

let spriteAnimation = (characterElement,...sprites) => {
    characterElement.style.backgroundImage = `url(${spriteArr[
        keepWithinBoundsOfArray(spriteArr, spriteInfo)]})`; 
    console.log(characterElement.style.backgroundImage)
}

function keepWithinBoundsOfArray(arr, ind) {
    if(ind.currSprite == arr.length - 1){
        return ind.currSprite = 0;
    }
    return ind.currSprite= ind.currSprite + 1;
}

spriteAnimation(document.querySelector(".player"), spriteArr);
spriteAnimation(document.querySelector(".player"), spriteArr);
spriteAnimation(document.querySelector(".player"), spriteArr);

const test = setInterval(spriteAnimation.bind(this,document.querySelector(".player"), spriteArr),500)