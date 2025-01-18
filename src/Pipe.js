export class Pipe {
  constructor(x, spacing) {
    this.x = x;
    this.top = Math.random() * (300 - spacing);
    this.bottom = this.top + spacing;
    this.width = 50;
    this.speed = 1.5;  // Reduced from 2 for smoother gameplay
    this.passed = false;
  }

  update() {
    this.x -= this.speed;
  }

  draw(ctx, height) {
    const gradient = ctx.createLinearGradient(this.x, 0, this.x + this.width, 0);
    gradient.addColorStop(0, '#2E7D32');
    gradient.addColorStop(1, '#388E3C');
    ctx.fillStyle = gradient;

    // Top pipe with border
    ctx.fillRect(this.x, 0, this.width, this.top);
    ctx.strokeStyle = '#1B5E20';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, 0, this.width, this.top);

    // Bottom pipe with border
    ctx.fillRect(this.x, this.bottom, this.width, height - this.bottom);
    ctx.strokeRect(this.x, this.bottom, this.width, height - this.bottom);

    // Pipe caps
    const capHeight = 20;
    ctx.fillStyle = '#1B5E20';
    ctx.fillRect(this.x - 5, this.top - capHeight, this.width + 10, capHeight);
    ctx.fillRect(this.x - 5, this.bottom, this.width + 10, capHeight);
  }

  hits(bird) {
    if (bird.y - bird.size < this.top || bird.y + bird.size > this.bottom) {
      if (bird.x + bird.size > this.x && bird.x - bird.size < this.x + this.width) {
        return true;
      }
    }
    return false;
  }
}
