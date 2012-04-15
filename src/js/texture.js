function loadTexture(filename) {
   var texture = gl.createTexture();
   gl.bindTexture(gl.TEXTURE_2D, texture);
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
   var image = new Image();

   image.onload = function() {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      //gl.texImage2D(gl.TEXTURE_2D, 0, image, true);
      gl.bindTexture(gl.TEXTURE_2D, null);
   }
   image.onerror = function() {
      alert("error while loading image '"+filename+"'.");
   }

   image.src = filename; 
   return texture;
}
