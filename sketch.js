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
    button.position(windowWidth / 2 - 50, windowHeight - 100);
    button.size(100, 50);
    button.mousePressed(suona);

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

    image(background, 0, 0, windowWidth, windowHeight);
    image(bruno, windowWidth/10*2.3, windowHeight/10*2, mid*1.8, mid*2);
    image(tg1, windowWidth/10*6.5, windowHeight/10*3.6, low*2.5, low*1.5);


}
