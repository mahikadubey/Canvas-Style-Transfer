# Canvas-Style-Transfer
Brush-based interactive canvas for custom style transfer. We have two different modes of the application that can be loaded from each folder in this repository. 

## Magic Marker  
Canvas application that allows brush interactions to 'paint' on different styles.  
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
