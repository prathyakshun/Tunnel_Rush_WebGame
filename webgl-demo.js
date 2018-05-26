var cubeRotation = 0.0;
var cubeRotationobs = 0.0;
var cubeRotationobs2 = 0.0;
var pushout = 1;          // Tunnel regenration
var pushout1 = 1;         // Obstacle regenration
var pushout2 = 1;         // Obstacle regenration
var speed_factor = 0.01;
var prev_tile = 0;
var prev_tile1 = 0;
var prev_tile2 = 0;
var final_score = 0;
var incr_speed = 1;
var change_to_texture = 0;
var obstacle1_arr = [];
var obstacle2_arr = [];
var obstacle1_rotation = [0, 0, 0, 0, 0];
var obstacle2_rotation = [0, 0, 0, 0, 0];
var speed_rot = [1, 2, 3, 4];
var programInfo;
var sending_guy1 = 0;
var sending_guy2 = 0;
var stop_game = 1;
var bw = 0;
var level = 1;
var lcount = 0;
var flash_enable = 0;

// var mousetrap = require('mousetrap')

main();

//
// Start here
//
function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  if (change_to_texture == 0)
  {
  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };
  }
  else
  {
    vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;
    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
      void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;
      // Apply lighting effect
      highp vec3 ambientLight = vec3(0.6, 0.6, 0.6);
      highp vec3 directionalLightColor = vec3(1, 1, 1);
      highp vec3 directionalVector = normalize(vec3(0, 0.8, 1.0));
      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
  `;

  // Fragment shader program

    fsSource = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
    uniform sampler2D uSampler;
    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
      gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aTextureCoord and also
  // look up uniform locations.
  programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    },
  };
  }

    Mousetrap.bind('b', function () {bw++;  bw = bw % 2;});

    Mousetrap.bind('c', function () {
    change_to_texture = (change_to_texture+1)%6;
      if (change_to_texture == 1)
      {
        texture = loadTexture(gl, 'tunnel_texture16.jpeg');    
        texture1 = loadTexture(gl, 'tunnel_texture8.jpg');
        texture2 = loadTexture(gl, 'tunnel_texture9.jpg');

      }
      if (change_to_texture == 2)
      {
        texture = loadTexture(gl, 'tunnel_texture8.jpg'); 
        texture1 = loadTexture(gl, 'tunnel_texture17.jpg');
        texture2 = loadTexture(gl, 'tunnel_texture4.jpg');
      }
      if (change_to_texture == 3)
      {
        texture = loadTexture(gl, 'tunnel_texture9.jpg'); 
        texture1 = loadTexture(gl, 'tunnel_texture14.jpeg');
        texture2 = loadTexture(gl, 'tunnel_texture8.jpg');
      }
      if (change_to_texture == 4)
      {
        texture = loadTexture(gl, 'tunnel_texture13.jpeg');    
        texture1 = loadTexture(gl, 'tunnel_texture2.jpeg');
        texture2 = loadTexture(gl, 'tunnel_texture4.jpg');
      }
      if (change_to_texture == 5)
      {
        texture = loadTexture(gl, 'tunnel_texture17.jpg');    //16
        texture1 = loadTexture(gl, 'tunnel_texture8.jpg');
        texture2 = loadTexture(gl, 'tunnel_texture13.jpeg');
      }
  if (change_to_texture == 0)
  {
  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };
  }
  else
  {
    vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;
    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
      void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;
      // Apply lighting effect
      highp vec3 ambientLight = vec3(0.6, 0.6, 0.6);
      highp vec3 directionalLightColor = vec3(1, 1, 0);
      highp vec3 directionalVector = normalize(vec3(0, 0.8, 1.0));
      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
  `;

  // Fragment shader program

    fsSource = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
    uniform sampler2D uSampler;
    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
      gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aTextureCoord and also
  // look up uniform locations.
  programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    },
  };
  }});

    Mousetrap.bind('l', function() {flash_enable++; flash_enable = flash_enable%2;});
    function flash() {
      lcount++;
      lcount = lcount % 2;
  if (change_to_texture == 0)
  {
  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };
  }
  else
  {
  if (lcount % 2 == 1)
  {
    vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;
    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
      void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;
      // Apply lighting effect
      highp vec3 ambientLight = vec3(0.8+0.5, 0.8+0.5, 0.8+0.5);
      highp vec3 directionalLightColor = vec3(1, 1, 0);
      highp vec3 directionalVector = normalize(vec3(0, 0.8, 1.0));
      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
  `;
  }
  else
  {
     vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;
    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
      void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;
      // Apply lighting effect
      highp vec3 ambientLight = vec3(0.8, 0.8, 0.8);
      highp vec3 directionalLightColor = vec3(1, 1, 0);
      highp vec3 directionalVector = normalize(vec3(0, 0.8, 1.0));
      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
  `;   
  }

  // Fragment shader program

    fsSource = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
    uniform sampler2D uSampler;
    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
      gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aTextureCoord and also
  // look up uniform locations.
  programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    },
  };
  }}

  console.log(programInfo);
  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  buffers = initBuffers(gl);
  for (i=0;i<10;i+=2)
  {
    obstacle1_arr.push(obstacleAddBuffers(gl, -21*(i+1)));
    var test_val = Math.random();
    if (test_val >= 0.5)  obstacle1_rotation[i/2] = 1/speed_rot[Math.floor(Math.random()*speed_rot.length)];
    else  obstacle1_rotation[i/2] = -1/speed_rot[Math.floor(Math.random()*speed_rot.length)];
  }
  for (i=1;i<10;i+=2)
  {
    obstacle2_arr.push(obstacleAddBuffers2(gl, -21*(i+1)));
    var test_val = Math.random();
    if (test_val >= 0.5)  obstacle2_rotation[(i-1)/2] = 1/speed_rot[Math.floor(Math.random()*speed_rot.length)];
    else  obstacle2_rotation[(i-1)/2] = -1/speed_rot[Math.floor(Math.random()*speed_rot.length)];
  }
  // for (i=0;i<5;i++)
  // {
    // console.log("initial rotations ",obstacle1_rotation[i], obstacle2_rotation[i]);
  // }

  var texture = loadTexture(gl, 'tunnel_texture6.jpg');
  var texture1 = loadTexture(gl, 'tunnel_texture2.jpeg');
  var texture2 = loadTexture(gl, 'tunnel_texture4.jpg');

  var then = 0;
  var ticktile = 0;
  var is_odd = 1;
  var then_speed = 0;

  var Key = {
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);



  // Draw the scene repeatedly
  function render(now) {
    if (stop_game == 1) final_score++;
    else
    {
      so = document.getElementById("crash_id");
      so.autoplay="autoplay";
      gameso = document.getElementById("game_sound_id");
      gameso.pause();
    }
    document.getElementById("score_id").innerHTML = "<span class=\"label label-success\"> SCORE: "+final_score+"</span>";
    document.getElementById("speed_id").innerHTML = "<span class=\"label label-success\"> SPEED: "+speed_factor+"</span>";
    document.getElementById("level_id").innerHTML = "<span class=\"label label-success\"> LEVEL: "+level+"</span>";
    if (stop_game == 1) ticktile+=0.1;
    now *= 0.001;  // convert to seconds
    const deltaTime = now;
    then = now;
  if (Key.isDown(Key.LEFT)) {turnso = document.getElementById("turn_id"); turnso.play();  cubeRotation+=0.1; for (i=0;i<5;i++) {obstacle1_rotation[i]+=0.1;  obstacle2_rotation[i]+=0.1;}}
  if (Key.isDown(Key.RIGHT)) {turnso = document.getElementById("turn_id"); turnso.play();  cubeRotation-=0.1; for (i=0;i<5;i++) {obstacle1_rotation[i]-=0.1;  obstacle2_rotation[i]-=0.1;}}
    if (stop_game == 1) speed_factor += 0.1;
    drawScene(gl, programInfo, buffers, deltaTime, now, ticktile, texture);
    for (i=0;i<5;i++)
    {
      obstacle_drawScene(gl, programInfo, obstacle1_arr[i], deltaTime, now, ticktile, 1, texture1, i);
      obstacle_drawScene2(gl, programInfo, obstacle2_arr[i], deltaTime, now, ticktile, 1, texture2, i);
    }
    console.log("ANGLE CALC IS ",getAngle(obstacle1_rotation[0]));
    // for (i=0;i<5;i++)
    // {
      // console.log("later rotations ",obstacle1_rotation[i], obstacle2_rotation[i]);
    // }
    if (ticktile+speed_factor - prev_tile>= 3.5 && stop_game == 1)
    {
      if (flash_enable) flash();
      prev_tile = ticktile+speed_factor;
      pushout++; 
      buffers = changeBuffers(gl, pushout);
    }
    if (ticktile+speed_factor - prev_tile1 >= 21.2 && stop_game == 1)
    {
      incr_speed += 0.001;
      prev_tile1 = ticktile+speed_factor;
      pushout1++;
      if (pushout1 % 2 == 0)
      {
        // obstacle1_arr = obstacle1_arr.slice(1,5);  
        obstacle1_arr[sending_guy1] = (obstacleAddBuffers(gl, -21*(pushout1+9)));
        sending_guy1++; sending_guy1 = sending_guy1%6;
        // speed_rot.push(speed_rot[0]);
        // speed_rot = speed_rot.slice(1,6);
      }
      else
      {
        // obstacle2_arr = obstacle2_arr.slice(1,5);  
        // obstacle2_arr.push(obstacleAddBuffers2(gl, -21*(pushout1+9)));
        obstacle2_arr[sending_guy2] = (obstacleAddBuffers2(gl, -21*(pushout1+9)));
        sending_guy2++; sending_guy2 = sending_guy2%5;
      }
    }
    if (ticktile+speed_factor-prev_tile1 >= 21 && stop_game == 1)
    {
      // alert("GOING TO CHECK");
      if (pushout1%2 == 1)
      {
          console.log("semi-circle", getAngle(obstacle1_rotation[0]));
          console.log(cubeRotation, obstacle1_rotation[sending_guy1]);
          detect_collision((obstacle1_rotation[sending_guy1]), -cubeRotation, pushout1);
          // alert("COLLISION");
          if (stop_game == 0)
            alert(obstacle1_rotation[sending_guy1]);
      }
      else
      {
          console.log("rectangle");
          console.log(cubeRotation, obstacle2_rotation[sending_guy2]);
          detect_collision((obstacle2_rotation[sending_guy2]), -cubeRotation, pushout1);
          // alert("COLLISION");
          if (stop_game == 0)
            alert(obstacle2_rotation[sending_guy2]);
      }
    }
    if (final_score >= 1000*level)
    {
      document.getElementById("level_id_sound").play();
      level++;
    }
    // if (y_pos <= -1) alert("above");
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//

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

