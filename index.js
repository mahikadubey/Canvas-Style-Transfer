var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height;

var brush = d3.brush();

var svg = d3.select("svg");

var image = new Image;
image.src = "cat-cute.jpg";
image.onload = loaded;

function loaded() {

  context.drawImage(this, 0, 0, this.width, this.height, 0, 0, canvas.width, canvas.height);

  console.log('drawing image');

  svg.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, [[0, 0], [0, 0]]);
}
