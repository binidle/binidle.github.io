function buyRandforcer(i = 0) {
    if (player.solves >= 10) {
        if (player.randForcers < 1 && !player.achs[1]) {
            player.achs[1] = true;
            acheiveBox("RANDOMISATION - Reach 10 solves and buy a Randforcer");
            loadachs();
        }
        if (player.randForcers == 9 && !player.achs[2]) {
            player.achs[2] = true;
            acheiveBox("MORE RANDOMISATION - Buy 10 Randforcers");
            loadachs();
        }
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
        if (player.bruteForcers < 1 && !player.achs[3]) {
            player.achs[3] = true;
            acheiveBox("Where did my money go? - Buy a Bruteforcer");
            loadachs();
        }
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
    if (player.cracks > 150 + player.bitval) {
        player.bitval += 1;
        player.cracks = player.cracks.sub(150 + player.bitval);
        player.bins[zzz].bins[player.bins[zzz].bins.length - 1].remove();
        player.bins[zzz].bins.splice(player.bins[zzz].bins.length - 1, 1);
        player.bins[zzz].currGoal = genBinary(player.bins[zzz].bins.length);
    } else {
        Beep3.play();
        alertBox("You need at least " + (150 + player.bitval) + "Φ to remove a bit! You currently have " + player.cracks + "Φ") // make this not have decimals in it!!
    }
}

function buyBin(load = false) {
    if (player.qlavrams > (25 + (5 * 5 ** player.bins.length)) || load) {
        if (player.bins.length == 1 && !player.achs[4]) {
            player.achs[4] = true;
            acheiveBox("MORE NUMBERS - Buy another line");
            loadachs();
        } else if (player.bins.length == 5 && !player.achs[6]) {
            player.achs[6] = true;
            acheiveBox("Get Cracking! - Reach 6 lines and start generation Cracks (Փ)");
            loadachs();
        }
        if (!load) player.qlavrams = player.qlavrams.sub((25 + (5 * 5 ** player.bins.length)));
        player.bins.push(new Bin());
        t = document.createElement("ul");
        t.id = "bits" + (player.bins.length - 1);
        t.className = "bins" + Math.floor((player.bins.length / 5) - 0.1);
        t.innerHTML = `<li class="stats" onclick="buyRandforcer(parseInt(this.parentElement.id.split('bits')[1]))">Buy Randforcer 10⚛</li><li class="stats" onclick="buyBruteforcer(parseInt(this.parentElement.id.split('bits')[1]))">Buy Bruteforcer 100⚛</li><li class="stats" id="bitremove" onclick="removeBit(parseInt(this.parentElement.id.split('bits')[1]))">Remove Bit 150Φ</li>`
        document.querySelector("#lines").appendChild(t);
        if (!load) addBin(0, player.bins.length - 1);
        player.bins[player.bins.length - 1].currGoal = genBinary(1);
        Beep2.play();
        document.querySelector("#burh").textContent = "Buy another line " + numberformat.format(25 + (5 * 5 ** player.bins.length)) + "β"
    } else if (true) {
        Beep3.play();
        alertBox("You need at least " + (25 + (5 * 5 ** player.bins.length)) + "β to buy a new line! You currently have " + player.qlavrams + "β")
    } else {
        alertBox("weedmart calls: this is useless/unreachable code, that fact that it is here in fact, makes the game slower")
    }
}

function addBin(v = 0, z = 0) {
    t = document.createElement("li");
    t.textContent = v;
    t.id = "perfbad"
    document.querySelector("#bits" + z).appendChild(t);
    t.onclick = function () {
        change(this);
    };
    player.bins[z].bins.push(t);
    player.bins[z].state = currSeq(0, player.bins[z].bins);

}



function sMult(pr = false) {
    temp = (150 * player.sMultiplier)
    if (player.qlavrams > (sigma(1, bms, i => i * 150) + sigma(1, player.sMultiplier, i => i * 150) - 150) && !pr) {

        if (player.sMultiplier == 1 && !player.achs[5]) {
            player.achs[5] = true;
            acheiveBox("x2 Mutliplier! - Buy a Solver Multiplier for 150β");
            loadachs();
        }
        player.qlavrams = player.qlavrams.sub((sigma(1, bms, i => i * 150) + sigma(1, player.sMultiplier, i => i * 150) - 150));
        player.sMultiplier = player.sMultiplier.add(1*bms);
        temp = (150 * player.sMultiplier)
        Beep2.play();
        document.querySelector("#multQOL").textContent = "Buy a Solve Multiplier (" + numberformat.format(player.sMultiplier) + "x -> " + numberformat.format(player.sMultiplier.add(1)) + "x) " + (sigma(1, bms, i => i * 150) + sigma(1, player.sMultiplier, i => i * 150) - 150) + "β"

    } else if (player.csolves >= 10&&pr) {
        player.csolves = player.csolves.sub(10);

        player.sMultiplier = player.sMultiplier.add(1);
        temp = (150 * player.sMultiplier)
        document.querySelector("#csolves").textContent = "Complex Solves: " + numberformat.format(player.csolves) + "☸";
        Beep2.play();
        document.querySelector("#multQOL").textContent = "Buy a Solve Multiplier (" + numberformat.format(player.sMultiplier) + "x -> " + numberformat.format(player.sMultiplier.add(1)) + "x) " + (sigma(1, bms, i => i * 150) + sigma(1, player.sMultiplier, i => i * 150) - 150) + "β"

    } else {
        Beep3.play();
        alertBox("You need at least " + (sigma(1, bms, i => i * 150) + sigma(1, player.sMultiplier, i => i * 150) - 150) + "β to buy a multiplier! You currently have " + player.qlavrams + "β")
    }
}

function qMult(pr = false) {
    temp = (150 * player.qMultiplier)
    if (player.cracks > (sigma(1, bms, i => i * 150) + sigma(1, player.qMultiplier, i => i * 150) - 150) && !pr) {
        if (player.sMultiplier == 1 && !player.achs[7]) {
            player.achs[7] = true;
            acheiveBox("FASTER!!! - Reach 150Փ and purchase a Qlavram Multiplier");
            loadachs();
        }
        player.cracks = player.cracks.sub((sigma(1, bms, i => i * 150) + sigma(1, player.qMultiplier, i => i * 150) - 150));
        player.qMultiplier = player.qMultiplier.add(1*bms);
        temp = (150 * player.qMultiplier)
        Beep2.play();
        document.querySelector("#qlavmultQOL").textContent = "Buy a Qlavram Multiplier (" + numberformat.format(player.qMultiplier) + "x -> " + numberformat.format(player.qMultiplier.add(1)) + "x) " + (sigma(1, bms, i => i * 150) + sigma(1, player.qMultiplier, i => i * 150) - 150) + "Փ"

    } else if (player.csolves >= 10&&pr) {
        player.csolves = player.csolves.sub(10);

        player.qMultiplier = player.qMultiplier.add(1);
        temp = (150 * player.qMultiplier)
        document.querySelector("#csolves").textContent = "Complex Solves: " + numberformat.format(player.csolves) + "☸";
        Beep2.play();
        document.querySelector("#qlavmultQOL").textContent = "Buy a Qlavram Multiplier (" + numberformat.format(player.qMultiplier) + "x -> " + numberformat.format(player.qMultiplier.add(1)) + "x) " + (sigma(1, bms, i => i * 150) + sigma(1, player.qMultiplier, i => i * 150) - 150) + "Փ"

    } else {
        Beep3.play();
        alertBox("You need at least " + (sigma(1, bms, i => i * 150) + sigma(1, player.qMultiplier, i => i * 150) - 150) + "Փ to buy a Qlavram multiplier! You currently have " + player.cracks + "Փ")
    }
}

function cMult(pr = false) {
    temp = (7500 * player.cMultiplier)
    if (player.solves > (sigma(1, bms, i => i * 7500) + sigma(1, player.cMultiplier, i => i * 7500) - 7500) && !pr) {

        player.solves = player.solves.sub((sigma(1, bms, i => i * 7500) + sigma(1, player.cMultiplier, i => i * 7500) - 7500));
        player.cMultiplier = player.cMultiplier.add(1*bms);
        temp = (7500 * player.cMultiplier)
        Beep2.play();
        document.querySelector("#crackmultQOL").textContent = "Buy a Crack Multiplier (" + numberformat.format(player.cMultiplier) + "x -> " + numberformat.format(player.cMultiplier.add(1)) + "x) " + (sigma(1, bms, i => i * 7500) + sigma(1, player.cMultiplier, i => i * 7500) - 7500) + "⚛"

    } else if (player.csolves >= 10&&pr) {
        player.csolves = player.csolves.sub(10);

        player.cMultiplier = player.cMultiplier.add(1);
        temp = (7500 * player.cMultiplier)
        document.querySelector("#csolves").textContent = "Complex Solves: " + numberformat.format(player.csolves) + "☸";
        Beep2.play();
        document.querySelector("#crackmultQOL").textContent = "Buy a Crack Multiplier (" + numberformat.format(player.cMultiplier) + "x -> " + numberformat.format(player.cMultiplier.add(1)) + "x) " + (sigma(1, bms, i => i * 7500) + sigma(1, player.cMultiplier, i => i * 7500) - 7500) + "⚛"

    } else {
        alertBox("You need at least " + (sigma(1, bms, i => i * 7500) + sigma(1, player.cMultiplier, i => i * 7500) - 7500) + "⚛ to buy a Crack multiplier! You currently have " + player.solves + "⚛")
        Beep3.play();
    }
}

function cForm(pr = false) {
    temp = (500 * player.cFormula)
    // temp = 500;
    if (player.cracks > (sigma(1, bms, i => i * 500) + sigma(1, player.cFormula, i => i * 500) - 500) && !pr) {

        player.cracks = player.cracks.sub((sigma(1, bms, i => i * 500) + sigma(1, player.cFormula, i => i * 500) - 500));
        player.cFormula = player.cFormula.add(1*bms);
        temp = (500 * player.cFormula)
        Beep2.play();
        document.querySelector("#crackFormUPG").textContent = "Buy a Crack Formula Boost (" + numberformat.format(player.cFormula) + "x -> " + numberformat.format(player.cFormula.add(1)) + "x) " + (sigma(1, bms, i => i * 500) + sigma(1, player.cFormula, i => i * 500) - 500) + "Փ" // broken but idc we'll do it later

    } else if (player.csolves >= 10&&pr) {
        player.csolves = player.csolves.sub(10);

        player.cFormula = player.cFormula.add(1);
        temp = (500 * player.cFormula)
        document.querySelector("#csolves").textContent = "Complex Solves: " + numberformat.format(player.csolves) + "☸";
        Beep2.play();
        document.querySelector("#crackFormUPG").textContent = "Buy a Crack Formula Boost (" + numberformat.format(player.cFormula) + "x -> " + numberformat.format(player.cFormula.add(1)) + "x) " + (sigma(1, bms, i => i * 500) + sigma(1, player.cFormula, i => i * 500) - 500) + "Փ" // broken but idc we'll do it later

    } else {
        Beep3.play();
        alertBox("You need at least " + (sigma(1, bms, i => i * 500) + sigma(1, player.cFormula, i => i * 500) - 500) + "Փ to buy a Crack Formula Boost! You currently have " + player.cracks + "Փ")
    }
}

function oMult() {
    temp = (100 * player.oMultiplier)
    // temp = 500;
    if (player.csolves > temp * bms) {
        for (let szz = 0; szz < bms; szz++) {
            player.oMultiplier = player.oMultiplier.add(1);
            player.csolves = player.csolves.sub(temp);
            temp = (100 * player.oMultiplier)
            Beep2.play();
            document.querySelector("#omegamult").textContent = "Buy a Omega Multiplier (" + numberformat.format(player.oMultiplier) + "x -> " + numberformat.format(player.oMultiplier.add(1)) + "x) " + temp + "☸" // broken but idc we'll do it later
        }
    } else {
        Beep3.play();
        alertBox("You need at least " + temp * bms + "☸ to buy a Omega Multiplier! You currently have " + player.csolves + "☸")
    }
}

function PresQlav() {
    if (player.csolves >= 8 && player.presqlav == 0) {
        player.presqlav = player.presqlav.add(1);
        player.csolves = player.csolves.sub(8); //shit code but idc
    } else if (player.presqlav == 1) {
        Beep3.play();
        alertBox("You've already purchased this upgrade!")
    } else {
        Beep3.play();
        alertBox("You need at least 8☸ to buy the Better Qlavram Generators! You currently have " + player.csolves + "☸")
    }
}

function PresLine() {
    if (player.csolves >= 100 && player.presline == 0) {
        player.presline = player.presline.add(1);
        player.csolves = player.csolves.sub(100);
    } else if (player.presline == 1) {
        Beep3.play();
        alertBox("You've already purchased this upgrade!")
    } else {
        Beep3.play();
        alertBox("You need at least 100☸ to buy the Lower Line Cost! You currently have " + player.csolves + "☸")
    }
}

function CSolveMulti() {
    if (player.csolves >= 2 && player.presmult == 0) {
        player.csolves = player.csolves.sub(2)
        player.presmult = player.presmult.add(1)
    } else if (player.presmult == 1) {
        Beep3.play();
        alertBox("You've already purchased this upgrade!")
    } else {
        Beep3.play();
        alertBox("You need at least 2☸ to buy the Complex Solve Multiplier! You currently have " + player.csolves + "☸")
    }
}

function prestige1() {
    if (player.solves >= 100000) {
        player.csolves = player.csolves.add(Math.floor(1 + ((player.bins.length ) * (player.cracks.e ) * (player.qlavrams.e ) * player.solves.e) / 100));
        resetVal();

        document.querySelector("#burh").textContent = "Buy another line " + numberformat.format(25 + (5 * 5 ** player.bins.length)) + "β";
        document.querySelector("#crackFormUPG").textContent = "Buy a Crack Formula Boost (" + numberformat.format(player.cFormula) + "x -> " + numberformat.format(player.cFormula.add(1)) + "x) " + (sigma(1, bms, i => i * 500) + sigma(1, player.cFormula, i => i * 500) - 500) + "Փ"; // broken but idc we'll do it later
        document.querySelector("#crackmultQOL").textContent = "Buy a Crack Multiplier (" + numberformat.format(player.cMultiplier) + "x -> " + numberformat.format(player.cMultiplier.add(1)) + "x) " + (sigma(1, bms, i => i * 7500) + sigma(1, player.cMultiplier, i => i * 7500) - 7500) + "⚛";
        document.querySelector("#multQOL").textContent = "Buy a Solve Multiplier (" + numberformat.format(player.sMultiplier) + "x -> " + numberformat.format(player.sMultiplier.add(1)) + "x) " + (sigma(1, bms, i => i * 150) + sigma(1, player.sMultiplier, i => i * 150) - 150) + "β";
        document.querySelector("#qlavmultQOL").textContent = "Buy a Qlavram Multiplier (" + numberformat.format(player.qMultiplier) + "x -> " + numberformat.format(player.qMultiplier.add(1)) + "x) " + (sigma(1, bms, i => i * 150) + sigma(1, player.qMultiplier, i => i * 150) - 150) + "Փ";

    } else {
        alertBox("You need at least 100000⚛ to prestige!! You currently have " + player.solves + "⚛")
    }
}

function prestige2() {
    if (player.omegas >= 100000) {
        player.plumes = player.plumes.add(Math.floor(1 + ((player.bins.length ) * (player.cracks.e ) * (player.qlavrams.e ) * player.solves.e) / 100));
        resetVal();

        document.querySelector("#burh").textContent = "Buy another line " + numberformat.format(25 + (5 * 5 ** player.bins.length)) + "β";
        document.querySelector("#crackFormUPG").textContent = "Buy a Crack Formula Boost (" + numberformat.format(player.cFormula) + "x -> " + numberformat.format(player.cFormula.add(1)) + "x) " + (sigma(1, bms, i => i * 500) + sigma(1, player.cFormula, i => i * 500) - 500) + "Փ"; // broken but idc we'll do it later
        document.querySelector("#crackmultQOL").textContent = "Buy a Crack Multiplier (" + numberformat.format(player.cMultiplier) + "x -> " + numberformat.format(player.cMultiplier.add(1)) + "x) " + (sigma(1, bms, i => i * 7500) + sigma(1, player.cMultiplier, i => i * 7500) - 7500) + "⚛";
        document.querySelector("#multQOL").textContent = "Buy a Solve Multiplier (" + numberformat.format(player.sMultiplier) + "x -> " + numberformat.format(player.sMultiplier.add(1)) + "x) " + (sigma(1, bms, i => i * 150) + sigma(1, player.sMultiplier, i => i * 150) - 150) + "β";
        document.querySelector("#qlavmultQOL").textContent = "Buy a Qlavram Multiplier (" + numberformat.format(player.qMultiplier) + "x -> " + numberformat.format(player.qMultiplier.add(1)) + "x) " + (sigma(1, bms, i => i * 150) + sigma(1, player.qMultiplier, i => i * 150) - 150) + "Փ";

    } else {
        alertBox("You need at least 100000ῼ to prestige layer 2!! You currently have " + player.omegas + "ῼ")
    }
}