var decoded;

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function volume(ud = 0) {
    if ((vol < 0.1 && ud < 0) || (vol > 0.9 && ud > 0)) {

    } else {
        vol += ud / 10;
    }
    Beep1.volume = vol;
    Beep2.volume = vol;
    Beep3.volume = vol;
    Beep1.play();
}

function cool_button() {
    theme.play();
    changeIcon();
    acheiveBox("<img style='width:200px;height:200px;' src='./bug.gif'/>",28000);
}

function toggleLowP() {
    if (player.lowp == false && !player.achs[13]) {
        player.achs[13] = true;
        acheiveBox("How much dedicated wam? - Use 'Better Performance'");
        loadachs();
    }
    player.lowp = !player.lowp;
}

function toggleLowPOff() {
    x = document.querySelectorAll("#perfbad");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "";
    }
}

function rainbow() {
    if (!player.achs[12]) {
        player.achs[12] = true;
        acheiveBox("I regret this... - Use le cool rainbow background theme, you cannot turn this off");
        loadachs();
    }
    document.body.style.backgroundImage = "url('./rainbow.gif')";
    document.body.style.color = "#333333";
}

function save(local = true, strg = false) {
    abc = {};
    abc["player"] = player;
    abc["bins"] = player.bins;
    abc["binamt"] = player.bins.length;
    abc["binmax"] = player.bins[0].bins.length;
    if (local) {
        download("save.idle", enc(btoa(JSON.stringify(abc)) + "|" + checksum(btoa(JSON.stringify(abc))), "bruh funny"));
    } else if (strg) {
        window.localStorage.save = enc(btoa(JSON.stringify(abc)) + "|" + checksum(btoa(JSON.stringify(abc))), "bruh funny");
    } else {
        navigator.clipboard.writeText(enc(btoa(JSON.stringify(abc)) + "|" + checksum(btoa(JSON.stringify(abc))), "bruh funny"));
    }
}

function load(local = false) {
    if (local) {
        try {
            dec1 = dec(window.localStorage.save).split("|");
            if (dec1[1] != checksum(dec1[0])) {
                alertBox("weedmart calls: This save file looks like it has been tAmPeReD with!! You may also have reset your save");
            } else {

                decoded = JSON.parse(atob(dec1[0]));
                player.csolves = new Decimal(parseFloat(decoded.player.csolves));
                player.solves = new Decimal(parseFloat(decoded.player.solves));
                player.sMultiplier = new Decimal(parseFloat(decoded.player.sMultiplier));
                player.qMultiplier = new Decimal(parseFloat(decoded.player.qMultiplier));
                player.cMultiplier = new Decimal(parseFloat(decoded.player.cMultiplier));
                player.cFormula = new Decimal(parseFloat(decoded.player.cFormula));
                player.randForcers = new Decimal(parseFloat(decoded.player.randForcers));
                player.bruteForcers = new Decimal(parseFloat(decoded.player.bruteForcers));
                player.qlavrams = new Decimal(parseFloat(decoded.player.qlavrams));
                player.bcracks = new Decimal(parseFloat(decoded.player.bcracks));
                player.cracks = new Decimal(parseFloat(decoded.player.cracks));
                player.omegas = new Decimal(parseFloat(decoded.player.omegas));
                player.oMultiplier = new Decimal(parseFloat(decoded.player.oMultiplier));
                player.presqlav = new Decimal(parseFloat(decoded.player.presqlav));
                player.presmult = new Decimal(parseFloat(decoded.player.presmult));
                player.presline = new Decimal(parseFloat(decoded.player.presline));
                player.plumes = new Decimal(parseFloat(decoded.player.plumes));
                player.bitval = parseFloat(decoded.player.bitval);
                player.achs = decoded.player.achs;
                player.started = decoded.player.started;

                loadachs();

                document.querySelector("#burh").textContent = "Buy another line " + numberformat.format(25 + (5 * 5 ** player.bins.length)) + "β";
                document.querySelector("#crackFormUPG").textContent = "Buy a Crack Formula Boost (" + numberformat.format(player.cFormula) + "x -> " + numberformat.format(player.cFormula.add(1)) + "x) " + (sigma(1,bms,i=>i*500)+sigma(1,player.cFormula,i=>i*500)-500) + "Փ"; // broken but idc we'll do it later
                document.querySelector("#crackmultQOL").textContent = "Buy a Crack Multiplier (" + numberformat.format(player.cMultiplier) + "x -> " + numberformat.format(player.cMultiplier.add(1)) + "x) " + (sigma(1,bms,i=>i*7500)+sigma(1,player.cMultiplier,i=>i*7500)-7500) + "⚛";
                document.querySelector("#multQOL").textContent = "Buy a Solve Multiplier (" + numberformat.format(player.sMultiplier) + "x -> " + numberformat.format(player.sMultiplier.add(1)) + "x) " + (sigma(1,bms,i=>i*150)+sigma(1,player.sMultiplier,i=>i*150)-150) + "β";
                document.querySelector("#qlavmultQOL").textContent = "Buy a Qlavram Multiplier (" + numberformat.format(player.qMultiplier) + "x -> " + numberformat.format(player.qMultiplier.add(1)) + "x) " + (sigma(1,bms,i=>i*150)+sigma(1,player.qMultiplier,i=>i*150)-150) + "Փ";
                document.querySelector("#omegamult").textContent = "Buy a Omega Multiplier (" + numberformat.format(player.oMultiplier) + "x -> " + numberformat.format(player.oMultiplier.add(1)) + "x) " + (100 * player.oMultiplier) + "☸" // broken but idc we'll do it later

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
                for (let i = document.querySelector("#lines").children.length - 1; i > -1; i--) {
                    document.querySelector("#lines").children[i].remove();
                }
                for (let j = 0; j < player.bins.length; j++) {
                    player.bins.splice(j, 1);
                }

                for (i = 0; i < decoded.binamt; i++) {
                    buyBin(true);
                    for (f = 0; f < decoded.bins[i].bins.length; f++) {
                        addBin(Math.round(random.nextFloat()), i);
                    };
                }
                for (indexidk = 0; indexidk < decoded.bins.length; indexidk++) {
                    player.bins[indexidk].randForcing = decoded.bins[indexidk].randForcing;
                    player.bins[indexidk].randForcers = decoded.bins[indexidk].randForcers;
                    player.bins[indexidk].bruteForcing = decoded.bins[indexidk].bruteForcing;
                    player.bins[indexidk].bruteForcers = decoded.bins[indexidk].bruteForcers;
                    player.bins[indexidk].currGoal = decoded.bins[indexidk].currGoal;
                }
            }
        } catch (error) {
            alertBox("Tried to load save from local storage, no save detected");
        }

    } else {
        a = "";
        var pickerOpts = {
            types: [{
                description: 'BINIDLE Save',
                accept: {
                    'idle/*': ['.idle', '.txt']
                }
            }, ],
            excludeAcceptAllOption: true,
            multiple: false
        };

        showOpenFilePicker(pickerOpts).then(([x]) => x.getFile().then(y => y.text().then(zz => {
            dec1 = dec(zz).split("|");
            if (dec1[1] != checksum(dec1[0])) {
                alertBox("weedmart calls: This save file looks like it has been tAmPeReD with!! You may also have reset your save");
            } else {

                decoded = JSON.parse(atob(dec1[0]));
                player.csolves = new Decimal(parseFloat(decoded.player.csolves));
                player.solves = new Decimal(parseFloat(decoded.player.solves));
                player.sMultiplier = new Decimal(parseFloat(decoded.player.sMultiplier));
                player.qMultiplier = new Decimal(parseFloat(decoded.player.qMultiplier));
                player.cFormula = new Decimal(parseFloat(decoded.player.cFormula));
                player.cMultiplier = new Decimal(parseFloat(decoded.player.cMultiplier));
                player.randForcers = new Decimal(parseFloat(decoded.player.randForcers));
                player.bruteForcers = new Decimal(parseFloat(decoded.player.bruteForcers));
                player.qlavrams = new Decimal(parseFloat(decoded.player.qlavrams));
                player.bcracks = new Decimal(parseFloat(decoded.player.bcracks));
                player.omegas = new Decimal(parseFloat(decoded.player.omegas));
                player.oMultiplier = new Decimal(parseFloat(decoded.player.oMultiplier));
                player.bitval = parseFloat(decoded.player.bitval);
                player.presqlav = new Decimal(parseFloat(decoded.player.presqlav));
                player.presmult = new Decimal(parseFloat(decoded.player.presmult));
                player.presline = new Decimal(parseFloat(decoded.player.presline));
                player.plumes = new Decimal(parseFloat(decoded.player.plumes));
                player.achs = decoded.player.achs;
                player.started = decoded.player.started;
                player.cracks = new Decimal(parseFloat(decoded.player.cracks));
                loadachs();
                document.querySelector("#burh").textContent = "Buy another line " + numberformat.format(25 + (5 * 5 ** player.bins.length)) + "β";
                document.querySelector("#crackFormUPG").textContent = "Buy a Crack Formula Boost (" + numberformat.format(player.cFormula) + "x -> " + numberformat.format(player.cFormula.add(1)) + "x) " + (sigma(1,bms,i=>i*500)+sigma(1,player.cFormula,i=>i*500)-500) + "Փ"; // broken but idc we'll do it later
                document.querySelector("#crackmultQOL").textContent = "Buy a Crack Multiplier (" + numberformat.format(player.cMultiplier) + "x -> " + numberformat.format(player.cMultiplier.add(1)) + "x) " + (sigma(1,bms,i=>i*7500)+sigma(1,player.cMultiplier,i=>i*7500)-7500) + "⚛";
                document.querySelector("#multQOL").textContent = "Buy a Solve Multiplier (" + numberformat.format(player.sMultiplier) + "x -> " + numberformat.format(player.sMultiplier.add(1)) + "x) " + (sigma(1,bms,i=>i*150)+sigma(1,player.sMultiplier,i=>i*150)-150) + "β";
                document.querySelector("#qlavmultQOL").textContent = "Buy a Qlavram Multiplier (" + numberformat.format(player.qMultiplier) + "x -> " + numberformat.format(player.qMultiplier.add(1)) + "x) " + (sigma(1,bms,i=>i*150)+sigma(1,player.qMultiplier,i=>i*150)-150) + "Փ";
                document.querySelector("#omegamult").textContent = "Buy a Omega Multiplier (" + numberformat.format(player.oMultiplier) + "x -> " + numberformat.format(player.oMultiplier.add(1)) + "x) " + (100 * player.oMultiplier) + "☸" // broken but idc we'll do it later

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
                for (let i = document.querySelector("#lines").children.length - 1; i > -1; i--) {
                    document.querySelector("#lines").children[i].remove();
                }
                for (let j = 0; j < player.bins.length; j++) {
                    player.bins.splice(j, 1);
                }

                for (i = 0; i < decoded.binamt; i++) {
                    buyBin(true);
                    for (f = 0; f < decoded.bins[i].bins.length; f++) {
                        addBin(Math.round(random.nextFloat()), i);
                    };
                }
                // console.log(decoded);
                for (indexidk = 0; indexidk < decoded.bins.length; indexidk++) {
                    player.bins[indexidk].randForcing = decoded.bins[indexidk].randForcing;
                    player.bins[indexidk].randForcers = decoded.bins[indexidk].randForcers;
                    player.bins[indexidk].bruteForcing = decoded.bins[indexidk].bruteForcing;
                    player.bins[indexidk].bruteForcers = decoded.bins[indexidk].bruteForcers;
                    player.bins[indexidk].currGoal = decoded.bins[indexidk].currGoal;
                }
            }
        })));
    }
}

function loadc() {
    navigator.clipboard.readText().then(zz => {
        dec1 = dec(zz).split("|");
        if (dec1[1] != checksum(dec1[0])) {
            alertBox("weedmart calls: This save file looks like it has been tAmPeReD with!! You may also have reset your save");
        } else {

            decoded = JSON.parse(atob(dec1[0]));
            player.solves = new Decimal(parseFloat(decoded.player.solves));
            player.csolves = new Decimal(parseFloat(decoded.player.csolves));
            player.sMultiplier = new Decimal(parseFloat(decoded.player.sMultiplier));
            player.qMultiplier = new Decimal(parseFloat(decoded.player.qMultiplier));
            player.cMultiplier = new Decimal(parseFloat(decoded.player.cMultiplier));
            player.cFormula = new Decimal(parseFloat(decoded.player.cFormula));
            player.randForcers = new Decimal(parseFloat(decoded.player.randForcers));
            player.bruteForcers = new Decimal(parseFloat(decoded.player.bruteForcers));
            player.qlavrams = new Decimal(parseFloat(decoded.player.qlavrams));
            player.bcracks = new Decimal(parseFloat(decoded.player.bcracks));
            player.omegas = new Decimal(parseFloat(decoded.player.omegas));
            player.oMultiplier = new Decimal(parseFloat(decoded.player.oMultiplier));
            player.presqlav = new Decimal(parseFloat(decoded.player.presqlav));
            player.presmult = new Decimal(parseFloat(decoded.player.presmult));
            player.presline = new Decimal(parseFloat(decoded.player.presline));
            player.plumes = new Decimal(parseFloat(decoded.player.plumes));
            player.bitval = parseFloat(decoded.player.bitval);
            player.achs = decoded.player.achs;
            player.started = decoded.player.started;
            player.cracks = new Decimal(parseFloat(decoded.player.cracks));
            loadachs();
            document.querySelector("#burh").textContent = "Buy another line " + numberformat.format(25 + (5 * 5 ** player.bins.length)) + "β";
            document.querySelector("#crackFormUPG").textContent = "Buy a Crack Formula Boost (" + numberformat.format(player.cFormula) + "x -> " + numberformat.format(player.cFormula.add(1)) + "x) " + (sigma(1,bms,i=>i*500)+sigma(1,player.cFormula,i=>i*500)-500) + "Փ"; // broken but idc we'll do it later
            document.querySelector("#crackmultQOL").textContent = "Buy a Crack Multiplier (" + numberformat.format(player.cMultiplier) + "x -> " + numberformat.format(player.cMultiplier.add(1)) + "x) " + (sigma(1,bms,i=>i*7500)+sigma(1,player.cMultiplier,i=>i*7500)-7500) + "⚛";
            document.querySelector("#multQOL").textContent = "Buy a Solve Multiplier (" + numberformat.format(player.sMultiplier) + "x -> " + numberformat.format(player.sMultiplier.add(1)) + "x) " + (sigma(1,bms,i=>i*150)+sigma(1,player.sMultiplier,i=>i*150)-150) + "β";
            document.querySelector("#qlavmultQOL").textContent = "Buy a Qlavram Multiplier (" + numberformat.format(player.qMultiplier) + "x -> " + numberformat.format(player.qMultiplier.add(1)) + "x) " + (sigma(1,bms,i=>i*150)+sigma(1,player.qMultiplier,i=>i*150)-150) + "Փ";
            document.querySelector("#omegamult").textContent = "Buy a Omega Multiplier (" + numberformat.format(player.oMultiplier) + "x -> " + numberformat.format(player.oMultiplier.add(1)) + "x) " + (100 * player.oMultiplier) + "☸" // broken but idc we'll do it later

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
            for (let i = document.querySelector("#lines").children.length - 1; i > -1; i--) {
                document.querySelector("#lines").children[i].remove();
            }
            for (let j = 0; j < player.bins.length; j++) {
                player.bins.splice(j, 1);
            }

            for (i = 0; i < decoded.binamt; i++) {
                buyBin(true);
                for (f = 0; f < decoded.bins[i].bins.length; f++) {
                    addBin(Math.round(random.nextFloat()), i);
                };
            }
            for (indexidk = 0; indexidk < decoded.bins.length; indexidk++) {
                player.bins[indexidk].randForcing = decoded.bins[indexidk].randForcing;
                player.bins[indexidk].randForcers = decoded.bins[indexidk].randForcers;
                player.bins[indexidk].bruteForcing = decoded.bins[indexidk].bruteForcing;
                player.bins[indexidk].bruteForcers = decoded.bins[indexidk].bruteForcers;
                player.bins[indexidk].currGoal = decoded.bins[indexidk].currGoal;
            }
        }
    });
}