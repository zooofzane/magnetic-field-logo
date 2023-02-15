import './style.css'
import domtoimage from 'dom-to-image'
import html2canvas from 'html2canvas'
import p5 from 'p5'
import * as rasterizeHTML from 'rasterizehtml';

console.log(rasterizeHTML)
var w = window.innerWidth;
var h = window.innerHeight;


// var node = document.getElementById('body');
let sketch = function(p) {
    let canvas
    let a, testtext
    let myText, variable

    let font;
    let slant = 0;

    p.preload = function() {
        font = p.loadFont("GT-Planar-Trial-VF.ttf");
    }


    p.setup = function() {
        p.textFont(font);
        p.textSize(24);
        canvas = p.createCanvas(w, h);
        canvas.id('p5canvas')
        p.background(200);
        p.fill(255)
        p.rect(30, 20, 55, 155);
        document.getElementById('p5canvas').style.padding = '0px'
        a = new vtype()
        a.display()


        testtext = 'The';
        // for (let i = 0;i<testtextstr.length;i++){
        //   a = new vtype()
        //   a.display()
        // }
    };

    p.draw = function() {

        let fontString = font.name + " " + slant + " 24";
        p.textFont(fontString);
        p.text("Hello", w / 6, h / 6);
        slant += 0.01;
        if (slant > 1) {
            slant = 0;
        }
        // console.log(variable)
        // let rect = myText.elt.getBoundingClientRect();
        // variable.style('font-variation-settings', "'slnt' 20 ")
        // let 

        a.variate()
            // p.saveCanvas(canvas, 'myCanvas', 'jpg');
            // console.log(rect.left, rect.top, rect.right, rect.bottom);
    };

    document.addEventListener("keydown", (event) => {
        if (event.code === 'KeyS') {
            let p5canvas = document.getElementById('p5canvas')

            let textvfont = document.getElementById('test')
            let vfontinn = textvfont.innerHTML
            console.log(textvfont)
            console.log(p5canvas)
            console.log('q')

            rasterizeHTML.drawHTML(vfontinn, p5canvas);
            p.saveCanvas(canvas, 'myCanvas', 'jpg');
        }
    })

    class vtype {
        constructor() {
            this.x = w / 8;
            this.y = h / 2;
            this.slnt = 40;
            this.text = "MAGNETIC FIELD"
            this.e;
            this.id = 'test'
        }

        display() {
            p.fill(255, 0, 0);
            p.createP(this.text).id(this.id).position(this.x, this.y)
            this.e = p.select('#' + this.id)
        }

        variate() {
            this.e.style('font-variation-settings', "'slnt'" + this.slnt);
            // this.y += random(-5, 5);
        }
    }
};
new p5(sketch, document.getElementById('p5'))