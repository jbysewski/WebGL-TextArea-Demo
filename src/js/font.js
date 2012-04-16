function Font() {
   this.vertices = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, this.vertices);
   vertices = [
      -1.0, -1.0,  0.0,
       1.0, -1.0,  0.0,
      -1.0,  1.0,  0.0,
       1.0,  1.0,  0.0
         ];
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

   this.texCoordBuffer = [];
   for(var i=0; i<256; i++)
   {
      var x = (i % 16) / 16.0;
      var y = 0.9375 - (i / 16.0) / 16.0;

      this.texCoordBuffer[i] = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer[i]);
      var texCoords = [
         x,          1 - y,
         x + 0.0625, 1 - y,
         x,          1 - y - 0.0625,
         x + 0.0625, 1 - y - 0.0625
      ];
      console.log(x, y, texCoords);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
   }

   this.draw = function(shader, text, x, y) {
      shader.bind();
      
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertices);
      gl.vertexAttribPointer(shader.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
     
      for(var i=0; i<text.length; i++)
      {
         mat4.identity(mvMatrix);
         mat4.translate(mvMatrix, [x + (1.5*i), y, -30.0]);
         
         gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer[text.charCodeAt(i)]);
         gl.vertexAttribPointer(shader.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
      
         setShaderMatrixUniforms(shader, pMatrix, mvMatrix);
         gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
   }
}
