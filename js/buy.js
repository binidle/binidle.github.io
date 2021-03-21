function buyRandforcer(i = 0) {
    if (player.solves >= 10) {
        player.solves = player.solves.sub(10);
        player.randForcers = player.randForcers.add(1);
        player.bins[i].randForcing = true;
        player.bins[i].randForcers++;
        Beep2.play();

    } else {
        Beep3.play();
        alertBox("You need at least 10⚛ to buy a randforcer! You currently have " + player.solves + "⚛")
    }
}

function buyBruteforcer(i = 0) {
    if (player.solves >= 100) {
        player.solves = player.solves.sub(100);
        player.bruteForcers = player.bruteForcers.add(1);
        player.bins[i].bruteForcing = true;
        player.bins[i].bruteForcers++;
        Beep2.play();
    } else {
        Beep3.play();
        alertBox("You need at least 100⚛ to buy a bruteforcer! You currently have " + player.solves + "⚛")
    }
}

function removeBit(zzz = 0) {
    if (player.cracks>150) {
        player.bins[zzz].bins[player.bins[zzz].bins.length - 1].remove();
        player.bins[zzz].bins.splice(player.bins[zzz].bins.length - 1,1);
        player.bins[zzz].currGoal = genBinary(player.bins[zzz].bins.length);
    } else {
        Beep3.play();
        alertBox("You need at least 150Φ to remove a bit! You currently have " + player.solves + "Φ")
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
        t.innerHTML = `<li class="stats" onclick="buyRandforcer(parseInt(this.parentElement.id.split('bits')[1]))">Buy Randforcer 10⚛</li><li class="stats" onclick="buyBruteforcer(parseInt(this.parentElement.id.split('bits')[1]))">Buy Bruteforcer 100⚛</li><li class="stats" onclick="removeBit(parseInt(this.parentElement.id.split('bits')[1]))">Remove Bit 150Φ</li>`
        document.querySelector("#lines").appendChild(t);
        if (!load) addBin(0, player.bins.length - 1);
        else addBin(0, 0);
        player.bins[player.bins.length - 1].currGoal = genBinary(1);
        document.querySelector("#burh").innerText = "Buy another line " + (25 + (5 * 5 ** player.bins.length)) + "β"
        Beep2.play();
    } else if (true) {
        Beep3.play();
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

function sMult() {
    temp = (150 * player.sMultiplier)
    if (player.qlavrams > temp) {
        player.sMultiplier = player.sMultiplier.add(1);
        player.qlavrams = player.qlavrams.sub(temp);
        temp = (150 * player.sMultiplier)
        Beep2.play();
        document.querySelector("#multQOL").innerText = "Buy a Solve Multiplier (" + numberformat.format(player.sMultiplier) + "x -> " + numberformat.format(player.sMultiplier.add(1)) + "x) " + temp + "β"
    } else {
        Beep3.play();
        alertBox("You need at least " + temp + "β to buy a multiplier! You currently have " + player.qlavrams + "β")
    }
}

function qMult() {
    temp = (150 * player.qMultiplier)
    if (player.cracks > temp) {
        player.qMultiplier = player.qMultiplier.add(1);
        player.cracks = player.cracks.sub(temp);
        temp = (150 * player.qMultiplier)
        Beep2.play();
        document.querySelector("#qlavmultQOL").innerText = "Buy a Qlavram Multiplier (" + numberformat.format(player.qMultiplier) + "x -> " + numberformat.format(player.qMultiplier.add(1)) + "x) " + temp + "Փ"
    } else {
        Beep3.play();
        alertBox("You need at least " + temp + "Փ to buy a Qlavram multiplier! You currently have " + player.cracks + "Փ")
    }
}

function cMult() {
    temp = (7500 * player.cMultiplier)
    if (player.solves > temp) {
        player.cMultiplier = player.cMultiplier.add(1);
        player.solves = player.solves.sub(temp);
        temp = (7500 * player.cMultiplier)
        Beep2.play();
        document.querySelector("#crackmultQOL").innerText = "Buy a Crack Multiplier (" + numberformat.format(player.cMultiplier) + "x -> " + numberformat.format(player.cMultiplier.add(1)) + "x) " + temp + "⚛"
    } else {
        alertBox("You need at least " + temp + "⚛ to buy a Crack multiplier! You currently have " + player.solves + "⚛")
        Beep3.play();
    }
}

function cForm() {
    temp = (500 * player.cFormula)
    // temp = 500;
    if (player.cracks > temp) {
        player.cFormula = player.cFormula.add(1);
        player.cracks = player.cracks.sub(temp);
        temp = (500 * player.cFormula)
        Beep2.play();
        document.querySelector("#crackFormUPG").innerText = "Buy a Crack Formula Boost (" + numberformat.format(player.cFormula) + "x -> " + numberformat.format(player.cFormula.add(1)) + "x) " + temp + "Փ" // broken but idc we'll do it later
    } else {
        Beep3.play();
        alertBox("You need at least " + temp + "Փ to buy a Crack Formula Boost! You currently have " + player.cracks + "Փ")
    }
}