let Lw ; // Side length of the square Chladni plate
let Lh
let resolution = 10; // Step size for grid (smaller values give higher detail)
let n = 1; // This will now be controlled by microphone volume
let m = 3.3; // Integer m
let mic; // Microphone input
let micbutt
let cnv

function setup() {

  cnv = createCanvas(windowWidth,windowHeight);
  Lw = width
  Lh = height
  let cx = (windowWidth-cnv.width)/2
  let cy = (windowHeight-cnv.height)/2
  print(windowWidth, windowHeight)
  cnv.position(cx,cy)
  pixelDensity(1);
  
  // Set up microphone input
  mic = new p5.AudioIn();
  mic.start(); // Start capturing audio
  micbutt = createButton("Press to Start Mic")
  micbutt.style("font-size", "48px")
  micbutt.style("background-color","yellow")

  micbutt.position(width/2,height/2)
  micbutt.mouseClicked(unlockAudioContext)


  
  frameRate(25); // Slower frame rate for smoother updates
}

function keyPressed() {
  if (key === 's') {
     // Save the current frame when a key is pressed
  saveCanvas('chladniForm_' + nf(frameCount, 3), 'png');
  }
 
}


function draw() {
  //background(255,255,0);
  background(0)
  
  // Get the current volume level from the microphone
  let vol = mic.getLevel();
  
  // Map the volume to n between 1 and 5 (adjust these numbers to suit your needs)
  n = map(vol, 0, 0.1, 1, 8); // Adjust max volume threshold as needed
  // change the vol mapping to 0 , 0.5 or 0, 1, to have a less sensitive mic
  //m = map(vol, 0,0.1,1,4)
  // Loop through the grid
  for (let x = 0; x <= Lw; x += resolution) {
    for (let y = 0; y <= Lh; y += resolution) {
      
      // Normalize x and y in the range of the plate side length
      let xn = x / Lw;
      let yn = y / Lh;
      
      // Calculate the equation for the standing wave zero condition
      let term1 = cos(n * PI * xn) * cos(m * PI * yn);
      let term2 = cos(m * PI * xn) * cos(n * PI * yn);
      let result = term1 - term2;
      
      // If the result is close to zero, plot the point
      //if (abs(result) < 0.09) {
        //strokeWeight(resolution);
       // fill(255,255,0, 255*abs(result))
        // Color based on how close to zero the result is
       // let colorValue = map(abs(result), 0, 0.01, 0, 255); // For HSB color
        
       //fill(0, 255*abs(result))
       fill(255,255,0, 255*abs(result))
       noStroke(); // Set stroke color in HSB mode
        rect(x, y, resolution,resolution); // Plot points at zero crossing
      //}
    }
  }
}

 


function unlockAudioContext() {
  micbutt.hide()
  const audioCtx = getAudioContext();
  if (audioCtx.state === "suspended") {
    audioCtx
      .resume()
      .then(() => {
        console.log("Audio context unlocked");
      })
      .catch((err) => {
        console.error("Failed to unlock audio context:", err);
      });
  }
}