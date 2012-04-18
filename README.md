WebGL-TextArea-Demo
===================
This is a small demo project to get myself more familiar with JavaScript and
WebGL. 
[Live
View](http://jbysewski.github.com/WebGL-TextArea-Demo/src/html/index.html)

Details
-------
* In this demo a bitmap font texture is used for the font rendering. The texture
  contains rendered ASCII characters of an monospaced font.
  The individual characters are individually spaced, so the texture coordinates
  are calculated from the 16x16 grid represented by the positions.

* The font is monospaced because the individual sizes of each character are
  currently not taken into account, which makes non-monospaced fonts look arkward.

* As WebGL is based upon OpenGL ES some techniques which one would usually use
  are not available: GL_QUAD, DisplayLists, default rendering (shaders are
  mandatory).
