// Create a canvas element
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

// Set the canvas size
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
});

console.log(window.devicePixelRatio, 2)

navigator.mediaDevices.getDisplayMedia({ video: true }).then(function(stream) {
    // var captureOptions = { format: 'png' };
    // chrome.tabCapture.getDisplayMedia({ video: true }).then(function(stream)  {
    var video = document.createElement('video');
    video.srcObject = stream;
    video.onloadedmetadata = function(e) {
        video.play();
        // ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    };

    document.addEventListener('keydown', function(event) {
        if (event.code === 'KeyS') {

            video.pause();
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            var imageData = canvas.toDataURL('image/png', 1);
            var link = document.createElement('a');
            link.download = 'MF-assets.png';
            link.href = imageData;
            link.click();

            video.play();
        };
    })
})



document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyQ') {
        // console.log('s')

        (async() => {
            console.log('Qs')
            const svgNS = "http://www.w3.org/2000/svg";
            const svg = document.createElementNS(svgNS, "svg");
            // const font_data = await fetchAsDataURL("https://fonts.gstatic.com/s/inter/v2/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2");
            const font_data = ('GT-Planar-Trial-VF.woff2');
            const style = document.createElementNS(svgNS, "style");
            style.textContent = `@font-face {
                        font-family: 'GTPlanar';
                        src: url(${ font_data }) format('woff2'); 
               }`;
            console.log(style)
                //         style.textContent = `@font-face {
                //     font-family: 'Inter';
                //     font-style: normal;
                //     font-weight: 200 900;
                //     src: url(${ font_data }) format('woff2'); 
                //   }`;
            svg.append(style);
            const foreignObject = document.createElementNS(svgNS, "foreignObject");
            foreignObject.setAttribute("x", 0);
            foreignObject.setAttribute("y", 0);

            // const target = document.querySelector("#mftest");
            const target = document.querySelector(".target");
            const clone = cloneWithStyles(target);
            foreignObject.append(clone);

            const { width, height } = target.getBoundingClientRect();
            foreignObject.setAttribute("width", width);
            foreignObject.setAttribute("height", height);
            svg.setAttribute("width", width);
            svg.setAttribute("height", height);

            svg.append(foreignObject);

            const svg_markup = new XMLSerializer().serializeToString(svg);
            const svg_file = new Blob([svg_markup], { type: "image/svg+xml" });

            const img = new Image();
            img.src = URL.createObjectURL(svg_file);
            await img.decode();
            URL.revokeObjectURL(img.src);

            const canvas = document.createElement("canvas");
            Object.assign(canvas, { width, height });
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            document.body.append(canvas);

        })().catch(console.error);


        function fetchAsDataURL(url) {
            return fetch(url)
                .then((resp) => resp.ok && resp.blob())
                .then((blob) => new Promise((res) => {
                    const reader = new FileReader();
                    reader.onload = (evt) => res(reader.result);
                    reader.readAsDataURL(blob);
                }));
        }

        function cloneWithStyles(source) {
            const clone = source.cloneNode(true);

            // to make the list of rules smaller we try to append the clone element in an iframe
            const iframe = document.createElement("iframe");
            document.body.append(iframe);
            // if we are in a sandboxed context it may be null
            if (iframe.contentDocument) {
                iframe.contentDocument.body.append(clone);
            }

            const source_walker = document.createTreeWalker(source, NodeFilter.SHOW_ELEMENT, null);
            const clone_walker = document.createTreeWalker(clone, NodeFilter.SHOW_ELEMENT, null);
            let source_element = source_walker.currentNode;
            let clone_element = clone_walker.currentNode;
            while (source_element) {

                const source_styles = getComputedStyle(source_element);
                const clone_styles = getComputedStyle(clone_element);

                // we should be able to simply do [ ...source_styles.forEach( (key) => ...
                // but thanks to https://crbug.com/1073573
                // we have to filter all the snake keys from enumerable properties...
                const keys = (() => {
                    // Start with a set to avoid duplicates
                    const props = new Set();
                    for (let prop in source_styles) {
                        // Undo camel case
                        prop = prop.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
                        // Fix vendor prefix
                        prop = prop.replace(/^webkit-/, "-webkit-");
                        props.add(prop);
                    }
                    return props;
                })();
                for (let key of keys) {
                    if (clone_styles[key] !== source_styles[key]) {
                        clone_element.style.setProperty(key, source_styles[key]);
                    }
                }

                source_element = source_walker.nextNode()
                clone_element = clone_walker.nextNode()

            }
            // clean up
            iframe.remove();

            return clone;

        }
    }
})