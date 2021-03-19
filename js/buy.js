function buyRandforcer(i = 0) {
    if (player.solves >= 10) {
        player.solves = player.solves.sub(10);
        player.randForcers = player.randForcers.add(1);
        player.bins[i].randForcing = true;
        player.bins[i].randForcers++;


    } else {
        alertBox("You need at least 10⚛ to buy a randforcer! You currently have " + player.solves + "⚛")
    }
}

function buyBruteforcer(i = 0) {
    if (player.solves >= 100) {
        player.solves = player.solves.sub(100);
        player.bruteForcers = player.bruteForcers.add(1);
        player.bins[i].bruteForcing = true;
        player.bins[i].bruteForcers++;
    } else {
        alertBox("You need at least 100⚛ to buy a bruteforcer! You currently have " + player.solves + "⚛")
    }
}

function buyBin(load = false) {
    if (player.qlavrams > (25 + (5 * 5 ** player.bins.length)) || load) {
        lineVal += 0.2;
        if (!load) player.qlavrams = player.qlavrams.sub((25 + (5 * 5 ** player.bins.length)));
        player.bins.push(new Bin());
        t = document.createElement("ul");
        if (!load) t.id = "bits" + (player.bins.length - 1);
        else t.id = "bits0";
        t.className = "bins" + Math.floor(lineVal + 0.1);
        t.innerHTML = `<li class="stats" onclick="buyRandforcer(parseInt(this.parentElement.id.split('bits')[1]))">Buy Randforcer 10⚛</li><li class="stats" onclick="buyBruteforcer(parseInt(this.parentElement.id.split('bits')[1]))">Buy Bruteforcer 100⚛</li>`
        document.querySelector("#lines").appendChild(t);
        if (!load) addBin(0, player.bins.length - 1);
        else addBin(0, 0);
        player.bins[player.bins.length - 1].currGoal = genBinary(1);
        document.querySelector("#burh").innerText = "Buy another line " + (25 + (5 * 5 ** player.bins.length)) + "β"
    } else if (true) {
        alertBox("You need at least " + (25 + (5 * 5 ** player.bins.length)) + "β to buy a new line! You currently have " + player.qlavrams + "β")
    } else {
        alertBox("weedmart calls: this is useless/unreachable code, that fact that it is here in fact, makes the game slower")
    }
}

function addBin(v = 0, z = 0) {
    
    

    t = document.createElement("li");
    t.innerText = v;
    t.id = "perfbad"
    document.querySelector("#bits" + z).appendChild(t);
    t.onclick = function () {
        change(this);
    };
    player.bins[z].bins.push(t);
}