var canvas = document.querySelector("#workspace"),
    context = canvas.getContext("2d"),
    width = canvas.width, height = canvas.height;

var image = new Image;
image.src = "cat-cute.jpg";
image.onload = loadedImage;

var svg = d3.select("svg"),
    brush = d3.brush()
              // .on('start brush', brushed)
              .on('end', brushEnd),
    brushX = 100, brushY = 100 

let style = ml5.styleTransfer('models/udnie', image, loadedModel),
    // preview = document.querySelector("#preview"),
    modelReady = false

function loadedImage() {
  context.drawImage(image, 0, 0, this.width, this.height,
                          0, 0, canvas.width, canvas.height);
  // console.log('drawing image');
  svg.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, [[brushX, brushY], [brushX+20, brushY+20]]);
}
function loadedModel() {
  // console.log(style)
  // style.video = image // way too big
  modelReady = true
}

async function brushEnd() {
  if (!modelReady) return

  let s = d3.event.selection
  if (!s) return // no selection
  
  let [[x0,y0],[x1,y1]] = s
  if (x0 == x1 || y0 == y1) return // selection of size zero
  
  brushX = x0, brushY = y0
  let image = context.getImageData(x0, y0, x1-x0, x1-x0) // y1-y0 
    // FIXME: Rectangular images are returned with correct data,
    //        but transposed width and height. Cludged for now.

  // image.data is an array of integer triples

  // HACK: tf.fromPixels() accepts ImageData, but ml5 itself
  //       fails to pass the argument unless we make it a default.
  style.video = image
  style.transfer(showTransfer)
}

function showTransfer(err, img) {
  // https://stackoverflow.com/questions/4773966/drawing-an-image-from-a-data-url-to-a-canvas
  console.log(img)
  let swap = img.width; img.width = img.height; img.height = swap
  console.log(img)

  context.drawImage(img, brushX, brushY)
  // TODO: correctly offset & dispose of preview
}

// TODO: applyTransfer() to pixel data.