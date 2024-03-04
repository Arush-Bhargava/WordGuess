jQuery(function ($) {
  var gameOver = false;
  var randomWord, randomCategory;
  var blanks = "";
  var guess = "";
  var life = 5;

  function getRandomWord() {
    var randomNumber = Math.floor(Math.random() * words.length);
    randomWord = words[randomNumber].word;
    randomCategory = words[randomNumber].catagory;
  }

  function generateBlanks(word) {
    blanks = "";
    for (let i = 0; i < word.length; i++) {
      blanks += "_ ";
    }
    return blanks;
  }

  function resetGame() {
    getRandomWord();
    blanks = generateBlanks(randomWord);
    $("#blanks").html(blanks);
    guess = "";
    life = 5;
    $("#life").text("Lives: " + life);
    $("#guess").val("");
    $("#hint").text("Hint: It is related to  " + randomCategory);
    document.getElementById("reset").style.display='none';
    gameOver = false;
  }

  // What first executes when the page is loaded
  getRandomWord();
  blanks = generateBlanks(randomWord);
  document.getElementById("reset").style.display='none';


  // To write the HTML with variable text
  document.querySelector("#hint").textContent =
    "Hint: It is related to " + randomCategory;
  document.querySelector("#blanks").textContent = blanks;
  document.querySelector("#life").textContent = life;

  // To get the value of guess and display it
  $(".clickable").click(function () {
    guess += $(this).attr("id");

    document.querySelector("#guesses").textContent = guess;
  });

  // To check if enter key has been pressed, then submit the form

  $("#enter").on("click", function () {
    console.log("Submit");

    if (life > 0) {
      if (guess == randomWord) {
        alert("Congratulations! You have guessed the correct word!");
        document.getElementById("reset").style.display='flex';
      } else {
        life -= 1;
        document.querySelector("#life").textContent = life;
        
        if (life === 0 ){
          alert(
            "You are out of lives. The word was " +
              randomWord +
              ". Try again next time."
          );
          document.getElementById("reset").style.display='flex';
        }
      }
    }

    guess = "";
    document.querySelector("#guesses").textContent = guess;
  });
  // To reset the game using the reset function
  $("#reset").on("click", function () {
    resetGame();
  });

  $("#clear").on("click", function () {
    guess = guess.slice(0, -1);
    document.querySelector("#guesses").textContent = guess;
  });
});
