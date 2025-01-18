import { Game } from './Game';

const canvas = document.getElementById('game');
const game = new Game(canvas);

function gameLoop() {
  game.update();
  game.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
