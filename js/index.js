// binbar = document.querySelector("#bits");  
var lastRender = 0
var lineVal = 0;
var prestiged = 0;
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
    lowp: false,
    bins: []
}
player.bins = [new Bin()]; // THIS LINE IS PART OF DECLARING THE PAKYER (i cannot spell) OBJECT

function Bin() {
    this.bins = [];
    this.state= [];
    this.currGoal = [];
    this.randForcers = 0;
    this.bruteForcers = 0;
    this.randforce = function () {
        player.qlavrams = player.qlavrams.add(Math.sqrt(player.randForcers) * (0.001 * player.qMultiplier));


        for (i = 0; i < this.bins.length; i++) {
            this.bins[i].innerText = Math.round(Math.random());
        }
        d();
    }
    this.bruteForce = function () {
        this.state = currSeq(0, this.bins);
        n = addBinary(this.state, "1").split('');
        // console.log(n);
        for (i = 0; i < this.bins.length; i++) {
            this.bins[i].innerText = n[i];
        }
        d();
    }
    this.bruteForcing = false;
    this.randForcing = false;
}



function sMult() {
    temp = (150 * player.sMultiplier)
    if (player.qlavrams > temp) {
        player.sMultiplier = player.sMultiplier.add(1);
        player.qlavrams = player.qlavrams.sub(temp);
        temp = (150 * player.sMultiplier)
        document.querySelector("#multQOL").innerText = "Buy a Solve Multiplier (" + numberformat.format(player.sMultiplier) + "x -> " + numberformat.format(player.sMultiplier.add(1)) + "x) " + temp + "β"
    } else {
        alert("You need at least " + temp + "β to buy a multiplier! You currently have " + player.qlavrams + "β")
    }
}

function qMult() {
    temp = (150 * player.qMultiplier)
    if (player.cracks > temp) {
        player.qMultiplier = player.qMultiplier.add(1);
        player.cracks = player.cracks.sub(temp);
        temp = (150 * player.qMultiplier)
        document.querySelector("#qlavmultQOL").innerText = "Buy a Qlavram Multiplier (" + numberformat.format(player.qMultiplier) + "x -> " + numberformat.format(player.qMultiplier.add(1)) + "x) " + temp + "Փ"
    } else {
        alert("You need at least " + temp + "Փ to buy a Qlavram multiplier! You currently have " + player.cracks + "Փ")
    }
}

function cMult() {
    temp = (7500 * player.cMultiplier)
    if (player.solves > temp) {
        player.cMultiplier = player.cMultiplier.add(1);
        player.solves = player.solves.sub(temp);
        temp = (7500 * player.cMultiplier)
        document.querySelector("#crackmultQOL").innerText = "Buy a Crack Multiplier (" + numberformat.format(player.cMultiplier) + "x -> " + numberformat.format(player.cMultiplier.add(1)) + "x) " + temp + "⚛"
    } else {
        alert("You need at least " + temp + "⚛ to buy a Crack multiplier! You currently have " + player.solves + "⚛")
    }
}

function cForm() {
    temp = (500 * player.cFormula)
    if (player.cracks > temp) {
        player.cFormula = player.cFormula.add(1);
        player.cracks = player.cracks.sub(temp);
        temp = (500 * player.cFormula)
        document.querySelector("#crackFormUPG").innerText = "Buy a Crack Formula Boost (" + numberformat.format(player.cFormula) + " -> " + numberformat.format(player.cFormula.add(1)) + ") " + temp + "Փ" // broken but idc we'll do it later
    } else {
        alert("You need at least " + temp + "Փ to buy a Crack Formula Boost! You currently have " + player.cracks + "Փ")
    }
}

function change(e) {
    if (e.innerText == "0") {
        e.innerText = "1";
    } else {
        e.innerText = "0";
    }
    d();
}

function d() {
    for (let i = 0; i < player.bins.length; i++) {
        if (currSeq(i) == seqToStr(player.bins[i].currGoal)) {
            if (i < 4) {
                player.solves = player.solves.add(player.sMultiplier.mul(player.bins[i].bins.length));
            } else {
                player.bcracks = player.bcracks.add((((1 * (0.005 + (0.001 * (player.cFormula.sub(1))))) / (1 + player.cracks / 1 + 1))) * player.cMultiplier);
            }

            player.bins[i].currGoal = genBinary(player.bins[i].bins.length + 1);
            addBin(0, i);
        }
    }
}

updateSolves();

function init() {
    for (i = 0; i < player.digits; i++) {
        addBin();
    }
    player.bins[0].currGoal = genBinary(1);
    window.requestAnimationFrame(loop)
}

function loop(timestamp) {
    var progress = timestamp - lastRender

    // console.log(progress);
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
    document.querySelector("#perf").innerText = "Performance: " + (1000 / progress).toFixed(2) + "tps";
    if (player.lowp) {
        player.lowp=false;
        x = document.querySelectorAll("#perfbad");
        for (i = 0; i < x.length; i++) {
            x[i].style = "display: none;";
        }
    }
    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

init();
