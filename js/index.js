var lastRender = 0
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
let frames = 0;
var solavg = 0;
var ls = performance.now();
var times = [];
const SECRET = 'I am batman'
var theme = new Audio("./audio/binidle.mp3");

var Beep1 = new Audio('./audio/Beep1.wav');
Beep1.volume = vol;
var Beep2 = new Audio('./audio/Beep2.wav');
Beep2.volume = vol;
var Beep3 = new Audio('./audio/Beep3.wav');
Beep3.volume = vol;

window.onload = () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
}

window.oncontextmenu = function () {
    return false
} 

var activated = [];

console.log(`⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠛⠛⠛⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠙⠛⠛⠛⠿⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⡀⠠⠤⠒⢂⣉⣉⣉⣑⣒⣒⠒⠒⠒⠒⠒⠒⠒⠀⠀⠐⠒⠚⠻⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⡠⠔⠉⣀⠔⠒⠉⣀⣀⠀⠀⠀⣀⡀⠈⠉⠑⠒⠒⠒⠒⠒⠈⠉⠉⠉⠁⠂⠀⠈⠙⢿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠔⠁⠠⠖⠡⠔⠊⠀⠀⠀⠀⠀⠀⠀⠐⡄⠀⠀⠀⠀⠀⠀⡄⠀⠀⠀⠀⠉⠲⢄⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠊⠀⢀⣀⣤⣤⣤⣤⣀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠜⠀⠀⠀⠀⣀⡀⠀⠈⠃⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡿⠥⠐⠂⠀⠀⠀⠀⡄⠀⠰⢺⣿⣿⣿⣿⣿⣟⠀⠈⠐⢤⠀⠀⠀⠀⠀⠀⢀⣠⣶⣾⣯⠀⠀⠉⠂⠀⠠⠤⢄⣀⠙⢿⣿⣿⣿⣿
⣿⡿⠋⠡⠐⠈⣉⠭⠤⠤⢄⡀⠈⠀⠈⠁⠉⠁⡠⠀⠀⠀⠉⠐⠠⠔⠀⠀⠀⠀⠀⠲⣿⠿⠛⠛⠓⠒⠂⠀⠀⠀⠀⠀⠀⠠⡉⢢⠙⣿⣿⣿
⣿⠀⢀⠁⠀⠊⠀⠀⠀⠀⠀⠈⠁⠒⠂⠀⠒⠊⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⢀⣀⡠⠔⠒⠒⠂⠀⠈⠀⡇⣿⣿⣿⣿⣿
⣿⠀⢸⠀⠀⠀⢀⣀⡠⠋⠓⠤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠈⠢⠤⡀⠀⠀⠀⠀⠀⠀⢠⠀⠀⠀⡠⠀⡇⣿⣿⣿⣿⣿
⣿⡀⠘⠀⠀⠀⠀⠀⠘⡄⠀⠀⠀⠈⠑⡦⢄⣀⠀⠀⠐⠒⠁⢸⠀⠀⠠⠒⠄⠀⠀⠀⠀⠀⢀⠇⠀⣀⡀⠀⠀⢀⢾⡆⠀⠈⡀⠎⣸⣿⣿⣿⣿
⣿⣿⣄⡈⠢⠀⠀⠀⠀⠘⣶⣄⡀⠀⠀⡇⠀⠀⠈⠉⠒⠢⡤⣀⡀⠀⠀⠀⠀⠀⠐⠦⠤⠒⠁⠀⠀⠀⠀⣀⢴⠁⠀⢷⠀⠀⠀⢰⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣇⠂⠀⠀⠀⠀⠈⢂⠀⠈⠹⡧⣀⠀⠀⠀⠀⠀⡇⠀⠀⠉⠉⠉⢱⠒⠒⠒⠒⢖⠒⠒⠂⠙⠏⠀⠘⡀⠀⢸⠀⠀⠀⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠑⠄⠰⠀⠀⠁⠐⠲⣤⣴⣄⡀⠀⠀⠀⠀⢸⠀⠀⠀⠀⢸⠀⠀⠀⠀⢠⠀⣠⣷⣶⣿⠀⠀⢰⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠁⢀⠀⠀⠀⠀⠀⡙⠋⠙⠓⠲⢤⣤⣷⣤⣤⣤⣤⣾⣦⣤⣤⣶⣿⣿⣿⣿⡟⢹⠀⠀⢸⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠑⠀⢄⠀⡰⠁⠀⠀⠀⠀⠀⠈⠉⠁⠈⠉⠻⠋⠉⠛⢛⠉⠉⢹⠁⢀⢇⠎⠀⠀⢸⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣀⠈⠢⢄⡉⠂⠄⡀⠀⠈⠒⠢⠄⠀⢀⣀⣀⣰⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⢀⣎⠀⠼⠊⠀⠀⠀⠘⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⡀⠉⠢⢄⡈⠑⠢⢄⡀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠁⠀⠀⢀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣀⡈⠑⠢⢄⡀⠈⠑⠒⠤⠄⣀⣀⠀⠉⠉⠉⠉⠀⠀⠀⣀⡀⠤⠂⠁⠀⢀⠆⠀⠀⢸⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣄⡀⠁⠉⠒⠂⠤⠤⣀⣀⣉⡉⠉⠉⠉⠉⢀⣀⣀⡠⠤⠒⠈⠀⠀⠀⠀⣸⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣶⣶⣤⣤⣤⣤⣀⣀⣤⣤⣤⣶⣾⣿⣿⣿⣿⣿`);

let devtools = () => {};
devtools.toString = () => {
    if (!this.opened) {
        if (!player.achs[16]) {
            player.achs[16] = true;
            acheiveBox("Faceless - find the hidden face");
            loadachs();
        }
    }
    this.opened = true;
}

console.log('%c', devtools);

let player = {
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
    omegas: new Decimal(0),
    plumes: new Decimal(0),
    oMultiplier: new Decimal(1),
    presqlav: new Decimal(0),
    presline: new Decimal(0),
    presmult: new Decimal(0),
    bitval: 0,
    lowp: false,
    bins: [],
    achs: [false, false, false, false, false, false, false, false, false, false, false, false],
    started: new Date()
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
        for (i = 0; i < this.bins.length; i++) {
            this.bins[i].textContent = Math.round(random.nextFloat());
        }
        d();
    }
    this.bruteForce = function () {
        n = addBinary(this.state, "1").split('');
        if (n.length > this.bins.length) {
            n = seqToStr(genVal(this.bins.length, 0));
        }
        this.state = n

        for (i = 0; i < this.bins.length; i++) {
            this.bins[i].textContent = n[i];
        }
        d();
    }
}

let change = (e) => {
    Beep1.play();
    if (fon && player.bins[parseInt(e.parentElement.className.split("bins")[1])].randForcing && !player.achs[10]) {
        player.achs[10] = true;
        fon = false;
        acheiveBox("100% Effort - Help the Forcers do their job (as in click the 0/1 after having a type of Forcer)");
        loadachs();
    }
    if (e.textContent == "0") {
        e.textContent = "1";
    } else {
        e.textContent = "0";
    }
    d();
    player.bins[parseInt(e.parentElement.className.split("bins")[1])].state = currSeq(parseInt(e.parentElement.className.split("bins")[1]));
}

let d = () => {
    for (let i = 0; i < player.bins.length; i++) {
        if (currSeq(i) == seqToStr(player.bins[i].currGoal)) {
            times.push(performance.now() - ls);
            ls = performance.now();
            
            if (i < 5) {
                player.solves = player.solves.add(player.sMultiplier.mul(player.bins[i].bins.length).mul((1 + Math.floor(Math.pow(player.csolves, 1.25)))));
            } else if (i < 10) {
                player.bcracks = player.bcracks.add(player.cMultiplier.mul(player.bins[i].bins.length));
            } else if (i < 15) {
                player.omegas = player.omegas.add(player.oMultiplier.mul(player.bins[i].bins.length));
            }
            addBin(0, i);
            player.bins[i].currGoal = genBinary(player.bins[i].bins.length);
            tempz = genVal(player.bins[i].bins.length, 0);
        }
    }
}

updateSolves();

let init = () => {
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
    looper = setInterval(loop, 0);
    load(true);
    setInterval(() => {
        save(false, true)
    }, 10000);
    alertBox("Be sure to join the discord at: <a href='https://discord.gg/3qhqADcGe7'>https://discord.gg/3qhqADcGe7</a>");
}

let loop = () => {
    let progress = 1000/(1000/(performance.now() - lastRender)) || 16.66;
    lastRender = performance.now();

    var tt = 0;
    for (var i = 0; i < times.length; i++) {
        tt += times[i];
    }
    solavg = tt / times.length;

    //=================================================
    // ADD ACHEIVEMENT MONITORING CODE HERE!!

    if (parseFloat((Math.sqrt(player.randForcers) * (0.0001 * player.qMultiplier)).toFixed(5)) >= 1 && !player.achs[12]) {
        player.achs[12] = true;
        acheiveBox("FINALLY - Start generating at least 1 QPT");
        loadachs();
    }
    
    if (player.solves == 1 && !player.achs[0]) {
        player.achs[0] = true;
        acheiveBox("I did the thing! - Crack a code by clicking on the '0'");
        loadachs();
    }

    diffMs = Math.abs(new Date(player.started) - new Date());
    if (!player.achs[9]&&Math.round(((diffMs % 86400000) % 3600000) / 60000)>=10) {
        player.achs[9]=true;
        acheiveBox("Newbie - Play for 10 minutes");
        loadachs();
    }
    if (!player.achs[14]&&Math.round(((diffMs % 86400000) % 3600000) / 60000)>=(60*10)) {
        player.achs[14]=true;
        acheiveBox("Gamer - Play for 10 hours");
        loadachs();
    }
    if (!player.achs[15]&&Math.round(((diffMs % 86400000) % 3600000) / 60000)>=(60*100)) {
        player.achs[15]=true;
        acheiveBox("Redditor - Play for 100 hours");
        loadachs();
    }
    
    //=================================================

    player.cracks = player.cracks.add((((player.bcracks * (0.025 + (0.005 * (player.cFormula.sub(1))))) / (1 + player.cracks / 1 + player.bcracks))) * player.cMultiplier);
    player.bins.forEach(function (b, j) {
        if (b.randForcing) {
            player.qlavrams = player.qlavrams.add(Math.pow(player.randForcers, 0.5 + (0.1 * player.presqlav)) * (0.0001 * player.qMultiplier) * b.randForcers);
            if (!b.bruteForcing) {
                for (i = 0; i < b.randForcers; i++) {
                    b.randforce();
                }
            }
        }
        if (b.bruteForcing) {
            for (i = 0; i < b.bruteForcers; i++) {
                b.bruteForce();
            }
        }
    }, this);

    updateSolves();
    if (frames % 10 == 0) {
        document.querySelector("#perf").textContent = "Performance: " + (1000 / progress).toFixed(0) + "tps";
        frames = 0;
    }
    if (player.lowp) {
        player.lowp = false;
        x = document.querySelectorAll("#perfbad");
        for (i = 0; i < x.length; i++) {
            x[i].style = "display: none;";
        }
    }
    
    frames ++;
}

init();
