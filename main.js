const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
  constructor(field) {
    this._field = field;
    this.playerX = 0;
    this.playerY = 0;
  }

  get field() {
    return this._field;
  }

  set field(field) {
    Array.isArray(field) ? this._field = field : console.log('Error, field is invalid');
  }

  print() {
    this._field.forEach(arr => {
      console.log(arr.join(' '))
    })
  }

  startGame() {
    process.stdout.write('Which way? Which way would you like to move? Please enter r for right, l for left, d for down and u for up\n');
    process.stdin.on('data', (userInput) => {
        let move = userInput.toString().trim().toUpperCase();
        this.makeMove(move);
    })
  }
  makeMove(move) {
    const yMax = this._field.length -1;
    const xMax = this._field[0].length -1;
    if (move === 'R') {
      if (this.playerX + 1 <= xMax) {
        this.playerX += 1;
        this.checkBoard();
      } else {
        console.log('You fell off the board, game over');
        process.exit();
      };
    } else if (move === 'L') {
      if (this.playerX - 1 >= 0) {
        this.playerX -= 1;
        this.checkBoard();
      } else {
        console.log('You fell off the board, game over');
        process.exit();
      };
    } else if (move === 'D') {
      if (this.playerY + 1 <= yMax) {
        this.playerY += 1;
        this.checkBoard()
      } else {
        console.log('You fell off the board, game over');
        process.exit();
      };
    } else if (move === 'U') {
      if (this.playerY - 1 >= 0) {
        thid.playerY -= 1;
        this.checkBoard()
      } else {
        console.log('You fell off the board, game over');
        process.exit();
      };
    } else {
      console.log('Invalid entry, please enter l, r, d or u');
    };
  } 

  updateField(field) {
    Array.isArray(field) ? this._field = field : console.log('Error, field is invalid');
  }

  checkBoard() {
    let field = myField._field;
    if (field[this.playerY][this.playerX] === hole) {
      console.log('You fell in a hole, game over');
      process.exit();
    } else if (field[this.playerY][this.playerX] === hat) {
      console.log('You found your hat! Congratulations, you win!');
      process.exit();
    } else {
      field[this.playerY][this.playerX] = pathCharacter;
      myField.updateField(field);
      myField.print();
      process.stdout.write('Which way?\n');
    }
}

  static generateField(height, width, percentage) {
    //helper functions
    function shuffleOrder(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
    return arr;
  }

  function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
    }
      return res;
  }


// calculate allocations 
    let totalFields = height * width;
    let holePercentage = totalFields * (percentage/100);
    let remainingFields = totalFields - holePercentage;

// initially populate array
    let generatedField = Array(totalFields).fill(pathCharacter, 0).fill(hat, 1).fill(fieldCharacter, 2).fill(hole, remainingFields);
    shuffleOrder(generatedField);
    sliceIntoChunks(generatedField,width);
    return generatedField;
  }

}

// log new generated field
//console.log(Field.generateField(3, 4, 70))

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

myField.startGame();









