import { Bird } from './Bird';
import { Pipe } from './Pipe';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = 400;
    this.height = 600;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    
    this.bird = new Bird(50, this.height / 2);
    this.pipes = [];
    this.score = 0;
    this.gameOver = false;
    
    this.pipeSpacing = 170;    // Increased from 150 for easier gameplay
    this.pipeInterval = 150;   // Increased from 120 for more space between pipes
    this.frameCount = 0;
    
    this.bindEvents();
  }

  bindEvents() {
    const handleInput = (e) => {
      if (e.type === 'keydown' && e.code !== 'Space') return;
      e.preventDefault();
      
      if (this.gameOver) {
        this.reset();
      } else {
        this.bird.flap();
      }
    };

    window.addEventListener('keydown', handleInput);
    this.canvas.addEventListener('touchstart', handleInput);
    this.canvas.addEventListener('mousedown', handleInput);
  }

  reset() {
    this.bird = new Bird(50, this.height / 2);
    this.pipes = [];
    this.score = 0;
    this.gameOver = false;
    this.frameCount = 0;
  }

  update() {
    if (this.gameOver) return;

    this.frameCount++;
    
    if (this.frameCount % this.pipeInterval === 0) {
      this.pipes.push(new Pipe(this.width, this.pipeSpacing));
    }

    this.bird.update();

    for (let i = this.pipes.length - 1; i >= 0; i--) {
      this.pipes[i].update();

      if (this.pipes[i].hits(this.bird)) {
        this.gameOver = true;
      }

      if (!this.pipes[i].passed && this.pipes[i].x + this.pipes[i].width < this.bird.x) {
        this.score++;
        this.pipes[i].passed = true;
      }

      if (this.pipes[i].x < -this.pipes[i].width) {
        this.pipes.splice(i, 1);
      }
    }

    if (this.bird.y > this.height || this.bird.y < 0) {
      this.gameOver = true;
    }
  }

  draw() {
    // Create gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, '#64B5F6');
    gradient.addColorStop(1, '#1976D2');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.pipes.forEach(pipe => pipe.draw(this.ctx, this.height));
    this.bird.draw(this.ctx);

    // Draw score with shadow
    this.ctx.fillStyle = 'white';
    this.ctx.font = 'bold 32px Arial';
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    this.ctx.shadowBlur = 5;
    this.ctx.fillText(this.score, 10, 40);
    this.ctx.shadowBlur = 0;

    if (this.gameOver) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      this.ctx.fillRect(0, 0, this.width, this.height);
      
      this.ctx.fillStyle = 'white';
      this.ctx.font = 'bold 48px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Game Over!', this.width / 2, this.height / 2);
      
      this.ctx.font = 'bold 24px Arial';
      this.ctx.fillText(`Score: ${this.score}`, this.width / 2, this.height / 2 + 40);
      this.ctx.fillText('Click or Press Space to Restart', this.width / 2, this.height / 2 + 80);
      this.ctx.textAlign = 'left';
    }
  }
}
