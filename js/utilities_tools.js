function currSeq(z = 0, o = player.bins[z].bins) {
    z = [];
    for (let i = 0; i < o.length; i++) {
        z.push(o[i].textContent); //FUCK YOU I WILL CRASH YOUR COMPUTER
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

function getVersion() {
    sum=0;
    for(i=0;i<30;i++){
        fetch("https://api.github.com/repos/binidle/binidle.github.io/commits?page="+i)
        .then(x => x.text())
        .then(function(y){
            sum+=JSON.parse(y).length;
            return sum;
        });
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
    document.querySelector("#crackps").innerText = "CPT: " + ((((player.bcracks * (0.025 + (0.005))) / (1 + player.cracks / 1 + player.bcracks))) * player.cMultiplier).toFixed(5);
    document.querySelector("#version").innerText = "Version: 0.0.11"
    document.querySelector("#rforcers").innerHTML = "Randforcers: " + numberformat.format(player.randForcers);
    document.querySelector("#bforcers").innerHTML = "Bruteforcers: " + numberformat.format(player.bruteForcers);
}
 
function genBinary(len) {
    n = [];
    for (let i = 0; i < len; i++) {
        n.push(Math.round(Math.random()));
    }
    return n;
}
