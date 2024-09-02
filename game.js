const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
canvas.width=420;
canvas.height=500;
const pachhabFrame=animations;
const ghostFrames=ghos;
let fps=30;
let oneBlockSize=20;
let wallColor="#342DCA";
let foodColor="#FEB879";
let wallInnerColor="black";
let wallSpaceWidth=oneBlockSize/1.6;
let wallOffset=(oneBlockSize-wallSpaceWidth)/2;
let score=0;
let winningScore=219;
const DIRECTION_RIGHT=4;
const DIRECTION_UP=3;
const DIRECTION_LEFT=2;
const DIRECTION_BOTTOM=1;
let ghosts=[];
let ghostCount=4;
let foodCounts=0;
let lives=3;
let createRect=(x,y,width,height,color)=>{
    ctx.fillStyle=color;
    ctx.fillRect(x,y,width,height);
};

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let map2=[
  
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 1],
        [1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
        [1, 2, 2, 1, 2, 2, 2, 1, 1, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1],
        [1, 2, 2, 1, 2, 2, 2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 2, 2, 1],
        [1, 1, 2, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1],
        [1, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
        [1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

     
];
for(let i=0;i<map.length;i++){
    for(let j=0;j<map[0].length;j++){

        if(map[i][j]==2){
           foodCounts++;
        }


    }


}

let randomTargetsForGhosts = [
    { x: 1 * oneBlockSize, y: 1 * oneBlockSize },
    { x: 1 * oneBlockSize, y: (map.length - 2) * oneBlockSize },
    { x: (map[0].length - 2) * oneBlockSize, y: oneBlockSize },
    {
        x: (map[0].length - 2) * oneBlockSize,
        y: (map.length - 2) * oneBlockSize,
    },
];

let ghostLocation=[

        { x: 0, y: 0 },
        { x: 176, y: 0 },
        { x: 0, y: 121 },
        { x: 176, y: 121 },
    
]
let gameLoop=()=>{

    draw();
    update();
  
};

let update=()=>{
    
    pachhab.moveProcess();
    pachhab.eat();
    for(let i=0;i<ghosts.length;i++){
        ghosts[i].moveProcess();
    }

    if(pachhab.checkGhostCollision()){
        restartGame();
    }

    if(score>=foodCounts){
        drawWin();
        clearInterval(gameInterval);
    }
    

};

let restartGame=()=>{
createNewPachhab();
createGhosts();
lives--;
if(lives==0){
    gameOver();
   
}

}

let gameOver=()=>{
    
    clearInterval(gameInterval);
   
    drawGameOver()
};

let drawLives=()=>{
    ctx.font="20px 'Press Start 2P'";
    ctx.fillStyle="white";
    ctx.fillText("Lives : " ,200,oneBlockSize*(map.length+1.4));
    for(let i=0;i<lives;i++){
        ctx.drawImage(pachhabFrame,2*oneBlockSize,0,oneBlockSize,oneBlockSize,355+i*oneBlockSize,oneBlockSize*map.length+7,oneBlockSize,oneBlockSize)
    }
}
let drawScore=()=>{
    ctx.font="20px 'Press Start 2P'";
    ctx.fillStyle="white";
    ctx.fillText("Score :" +score,0,oneBlockSize*(map.length+1.4));
}

let drawGameOver=()=>{
    ctx.font="50px 'Press Start 2P'";
    ctx.fillStyle="red";
    ctx.fillText("GAME OVER !",50,230);
}

let drawWin=()=>{
    ctx.font="50px 'Press Start 2P'";
    ctx.fillStyle="AQUA";
    ctx.fillText("YOU WIN !",90,230);
}
let drawFoods=()=>{
    for(let i=0;i<map.length;i++){
        for(let j=0;j<map[0].length;j++){

            if(map[i][j]==2){
                createRect(
                    j*oneBlockSize+oneBlockSize/3,
                    i*oneBlockSize+oneBlockSize/3,
                    oneBlockSize/3,
                    oneBlockSize/3,
                    foodColor
                )
            }


        }
    
    
    }
    

}
let draw=()=>{
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                createRect(0,0,canvas.width,canvas.height,"black");
                drawWalls();
                drawFoods();
                drawGhosts();
                pachhab.draw();
                drawScore();
                drawLives();
               

};
let gameInterval=setInterval(gameLoop,1000/fps);
let  drawWalls=()=>{

    for(let i=0;i<map.length;i++){
        for(let j=0;j<map[0].length;j++){

                if(map[i][j]==1){
                    createRect(j*oneBlockSize,
                        i*oneBlockSize,
                        oneBlockSize,
                        oneBlockSize,
                        wallColor)
                };
                if(j>0 && map[i][j-1]==1){
                    createRect(j*oneBlockSize,
                        i*oneBlockSize+wallOffset,
                        wallSpaceWidth+wallOffset,
                        wallSpaceWidth,
                        wallInnerColor)
                };
                if(j<map[0].length-1 && map[i][j+1]==1){
                    createRect(j*oneBlockSize+wallOffset,
                        i*oneBlockSize+wallOffset,
                        wallSpaceWidth+wallOffset,
                        wallSpaceWidth,
                        wallInnerColor)
                };
                if(i>0 && map[i-1][j]==1){
                    createRect(j*oneBlockSize+wallOffset,
                        i*oneBlockSize,
                        wallSpaceWidth,
                        wallSpaceWidth+wallOffset,
                        wallInnerColor)
                };
                if(i<map.length-1 && map[i+1][j]==1){
                    createRect(j*oneBlockSize+wallOffset
                        ,i*oneBlockSize+wallOffset,
                        wallSpaceWidth,
                        wallSpaceWidth+wallOffset,
                        wallInnerColor)
                };

        }
    }
}
let drawGhosts=()=>{
    for(let i=0;i<ghosts.length;i++){
        ghosts[i].draw();
    }
}
let createNewPachhab=()=>{
    pachhab=new Pachhab(oneBlockSize,oneBlockSize,oneBlockSize,oneBlockSize,oneBlockSize/5);
}
let createGhosts =()=>{
    ghosts=[];
    for(let i=0;i<ghostCount;i++){
        let newGhost= new Ghost(
            9*oneBlockSize+(i%2 ==0 ?0:1)*oneBlockSize,
            10*oneBlockSize+(i%2 ==0 ?0:1)*oneBlockSize,
            oneBlockSize,
            oneBlockSize,
            pachhab.speed/2,
            ghostLocation[i%4].x,
            ghostLocation[i%4].y,
            124,116,
            6+i
        )
        ghosts.push(newGhost);
    }
}
createNewPachhab();
createGhosts();

gameLoop();

window.addEventListener("keydown",(event)=>{

                let k=event.keyCode
            setTimeout(()=>{
                if(k==37 || k==65){//left
                pachhab.nextDirection=DIRECTION_LEFT

                }else if(k==38 || k==87){//up
                pachhab.nextDirection=DIRECTION_UP
                }else if(k==39 || k==68){//right
                pachhab.nextDirection=DIRECTION_RIGHT
                }else if(k==40 || k==83){//bottom
                pachhab.nextDirection=DIRECTION_BOTTOM
                }
            },1)

})