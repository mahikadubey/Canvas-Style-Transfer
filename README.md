# Canvas-Style-Transfer
Brush-based interactive canvas for custom style transfer. We have two different modes of the application that can be loaded from each folder in this repository. Our style transfer applications use pre-trained models from ml5.js in novel ways, giving users a new way to creatively interact with images of their choice, and eliciting new thoughts on the process of art creation.

## Magic Marker  
Canvas application that allows brush interactions to 'paint' on different styles. The image below shows the intial state of the application upon opening. Our default image of a cat is scaled to ensure that browser is able to handle style transformation of the entire image.

![](screenshot-magic-marker.png)

Select a brush to switch to the relevant style, and wait a few seconds for the cursor to change from an arrow to a '+' shape. This indicates that the brush is ready to be used for applying style to the image. Rectangle shaped selections can be made on the canvas, and dragged around or reshaped as needed. When happy with the painted section, click the 'Apply Brush' button to fix the changes to the image. Then, a new brush may be selected, or a new section may be painted over with the existing brush. Use the 'Clear Brush' button to remove any un-applied 'paint.' 

### Results - Images and Video Demo   
Below is a series of examples showing different multi-styled paintings of the cute cat image. We also have attached a video demonstrating the usage of the magic marker implementation. 

![](screenshot-magic-marker-paintings.png)

### Technical Details
This application uses scaled down images to avoid crashing the browser (images smaller than 2400 by 2400 pixels work best as we scale down by a factor of 3). Upon selection of a brush, a hidden canvas is processed using the entire image as the content for the selected style. Brush interactions effectively remove pixels from the top canvas to reveal the transformed image content in the 'painted' areas, such that the top canvas layer acts like a mask to the styled image on the canvas below. The 'Apply Brush' button combines the result of the masked style canvas image, and 'flattens' the canvases to reset the underlying image content. If changes have not been applied, the 'Clear Brush' button resets the top canvas layer by reversing the pixel removal. 

### How to run
- Move into the `Magic-Marker/` directory 
- Run a local server using `python -m http.server` (if using Python 2, use the command `python -m SimpleHTTPServer` instead)
- Open http://localhost:8000 in a browser  

## Patch Patterns
Canvas application that uses real time transfer of selected sections of an image to layer on patches of style.  
### How to run
- Move into the `Patch-Patterning` directory
- Run a local server using `python -m http.server` (if using Python 2, use `python -m SimpleHTTPServer` instead)
- Open http://localhost:8000 in a browser 
