let strtest, splitstr, testMFVF
let splitstrnum;
let p
let MFspan = [];
let posX = window.innerWidth / 2;
let posY = window.innerHeight / 8;
let x = Math.random() * 1500;
let y = Math.random() * 900 + 100;
let time = 0;
let switcher;
let randomx = Math.random() * 1500;
let randomy = Math.random() * 900 + 100;
let fontsizes = 100
let strength
let wstrength
let fontsizestextinput, slanttextinput, fieldsizetextinput, wAinput, wBinput;
let mousexinput, mouseyinput
let mousex, mousey;
mousex = 0;
let randomlogo;

p = document.getElementById("mftest");

mousexinput = document.getElementById("pointx");
mouseyinput = document.getElementById("pointy");

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
}

initialize()

const tick = () => {


    splitstrnum = splitstr.length;

    time += 0.005;

    strtest = document.getElementById("textarea").value;
    splitstr = strtest.split('');
    noisemovement = document.getElementById("noisemove");

    if (mousex > 400) {
        // document.body.style.cursor = "none"
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

    if (switcher.checked) {
        x = mousex;
        y = mousey;
        mousexinput.value = mousex;
        mouseyinput.value = mousey;
    } else {
        x = mousexinput.value
        y = mouseyinput.value
    }

    logo();

    window.requestAnimationFrame(tick)
}

function logo() {
    for (let i = 0; i < splitstr.length; i++) {
        p.childNodes[i].innerHTML = splitstr[i]

        let posx = getOffset(p.childNodes[i]).left;
        let posy = getOffset(p.childNodes[i]).top;

        let xdist = posx - x;
        let ydist = y - posy;

        let testleft = xdist / 160 * 45 * ydist / 160;
        let testw = (1 - Math.abs(xdist / window.innerWidth) * wstrength.value + 1 - Math.abs(ydist / window.innerHeight) * wstrength.value) * 900;
        testw = clamp(testw, fontwa.value, fontwb.value)

        p.childNodes[i].style.setProperty("--slant", testleft * strength.value);
        p.childNodes[i].style.setProperty("--weight", testw);

        p.childNodes[i].style.fontSize = fontSizeSlider.value + "px"
    }
}



document.addEventListener("keydown", (event) => {
    if (event.code === 'KeyO') {
        switcher.checked = !switcher.checked
    }
})

// document.addEventListener("keydown", (event) => {
//     if (event.code === 'KeyS') {
//         domtoimage.toPng(node)
//             .then(function(dataUrl) {
//                 var img = new Image();
//                 img.src = dataUrl;
//                 document.body.appendChild(img);
//             })
//             .catch(function(error) {
//                 console.error('oops, something went wrong!', error);
//             });
//     }
// })

document.addEventListener('mousemove', (e) => {
    mousex = e.clientX;
    mousey = e.clientY;
});

randomlogo.onclick = function() {
    console.log("randomlogo")
    randomx = Math.random() * 1500;
    randomy = Math.random() * 900 + 100;

    mousexinput.value = Math.floor(randomx);
    mouseyinput.value = Math.floor(randomy);
};


function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left,
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
        let a = document.createElement('a');
        a.href = canvas.toDataURL("image/png");
        a.download = 'Magnetic Field Logo.png';
        a.click()
    });
}




const fontSizeSlider = document.getElementById("fontsizeslider");
const fontSizeTextInput = document.getElementById("sizetextinput");

function updateFontSizeTextInput() {
    fontSizeTextInput.value = fontSizeSlider.value;
}

function updateFontSizeSlider() {
    fontSizeSlider.value = fontSizeTextInput.value;
}
fontSizeSlider.addEventListener("input", updateFontSizeTextInput);
fontSizeTextInput.addEventListener("input", updateFontSizeSlider);

const typecolor = document.getElementById("fcolorInput")
const bgcolor = document.getElementById("bgcolorInput")
const backgrounddiv = document.getElementById("background")
const bodycolor = document.body

function updateBackgroundcolor() {
    backgrounddiv.style.backgroundColor = bgcolor.value;
}

function updateTypecolor() {
    bodycolor.style.color = typecolor.value;
}
typecolor.addEventListener("input", updateTypecolor);
bgcolor.addEventListener("input", updateBackgroundcolor);




strength = document.getElementById("myStrengthRange");
slanttextinput = document.getElementById("slanttextinput")
strength.addEventListener("input", function() {
    slanttextinput.value = strength.value;
})
slanttextinput.addEventListener("input", function() {
    strength.value = slanttextinput.value;
})

wstrength = document.getElementById("myStrengthRangeweight");
fieldsizetextinput = document.getElementById("fieldsizetextinput");
wstrength.addEventListener("input", function() {
    fieldsizetextinput.value = wstrength.value;
})
fieldsizetextinput.addEventListener("input", function() {
    wstrength.value = fieldsizetextinput.value;
})

fontwa = document.getElementById("rangea");
wAinput = document.getElementById("wAinput");
fontwa.addEventListener("input", function() {
    wAinput.value = fontwa.value;
})
wAinput.addEventListener("input", function() {
    fontwa.value = wAinput.value;
})

fontwb = document.getElementById("rangeb");
wBinput = document.getElementById("wBinput");
fontwb.addEventListener("input", function() {
    wBinput.value = fontwb.value;
})
wBinput.addEventListener("input", function() {
    fontwb.value = wBinput.value;
})


tick()

let editpanel = document.getElementById('editpanel');
// Create a canvas element
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

// Set the canvas size
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// ctx.scale(4, 4);

console.log(window.devicePixelRatio, 2)
    // Draw the screen content on the canvas

navigator.mediaDevices.getDisplayMedia({ video: true }).then(function(stream) {
    var video = document.createElement('video');
    video.srcObject = stream;
    video.onloadedmetadata = function(e) {
        video.play();
        // ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    };

    document.addEventListener('keydown', function(event) {
        if (event.code === 'KeyS') {
            editpanel.classList.add('hidden');
            video.pause();
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            var imageData = canvas.toDataURL('image/png', 1);
            var link = document.createElement('a');
            link.download = 'MF-assets.png';
            link.href = imageData;
            link.click();
            editpanel.classList.remove('hidden');


            // canvas.toBlob(function(blob) {
            //     // Create a link and trigger a download
            //     var link = document.createElement('a');
            //     link.download = 'screenshot.png';
            //     link.href = URL.createObjectURL(blob);
            //     link.click();

            //     // Remove the class from the element to show it again
            //     element.classList.remove('hidden');
            // }, 'image/png', 1);


            video.play();
        };
    })
}).catch(function(error) {
    console.error('Error: ', error);
});