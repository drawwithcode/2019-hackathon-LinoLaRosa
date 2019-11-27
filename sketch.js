var song;
var analyzer;
var button;


function preload() {

    song = loadSound("./assets/TG1_new.mp3");

    background = loadImage("./assets/floralshoppe.jpg");
    bruno = loadImage("./assets/brunovespa.png");
    tg1 = loadImage("./assets/tg1.png");


}

function setup() {

    createCanvas(windowWidth, windowHeight)

    button = createButton("PLAY");
    button.position(windowWidth / 2 - 50, windowHeight - 150);
    button.size(100, 50);
    button.mousePressed(suona);
    button.style('background-color', "black");
    button.style("color", "#73f9c4");
    button.style("border-color", "#73f9c4");

    button2 = createButton("Click here if you don't know what I'm talking about");
    button2.position(windowWidth / 2 - 100, windowHeight - 80);
    button2.size(200, 50);
    button2.mousePressed(openVideo);
    button2.style('background-color', "#ff88a6");
    button2.style("color", "#73f9c4");
    button2.style("border-color", "#73f9c4");

    analyzer = new p5.Amplitude();
    analyzer.setInput(song);

    fft = new p5.FFT();

}

function suona() {

    if (!song.isPlaying()) {
        song.play();
        button.html("STOP/RESTART");
    } else {
        song.stop();
        button.html("RESTART");
    }
}


function draw() {

    song.rate(0.5);

    var volume = 0;
    volume = analyzer.getLevel(); //mi calcola ogni frame il volume della canzone
    volume = map(volume, 0, 1, 0, height); //rimappo il volume da 0 e 1 (valori correnti, o ci sarebbe o non ci sarebbe) a 0 e altezza dello schermo

    fft.analyze();
    var low = fft.getEnergy('bass');
    var mid = fft.getEnergy('mid');

    imageMode(CENTER);
    image(background, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
    image(bruno, windowWidth / 10 * 3, windowHeight / 10 * 3.3, mid * 1.8, mid * 2);
    image(tg1, windowWidth / 10 * 8, windowHeight / 10 * 5.6, low * 2.5, low * 1.5);

}

function openVideo() {

    window.open("https://www.youtube.com/watch?v=bAgmGZ9iQ2Y");

}
