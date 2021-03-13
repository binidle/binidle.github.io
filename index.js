// binbar = document.querySelector("#bits");  
var lastRender = 0
var lineVal = 0;
var prestiged = 0;
   
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
    bcracks: new Decimal(0),
    lowp: false,
    bins: []
}
player.bins=[new Bin()]; // THIS LINE IS PART OF DECLARING THE PAKYER (i cannot spell) OBJECT

function Bin() {
    this.bins = [];
    this.currGoal = [];
    this.randForcers = 0;
    this.bruteForcers = 0;
    this.currency = 0;
    this.randforce = function (j) {
        this.currency=j;
        switch(this.currency) {
          case 0:
            player.qlavrams = player.qlavrams.add(Math.sqrt(player.randForcers) * (0.001 * player.qMultiplier));
            break;
          case 1:
            player.cracks = player.cracks.add((((player.bcracks * 0.005)/(1 + player.cracks/ 1 + player.bcracks))) * player.cMultiplier);
            break;
        }
        
        for (i = 0; i < this.bins.length; i++) {
            this.bins[i].innerText = Math.round(Math.random());
        }
        d();
    }
    this.bruteForce = function (j) {
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

function buyRandforcer(i = 0) {
    if (player.solves >= 10) {
        player.solves = player.solves.sub(10);
        player.randForcers = player.randForcers.add(1);
        player.bins[i].randForcing = true;
        player.bins[i].randForcers++;
        document.querySelector("#rforcers").innerHTML = "Randforcers: " + numberformat.format(player.randForcers);

    } else {
        alert("You need at least 10⚛ to buy a randforcer! You currently have " + player.solves + "⚛")
    }
}

function buyBruteforcer(i = 0) {
    if (player.solves >= 100) {
        player.solves = player.solves.sub(100);
        player.bruteForcers = player.bruteForcers.add(1);
        player.bins[i].bruteForcing = true;
        player.bins[i].bruteForcers++;
        document.querySelector("#bforcers").innerHTML = "Bruteforcers: " + numberformat.format(player.bruteForcers);
    } else {
        alert("You need at least 100⚛ to buy a bruteforcer! You currently have " + player.solves + "⚛")
    }
}

function buyBin() {
    if (player.qlavrams > (25 + (5 * 5 ** player.bins.length))) {
        lineVal += 0.2;
        player.qlavrams = player.qlavrams.sub((25 + (5 * 5 ** player.bins.length)));
        player.bins.push(new Bin());
        t = document.createElement("ul");
        t.id = "bits" + (player.bins.length - 1);
        t.className = "bins" + Math.floor(lineVal + 0.1);
        t.innerHTML = `<li class="stats" onclick="buyRandforcer(parseInt(this.parentElement.id.split('bits')[1]))">Buy Randforcer 10⚛</li><li class="stats" onclick="buyBruteforcer(parseInt(this.parentElement.id.split('bits')[1]))">Buy Bruteforcer 100⚛</li>`
        document.querySelector("#lines").appendChild(t);
        addBin(0, player.bins.length - 1);
        player.bins[player.bins.length - 1].currGoal = genBinary(1);
        document.querySelector("#burh").innerText = "Buy another line " + (25 + (5 * 5 ** player.bins.length)) + "β"
    } else if (true) {
        alert("You need at least " + (25 + (5 * 5 ** player.bins.length)) + "β to buy a new line! You currently have " + player.qlavrams + "β")
    } else {
        alert("weedmart calls: this is useless/unreachable code, that fact that it is here in fact, makes the game slower")
    }
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

function d(e) {
    try {
        if (e.innerText == "0") {
            e.innerText = "1";
        } else {
            e.innerText = "0";
        }
    } catch (error) {
        // Do nothing, this is for when it is being called by the bruteforce function  in the Bin() class
    }

    for (let i = 0; i < player.bins.length; i++) {
        if (currSeq(i) == seqToStr(player.bins[i].currGoal)) {
            player.solves = player.solves.add(player.sMultiplier.mul(player.bins[i].bins.length));
            updateSolves();
            player.bins[i].currGoal = genBinary(player.bins[i].bins.length + 1);
            //             for(i=0;i<player.bins[i].bins.length;i++){
            //                 player.bins[i].bins[i].innerText=0;
            //             }
            addBin(0, i);
        }
    }
}

function currSeq(z = 0, o = player.bins[z].bins) {
    z = [];
    for (let i = 0; i < o.length; i++) {
        z.push(o[i].innerText);
    }
    return z.join('');
}

function seqToStr(o) {
    return o.join('');
}

function prestige() {
    if (player.solves >= 100000) {
        prestiged = 1;
        alert("weedmart calls: not done yet lol")
    } else {
        alert("You need at least 100000⚛ to prestige!! You currently have " + player.solves + "⚛")
    }
}

function updateSolves() {
    document.querySelector("#solve").innerText = "Solves (⚛): " + numberformat.format(player.solves);
    document.querySelector("#qlavram").innerText = "Qlavrams (β): " + numberformat.format(player.qlavrams);
    document.querySelector("#crack").innerText = "Cracks (Փ): " + numberformat.format(player.cracks);
    document.querySelector("#qlavramps").innerText = "QPT: " + (Math.sqrt(player.randForcers) * (0.001 * player.qMultiplier)).toFixed(5);
    document.querySelector("#smlt").innerText = "Solve Multipliers: " + numberformat.format(player.sMultiplier) + "x";
    document.querySelector("#qmlt").innerText = "Qlavram Multipliers: " + numberformat.format(player.qMultiplier) + "x";
    document.querySelector("#bcrack").innerText = "Base Cracks: " + numberformat.format(player.bcracks);
    document.querySelector("#cmlt").innerText = "Crack Multipliers: " + numberformat.format(player.cMultiplier) + "x";
    document.querySelector("#crackps").innerText = "CPT: " + ((((player.bcracks * 0.005)/(1 + player.cracks/ 1 + player.bcracks))) * player.cMultiplier).toFixed(5);
}

updateSolves();

function genBinary(len) {
    n = [];
    for (let i = 0; i < len; i++) {
        n.push(Math.round(Math.random()));
    }
    return n;
}

function addBin(v = 0, z = 0) {
    t = document.createElement("li");
    t.innerText = v;
    t.id = "perfbad"
    document.querySelector("#bits" + z).appendChild(t);
    t.onclick = function () {
        d(this)
    };
    player.bins[z].bins.push(t);
}

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
    document.querySelector("#perf").innerText = "Performance: " + (1000 / progress).toFixed(2) + "tps";

    if (player.lowp) {
        x = document.querySelectorAll("#perfbad");
        for (i = 0; i < x.length; i++) {
            x[i].style = "display: none;";
        }
    }

    player.bins.forEach(function (b, j) {
        if (b.randForcing) {
            for (i = 0; i < b.randForcers; i++) {
                b.randforce(j);
            }
        }
        if (b.bruteForcing) {
            for (i = 0; i < b.bruteForcers; i++) {
                b.bruteForce(j);
            }
        }
    }, this);
    updateSolves();
    lastRender = timestamp
    window.requestAnimationFrame(loop)
}

init();
