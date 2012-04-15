function getShader(gl, id) {
   var shaderScript = document.getElementById(id);
   if (!shaderScript) {
      return null;
   }

   var str = "";
   var k = shaderScript.firstChild;
   while (k) {
      if (k.nodeType == 3) {
         str += k.textContent;
      }
      k = k.nextSibling;
   }

   var shader;
   if (shaderScript.type == "x-shader/x-fragment") {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
   } else if (shaderScript.type == "x-shader/x-vertex") {
      shader = gl.createShader(gl.VERTEX_SHADER);
   } else {
      return null;
   }

   gl.shaderSource(shader, str);
   gl.compileShader(shader);

   if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(shader));
      return null;
   }

   return shader;
}

function createProgram(fsName, vsName, attributes, uniforms) {
   var shaderProgram;
   var fragmentShader = getShader(gl, fsName);
   var vertexShader = getShader(gl, vsName);

   shaderProgram = gl.createProgram();
   gl.attachShader(shaderProgram, vertexShader);
   gl.attachShader(shaderProgram, fragmentShader);
   gl.linkProgram(shaderProgram);

   if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Could not initialise shaders");
   }

   var vertexAttribArrayIndices = [];
   for (var attribute in attributes) {
      if(attributes.hasOwnProperty(attribute)) {
         shaderProgram[attribute] = gl.getAttribLocation(shaderProgram, attributes[attribute]);
         vertexAttribArrayIndices.push(shaderProgram[attribute]);
      }
   }

   for (var uniform in uniforms) {
      if(attributes.hasOwnProperty(attribute)) {
         shaderProgram[uniform] = gl.getUniformLocation(shaderProgram, uniforms[uniform]);
      }
   }
   shaderProgram.bind = function() {
      for(var i=0; i<vertexAttribArrayIndices.length; i++) {
         gl.enableVertexAttribArray(vertexAttribArrayIndices[i]); 
      }
      gl.useProgram(shaderProgram);
   }
   return shaderProgram;
}
