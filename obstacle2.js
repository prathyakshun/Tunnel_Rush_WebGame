
var texture_obstacle2_coordinates = new Array(18);
var faceColors_obstcale_t2 = [];


function obstacleAddBuffers2(gl, z_coord){
  // Create a buffer for the cube's vertex positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the cube.

  var vcount = 0;
  var side = 4/Math.sqrt(3);
  var obstacle_pos2 = new Array(18);

    obstacle_pos2[vcount++] = -side*Math.sin(Math.PI/180*22.5)+0.5; obstacle_pos2[vcount++] = side*Math.cos(Math.PI/180*22.5);  obstacle_pos2[vcount++] = z_coord;
    obstacle_pos2[vcount++] = -side*Math.sin(Math.PI/180*(22.5+135))+0.5;    obstacle_pos2[vcount++] = side*Math.cos(Math.PI/180*(22.5+135)); obstacle_pos2[vcount++] = z_coord;
    obstacle_pos2[vcount++] = -side*Math.sin(Math.PI/180*(22.5+180))-0.5; obstacle_pos2[vcount++] = side*Math.cos(Math.PI/180*(22.5+180));  obstacle_pos2[vcount++] =  z_coord;
    obstacle_pos2[vcount++] = -side*Math.sin(Math.PI/180*22.5)+0.5; obstacle_pos2[vcount++] = side*Math.cos(Math.PI/180*22.5);  obstacle_pos2[vcount++] = z_coord;
    obstacle_pos2[vcount++] = -side*Math.sin(Math.PI/180*(22.5+180))-0.5; obstacle_pos2[vcount++] = side*Math.cos(Math.PI/180*(22.5+180));  obstacle_pos2[vcount++] =  z_coord;
    obstacle_pos2[vcount++] = -side*Math.sin(Math.PI/180*(22.5+315))-0.5;    obstacle_pos2[vcount++] = side*Math.cos(Math.PI/180*(22.5+315)); obstacle_pos2[vcount++] = z_coord;
  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(obstacle_pos2), gl.STATIC_DRAW);

    // Texture coordinates
  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

  var tcount=0;
    texture_obstacle2_coordinates[tcount++]=0.0;  texture_obstacle2_coordinates[tcount++]=0.0;
    texture_obstacle2_coordinates[tcount++]=1.0;  texture_obstacle2_coordinates[tcount++]=0.0;
    texture_obstacle2_coordinates[tcount++]=1.0;  texture_obstacle2_coordinates[tcount++]=1.0;

    texture_obstacle2_coordinates[tcount++]=0.0;  texture_obstacle2_coordinates[tcount++]=1.0;
    texture_obstacle2_coordinates[tcount++]=0.0;  texture_obstacle2_coordinates[tcount++]=0.0;
    texture_obstacle2_coordinates[tcount++]=1.0;  texture_obstacle2_coordinates[tcount++]=0.0;

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texture_obstacle2_coordinates),
  gl.STATIC_DRAW);

  // Now set up the colors for the faces. We'll use solid colors
  // for each face.

  var ccount = 0;
    var ccount = 0; var faceColors_obstcale1 = new Array(3);
    faceColors_obstcale1[ccount++] = 1.0; faceColors_obstcale1[ccount++] = 0.0; faceColors_obstcale1[ccount++] = 0.0; faceColors_obstcale1[ccount++] = 1.0;    // Top face: green

    var ccount = 0; var faceColors_obstcale2 = new Array(3);
    faceColors_obstcale2[ccount++] = 1.0; faceColors_obstcale2[ccount++] = 0.0; faceColors_obstcale2[ccount++] = 0.0, faceColors_obstcale2[ccount++] = 1.0;    // Back face: red

    faceColors_obstcale_t2.push(faceColors_obstcale1);  faceColors_obstcale_t2.push(faceColors_obstcale2);

  // Convert the array of colors into a table for all the vertices.

  var colors = [];

  for (var j = 0; j < faceColors_obstcale_t2.length; ++j) {
    const c = faceColors_obstcale_t2[j];

    // Repeat each color four times for the four vertices of the face
    // colors = colors.concat(c, c, [0.0, 0.0, 0.0, 1.0]);
    colors = colors.concat([0, 0, 0, 1], c, c);
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  // Build the element array buffer; this specifies the indices_obstacle
  // into the vertex arrays for each face's vertices.

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices_obstacle into the vertex array to specify each triangle's
  // position.

  // INDICES_obstacle ARRAY
  var icount = 0;
  indices_obstacle2 = new Uint16Array(18);
  for (var i=0;i<18;i+=3)
  {
    indices_obstacle2[icount++] = i;  indices_obstacle2[icount++] = i+1; indices_obstacle2[icount++] = i+2;      
  }

  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices_obstacle2), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    color: colorBuffer,
    textureCoord: textureCoordBuffer,
    indices_obstacle2: indexBuffer,
  };
}

//
// Draw the scene.
//
function obstacle_drawScene2(gl, programInfo, buffers, deltaTime, now, ticktile, oddeve, texture, speed_no) {


//remove  // gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
//remove  // gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

//remove  // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height

  for (var j = 0; j < faceColors_obstcale_t2.length; ++j) {
    const c = faceColors_obstcale_t2[j];
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix3 = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix3,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix3 = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(modelViewMatrix3,     // destination matrix
                 modelViewMatrix3,     // matrix to translate
                 [-0.0, y_pos, -2.0+ticktile+speed_factor]);  // amount to translate

  if (final_score >= 1000)
  {
    if (obstacle2_rotation[speed_no] < 0)  obstacle2_rotation[speed_no] -= 0.0002;
    else  obstacle2_rotation[speed_no] += 0.0002;
    cubeRotationobs2 += 0.0002;
  }
  mat4.rotate(modelViewMatrix3,  // destination matrix
              modelViewMatrix3,  // matrix to rotate
              obstacle2_rotation[speed_no],     // amount to rotate in radians
              [0, 0, 1]);       // axis to rotate around (Z)
  // mat4.rotate(modelViewMatrix,  // destination matrix
  //             modelViewMatrix,  // matrix to rotate
  //             cubeRotation * .7,// amount to rotate in radians
  //             [0, 1, 0]);       // axis to rotate around (X)

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
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

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
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


  // Tell WebGL which indices_obstacle to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices_obstacle2);

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix3);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix3);

  if (change_to_texture >= 1)
  {
      // Specify the texture to map onto the faces.

  // Tell WebGL we want to affect texture unit 0
  gl.activeTexture(gl.TEXTURE0);

  // Bind the texture to texture unit 0
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Tell the shader we bound the texture to texture unit 0
  gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
  }

  {
    const vertexCount = 6;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  }
}