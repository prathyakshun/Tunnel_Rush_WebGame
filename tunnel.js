var positions = new Array(96*87);
var lastZ = -3.5*87;
var upspeed = 0;
var y_pos = 1.4; 
var texture_tunnel_coordinates = new Array(64*87);
var normals_tunnel_coordinates = new Array(96*87);


function initBuffers(gl) {

  // Create a buffer for the cube's vertex positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the cube.

  var vcount = 0;
  var side = 4/Math.sqrt(3);
  for (var i=0;i<87;i++)
  {
    positions[vcount++] = -side*Math.sin(Math.PI/180*22.5); positions[vcount++] = side*Math.cos(Math.PI/180*22.5);  positions[vcount++] = -3.5*i-0;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+45));    positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+45)); positions[vcount++] = -3.5*i-0;
    positions[vcount++] = -side*Math.sin(Math.PI/180*22.5); positions[vcount++] = side*Math.cos(Math.PI/180*22.5);  positions[vcount++] = -3.5*i-3.5;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+45));    positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+45)); positions[vcount++] = -3.5*i-3.5;

    // Left
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+45)); positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+45));  positions[vcount++] = -3.5*i-0;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+90));    positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+90)); positions[vcount++] = -3.5*i-0;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+45)); positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+45));  positions[vcount++] = -3.5*i-3.5;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+90));    positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+90)); positions[vcount++] = -3.5*i-3.5;
    // Bottom Left
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+90)); positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+90));  positions[vcount++] =  -3.5*i-0;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+135));    positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+135)); positions[vcount++] = -3.5*i-0;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+90)); positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+90));  positions[vcount++] = -3.5*i-3.5;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+135));    positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+135)); positions[vcount++] = -3.5*i-3.5;

    // Bottom
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+135)); positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+135));  positions[vcount++] = -3.5*i-0;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+180));    positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+180)); positions[vcount++] = -3.5*i-0;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+135)); positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+135));  positions[vcount++] = -3.5*i-3.5;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+180));    positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+180)); positions[vcount++] = -3.5*i-3.5;

    // Bottom Right
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+180)); positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+180));  positions[vcount++] = -3.5*i-0;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+225));    positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+225)); positions[vcount++] = -3.5*i-0;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+180)); positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+180));  positions[vcount++] = -3.5*i-3.5;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+225));    positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+225)); positions[vcount++] = -3.5*i-3.5;

    // Right
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+225)); positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+225));  positions[vcount++] = -3.5*i-0;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+270));    positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+270)); positions[vcount++] = -3.5*i-0;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+225)); positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+225));  positions[vcount++] = -3.5*i-3.5;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+270));    positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+270)); positions[vcount++] = -3.5*i-3.5;

    // Top Right
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+270)); positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+270));  positions[vcount++] = -3.5*i-0;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+315));    positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+315)); positions[vcount++] = -3.5*i-0;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+270)); positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+270));  positions[vcount++] = -3.5*i-3.5;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+315));    positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+315)); positions[vcount++] = -3.5*i-3.5;

    // Top
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+315)); positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+315));  positions[vcount++] = -3.5*i-0;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+360));    positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+360)); positions[vcount++] = -3.5*i-0;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+315)); positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+315));  positions[vcount++] = -3.5*i-3.5;
    positions[vcount++] = -side*Math.sin(Math.PI/180*(22.5+360));    positions[vcount++] = side*Math.cos(Math.PI/180*(22.5+360)); positions[vcount++] = -3.5*i-3.5;
  }
  console.log("initial");
  console.log(positions);
  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  vcount = 0;
  for (var i=0;i<87;i++)
  {

    normals_tunnel_coordinates[vcount++] = 1; normals_tunnel_coordinates[vcount++] = -1;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = 1; normals_tunnel_coordinates[vcount++] = -1;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = 1; normals_tunnel_coordinates[vcount++] = -1;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = 1; normals_tunnel_coordinates[vcount++] = -1;  normals_tunnel_coordinates[vcount++] = 0;

    normals_tunnel_coordinates[vcount++] = 1; normals_tunnel_coordinates[vcount++] = 0;  normals_tunnel_coordinates[vcount++] =  0;
    normals_tunnel_coordinates[vcount++] = 1; normals_tunnel_coordinates[vcount++] = 0;  normals_tunnel_coordinates[vcount++] =  0;
    normals_tunnel_coordinates[vcount++] = 1; normals_tunnel_coordinates[vcount++] = 0;  normals_tunnel_coordinates[vcount++] =  0;
    normals_tunnel_coordinates[vcount++] = 1; normals_tunnel_coordinates[vcount++] = 0;  normals_tunnel_coordinates[vcount++] =  0;

    normals_tunnel_coordinates[vcount++] = 1; normals_tunnel_coordinates[vcount++] = 1;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = 1; normals_tunnel_coordinates[vcount++] = 1;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = 1; normals_tunnel_coordinates[vcount++] = 1;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = 1; normals_tunnel_coordinates[vcount++] = 1;  normals_tunnel_coordinates[vcount++] = 0;
    
    normals_tunnel_coordinates[vcount++] = 0; normals_tunnel_coordinates[vcount++] = 1;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = 0; normals_tunnel_coordinates[vcount++] = 1;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = 0; normals_tunnel_coordinates[vcount++] = 1;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = 0; normals_tunnel_coordinates[vcount++] = 1;  normals_tunnel_coordinates[vcount++] = 0;

    normals_tunnel_coordinates[vcount++] = -1; normals_tunnel_coordinates[vcount++] = 1;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = -1; normals_tunnel_coordinates[vcount++] = 1;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = -1; normals_tunnel_coordinates[vcount++] = 1;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = -1; normals_tunnel_coordinates[vcount++] = 1;  normals_tunnel_coordinates[vcount++] = 0;
    
    normals_tunnel_coordinates[vcount++] = -1; normals_tunnel_coordinates[vcount++] = 0;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = -1; normals_tunnel_coordinates[vcount++] = 0;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = -1; normals_tunnel_coordinates[vcount++] = 0;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = -1; normals_tunnel_coordinates[vcount++] = 0;  normals_tunnel_coordinates[vcount++] = 0;

    normals_tunnel_coordinates[vcount++] = -1; normals_tunnel_coordinates[vcount++] = -1;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = -1; normals_tunnel_coordinates[vcount++] = -1;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = -1; normals_tunnel_coordinates[vcount++] = -1;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = -1; normals_tunnel_coordinates[vcount++] = -1;  normals_tunnel_coordinates[vcount++] = 0;

    normals_tunnel_coordinates[vcount++] = 0; normals_tunnel_coordinates[vcount++] = -1;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = 0; normals_tunnel_coordinates[vcount++] = -1;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = 0; normals_tunnel_coordinates[vcount++] = -1;  normals_tunnel_coordinates[vcount++] = 0;
    normals_tunnel_coordinates[vcount++] = 0; normals_tunnel_coordinates[vcount++] = -1;  normals_tunnel_coordinates[vcount++] = 0;
    
  }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals_tunnel_coordinates),gl.STATIC_DRAW);


  // var ncount = 0;
  //   vertexNormals = [
  //    0.0,  -1.0,  0.0,
  //    0.0,  -1.0,  0.0,
  //    0.0,  -1.0,  0.0,
  //    0.0,  -1.0,  0.0,

  //    1,  -1, 0,
  //    1,  -1, 0,
  //    1,  -1, 0,
  //    1,  -1, 0,

  //     1,  0,  0.0,
  //     1,  0,  0.0,
  //     1,  0,  0.0,
  //     1,  0,  0.0,

  //    1.0, 1.0,  0.0,
  //    1.0, 1.0,  0.0,
  //    1.0, 1.0,  0.0,
  //    1.0, 1.0,  0.0,

  //    0.0, 1.0,  0.0,
  //    0.0, 1.0,  0.0,
  //    0.0, 1.0,  0.0,
  //    0.0, 1.0,  0.0,

  //    -1.0, 1.0,  0.0,
  //    -1.0, 1.0,  0.0,
  //    -1.0, 1.0,  0.0,
  //    -1.0, 1.0,  0.0,

  //    -1.0,  0.0,  0.0,
  //    -1.0,  0.0,  0.0,
  //    -1.0,  0.0,  0.0,
  //    -1.0,  0.0,  0.0,

  //   -1.0,  -1.0,  0.0,
  //   -1.0,  -1.0,  0.0,
  //   -1.0,  -1.0,  0.0,
  //   -1.0,  -1.0,  0.0
  // ];
  // for (j=0;j<87;j++)
  // {
  //   for (i=0;i<96;i++)  
  //   {
  //     vertexNormals_tunnel[ncount++] = vertexNormals[i];
  //   }
  // }
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals_tunnel),
  // gl.STATIC_DRAW);
  
  // Texture coordinates
  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

  var tcount=0;
  for (i=0;i<87;i++)
  {
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=1.0;
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=1.0;
    // Back
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=1.0;
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=1.0;
    // Top
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=1.0;
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=1.0;
    // Bottom
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=1.0;
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=1.0;
    // Right
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=1.0;
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=1.0;
    // Left
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=1.0;
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=1.0;

    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=1.0;
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=1.0;
    // Back
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=1.0;
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=1.0;
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texture_tunnel_coordinates),
  gl.STATIC_DRAW);
  // Now set up the colors for the faces. We'll use solid colors
  // for each face.

  var ccount = 0;
  var faceColors = [];
  for (var i=0;i<87;i++)
  {
    var ccount = 0; var faceColors1 = new Array(3);
    faceColors1[ccount++] = 0.0; faceColors1[ccount++] = 1.0; faceColors1[ccount++] = 0.0; faceColors1[ccount++] = 1.0;    // Top face: green

    var ccount = 0; var faceColors2 = new Array(3);
    faceColors2[ccount++] = 0.662745; faceColors2[ccount++] = 0.662745; faceColors2[ccount++] = 0.662745, faceColors2[ccount++] = 1.0;    // Back face: grey

    var ccount = 0; var faceColors3 = new Array(3);
    faceColors3[ccount++] = 1.0; faceColors3[ccount++] = 0.647059; faceColors3[ccount++] = 0.0; faceColors3[ccount++] = 1.0; // Left face: orange

    var ccount = 0; var faceColors4 = new Array(3);
    faceColors4[ccount++] = 0.0; faceColors4[ccount++] = 0.0; faceColors4[ccount++] =1.0; faceColors4[ccount++] = 1.0;    // Bottom face: blue

    var ccount = 0; var faceColors5 = new Array(3);
    faceColors5[ccount++] = 1.0; faceColors5[ccount++] = 1.0;  faceColors5[ccount++] = 0.0;  faceColors5[ccount++] = 1.0;    // Right face: yellow

    var ccount = 0; var faceColors6 = new Array(3);
    faceColors6[ccount++] = 1.0; faceColors6[ccount++] = 0.0;  faceColors6[ccount++] = 1.0;  faceColors6[ccount++] = 1.0;    // Left face: purple

    var ccount = 0; var faceColors7 = new Array(3);
    faceColors7[ccount++] = 1; faceColors7[ccount++] = 0.388235; faceColors7[ccount++] = 0.278431; faceColors7[ccount++] = 1.0;    // Front face: tomato

    var ccount = 0; var faceColors8 = new Array(3);
    faceColors8[ccount++] = 0.956863; faceColors8[ccount++] = 0.643137; faceColors8[ccount++] = 0.376471; faceColors8[ccount++] = 1.0;    // Left face: sandy brown
    
    if (i%8 == 0) {faceColors.push(faceColors1);  faceColors.push(faceColors2); faceColors.push(faceColors3); faceColors.push(faceColors4); faceColors.push(faceColors5); faceColors.push(faceColors6); faceColors.push(faceColors7); faceColors.push(faceColors8);}
    if (i%8 == 1) {faceColors.push(faceColors4);  faceColors.push(faceColors5); faceColors.push(faceColors6); faceColors.push(faceColors7); faceColors.push(faceColors8); faceColors.push(faceColors1); faceColors.push(faceColors2); faceColors.push(faceColors3);}
    if (i%8 == 2) {faceColors.push(faceColors7);  faceColors.push(faceColors8); faceColors.push(faceColors1); faceColors.push(faceColors2); faceColors.push(faceColors3); faceColors.push(faceColors4); faceColors.push(faceColors5); faceColors.push(faceColors6);}
    if (i%8 == 3) {faceColors.push(faceColors2);  faceColors.push(faceColors3); faceColors.push(faceColors4); faceColors.push(faceColors5); faceColors.push(faceColors6); faceColors.push(faceColors7); faceColors.push(faceColors8); faceColors.push(faceColors1);}
    if (i%8 == 4) {faceColors.push(faceColors5);  faceColors.push(faceColors6); faceColors.push(faceColors7); faceColors.push(faceColors8); faceColors.push(faceColors1); faceColors.push(faceColors2); faceColors.push(faceColors3); faceColors.push(faceColors4);}
    if (i%8 == 5) {faceColors.push(faceColors8);  faceColors.push(faceColors1); faceColors.push(faceColors2); faceColors.push(faceColors3); faceColors.push(faceColors4); faceColors.push(faceColors5); faceColors.push(faceColors6); faceColors.push(faceColors7);}
    if (i%8 == 6) {faceColors.push(faceColors3);  faceColors.push(faceColors4); faceColors.push(faceColors5); faceColors.push(faceColors6); faceColors.push(faceColors7); faceColors.push(faceColors8); faceColors.push(faceColors1); faceColors.push(faceColors2);}
    if (i%8 == 7) {faceColors.push(faceColors6);  faceColors.push(faceColors7); faceColors.push(faceColors8); faceColors.push(faceColors1); faceColors.push(faceColors2); faceColors.push(faceColors3); faceColors.push(faceColors4); faceColors.push(faceColors5);}
  }

  // Convert the array of colors into a table for all the vertices.

  var colors = [];

  for (var j = 0; j < faceColors.length; ++j) {
    const c = faceColors[j];

    // Repeat each color four times for the four vertices of the face
    colors = colors.concat(c, c, c, c);
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  // Build the element array buffer; this specifies the indices
  // into the vertex arrays for each face's vertices.

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.

  // INDICES ARRAY
  var icount = 0;
  indices = new Uint16Array(48*87);
  for (var i=0;i<48*87;i+=4)
  {
    indices[icount++] = i;  indices[icount++] = i+1; indices[icount++] = i+2;      
    indices[icount++] = i+1;  indices[icount++] = i+2; indices[icount++] = i+3;    // top left
  }

  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    normal: normalBuffer,
    textureCoord: textureCoordBuffer,
    color: colorBuffer,
    indices: indexBuffer,
  };
}

function changeBuffers(gl, pushout){
  // Create a buffer for the cube's vertex positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the cube.

  positions = positions.slice(96, 96*87);
  var side = 4/Math.sqrt(3);
    // Top Left
    positions.push(-side*Math.sin(Math.PI/180*22.5)); positions.push(side*Math.cos(Math.PI/180*22.5));  positions.push(lastZ);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+45)));    positions.push(side*Math.cos(Math.PI/180*(22.5+45))); positions.push(lastZ);
    positions.push(-side*Math.sin(Math.PI/180*22.5)); positions.push(side*Math.cos(Math.PI/180*22.5));  positions.push(lastZ-3.5);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+45)));    positions.push(side*Math.cos(Math.PI/180*(22.5+45))); positions.push(lastZ-3.5);

    // Left
    positions.push(-side*Math.sin(Math.PI/180*(22.5+45))); positions.push(side*Math.cos(Math.PI/180*(22.5+45)));  positions.push(lastZ);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+90)));    positions.push(side*Math.cos(Math.PI/180*(22.5+90))); positions.push(lastZ);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+45))); positions.push(side*Math.cos(Math.PI/180*(22.5+45)));  positions.push(lastZ-3.5);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+90)));    positions.push(side*Math.cos(Math.PI/180*(22.5+90))); positions.push(lastZ-3.5);
    // Bottom Left
    positions.push(-side*Math.sin(Math.PI/180*(22.5+90))); positions.push(side*Math.cos(Math.PI/180*(22.5+90)));  positions.push(lastZ);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+135)));    positions.push(side*Math.cos(Math.PI/180*(22.5+135))); positions.push(lastZ);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+90))); positions.push(side*Math.cos(Math.PI/180*(22.5+90)));  positions.push(lastZ-3.5);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+135)));    positions.push(side*Math.cos(Math.PI/180*(22.5+135))); positions.push(lastZ-3.5);

    // Bottom
    positions.push(-side*Math.sin(Math.PI/180*(22.5+135))); positions.push(side*Math.cos(Math.PI/180*(22.5+135)));  positions.push(lastZ);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+180)));    positions.push(side*Math.cos(Math.PI/180*(22.5+180))); positions.push(lastZ);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+135))); positions.push(side*Math.cos(Math.PI/180*(22.5+135)));  positions.push(lastZ-3.5);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+180)));    positions.push(side*Math.cos(Math.PI/180*(22.5+180))); positions.push(lastZ-3.5);

    // Bottom Right
    positions.push(-side*Math.sin(Math.PI/180*(22.5+180))); positions.push(side*Math.cos(Math.PI/180*(22.5+180)));  positions.push(lastZ);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+225)));    positions.push(side*Math.cos(Math.PI/180*(22.5+225))); positions.push(lastZ);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+180))); positions.push(side*Math.cos(Math.PI/180*(22.5+180)));  positions.push(lastZ-3.5);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+225)));    positions.push(side*Math.cos(Math.PI/180*(22.5+225))); positions.push(lastZ-3.5);

    // Right
    positions.push(-side*Math.sin(Math.PI/180*(22.5+225))); positions.push(side*Math.cos(Math.PI/180*(22.5+225)));  positions.push(lastZ);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+270)));    positions.push(side*Math.cos(Math.PI/180*(22.5+270))); positions.push(lastZ);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+225))); positions.push(side*Math.cos(Math.PI/180*(22.5+225)));  positions.push(lastZ-3.5);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+270)));    positions.push(side*Math.cos(Math.PI/180*(22.5+270))); positions.push(lastZ-3.5);

    // Top Right
    positions.push(-side*Math.sin(Math.PI/180*(22.5+270))); positions.push(side*Math.cos(Math.PI/180*(22.5+270)));  positions.push(lastZ);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+315)));    positions.push(side*Math.cos(Math.PI/180*(22.5+315))); positions.push(lastZ);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+270))); positions.push(side*Math.cos(Math.PI/180*(22.5+270)));  positions.push(lastZ-3.5);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+315)));    positions.push(side*Math.cos(Math.PI/180*(22.5+315))); positions.push(lastZ-3.5);

    // Top
    positions.push(-side*Math.sin(Math.PI/180*(22.5+315))); positions.push(side*Math.cos(Math.PI/180*(22.5+315)));  positions.push(lastZ);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+360)));    positions.push(side*Math.cos(Math.PI/180*(22.5+360))); positions.push(lastZ);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+315))); positions.push(side*Math.cos(Math.PI/180*(22.5+315)));  positions.push(lastZ-3.5);
    positions.push(-side*Math.sin(Math.PI/180*(22.5+360)));    positions.push(side*Math.cos(Math.PI/180*(22.5+360))); positions.push(lastZ-3.5);
    lastZ = lastZ - 3.5;
  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals_tunnel_coordinates),gl.STATIC_DRAW);


    // Texture coordinates
  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

  tcount=0;
  for (i=0;i<87;i++)
  {
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=1.0;
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=1.0;
    // Back
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=1.0;
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=1.0;
    // Top
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=1.0;
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=1.0;
    // Bottom
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=1.0;
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=1.0;
    // Right
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=1.0;
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=1.0;
    // Left
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=1.0;
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=1.0;

  texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=1.0;
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=1.0;
    // Back
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=0.0;
    texture_tunnel_coordinates[tcount++]=1.0;  texture_tunnel_coordinates[tcount++]=1.0;
    texture_tunnel_coordinates[tcount++]=0.0;  texture_tunnel_coordinates[tcount++]=1.0;
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texture_tunnel_coordinates),
  gl.STATIC_DRAW);

  // Now set up the colors for the faces. We'll use solid colors
  // for each face.

  var ccount = 0;
  var faceColors = [];
  var faceColorshelp = [];
  for (var i=0;i<87;i++)
  {
    if (bw == 0)
    {
    var ccount = 0; var faceColors1 = new Array(3);
    faceColors1[ccount++] = 0.0; faceColors1[ccount++] = 1.0; faceColors1[ccount++] = 0.0; faceColors1[ccount++] = 1.0;    // Top face: green

    var ccount = 0; var faceColors2 = new Array(3);
    faceColors2[ccount++] = 0.662745; faceColors2[ccount++] = 0.662745; faceColors2[ccount++] = 0.662745, faceColors2[ccount++] = 1.0;    // Back face: grey

    var ccount = 0; var faceColors3 = new Array(3);
    faceColors3[ccount++] = 1.0; faceColors3[ccount++] = 0.647059; faceColors3[ccount++] = 0.0; faceColors3[ccount++] = 1.0; // Left face: orange

    var ccount = 0; var faceColors4 = new Array(3);
    faceColors4[ccount++] = 0.0; faceColors4[ccount++] = 0.0; faceColors4[ccount++] =1.0; faceColors4[ccount++] = 1.0;    // Bottom face: blue

    var ccount = 0; var faceColors5 = new Array(3);
    faceColors5[ccount++] = 1.0; faceColors5[ccount++] = 1.0;  faceColors5[ccount++] = 0.0;  faceColors5[ccount++] = 1.0;    // Right face: yellow

    var ccount = 0; var faceColors6 = new Array(3);
    faceColors6[ccount++] = 1.0; faceColors6[ccount++] = 0.0;  faceColors6[ccount++] = 1.0;  faceColors6[ccount++] = 1.0;    // Left face: purple

    var ccount = 0; var faceColors7 = new Array(3);
    faceColors7[ccount++] = 1; faceColors7[ccount++] = 0.388235; faceColors7[ccount++] = 0.278431; faceColors7[ccount++] = 1.0;    // Front face: tomato

    var ccount = 0; var faceColors8 = new Array(3);
    faceColors8[ccount++] = 0.956863; faceColors8[ccount++] = 0.643137; faceColors8[ccount++] = 0.376471; faceColors8[ccount++] = 1.0;    // Left face: sandy brown
    }
    else
    {
    var ccount = 0; var faceColors1 = new Array(3);
    faceColors1[ccount++] = 0.0; faceColors1[ccount++] = 0.0; faceColors1[ccount++] = 0.0; faceColors1[ccount++] = 1.0;    // Top face: green

    var ccount = 0; var faceColors2 = new Array(3);
    faceColors2[ccount++] = 1; faceColors2[ccount++] = 1; faceColors2[ccount++] = 1, faceColors2[ccount++] = 1.0;    // Back face: grey

    var ccount = 0; var faceColors3 = new Array(3);
    faceColors3[ccount++] = 0; faceColors3[ccount++] = 0; faceColors3[ccount++] = 0; faceColors3[ccount++] = 1.0; // Left face: orange

    var ccount = 0; var faceColors4 = new Array(3);
    faceColors4[ccount++] = 1; faceColors4[ccount++] = 1; faceColors4[ccount++] =1.0; faceColors4[ccount++] = 1.0;    // Bottom face: blue

    var ccount = 0; var faceColors5 = new Array(3);
    faceColors5[ccount++] = 0; faceColors5[ccount++] = 0;  faceColors5[ccount++] = 0.0;  faceColors5[ccount++] = 1.0;    // Right face: yellow

    var ccount = 0; var faceColors6 = new Array(3);
    faceColors6[ccount++] = 1.0; faceColors6[ccount++] = 1.0;  faceColors6[ccount++] = 1.0;  faceColors6[ccount++] = 1.0;    // Left face: purple

    var ccount = 0; var faceColors7 = new Array(3);
    faceColors7[ccount++] = 0; faceColors7[ccount++] = 0; faceColors7[ccount++] = 0; faceColors7[ccount++] = 1.0;    // Front face: tomato

    var ccount = 0; var faceColors8 = new Array(3);
    faceColors8[ccount++] = 1; faceColors8[ccount++] = 1; faceColors8[ccount++] = 1; faceColors8[ccount++] = 1.0;    // Left face: sandy brown      
    }
    faceColorshelp.push(faceColors1);  faceColorshelp.push(faceColors2);  faceColorshelp.push(faceColors3);  faceColorshelp.push(faceColors4);  faceColorshelp.push(faceColors5);  faceColorshelp.push(faceColors6);  faceColorshelp.push(faceColors7);  faceColorshelp.push(faceColors8);
    if (i%8 == 0) {faceColors.push(faceColorshelp[((pushout-1)*3+0)%8]);  faceColors.push(faceColorshelp[((pushout-1)*3+1)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+2)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+3)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+4)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+5)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+6)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+7)%8]);}
    if (i%8 == 1) {faceColors.push(faceColorshelp[((pushout-1)*3+3)%8]);  faceColors.push(faceColorshelp[((pushout-1)*3+4)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+5)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+6)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+7)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+0)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+1)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+2)%8]);}
    if (i%8 == 2) {faceColors.push(faceColorshelp[((pushout-1)*3+6)%8]);  faceColors.push(faceColorshelp[((pushout-1)*3+7)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+0)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+1)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+2)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+3)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+4)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+5)%8]);}
    if (i%8 == 3) {faceColors.push(faceColorshelp[((pushout-1)*3+1)%8]);  faceColors.push(faceColorshelp[((pushout-1)*3+2)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+3)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+4)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+5)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+6)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+7)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+0)%8]);}
    if (i%8 == 4) {faceColors.push(faceColorshelp[((pushout-1)*3+4)%8]);  faceColors.push(faceColorshelp[((pushout-1)*3+5)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+6)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+7)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+0)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+1)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+2)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+3)%8]);}
    if (i%8 == 5) {faceColors.push(faceColorshelp[((pushout-1)*3+7)%8]);  faceColors.push(faceColorshelp[((pushout-1)*3+0)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+1)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+2)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+3)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+4)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+5)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+6)%8]);}
    if (i%8 == 6) {faceColors.push(faceColorshelp[((pushout-1)*3+2)%8]);  faceColors.push(faceColorshelp[((pushout-1)*3+3)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+4)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+5)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+6)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+7)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+0)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+1)%8]);}
    if (i%8 == 7) {faceColors.push(faceColorshelp[((pushout-1)*3+5)%8]);  faceColors.push(faceColorshelp[((pushout-1)*3+6)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+7)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+0)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+1)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+2)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+3)%8]); faceColors.push(faceColorshelp[((pushout-1)*3+4)%8]);}
  }

  // Convert the array of colors into a table for all the vertices.

  var colors = [];

  for (var j = 0; j < faceColors.length; ++j) {
    const c = faceColors[j];

    // Repeat each color four times for the four vertices of the face
    colors = colors.concat(c, c, c, c);
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  // Build the element array buffer; this specifies the indices
  // into the vertex arrays for each face's vertices.

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.

  // INDICES ARRAY
  var icount = 0;
  indices = new Uint16Array(48*87);
  for (var i=0;i<48*87;i+=4)
  {
    indices[icount++] = i;  indices[icount++] = i+1; indices[icount++] = i+2;      
    indices[icount++] = i+1;  indices[icount++] = i+2; indices[icount++] = i+3;    // top left
  }

  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    normal: normalBuffer,
  textureCoord: textureCoordBuffer,    
  color: colorBuffer,
    indices: indexBuffer,
  };
}

//
// Draw the scene.
//
function drawScene(gl, programInfo, buffers, deltaTime, now, ticktile, texture) {

  Mousetrap.bind('a', function () {cubeRotation += 0.1;})

  Mousetrap.bind('d', function () {cubeRotation -= 0.1;})

  Mousetrap.bind('space', function () {if (upspeed == 0)  upspeed = 0.15; sound_obj = document.getElementById("jump_id"); sound_obj.play();})
  



  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  y_pos -= upspeed;
  upspeed -= 0.004;
  if (y_pos >= 1.4) {y_pos= 1.4;  upspeed = 0;}

  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [-0.0, y_pos, -2.0+ticktile+speed_factor]);  // amount to translate

  mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              cubeRotation,     // amount to rotate in radians
              [0, 0, 1]);       // axis to rotate around (Z)
  // mat4.rotate(modelViewMatrix,  // destination matrix
  //             modelViewMatrix,  // matrix to rotate
  //             cubeRotation * .7,// amount to rotate in radians
  //             [0, 1, 0]);       // axis to rotate around (X)

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute

  const normalMatrix = mat4.create();
  mat4.invert(normalMatrix, modelViewMatrix);
  mat4.transpose(normalMatrix, normalMatrix);
  
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }
  if (change_to_texture >= 1)
  {
    {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(
        programInfo.attribLocations.textureCoord,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.textureCoord);
   }

    {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexNormal,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexNormal);
    }
  }
  // }
  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  else
  {
  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }
  }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);


  if (change_to_texture >= 1)
  {
    gl.uniformMatrix4fv(
    programInfo.uniformLocations.normalMatrix,
    false,
    normalMatrix);
      // Specify the texture to map onto the faces.

  // Tell WebGL we want to affect texture unit 0
  gl.activeTexture(gl.TEXTURE0);

  // Bind the texture to texture unit 0
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Tell the shader we bound the texture to texture unit 0
  gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
  }
  {
    const vertexCount = 48*87;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }


}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}


//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}


function detect_collision(obs_angle, tun_angle, pushout1)
{
  fin_obs_angle = getAngle(obs_angle);
  // fin_tun_angle = getAngle(tun_angle);
  console.log("obs_angle is ", fin_obs_angle);
  // console.log("tun_angle is ", fin_tun_angle);
  // final_angle = fin_obs_angle - fin_tun_angle;
  // console.log("final angle is ", final_angle);
  console.log("pushout1 is ", pushout1);
  if (pushout1%2==1 && ((fin_obs_angle >= -20 && fin_obs_angle <= 185) || fin_obs_angle >= 345)) stop_game = 0;
  if (pushout1%2==0 && ((fin_obs_angle >= -15 && fin_obs_angle <= 22.5) || (fin_obs_angle >= 155 && fin_obs_angle <= 205) || fin_obs_angle >= 335)) stop_game = 0;
  if (y_pos <= -1 && pushout1%2 == 1)  {stop_game++; stop_game = stop_game%2;}
}

function getAngle(angle)
{
  var less_zero = 0;
  if (angle > 0)
    less_zero = 1;
  console.log("check angle", angle);  
  org = angle;
  temp = Math.floor(angle / (2*Math.PI));
  fin = org - temp*(2*Math.PI);
  fin = fin * (180/Math.PI);
  console.log("fin initially is", fin);
  // if (less_zero == 1)  fin = 360 - fin;
  return fin;
}