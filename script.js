const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
let particlesArray = [];
let isMouseEntered = false;
let theme = "dark";

const mouse = {
    x: undefined,
    y: undefined
}

const colorsArray = [
    "lightblue",
    "lightblue",
    "lightblue",
    "darkblue",
    "darkblue",
    "darkblue"
]

class Particle{
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }

    update(){
        this.x += this.directionX;
        this.y += this.directionY;
        if(this.size > 0){
            this.size -= 0.09;
        }
         
        if(this.size < 0){
            this.size = 0;
        }
        this.draw();
    }
}

const animate = () => {
    requestAnimationFrame(animate);
    createParticles();
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for(let i=0; i < particlesArray.length; i++){
        particlesArray[i].update();
    }
    
}

const createParticles = () => {
    particlesArray = particlesArray.filter(particle =>  particle.size > 0.01);
    if(particlesArray.length < 100){
        let defaultDirectionX = Math.random()*(1-0)+0;
        let defaultDirectionY = Math.random()*(1-0)+0;
        let size = Math.random()*(10-1)+1;
        let x = mouse.x;
        let y = mouse.y;
        let directionX = (Math.random()*10 > 5)? -defaultDirectionX : defaultDirectionX;
        let directionY = (Math.random()*10 > 5)? -defaultDirectionY : defaultDirectionY;
        let color = colorsArray[
                        theme === "light"? Math.floor(Math.random()*(3-0)+0):
                        Math.floor(Math.random()*(6-3)+3)];
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }      
}

animate();

canvas.addEventListener('mouseenter', (e) => {
    isMouseEntered = true;
})

canvas.addEventListener('mousemove', (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
})

canvas.addEventListener('mouseout', () => {
    isMouseEntered = false;
    mouse.x = undefined;
    mouse.y = undefined;
    particlesArray = particlesArray.filter(particle =>  particle.size > 0.01);
})

window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})