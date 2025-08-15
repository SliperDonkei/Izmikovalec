// Globalne spremenljivke
var canvas, context;
var boomerang;
var bX = 650, bY = 275, bRotation = 0;
var bgimg;
var powerup = 5;
var timer = Date.now();
var moc = 0;
var h = 300
var p = 300
var nuke;
var alive = true;
var boom = true;
var explosion = false;
var gor = true;
var counter = 0;
var rakete = [
    { nX: h, nY: p, nRotation: 10, nTargetRot: 0, ns: 1 },
];
/*
for (var i = 0; i < rakete.length; i++) {
    rakete[i].nX
}
*/
function main() {
    // Zacetek programa
    // Najdemo canvas in si ga shranimo v globalno spremenljivko
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    //Slikice
    bgimg = document.createElement("img");
    bgimg.src = "data/parkirisce.jpg";

    boomerang = document.createElement("img");
    boomerang.src = "data/avto.png";

    nuke = document.createElement("img")
    nuke.src = "data/nuke.png"

    nukimg = document.createElement("img")
    nukimg.src = "data/nukimg.png"

    //Musika, zvocni ucinki
    document.addEventListener("keydown", function (e) {
         if (e.key == "b") {
            var best = new Audio('data/bestofbest.mp3');
            best.play();
        }
        
        
        
        
        if (e.key == "c") {
            var charlie = new Audio('data/charlie.mp3');
            charlie.play();
        }
        
        if (e.key == "m") {
            var music = new Audio('data/ncat.mp3');
            music.play();
        }

        if (e.key == "h") {
            var horn = new Audio('data/horn.mp3');
            horn.play();
        }

        if (e.key == "z") {
            var ZaAndraza = new Audio('data/ZaAndraza.mp3');
            ZaAndraza.play();
        }

        if (e.key == "f") {
            var Frank = new Audio('data/FrankSinatra.mp3');
            Frank.play();
        }

        //Uporaba powerupov
        if (bY > 40 && e.key == 'ArrowUp' && powerup > 0) {
            bY = 40
            powerup = powerup - 1
            var audio = new Audio('data/jump.mp3');
            audio.play()
        }

        if (bY < canvas.height - 70 && e.key == 'ArrowDown' && powerup > 0) {
            bY = canvas.height - 70
            powerup = powerup - 1
            var audio = new Audio('data/jump.mp3');
            audio.play()
        }
    });

    tick();
}




function tick() {
    // Funkcija tick se poklice veckrat na sekundo
    update(); // najprej izracunajmo novo stanje igre
    draw(); // potem pa stanje izrisimo na canvas
    requestAnimationFrame(tick);
}

function update() {
    // Logiko sprogramirajte tukaj

    counter++;

    for (var i = 0; i < rakete.length; i++) {
        if (counter % 30 == 0) {
            rakete[i].ns += 0.005;
        }

        // Premikaj raketo
        var dx = Math.cos(rakete[i].nRotation) * rakete[i].ns;
        var dy = Math.sin(rakete[i].nRotation) * rakete[i].ns;
        console.log(i, dx, dy)
        rakete[i].nX += dx;
        rakete[i].nY += dy;


        // Razdalja med raketo in avtom
        var dist = Math.sqrt(Math.pow(bX - rakete[i].nX, 2) + Math.pow(bY - rakete[i].nY, 2))


        // Preveri ce je collision
        if (dist <= 120) {
            alive = false
            var sound = new Audio('data/explosion.mp3');
            sound.play()
            explosion = true
        }

    }


    //Pridobivanje powerupov
    if (Math.floor((Date.now() - timer) / 1000) % 120 == 0) {
        if (moc == 0) {
            powerup += 5
            moc = 1
        }
    } else {
        moc = 0
    }
    //Unicevanje rakete
    for (var i = rakete.length - 1; i >= 0; i--) {

        if (rakete[i].nX <= 0 + 60 ||
            rakete[i].nX >= canvas.width - 70 ||
            rakete[i].nY <= 0 + 45 ||
            rakete[i].nY >= canvas.height - 75
        ) {
            rakete.splice(i, 1);
            var newx = Math.random() * (canvas.width - 130) + 60
            var newy = Math.random() * (canvas.height - 120) + 45
            var ex = new Audio('data/boom.mp3');
            ex.play()
            rakete.push({ nX: newx, nY: newy, nRotation: 10, nTargetRot: 0, ns: 1 });
            rakete.push({ nX: newx, nY: newy, nRotation: 10, nTargetRot: 0, ns: 1 });
            
        }
    }

    //Premikanje avta
    if (bX >= 0 + 60) {
        if (keyboard["a"] || keyboard["A"]) {
            bX -= 5;
        }
    }

    if (bX <= canvas.width - 70) {
        if (keyboard["d"] || keyboard["D"]) {
            bX += 5;
        }
    }

    if (bY >= 0 + 45) {
        if (keyboard["w"] || keyboard["W"]) {
            bY -= 5;
        }
    }
    if (bY <= canvas.height - 75) {
        if (keyboard["s"] || keyboard["S"]) {
            bY += 5;
        }
    }

    //Izracunajmo kot med raketo in avtom

    for (var i = 0; i < rakete.length; i++) {
        rakete[i].nTargetRot = -Math.atan2(rakete[i].nX - bX, rakete[i].nY - bY) - Math.PI / 2;
        if (rakete[i].nRotation < rakete[i].nTargetRot) {
            rakete[i].nRotation = rakete[i].nRotation + 0.05;
        }
        if (rakete[i].nRotation > rakete[i].nTargetRot) {
            rakete[i].nRotation = rakete[i].nRotation - 0.05;
        }
    }






}

function draw() {
    // Risanje sprogramirajte tukaj
    //Risanje eksplozije

    // Narisemo ozadje
    //context.fillStyle = "#2b1c07ff";
    // context.fillRect(0,0,canvas.width,canvas.height);
    context.drawImage(bgimg, 0, 0, canvas.width, canvas.height)
    // Narisemo krog
    //context.beginPath();
    context.fillStyle = "orange";
    context.font = "30px Verdana"
    context.fillText("time: " + Math.floor((Date.now() - timer) / 1000), canvas.width - 200, 40)
    context.fillText("Number of powerups: " + powerup, 20, 40);
    if (explosion == true) {
        context.fillStyle = "red";
        context.font = "100px Verdana"
        context.fillText("GAME OVER :(", 460, 330);
    }

    //context.fill();

    // Boomerang 
    if (alive == true) {
        drawImageRotated(context, boomerang, bX - 125, bY - 100, 250, 200, bRotation);

        //nuke
        //if (boom == true){
        //    drawImageRotated(context, nuke, nX-75, nY-50, 150, 100, nRotation);
        //}    

        for (var i = 0; i < rakete.length; i++) {
            //rakete[i].nX
            drawImageRotated(context, nuke, rakete[i].nX - 75, rakete[i].nY - 50,
                150, 100, rakete[i].nRotation);
        }







    }
}
   
    
  