var currentModel = 'models/udnie';

var canvas = document.querySelector("#workspace"),
    master = canvas.getContext("2d"),

    width = canvas.width, height = canvas.height,
    context = document.querySelector("#preview")
                      .getContext("2d")

var image = new Image;
image.src = "cat-cute.jpg"
image.onload = loadedImage

var svg = d3.select("svg");
var brush = d3.brush()
              .on('start brush', brushed)
              .on('end', brushEnd);
var brushX = 100;
var brushY = 100;

let style = ml5.styleTransfer(currentModel, image, loadedModel),
    // preview = document.querySelector("#preview"),
    modelReady = false

let STYLES = ['udnie', 'scream', 'wave',
              'wreck', 'matta', 'mathura',
              'la_muse'] // 'matilde_perez', 'rain_princess'

d3.select('#brushes')
  .selectAll('button')
  .data(STYLES)
  .enter()
    .append('button')
    .text((s) => s.replace('_', ' '))
    .attr('onclick', (s) => `setStyle('${s}')`)

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
  // FIXME: reshape canvas to upload
  master.drawImage(image, 0, 0, this.width, this.height)
                          // 0, 0, canvas.width, canvas.height);
  // console.log('drawing image');
  svg.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, [[brushX, brushY], [brushX, brushY]]);
}
function clearImage() {
  // WIP
  clearBrush();
  context.clearRect(0, 0, canvas.width, canvas.height)
}
function clearBrush() {
  d3.select('.brush').call(brush.move, null);
}

function setStyle(str) {
  currentModel = 'models/'+str
  style = ml5.styleTransfer(currentModel, image, loadedModel),
  modelReady = false
}


function loadedModel() {
  // style.video = image // way too big
  modelReady = true
}

function brushed() {
  // console.log(d3.event.selection)
}
async function brushEnd() {
  if (!modelReady) return

  let s = d3.event.selection
  if (!s) return // no selection

  let [[x0,y0],[x1,y1]] = s
  if (x0 == x1 || y0 == y1) return // selection of size zero

  brushX = x0, brushY = y0
  let image = master.getImageData(x0, y0, x1-x0, y1-y0)
    // FIXME: Rectangular images are returned with correct data,
    //        but transposed width and height. Cludged for now.

  // image.data is an array of integer triples

  // HACK: tf.fromPixels() accepts ImageData, but ml5 itself
  //       fails to pass the argument unless we make it a default.
  // style.video = image
  style.transfer(image, showTransfer)
}

function showTransfer(err, img) {
  // https://stackoverflow.com/questions/4773966/drawing-an-image-from-a-data-url-to-a-canvas
  // console.log(img.width, img.height)

  context.drawImage(img, brushX, brushY)
  // TODO: correctly dispose of preview

  // TODO: commit preview to master
}