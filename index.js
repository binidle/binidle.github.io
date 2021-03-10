// binbar = document.querySelector("#bits");
var lastRender = 0

var player = {
    solves: new Decimal(0),
    digits: new Decimal(1),
    bins: [new Bin()],  
    randForcers: new Decimal(0),   
    bruteForcers: new Decimal(0)   
}

function Bin() {  
    this.bins = []; 
    this.currGoal = [];
    this.randForcers = 0;
    this.bruteForcers= 0;
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

function buyRandforcer(i=0) {
    if(player.solves>=10){
        player.solves=player.solves.sub(10);
        player.randForcers++;
        player.bins[i].randForcing=true;
        player.bins[i].randForcers++;
        document.querySelector("#rforcers").innerHTML="Randforcers: "+player.randForcers;
        
    }
    else {
        alert("You need at least 10⚛ to buy a randforcer! You currently have "+player.solves+"⚛")
    }
}

function buyBruteforcer(i=0) {
    if(player.solves>=100){
        player.solves=player.solves.sub(100);
        player.bruteForcers++;
        player.bins[i].bruteForcing=true;
        player.bins[i].bruteForcers++;
        document.querySelector("#bforcers").innerHTML="Bruteforcers: "+player.randForcers;
    }
    else {
        alert("You need at least 100⚛ to buy a bruteforcer! You currently have "+player.solves+"⚛")
    }
}

function buyBin() {
    player.bins.push(new Bin());
    t = document.createElement("ul");
    t.class = "bins";
    t.id = "bits"+(player.bins.length-1);
    t.className = "bins";
    t.innerHTML = `<li class="stats" onclick="buyRandforcer(parseInt(this.parentElement.id.split("bits")[1]))">Buy Randforcer 10⚛</li><li class="stats" onclick="buyBruteforcer(parseInt(this.parentElement.id.split("bits")[1]))">Buy Bruteforcer 100⚛</li>`
    document.querySelector("#lines").appendChild(t);
    addBin(0,player.bins.length-1);
    player.bins[player.bins.length-1].currGoal = genBinary(1);
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
            addBin(0,player.bins[i].bins.length-1);
            for(i=0;i<player.bins[i].bins.length;i++){
                player.bins[i].bins[i].innerText=0;
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

function addBin(v = 0,z = 0) {
    t = document.createElement("li");
    t.innerText = v;
    document.querySelector("#bits"+z).appendChild(t);
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
    document.querySelector("#perf").innerText="Performance: "+Math.round(progress)+"tps";

    player.bins.forEach(function(b,i){
        if(b.randForcing){
            for(i=0;i<b.randForcers;i++){
                b.randforce();
            }
        }
        if(b.bruteForcing){
            for(i=0;i<b.bruteForcers;i++){
                b.bruteForce();
            }
        }
    },this);
    updateSolves();
    lastRender = timestamp
    window.requestAnimationFrame(loop)
}

init();
