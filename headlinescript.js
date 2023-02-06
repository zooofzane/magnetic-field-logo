let strtest, splitstr, testMFVF
let splitstrnum;
let p
let MFspan = [];
let cursor;
let posX = window.innerWidth / 2;
let posY = window.innerHeight / 8;
let x = Math.random() * 1500;
let y = Math.random() * 900 + 100;
let time = 0;
let noise = new perlinNoise3d();
noise.noiseSeed(Math.E);
let switcher;
let randomx = Math.random() * 1500;
let randomy = Math.random() * 900 + 100;
let mousex, mousey;
mousex = 0;
let randomlogo;
// 49

p = document.getElementById("mftest");

function initialize() {
    strtest = document.getElementById("textarea").value;
    randomlogo = document.getElementById("randomlogo");
    switcher = document.getElementById("swithcer");


    splitstr = strtest.split('');

    for (let i = 0; i < splitstr.length; i++) {
        let ic = document.createElement("span");
        ic.classList.add("ics");
        ic.innerHTML = splitstr[i];
        MFspan.push(ic)
        p.append(MFspan[i]);
    }

    // cursor = document.getElementById("cursor")
}

initialize()

const tick = () => {

    fontwa = document.getElementById("rangea").value;
    fontwb = document.getElementById("rangeb").value;

    splitstrnum = splitstr.length;

    time += 0.005;

    strtest = document.getElementById("textarea").value;
    splitstr = strtest.split('');
    noisemovement = document.getElementById("noisemove");

    if (mousex > 400) {
        document.body.style.cursor = "none"
    } else {
        document.body.style.cursor = "auto"
    }

    if (splitstrnum != splitstr.length) {

        if (splitstrnum < splitstr.length) {
            let ic = document.createElement("span")
            ic.innerHTML = strtest[splitstrnum]
            ic.classList.add("icsplus");
            MFspan.push(ic)
            p.append(ic)
        }

        if (splitstrnum > splitstr.length) {
            let num = splitstrnum - splitstr.length;
            for (let i = 0; i < num; i++) {
                p.children[0].remove();
                num--;
            }
        }
    }

    // let maxarea = document.getElementById("myAreaRange").value;
    if (switcher.checked) {
        x = mousex;
        y = mousey;
    } else {
        x = randomx;
        y = randomy;
    }
    logo();


    window.requestAnimationFrame(tick)
}

tick()

function logo() {
    let strength = document.getElementById("myStrengthRange").value;
    let wstrength = document.getElementById("myStrengthRangeweight").value;
    for (let i = 0; i < splitstr.length; i++) {
        p.childNodes[i].innerHTML = splitstr[i]

        let posx = getOffset(p.childNodes[i]).left;
        let posy = getOffset(p.childNodes[i]).top;

        let xdist = posx - x;
        let ydist = y - posy;

        let testleft = xdist / 160 * 45 * ydist / 160;
        let testw = (1 - Math.abs(xdist / window.innerWidth) * wstrength + 1 - Math.abs(ydist / window.innerHeight) * wstrength) * 900;
        testw = clamp(testw, fontwa, fontwb)

        let directoffsite = noise.get(posx * 0.001, posy * 0.04, time) * 190 - 75;
        let dist = getDistance(posx, posy, x, y);
        let offsetnoise = 0;
        offsetnoise = clamp(offsetnoise, 0, 1);
        offsetnoise = map(dist, 0, 1000, 0, 4);


        p.childNodes[i].style.setProperty("--slant", testleft * strength);
        p.childNodes[i].style.setProperty("--weight", testw);
    }
}

document.addEventListener("keydown", (event) => {
    if (event.code === 'Digit1') {
        screensave()
    }
})

document.addEventListener("keydown", (event) => {
    if (event.code === 'Digit2') {
        x = Math.random() * 1500;
        y = Math.random() * 900 + 100;
    }
})

document.addEventListener('mousemove', (e) => {
    mousex = e.clientX;
    mousey = e.clientY;
});

// console.log(randomlogo)
randomlogo.onclick = function() {
    randomx = Math.random() * 1500;
    randomy = Math.random() * 900 + 100;
};


function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left,
        // top: rect.top + window.scrollY
        top: rect.top
    };
}

function getDistance(x1, y1, x2, y2) {
    let y = x2 - x1;
    let x = y2 - y1;

    return Math.sqrt(x * x + y * y);
}

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
}

function lerp(v0, v1, t) {
    return v0 * (1 - t) + v1 * t
}

function screensave() {
    html2canvas(document.getElementById("mftest"), { backgroundColor: null }).then(canvas => {
        document.getElementById('canvas').appendChild(canvas);
        canvas.style['font-family'] = 'Times';
        // canvas.style['font-weight'] = 100;
        let a = document.createElement('a');
        a.href = canvas.toDataURL("image/png");
        a.download = 'Magnetic Field Logo.png';
        a.click()
            // console.log(canvas.toDataURL('image/png'))
            // canvas.backgroundColor = null
    });
}