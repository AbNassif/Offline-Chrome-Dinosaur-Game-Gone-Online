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
const dragonFlyingOne = './images/game_assets/characters/dragon/dragonFlyingOne.png';
const dragonFlyingTwo = './images/game_assets/characters/dragon/dragonFlyingTwo.png';

//OBJECT DATA
let animationSpeed = 100;

const PLAYER_ONE = {
    ELEMENT:document.getElementById("player"),
    SPRITES: {
        RUNNING_SPRITES: [walkTwoFront, walkOneFront,
            defaultWalk, walkOneBack, walkTwoBack],
        JUMPING_SPRITE: jumpSpriteImg
    },
    SCORE: 0,
    IS_JUMPING: false, 
}

const DRAGON_OBSTACLE = {
    ELEMENT: undefined,

    SPRITES: {
        RUNNING_SPRITES: [dragonFlyingOne, dragonFlyingTwo]
    },
    HEIGHT: "20vmin",
    POSITION_FROM_BOTTOM: "22vmin"
}

const CACTUS_OBSTACLE = {
    IMG_SRC: [singleCactus],
    HEIGHT:"16vmin",
    POSITION_FROM_BOTTOM: "3vmin"
}

const CACTUSES_OBSTACLE= {
    IMG_SRC: [multipleCactueses],
    HEIGHT: "14vmin",
    POSITION_FROM_BOTTOM: "3vmin"
}

const OBSTACLE_OBJECTS = [CACTUS_OBSTACLE, CACTUSES_OBSTACLE, DRAGON_OBSTACLE];

function jump(character) {
    //Listen for key pressed to jump
    window.addEventListener("keydown", (e) => {
        const key = e.code.toLowerCase();
        if (key === "space") {
            //Only jump when you're not already in the process of jumping
            if (!character.IS_JUMPING) {
                character.ELEMENT.src = jumpSpriteImg;
                character.ELEMENT.style.animation = `jump ${animationSpeed/150}s linear`;   
                character.IS_JUMPING = true;
            }
        }
    })

    player.addEventListener("animationend", () => {
        //Empty the animation to run it again later
        character.ELEMENT.style.animation = "";
        character.IS_JUMPING = false;
        spriteAnimation(0, PLAYER_ONE, true); 
    })
}
jump(PLAYER_ONE)

function keepWithinBoundsOfSpriteArray(ind, arr, goRight) {
    if (isNaN(ind) || !arr) {
        console.error("Make sure the function arguments are valid");
        return;
    }
    //If we reach the end of the array, change direction to to left;
    //Else if we reach the start of the array, change direction to right
    if (ind === arr.length - 1)
        goRight = false;
    else if(ind === 0)
        goRight = true;

    //If boolean value is true, increase index in array, otherwise go in the opposite direction
    (goRight) ? ind++ : ind--;

    return {
        ind: ind,
        direction:goRight
    };
}


let spriteAnimation = (ind, character, goRight) => {
    //Since the we won't need to apply the animation on the dragon once he
    //leaves the screen and we remove his element
    if (!character.ELEMENT|| character.IS_JUMPING)
        return
    
    //switch to the new sprite
    character.ELEMENT.src = character.SPRITES.RUNNING_SPRITES[ind];

    //returns the new index placement along with the current direction
    let spriteArrayTraversingData = keepWithinBoundsOfSpriteArray(ind, character.SPRITES.RUNNING_SPRITES,goRight);
    ind = spriteArrayTraversingData.ind;
    goRight = spriteArrayTraversingData.direction;

    //repeat the animation with the new data

    setTimeout(spriteAnimation.bind(this, ind, character, goRight), animationSpeed);
}   


//Player animation (digimon)
spriteAnimation(0, PLAYER_ONE, true);

// //dragon Obstacle animation
// spriteAnimation(0, dragonSprite,
//     document.querySelector(".dragon"), true);
    
//Spawns obstacles with no sprites

const spawnObstacle = (obstacleObj) => {
    const img = document.createElement("img");
    //If there's one image source then the obstacle is static(doesn't have sprite animation)
    if (obstacleObj.IMG_SRC)
        img.src = obstacleObj.IMG_SRC[0];
    //else if there's more sprites, create the sprite animation
    else {
        obstacleObj.ELEMENT = img;
        spriteAnimation(0, obstacleObj, true)
    }

    //once the element passes the screen, it'll be deleted and the event listener will be removed
    img.addEventListener("animationend", () => {
        img.remove();
        //
        if (obstacleObj.ELEMENT) {
            obstacleObj.ELEMENT = undefined
        }
        const randIndFromObstacleArr = getRandomItemFromArray(OBSTACLE_OBJECTS);
        spawnObstacle(OBSTACLE_OBJECTS[randIndFromObstacleArr]);
        
        
    })

    //Styling the element
    img.style.height = obstacleObj.HEIGHT;
    img.style.position = "absolute";
    img.style.bottom = obstacleObj.POSITION_FROM_BOTTOM;
    img.style.right = obstacleObj.POSITION_FROM_BOTTOM;
    //adding obstacle to the game screen
    document.querySelector(".gameScreen").appendChild(img);    
    //Adding animation
    img.style.animation = `rightToLeft ${animationSpeed/50}s linear`;

}
spawnObstacle(DRAGON_OBSTACLE)

let lastObstacleCreatedIndex;
const getRandomItemFromArray = (arr) => {
    let x = undefined;
    while (x == undefined || x == lastObstacleCreatedIndex) {
        x = Math.floor(Math.random() * arr.length);
    }
    console.log(x);
    lastObstacleCreatedIndex = x;
    return x;
}

