// binbar = document.querySelector("#bits");  
var lastRender = 0
var lineVal = 0;
var avgPerf = [];
var focussed = true;
var random;
var vol = 0.1;
var m1 = document.querySelector("#m1");
var fon = true;
var m2 = document.querySelector("#m2");
var m3 = document.querySelector("#m3");
var m4 = document.querySelector("#m4");
var m5 = document.querySelector("#m5");

var Beep1 = new Audio('./audio/Beep1.wav');
Beep1.volume = vol;
var Beep2 = new Audio('./audio/Beep2.wav');
Beep2.volume = vol;
var Beep3 = new Audio('./audio/Beep3.wav');
Beep3.volume = vol;
// can you please update github I beg you why aren't you deploying
window.oncontextmenu = function () {
    return false
} // prevent right clicking coz its a pain in the ass 

var player = {
    solves: new Decimal(0),
    digits: new Decimal(1),
    qlavrams: new Decimal(0),
    cracks: new Decimal(0),
    randForcers: new Decimal(0),
    bruteForcers: new Decimal(0),
    sMultiplier: new Decimal(1),
    qMultiplier: new Decimal(1),
    cMultiplier: new Decimal(1),
    cFormula: new Decimal(1),
    bcracks: new Decimal(0),
    csolves: new Decimal(0),
    lowp: false,
    bins: []
}
player.bins = [new Bin()]; // THIS LINE IS PART OF DECLARING THE PAKYER (i cannot spell) OBJECT

function Bin() {
    this.bins = [];
    this.state = currSeq(0, this.bins);
    this.currGoal = [];
    this.randForcers = 0;
    this.bruteForcers = 0;
    this.bruteForcing = false;
    this.randForcing = false;
    this.randforce = function () {
        player.qlavrams = player.qlavrams.add(Math.sqrt(player.randForcers) * (0.0001 * player.qMultiplier));
        for (i = 0; i < this.bins.length; i++) {
            this.bins[i].textContent = Math.round(random.nextFloat());
        }
        d();
    }
    this.bruteForce = function () {
        n = addBinary(this.state, "1").split('');
        // console.log(n);
        if (n.length > this.bins.length) {
            // console.log("a");
            n = seqToStr(genVal(this.bins.length, 0));
        }
        this.state = n

        for (i = 0; i < this.bins.length; i++) {
            this.bins[i].textContent = n[i];
        }
        d();
    }
}

function change(e) {
    Beep1.play();
    if(fon&&player.bins[parseInt(e.parentElement.className.split("bins")[1])].randForcing){
        fon=false;
        acheiveBox("100% Effort - Help the Forcers do their job (as in click the 0/1 after having a type of Forcer)");
    }
    if (e.textContent == "0") {
        e.textContent = "1";
    } else {
        e.textContent = "0";
    }
    d();
    player.bins[parseInt(e.parentElement.className.split("bins")[1])].state = currSeq(parseInt(e.parentElement.className.split("bins")[1]));
}

function d() {
    for (let i = 0; i < player.bins.length; i++) {
        if (currSeq(i) == seqToStr(player.bins[i].currGoal)) {
            if((Math.sqrt(player.randForcers) * (0.0001 * player.qMultiplier)).toFixed(5)>=1){
                acheiveBox("TOO MUCH POWER - Start generating at least 1 QPT");
            }
            // console.log(currSeq(i),seqToStr(player.bins[i].currGoal));
            if (player.solves == 0) {
                acheiveBox("I did the thing! - Crack a code by clicking on the '0'");
            }
            if (i < 5) {
                player.solves = player.solves.add(player.sMultiplier.mul(player.bins[i].bins.length));
            } else {
                player.bcracks = player.bcracks.add(player.cMultiplier.mul(player.bins[i].bins.length));
            }
            addBin(0, i);
            player.bins[i].currGoal = genBinary(player.bins[i].bins.length);
            tempz = genVal(player.bins[i].bins.length, 0);
        }
    }
}

updateSolves();

function init() {
    window.addEventListener("focus", () => {
        setTimeout(() => {
            focussed = true
        }, 2500)
    });
    window.addEventListener("blur", () => {
        focussed = false
    });
    for (i = 0; i < player.digits; i++) {
        addBin();
    }
    random = new RNG(performance.now())
    player.bins[0].currGoal = genBinary(1);
    // window.requestAnimationFrame(loop)
    looper = setInterval(loop, 0);
}

function loop() {
    avgPerf.push(performance.now() - lastRender);
    if (avgPerf.length > 300) {
        avgPerf.splice(0, 1);
    }

    var total = 0;
    for (var i = 0; i < avgPerf.length; i++) {
        total += avgPerf[i];
    }
    var progress = total / avgPerf.length;

    if(Math.round(performance.now())%600000 >=1&&Math.round(performance.now())%600000 <=50){
        alertBox("It has been 30mins, you may want to reset the random number generator's seed in 'Options'");
    }

    //=================================================
    //LIAM ADD ACHEIVEMENT MONITORING CODE HERE!!


    //=================================================

    // if(1000 / progress<=20&&(performance.now()>2000)&&focussed){
    //     alertBox("Oh no! Looks like your computers having a rough time. You may want to consider going into settings and enabling Better Performance mode");
    // }

    player.cracks = player.cracks.add((((player.bcracks * (0.025 + (0.005 * (player.cFormula.sub(1))))) / (1 + player.cracks / 1 + player.bcracks))) * player.cMultiplier);
    player.bins.forEach(function (b, j) {
        if (b.randForcing) {
            for (i = 0; i < b.randForcers; i++) {
                b.randforce();
            }
        }
        if (b.bruteForcing) {
            for (i = 0; i < b.bruteForcers; i++) {
                b.bruteForce();
            }
        }
    }, this);

    updateSolves();
    document.querySelector("#perf").textContent = "Performance: " + (1000 / progress).toFixed(2) + "tps";
    if (player.lowp) {
        player.lowp = false;
        x = document.querySelectorAll("#perfbad");
        for (i = 0; i < x.length; i++) {
            x[i].style = "display: none;";
        }
    }
    lastRender = performance.now();
    // window.requestAnimationFrame(loop);
}

init();
