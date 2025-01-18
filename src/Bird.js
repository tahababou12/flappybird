export class Bird {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = 0;
    this.gravity = 0.3;    // Reduced from 0.5
    this.lift = -7;        // Reduced from -12
    this.size = 20;
    // Add terminal velocity to prevent too fast falling
    this.terminalVelocity = 7;
    // Add smoothing for rotation
    this.rotation = 0;
  }

  update() {
    this.velocity += this.gravity;
    // Limit falling speed
    if (this.velocity > this.terminalVelocity) {
      this.velocity = this.terminalVelocity;
    }
    this.y += this.velocity;

    // Update rotation based on velocity
    this.rotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, this.velocity * 0.2));
  }

  flap() {
    // Add minimum velocity check to prevent rapid consecutive flaps
    if (this.velocity > -4) {
      this.velocity = this.lift;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    // Draw bird body
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(0, 0, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw wing
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size * 0.7, this.size * 0.4, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw eye
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.size * 0.3, -this.size * 0.2, this.size * 0.15, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
}
