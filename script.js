// Load p5.js library
const p5 = new p5((p) => {
  // Canvas width and height
  const canvasWidth = 500;
  const canvasHeight = 500;

  // Player properties
  let player = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    size: 10,
    direction: 0,
  };

  // Food properties
  let food = {
    x: random(0, canvasWidth),
    y: random(0, canvasHeight),
  };

  // Food count
  const foodCount = 100;

  // Setup function
  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    // Add event listeners for player control (e.g., arrow keys)
    p.keyPressed = handleKeyPressed;
  };

  // Draw function
  p.draw = () => {
    // Clear canvas
    p.background(255);

    // Draw player
    p.fill(0);
    p.ellipse(player.x, player.y, player.size, player.size);

    // Draw food
    p.fill(255, 0, 0);
    p.ellipse(food.x, food.y, 10, 10);

    // Move player based on direction
    player.x += Math.cos(player.direction) * player.size;
    player.y += Math.sin(player.direction) * player.size;

    // Handle border collisions
    checkBounds(player);

    // Check for food collision
    if (distance(player, food) < player.size / 2 + 5) {
      // Increase player size
      player.size += 1;

      // Generate new food
      food.x = random(0, canvasWidth);
      food.y = random(0, canvasHeight);
    }
  };

  // Function to handle player key presses
  function handleKeyPressed() {
    switch (p.keyCode) {
      case p.UP_ARROW:
        player.direction -= 0.1;
        break;
      case p.DOWN_ARROW:
        player.direction += 0.1;
        break;
      case p.LEFT_ARROW:
        player.direction -= 0.1;
        break;
      case p.RIGHT_ARROW:
        player.direction += 0.1;
        break;
    }
  }

  // Function to check player bounds
  function checkBounds(object) {
    if (object.x < 0) object.x = canvasWidth;
    if (object.y < 0) object.y = canvasHeight;
    if (object.x > canvasWidth) object.x = 0;
    if (object.y > canvasHeight) object.y = 0;
  }

  // Function to calculate distance between objects
  function distance(object1, object2) {
    const dx = object1.x - object2.x;
    const dy = object1.y - object2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
});
