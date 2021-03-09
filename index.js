binbar = document.querySelector("#bits");
var lastRender = 0

var player = {
    solves: new Decimal(0),
    digits: new Decimal(1),
    bins: [new Bin()], 
    randForcers: new Decimal(0)
} 

function Bin() {  
    this.bins = [];
    this.currGoal = [];
    this.randforce = function() { 
        for(i=0;i<this.bins.length;i++){
            this.bins[i].innerText=Math.round(Math.random());
        }
        d();
    }
    this.bruteForce = function() {
        this.state = currSeq(0,this.bins);
        n = addBinary(this.state,"1").split('');
        // console.log(n);
        for(i=0;i<this.bins.length;i++){
            this.bins[i].innerText=n[i];
        }
        d();
    }
    this.bruteForcing = false;
    this.randForcing = false;
}

function buyRandforcer() {
    if(player.solves>=10){
        player.randForcers++;
        player.bins[0].randForcing=true;
        document.querySelector("#rforcers").innerHTML="Randforcers: "+player.randForcers;
    }
    else {
        alert("You need at least 10⚛ to buy a randforcer! You currently have "+player.solves+"⚛")
    }
}

function buyBruteforcer() {
    if(player.solves>=100){
        player.randForcers++;
        player.bins[0].bruteForcing=true;
        document.querySelector("#bforcers").innerHTML="Bruteforcers: "+player.randForcers;
    }
    else {
        alert("You need at least 100⚛ to buy a bruteforcer! You currently have "+player.solves+"⚛")
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
            player.solves = player.solves.add(player.bins[i].bins.length);
            updateSolves();
            player.bins[i].currGoal = genBinary(player.bins[i].bins.length + 1);
            addBin();
            for(i=0;i<player.bins[0].bins.length;i++){
                player.bins[0].bins[i].innerText=0;
            }
        }
    }
}

function currSeq(z=0,o = player.bins[z].bins) {
    z = [];
    for (let i = 0; i < o.length; i++) {
        z.push(o[i].innerText);
    }
    return z.join('');
}

function seqToStr(o) {
    return o.join('');
}

function updateSolves() {
    document.querySelector(".stats").innerText = "Solves (⚛): " + numberformat.format(player.solves);
}

updateSolves();

function genBinary(len) {
    n = [];
    for (let i = 0; i < len; i++) {
        n.push(Math.round(Math.random()));
    }
    return n;
}

function addBin(v = 0) {
    t = document.createElement("li");
    t.innerText = v;
    binbar.appendChild(t);
    t.onclick = function () {
        d(this)
    };
    player.bins[0].bins.push(t);
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
    document.querySelector("#perf").innerText="Performance: "+Math.round(progress)+"tps";

    player.bins.forEach(function(b,i){
        if(b.randForcing){
            b.randforce();
        }
        if(b.bruteForcing){
            b.bruteForce();
        }
    },this);

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}

init();
