import './style.css'
import domtoimage from 'dom-to-image'
import html2canvas from 'html2canvas'
import p5 from 'p5'

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
        p.rect(30, 20, 55, 55);
        // myText = p.createP("This is a sample text");
        // myText.id('test')
        // variable = p.select('#test');
        // myText.style("GTPlanar");
        // myText.position(0, 0)
        document.getElementById('p5canvas').style.padding = '0px'
            // document.getElementById('p5canvas').style.border = '0px'


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
        p.text("Hello", w / 2, h / 2);
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
            p.saveCanvas(canvas, 'myCanvas', 'jpg');
        }
    })

    class vtype {
        constructor() {
            this.x = w / 2;
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
console.log(w, h)