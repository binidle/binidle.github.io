var lineVal=0;
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
    if (player.cracks > 150) {
        player.cracks = player.cracks.sub(150);
        player.bins[zzz].bins[player.bins[zzz].bins.length - 1].remove();
        player.bins[zzz].bins.splice(player.bins[zzz].bins.length - 1, 1);
        player.bins[zzz].currGoal = genBinary(player.bins[zzz].bins.length);
    } else {
        Beep3.play();
        alertBox("You need at least 150Φ to remove a bit! You currently have " + player.solves + "Φ")
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
        lineVal += 0.2;
        if (!load) player.qlavrams = player.qlavrams.sub((25 + (5 * 5 ** player.bins.length)));
        player.bins.push(new Bin());
        t = document.createElement("ul");
        t.id = "bits" + (player.bins.length - 1);
        if(!load)t.className = "bins" + Math.floor(lineVal+0.1);
        else t.className = "bins" + Math.floor(lineVal-0.2);
        t.innerHTML = `<li class="stats" onclick="buyRandforcer(parseInt(this.parentElement.id.split('bits')[1]))">Buy Randforcer 10⚛</li><li class="stats" onclick="buyBruteforcer(parseInt(this.parentElement.id.split('bits')[1]))">Buy Bruteforcer 100⚛</li><li class="stats" onclick="removeBit(parseInt(this.parentElement.id.split('bits')[1]))">Remove Bit 150Φ</li>`
        document.querySelector("#lines").appendChild(t);
        if (!load) addBin(0, player.bins.length - 1);
        player.bins[player.bins.length - 1].currGoal = genBinary(1);
        document.querySelector("#burh").textContent = "Buy another line " + (25 + (5 * 5 ** player.bins.length)) + "β"
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
    if (player.qlavrams > temp * bms && !pr) {
        for (let szz = 0; szz < bms; szz++) {
            if (player.sMultiplier == 1 && !player.achs[5]) {
                player.achs[5] = true;
                acheiveBox("x2 Mutliplier! - Buy a Solver Multiplier for 150β");
                loadachs();
            }
            player.sMultiplier = player.sMultiplier.add(1);
            player.qlavrams = player.qlavrams.sub(temp);
            temp = (150 * player.sMultiplier)
            Beep2.play();
            document.querySelector("#multQOL").textContent = "Buy a Solve Multiplier (" + numberformat.format(player.sMultiplier) + "x -> " + numberformat.format(player.sMultiplier.add(1)) + "x) " + temp + "β"
        }
    } else if (player.csolves >= 10) {
        player.csolves = player.csolves.sub(10);
        for (let szz = 0; szz < bms; szz++) {
            player.sMultiplier = player.sMultiplier.add(1);
            temp = (150 * player.sMultiplier)
            document.querySelector("#csolves").textContent = "Complex Solves: " + numberformat.format(player.csolves) + "☸";
            Beep2.play();
            document.querySelector("#multQOL").textContent = "Buy a Solve Multiplier (" + numberformat.format(player.sMultiplier) + "x -> " + numberformat.format(player.sMultiplier.add(1)) + "x) " + temp + "β"
        }
    } else {
        Beep3.play();
        alertBox("You need at least " + temp * bms + "β to buy a multiplier! You currently have " + player.qlavrams + "β")
    }
}

function qMult(pr = false) {
    temp = (150 * player.qMultiplier)
    if (player.cracks > temp * bms && !pr) {
        for (let szz = 0; szz < bms; szz++) {
            player.qMultiplier = player.qMultiplier.add(1);
            player.cracks = player.cracks.sub(temp);
            temp = (150 * player.qMultiplier)
            Beep2.play();
            document.querySelector("#qlavmultQOL").textContent = "Buy a Qlavram Multiplier (" + numberformat.format(player.qMultiplier) + "x -> " + numberformat.format(player.qMultiplier.add(1)) + "x) " + temp + "Փ"
        }
    } else if (player.csolves >= 10) {
        player.csolves = player.csolves.sub(10);
        for (let szz = 0; szz < bms; szz++) {
            player.qMultiplier = player.qMultiplier.add(1);
            temp = (150 * player.qMultiplier)
            document.querySelector("#csolves").textContent = "Complex Solves: " + numberformat.format(player.csolves) + "☸";
            Beep2.play();
            document.querySelector("#qlavmultQOL").textContent = "Buy a Qlavram Multiplier (" + numberformat.format(player.qMultiplier) + "x -> " + numberformat.format(player.qMultiplier.add(1)) + "x) " + temp + "Փ"
        }
    } else {
        Beep3.play();
        alertBox("You need at least " + temp * bms + "Փ to buy a Qlavram multiplier! You currently have " + player.cracks + "Փ")
    }
}

function cMult(pr = false) {
    temp = (7500 * player.cMultiplier)
    if (player.solves > temp * bms && !pr) {
        for (let szz = 0; szz < bms; szz++) {
            player.cMultiplier = player.cMultiplier.add(1);
            player.solves = player.solves.sub(temp);
            temp = (7500 * player.cMultiplier)
            Beep2.play();
            document.querySelector("#crackmultQOL").textContent = "Buy a Crack Multiplier (" + numberformat.format(player.cMultiplier) + "x -> " + numberformat.format(player.cMultiplier.add(1)) + "x) " + temp + "⚛"
        }
    } else if (player.csolves >= 10) {
        player.csolves = player.csolves.sub(10);
        for (let szz = 0; szz < bms; szz++) {
            player.cMultiplier = player.cMultiplier.add(1);
            temp = (7500 * player.cMultiplier)
            document.querySelector("#csolves").textContent = "Complex Solves: " + numberformat.format(player.csolves) + "☸";
            Beep2.play();
            document.querySelector("#crackmultQOL").textContent = "Buy a Crack Multiplier (" + numberformat.format(player.cMultiplier) + "x -> " + numberformat.format(player.cMultiplier.add(1)) + "x) " + temp + "⚛"
        }
    } else {
        alertBox("You need at least " + temp * bms + "⚛ to buy a Crack multiplier! You currently have " + player.solves + "⚛")
        Beep3.play();
    }
}

function cForm(pr = false) {
    temp = (500 * player.cFormula)
    // temp = 500;
    if (player.cracks > temp * bms && !pr) {
        for (let szz = 0; szz < bms; szz++) {
            player.cFormula = player.cFormula.add(1);
            player.cracks = player.cracks.sub(temp);
            temp = (500 * player.cFormula)
            Beep2.play();
            document.querySelector("#crackFormUPG").textContent = "Buy a Crack Formula Boost (" + numberformat.format(player.cFormula) + "x -> " + numberformat.format(player.cFormula.add(1)) + "x) " + temp + "Փ" // broken but idc we'll do it later
        }
    } else if (player.csolves >= 10) {
        player.csolves = player.csolves.sub(10);
        for (let szz = 0; szz < bms; szz++) {
            player.cFormula = player.cFormula.add(1);
            temp = (500 * player.cFormula)
            document.querySelector("#csolves").textContent = "Complex Solves: " + numberformat.format(player.csolves) + "☸";
            Beep2.play();
            document.querySelector("#crackFormUPG").textContent = "Buy a Crack Formula Boost (" + numberformat.format(player.cFormula) + "x -> " + numberformat.format(player.cFormula.add(1)) + "x) " + temp + "Փ" // broken but idc we'll do it later
        }
    } else {
        Beep3.play();
        alertBox("You need at least " + temp * bms + "Փ to buy a Crack Formula Boost! You currently have " + player.cracks + "Փ")
    }
}

function oMult() {
    temp = (100*player.oMultiplier)
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
    }
    else if (player.presqlav == 1) {
        Beep3.play();
        alertBox("You've already purchased this upgrade!")
    }
    else {
        Beep3.play();
        alertBox("You need at least 8☸ to buy Better Qlavram Generators! You currently have " + player.csolves + "☸")
    }
}

function prestige() {
    if (player.solves >= 100000) {
        lineVal=0;
        // alertBox("weedmart calls: not done yet lol; being worked on");
        player.solves = new Decimal(0);
        player.sMultiplier = new Decimal(1);
        player.qMultiplier = new Decimal(1);
        player.cMultiplier = new Decimal(1);
        player.randForcers = new Decimal(0);
        player.bruteForcers = new Decimal(0);
        player.qlavrams = new Decimal(0);
        player.bcracks = new Decimal(0);
        player.cracks = new Decimal(0);
        // =remove bins until 1 left here=

        // ===============================
        player.csolves = player.csolves.add((1 * player.solves.e) - 3); // Will add another formula later on

        player.bins.forEach((i, j) => {
            i.randForcing = false;
            i.randForcers = 0;
            i.bruteForcing = false;
            i.bruteForcers = 0;
            i.currGoal = genBinary(1);
            i.bins.forEach((sz) => {
                sz.remove();
            });
            i.bins = [];

        }, player);
        for (let i = document.querySelector("#lines").children.length - 1; i > 0; i--) {
            document.querySelector("#lines").children[i].remove();
        }
        player.bins.splice(1,player.bins.length-1);
        addBin(0);
        document.querySelector("#burh").textContent = "Buy another line " + (25 + (5 * 5 ** player.bins.length)) + "β";
        document.querySelector("#crackFormUPG").textContent = "Buy a Crack Formula Boost (" + numberformat.format(player.cFormula) + "x -> " + numberformat.format(player.cFormula.add(1)) + "x) " + (500 * player.cFormula) + "Փ"; // broken but idc we'll do it later
        document.querySelector("#crackmultQOL").textContent = "Buy a Crack Multiplier (" + numberformat.format(player.cMultiplier) + "x -> " + numberformat.format(player.cMultiplier.add(1)) + "x) " + (7500 * player.cMultiplier) + "⚛";
        document.querySelector("#multQOL").textContent = "Buy a Solve Multiplier (" + numberformat.format(player.sMultiplier) + "x -> " + numberformat.format(player.sMultiplier.add(1)) + "x) " + (150 * player.sMultiplier) + "β";
        document.querySelector("#qlavmultQOL").textContent = "Buy a Qlavram Multiplier (" + numberformat.format(player.qMultiplier) + "x -> " + numberformat.format(player.qMultiplier.add(1)) + "x) " + (150 * player.qMultiplier) + "Փ";

    } else {
        alertBox("You need at least 100000⚛ to prestige!! You currently have " + player.solves + "⚛")
    }
}