class Pachhab{
    constructor(x,y,width,height,speed){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.speed=speed;
        this.direction=null;
        this.nextDirection=this.direction;
        this.currentFrame=1;
        this.frameCount=7;
        setInterval(()=>{
            this.changeAnimation();
        },100);
    }

    moveProcess(){

            this.changeDirectionIfPossible();
            this.moveForwards();
            if(this.checkCollision()){
                this.moveBackWards();
            }

      
    }

    eat(){
        for(let i=0;i<map.length;i++){
            for(let j=0;j<map[0].length;j++){

                if(
                    map[i][j]==2 &&
                    this.getMapX()==j &&
                    this.getMapY()==i
                ){
                    map[i][j]=3;
                    score++;
                }

     
            }

        }
    }

    moveBackWards(){
        switch(this.direction){
            case DIRECTION_RIGHT:
            this.x-=this.speed;
            break;
            case DIRECTION_LEFT:
            this.x+=this.speed;
            break;
            case DIRECTION_UP:
            this.y+=this.speed;
            break;
            case DIRECTION_BOTTOM:
            this.y-=this.speed;
            break;

    }
    }


    moveForwards(){
            switch(this.direction){
                    case DIRECTION_RIGHT:
                    this.x+=this.speed;
                    break;
                    case DIRECTION_LEFT:
                    this.x-=this.speed;
                    break;
                    case DIRECTION_UP:
                    this.y-=this.speed;
                    break;
                    case DIRECTION_BOTTOM:
                    this.y+=this.speed;
                    break;

            }
    }

    checkCollision(){
            if(
                map[this.getMapY()][this.getMapX()]==1||
                map[this.getMapYRightSide()][this.getMapX()]==1||
                map[this.getMapY()][this.getMapXRightSide()]==1||
                map[this.getMapYRightSide()][this.getMapXRightSide()]==1

            ){
                return true;
            }
            return false;
    }

    checkGhostCollision(){
        for(let i=0;i<ghosts.length;i++){
            if(
                this.getMapX()==ghosts[i].getMapX() &&
                this.getMapY()==ghosts[i].getMapY()
            ){
                return true;
            }
        }
        return false
    }

    changeDirectionIfPossible(){
        if(this.direction==this.nextDirection) return

        let tempDirection=this.direction;
        this.direction=this.nextDirection;
        this.moveForwards();
        if(this.checkCollision()){
                this.moveBackWards();
                this.direction=tempDirection;
        }else{
            this.moveBackWards();
        }
    }

    changeAnimation(){
        this.currentFrame= (this.currentFrame==this.frameCount) ? 1: this.currentFrame+1;
    }

    draw(){
        ctx.save();
        ctx.translate(this.x+oneBlockSize/2,this.y+oneBlockSize/2);
        ctx.rotate((this.direction*90*Math.PI)/180);
        ctx.translate(-this.x-oneBlockSize/2,-this.y-oneBlockSize/2);
        ctx.drawImage(pachhabFrame,(this.currentFrame-1)*oneBlockSize,0,oneBlockSize,oneBlockSize,this.x,this.y,this.width,this.height);
        ctx.restore();
    }

    getMapX(){
            return parseInt(this.x/oneBlockSize)
    }

    getMapY(){
        return parseInt(this.y/oneBlockSize)
}

    getMapXRightSide(){
        return parseInt((this.x+0.9999*oneBlockSize)/oneBlockSize);
    }

    getMapYRightSide(){
        return parseInt((this.y+0.9999*oneBlockSize)/oneBlockSize);
    }
}