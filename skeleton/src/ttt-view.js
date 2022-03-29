class View {
  constructor(game, el) {
    this.game = game;
    this.squares = [];
    this.grid = this.setupBoard();
    el.appendChild(this.grid);
    this.bindEvents();
  }

  setupBoard() {
    const grid = document.createElement("ul");
    for(let i = 0; i < 9; i++){
      const li = document.createElement("li");
      li.classList.add(`${i}`);
      this.squares.push(li);
      grid.appendChild(li);
    }
    grid.classList.add("grid");
    // grid.class = "grid";
    // grid.display = "flex";
    // grid.height = 900;
    // grid.width = 900;
    // grid.flexWrap = "wrap";
    // grid.color  = "black";
    
    return grid;
  }
  
  bindEvents() {
    let that = this;
    this.grid.addEventListener('click', function(e) {
      that.handleClick(e);
    }, true);
    this.grid.removeEventListener('click', this.handleClick);
  }

  handleClick(e) {
    if (e.target.tagName.toLowerCase() === 'li'){
      // e.stopPropogation();
      e.preventDefault();
      let classId = parseInt(e.target.classList.value);
      let x = Math.floor(classId/3);
      let y = classId % 3;
      this.makeMove([x,y], e);

    }
  }

  makeMove(square, e) {
    if(!this.game.board.isEmptyPos(square)){
      alert("Move Not Valid!");
    }
    else{
      this.game.playMove(square);
      e.target.innerText = this.game.currentPlayer;
      e.target.classList.add(`${this.game.currentPlayer.toLowerCase()}`);
    }
    if(this.game.isOver()){
      let winner = document.querySelector("#winner");
      winner.innerText = `You win, ${this.game.currentPlayer}!`;
      // debugger;
      this.grid.removeEventListener('click',function(e) {this.handleClick(e);} );
      for(let i = 0; i < 9; i++){
        let ele = this.squares[i];
        // debugger;
        ele.removeEventListener('click',function(e) {this.handleClick(e);} );
      }
    }
  }

}

module.exports = View;
