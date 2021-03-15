
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
