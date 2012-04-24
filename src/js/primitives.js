function setShaderMatrixUniforms(shader, pMatrix, mvMatrix) {
   gl.uniformMatrix4fv(shader.pMatrixUniform, false, pMatrix);
   gl.uniformMatrix4fv(shader.mvMatrixUniform, false, mvMatrix);
}


function Triangle() {
   this.triangleVertexPositionBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleVertexPositionBuffer);
   var vertices = [
       0.0,  1.0,  0.0,
      -1.0, -1.0,  0.0,
       1.0, -1.0,  0.0
         ];
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
   this.triangleVertexPositionBuffer.itemSize = 3;
   this.triangleVertexPositionBuffer.numItems = 3;
   this.draw = function(shader, mvMatrix) {
      shader.bind();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleVertexPositionBuffer);
      gl.vertexAttribPointer(shader.vertexPositionAttribute, this.triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
      setShaderMatrixUniforms(shader, pMatrix, mvMatrix);
      gl.drawArrays(gl.TRIANGLES, 0, this.triangleVertexPositionBuffer.numItems);
   }
}

function Square() {
   this.squareVertexPositionBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
   vertices = [
      -1.0, -1.0,  0.0,
       1.0, -1.0,  0.0,
      -1.0,  1.0,  0.0,
       1.0,  1.0,  0.0
         ];
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
   this.squareVertexPositionBuffer.itemSize = 3;
   this.squareVertexPositionBuffer.numItems = 4;

   this.squareTexCoordBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, this.squareTexCoordBuffer);
   var texCoords = [
      0.0, 1.0,
      1.0, 1.0,
      0.0, 0.0,
      1.0, 0.0
         ];
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
   this.squareTexCoordBuffer.itemSize = 2;
   this.squareTexCoordBuffer.numItems = 4;

   this.draw = function(shader, x, y, z) {
      shader.bind();
      mat4.identity(mvMatrix);
      mat4.translate(mvMatrix, [x, y, z]);
      
      gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
      gl.vertexAttribPointer(shader.vertexPositionAttribute, this.squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
      
      gl.bindBuffer(gl.ARRAY_BUFFER, this.squareTexCoordBuffer);
      gl.vertexAttribPointer(shader.textureCoordAttribute, this.squareTexCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
      
      setShaderMatrixUniforms(shader, pMatrix, mvMatrix);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.squareVertexPositionBuffer.numItems);
   }
}

function Grid2D(width, height) {
   this.vertexPositionBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
   
   var vertices = [];
   for(var y=0, i=0; y<height; y++) {
        for(var x=0; x<width; x++)
        {            
            vertices[i++] = x;
            vertices[i++] = y;
            vertices[i++] = 0.0;
        }
   }   
   
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
   this.vertexPositionBuffer.itemSize = 3;
   this.vertexPositionBuffer.numItems = vertices.length / 3;         
         
    this.draw = function(shader, x, y, z) {
      shader.bind();
      mat4.identity(mvMatrix);
      mat4.translate(mvMatrix, [x, y, z]);
      
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
      gl.vertexAttribPointer(shader.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);           
      setShaderMatrixUniforms(shader, pMatrix, mvMatrix);
      
      gl.drawArrays(gl.POINTS, 0, this.vertexPositionBuffer.numItems);
   }
}
