var gl;
var aspectRatio;
function setCanvasAndViewportSize() {
   canvas.width = window.innerWidth - 70;
   canvas.height = window.innerHeight - 20;
   gl.viewportWidth = canvas.width;
   gl.viewportHeight = canvas.height;
   aspectRatio = canvas.width/canvas.height;
}

function initGL(canvas) {
   try {
      gl = canvas.getContext("experimental-webgl",  { alpha: false });
      setCanvasAndViewportSize();
   } catch (e) {
   }
   if (!gl) {
      alert("Could not initialize WebGL, sorry :-(");
   }
}

var plainShader, textureShader, fontShader;

function initShaders() {
   plainShader = createProgram(
         "plain-shader-fs", 
         "plain-shader-vs", 
         {vertexPositionAttribute: "aVertexPosition"}, 
         {pMatrixUniform: "uPMatrix", mvMatrixUniform: "uMVMatrix"});

   textureShader = createProgram(
         "texture-shader-fs", 
         "texture-shader-vs", 
         {vertexPositionAttribute: "aVertexPosition", textureCoordAttribute: "aTextureCoord"}, 
         {pMatrixUniform: "uPMatrix", mvMatrixUniform: "uMVMatrix", uTexture: "uSampler"});

   fontShader = createProgram(
         "font-fs", 
         "font-vs", 
         {vertexPositionAttribute: "aVertexPosition", index: "index", color: "color"}, 
         {pMatrixUniform: "uPMatrix", mvMatrixUniform: "uMVMatrix", uTexture: "texture"});
}

var mvMatrix = mat4.create();
var pMatrix = mat4.create();

var triangle, square, texture, grid2d;
var charBuffer, colorBuffer;
function createScene() {
   triangle = new Triangle();
   square = new Square();
   //texture = loadTexture("../media/Monospaced.png");
   texture = createTextureFromCanvas(createFontCanvas(128, 128, "monospaced", 12));

   var width=200, height=10000;
   grid2d = new Grid2D(width, height);
   charBuffer = createRandomNumberBuffer(width*height, 0, 100);
   colorBuffer = createRandomNumberBuffer(width*height*3, 0, 1);
}

function createRandomNumberBuffer(count, min, max) {
   var buffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
   var chars = [];
   for(var i=0;i<count; i++) 
      chars[i] = min + Math.random() * max;
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(chars), gl.STATIC_DRAW);
   return buffer;
}

function drawScene() {
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

   mat4.identity(mvMatrix);
   mat4.translate(mvMatrix, [-5 * aspectRatio, -5, -15]);
   mat4.rotate(mvMatrix, new Date().getTime() / 1000, [0,0,1]);

   triangle.draw(plainShader, mvMatrix);

   gl.activeTexture(gl.TEXTURE0);
   gl.bindTexture(gl.TEXTURE_2D, texture);
   gl.uniform1i(textureShader.uTexture, 0);
   gl.uniform1i(fontShader.uTexture, 0);

   square.draw(textureShader, -3, -3, -10);

   gl.bindBuffer(gl.ARRAY_BUFFER, this.charBuffer);
   gl.vertexAttribPointer(fontShader.index, 1, gl.FLOAT, false, 0, 0);
   gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
   gl.vertexAttribPointer(fontShader.color, 3, gl.FLOAT, false, 0, 0);
   grid2d.draw(fontShader, -100, - s.getValue() , -150);      
}

var canvas;
function webGLStart() {
   canvas = document.getElementById("canvas");
   initGL(canvas);
   initShaders();      
   if(!square)
      createScene();

   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
   gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
   gl.enable(gl.BLEND);

   gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);  
   mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 200.0, pMatrix);

   window.setTimeout(drawScene, 100);
}

var scrollY = 9960;
