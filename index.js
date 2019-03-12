var currentModel = 'models/udnie';

var canvas = document.querySelector("#workspace"),
    context = canvas.getContext("2d"),
    width = canvas.width, height = canvas.height;

var image = new Image;

var svg = d3.select("svg");
var brush = d3.brush();
              // .on('start brush', brushed)
brush.on('end', brushEnd);
var brushX = 100;
var brushY = 100;

let style = ml5.styleTransfer(currentModel, image, loadedModel),
    // preview = document.querySelector("#preview"),
    modelReady = false

function uploadImage() {
  var filename = document.getElementById('selectImage').value;
  console.log(filename);

  if (filename) {
    var fr = new FileReader();
    fr.onload = function() {
      image.src = fr.result;
    }
    fr.readAsDataURL(document.getElementById('selectImage').files[0]);
  }

  image.onload = loadedImage;

}

function loadedImage() {
  context.drawImage(image, 0, 0, this.width, this.height,
                          0, 0, canvas.width, canvas.height);
  // console.log('drawing image');
  svg.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, [[brushX, brushY], [brushX, brushY]]);
}

function udnie() {
  console.log('Switch to Udnie style');
  currentModel = 'models/udnie';
  style = ml5.styleTransfer(currentModel, image, loadedModel),
      modelReady = false
}

function scream() {
  console.log('Switch to Scream style');
  currentModel = 'models/scream';
  style = ml5.styleTransfer(currentModel, image, loadedModel),
      modelReady = false
}

function wave() {
  console.log('Switch to Wave style');
  currentModel = 'models/wave';
  style = ml5.styleTransfer(currentModel, image, loadedModel),
    modelReady = false
}

function wreck() {
  console.log('Switch to Wreck style');
  currentModel = 'models/wreck';
  style = ml5.styleTransfer(currentModel, image, loadedModel),
    modelReady = false
}

function matta() {
  console.log('Switch to Matta style');
  currentModel = 'models/matta';
  style = ml5.styleTransfer(currentModel, image, loadedModel),
    modelReady = false
}

function matildePerez() {
  console.log('Switch to Matilde Perez style');
  currentModel = 'models/matilde_perez';
  style = ml5.styleTransfer(currentModel, image, loadedModel),
    modelReady = false
}

function mathura() {
  console.log('Switch to Mathura style');
  currentModel = 'models/mathura';
  style = ml5.styleTransfer(currentModel, image, loadedModel),
    modelReady = false
}

function laMuse() {
  console.log('Switch to La Muse style');
  currentModel = 'models/la_muse';
  style = ml5.styleTransfer(currentModel, image, loadedModel),
    modelReady = false
}

function rainPrincess() {
  console.log('Switch to Rain Princess style');
  currentModel = 'models/rain_princess';
  style = ml5.styleTransfer(currentModel, image, loadedModel),
    modelReady = false
}

function clearImage() {
  console.log('clear image');


  clearBrush();
}

function clearBrush() {
  d3.select('.brush').call(brush.move, null);
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
