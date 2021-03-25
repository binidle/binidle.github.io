var bms = 1;

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
    document.querySelector("#version").textContent = "Version: b0.3.0 save/prestige update!!!!!! go crazy m8; added save and prestige; currently in beta";
    document.querySelector("#rforcers").textContent = "Randforcers: " + numberformat.format(player.randForcers);
    document.querySelector("#bforcers").textContent = "Bruteforcers: " + numberformat.format(player.bruteForcers);
    document.querySelector("#played").textContent = "Time Played: " + time_ago(started);
    document.querySelector("#solavg").textContent = "Solve Performance: " + (1 / (solavg / 1000)).toFixed(2) + "/s";
}

function time_ago(time) {

    switch (typeof time) {
        case 'number':
            break;
        case 'string':
            time = +new Date(time);
            break;
        case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
        default:
            time = +new Date();
    }
    var time_formats = [
        [60, 'seconds', 1], // 60
        [120, '1 minute', '1 minute from now'], // 60*2
        [3600, 'minutes', 60], // 60*60, 60
        [7200, '1 hour', '1 hour from now'], // 60*60*2
        [86400, 'hours', 3600], // 60*60*24, 60*60
        [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
        [604800, 'days', 86400], // 60*60*24*7, 60*60*24
        [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
        [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
        [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
        [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
        [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
        [58060800000, 'centuries; why have you played this long', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
        token = ' ',
        list_choice = 1;

    if (seconds == 0) {
        return 'Just now'
    }
    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = 'from now';
        list_choice = 2;
    }
    var i = 0,
        format;
    while (format = time_formats[i++])
        if (seconds < format[0]) {
            if (typeof format[2] == 'string')
                return format[list_choice];
            else
                return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
        }
    return time;
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
    document.querySelector("#multQOL").textContent = "Buy a Solve Multiplier (" + numberformat.format(player.sMultiplier) + "x -> " + numberformat.format(player.sMultiplier.add(1)) + "x) " + temp * bms + "β"

    temp = (150 * player.qMultiplier)
    document.querySelector("#qlavmultQOL").textContent = "Buy a Qlavram Multiplier (" + numberformat.format(player.qMultiplier) + "x -> " + numberformat.format(player.qMultiplier.add(1)) + "x) " + temp * bms + "Փ"

    temp = (7500 * player.cMultiplier)
    document.querySelector("#crackmultQOL").textContent = "Buy a Crack Multiplier (" + numberformat.format(player.cMultiplier) + "x -> " + numberformat.format(player.cMultiplier.add(1)) + "x) " + temp * bms + "⚛"

    temp = (500 * player.cFormula)
    document.querySelector("#crackFormUPG").textContent = "Buy a Crack Formula Boost (" + numberformat.format(player.cFormula) + "x -> " + numberformat.format(player.cFormula.add(1)) + "x) " + temp * bms + "Փ" // broken but idc we'll do it later
}

function sigma(start, end, modifier) {
    const length = end - start + 1;
    const map = (v, k) => modifier ? modifier(k + start) : k + start;
    const sum = (a, b) => a + b;

    return Array.from({
        length
    }, map).reduce(sum);
}

function enc(plainText){
    var b64 = CryptoJS.AES.encrypt(plainText, SECRET).toString();
    var e64 = CryptoJS.enc.Base64.parse(b64);
    var eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;
}

function dec(cipherText){
   var reb64 = CryptoJS.enc.Hex.parse(cipherText);
   var bytes = reb64.toString(CryptoJS.enc.Base64);
   var decrypt = CryptoJS.AES.decrypt(bytes, SECRET);
   var plain = decrypt.toString(CryptoJS.enc.Utf8);
   return plain;
}

function checksum(sd) {
    return CryptoJS.MD5(sd).toString();
}

function cheat() {
    player.qlavrams.mantissa=10000000000000000000000000;
    player.cracks.mantissa=10000000000000000000000000;
    player.solves.mantissa=10000000000000000000000000;
}

function reset() {
    window.localStorage.save="";
}