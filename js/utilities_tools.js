var prestiged = 0;
var bms = 0;

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
        alertBox("weedmart calls: not done yet lol; being worked on");
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
        player.csolves = player.csolves.add(1 + 0); // change the 0 to a formula in the future
    } else {
        alertBox("You need at least 100000⚛ to prestige!! You currently have " + player.solves + "⚛")
    }
}

function getVersion() {
    sum = 0;
    for (i = 0; i < 30; i++) {
        fetch("https://api.github.com/repos/binidle/binidle.github.io/commits?page=" + i)
            .then(x => x.text())
            .then(function (y) {
                sum += JSON.parse(y).length;
                return sum;
            });
    }
}

function updateSolves() {
    document.querySelector("#solve").textContent = "Solves (⚛): " + numberformat.format(player.solves);
    document.querySelector("#qlavram").textContent = "Qlavrams (β): " + numberformat.format(player.qlavrams);
    document.querySelector("#crack").textContent = "Cracks (Փ): " + numberformat.format(player.cracks);
    document.querySelector("#qlavramps").textContent = "QPT: " + (Math.sqrt(player.randForcers) * (0.0001 * player.qMultiplier)).toFixed(5);
    document.querySelector("#smlt").textContent = "Solve Multipliers: " + numberformat.format(player.sMultiplier) + "x";
    document.querySelector("#qmlt").textContent = "Qlavram Multipliers: " + numberformat.format(player.qMultiplier) + "x";
    document.querySelector("#bcrack").textContent = "Base Cracks: " + numberformat.format(player.bcracks);
    document.querySelector("#cmlt").textContent = "Crack Multipliers: " + numberformat.format(player.cMultiplier) + "x";
    document.querySelector("#crackps").textContent = "CPT: " + ((((player.bcracks * (0.025 + (0.005 * (player.cFormula.sub(1))))) / (1 + player.bcracks / 1 + player.cracks))) * player.cMultiplier).toFixed(5);
    document.querySelector("#version").textContent = "Version: b0.2.2 Colour Update!!!!!! real wacky m8; performance fixed; currently in beta";
    document.querySelector("#rforcers").textContent = "Randforcers: " + numberformat.format(player.randForcers);
    document.querySelector("#bforcers").textContent = "Bruteforcers: " + numberformat.format(player.bruteForcers);
    document.querySelector("#played").textContent = "Time Played: "+ ((performance.now()-started)/1000).toFixed(1)+"s";
}

function genBinary(len) {
    n = [];
    for (let i = 0; i < len; i++) {
        n.push(Math.round(Math.random()));
    }
    return n;
}

function genVal(len, val) {
    n = [];
    for (let i = 0; i < len; i++) {
        n.push(val);
    }
    return n;
}

function alertBox(msg) {
    zz = document.createElement("div");
    zz.className = "alert";
    zz.innerHTML = `<span class="closebtn">&times;</span>` + msg + ``;
    document.querySelector("#alertBoxs").appendChild(zz);

    zz.onclick = function () {
        div = zz;
        div.style.opacity = "0";
        setTimeout(function () {
            div.style.display = "none";
        }, 600);
    }
    setTimeout(function (that) {
        var div = that;
        div.style.opacity = "0";
        setTimeout(function () {
            div.style.display = "none";
        }, 600);
    }, 3000, zz);
}

function acheiveBox(msg) {
    Beep2.play();
    console.log("Acheivement: " + msg);
    if (true) {
        zz = document.createElement("div");
        zz.className = "alert ach";
        zz.innerHTML = `<span class="closebtn">&times;</span>` + msg + ``;
        document.querySelector("#alertBoxs").appendChild(zz);
  
        zz.onclick = function () {
            div = zz;
            div.style.opacity = "0";
            setTimeout(function () {
                div.style.display = "none";
            }, 600);
        }
        setTimeout(function (that) {
            var div = that;
            div.style.opacity = "0";
            setTimeout(function () {
                div.style.display = "none";
            }, 600);
        }, 5000, zz);
    }
}

function perfMeasure(f) {
    var t0 = performance.now()

    f() // <---- The function you're measuring time for

    var t1 = performance.now()
    // console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
    return (t1 - t0);
}

function cls(arr, val) { // ez for menu stuff
    for (ind = 0; ind < arr.length; ind++) {
        arr[ind].className = val;
    }
}

function bm(m) {
    bms = m;

    temp = (150 * player.sMultiplier)
    document.querySelector("#multQOL").innerText = "Buy a Solve Multiplier (" + numberformat.format(player.sMultiplier) + "x -> " + numberformat.format(player.sMultiplier.add(1)) + "x) " + temp * bms + "β"

    temp = (150 * player.qMultiplier)
    document.querySelector("#qlavmultQOL").innerText = "Buy a Qlavram Multiplier (" + numberformat.format(player.qMultiplier) + "x -> " + numberformat.format(player.qMultiplier.add(1)) + "x) " + temp * bms + "Փ"

    temp = (7500 * player.cMultiplier)
    document.querySelector("#crackmultQOL").innerText = "Buy a Crack Multiplier (" + numberformat.format(player.cMultiplier) + "x -> " + numberformat.format(player.cMultiplier.add(1)) + "x) " + temp * bms + "⚛"

    temp = (500 * player.cFormula)
    document.querySelector("#crackFormUPG").innerText = "Buy a Crack Formula Boost (" + numberformat.format(player.cFormula) + "x -> " + numberformat.format(player.cFormula.add(1)) + "x) " + temp * bms + "Փ" // broken but idc we'll do it later
}