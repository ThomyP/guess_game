
function rand(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
let random_number = rand(1,1000);
let guesses = [];

const user_input = function () {
  let user_number = document.getElementById('user_guess').value;

  user_number = user_number.trim();// pašalina tuščius tarpus,tab nematomus elementus kurie užima vieta

  // jei laukelis tuščias rodo nieko nedarom gražina 0
  if (user_number.length === 0) {
    return null;
  }

  // tikrinam simbiliu skaičiu
  if (user_number.length > 4) {
    document.querySelector('.answer_box').innerHTML = `<br>Number should be 4 digits or less!`;
    return null;
  }

  for (let i = 0; i < user_number.length; i++) {
    let char = user_number[i];

    if (char < '0' || char > '9') {
      document.querySelector('.answer_box').innerHTML = `<br>Numbers Only!`;
      return null; // Exit the function immediately if an invalid character is found
    }
  }
    guesses.push(user_number); 
    check_guesses(guesses)
    
    return user_number;
}

const check_guesses = function (guesses_masyvas) {
  if (guesses_masyvas.length > 11 ) {
    game_over();
    return true; // Guess limit exceeded
  }
  return false; // Guess limit not exceeded
};

const game_over = function () {
  document.querySelector('.user_output').innerHTML = `<br>Game Over! You've exceeded guess limit. the number was ${random_number}`;
  document.getElementById('confirm_btn').disabled = true;
};

const check_answer = function (user_number,random_number) {

  const replace_img_src = document.getElementById('images'); 
  console.log(random_number)

  const isGameOver = check_guesses(guesses);

if(!isGameOver) {

    if(user_number > random_number) {
      document.querySelector('.user_output').innerHTML += `<br>${user_number} too much`
      replace_img_src.src = './x_mark.png';
    } else if(user_number < random_number){
      document.querySelector('.user_output').innerHTML += `<br>${user_number} too little`
      replace_img_src.src = './x_mark.png';
    } else{
      document.querySelector('.answer_box').innerHTML = (`Correct!!! the number is: ${user_number} `)
      replace_img_src.src = './green_checkmark.png';
      document.getElementById('confirm_btn').disabled = true;
    }
  }
  
}

const handleGuess = function () {
  let user_number = user_input(); 
  if (user_number !== null && user_number !== 0) {
    check_answer(user_number, random_number); // Check the answer
  }
};

const new_game = function() {
  document.querySelector('.answer_box').innerHTML = '';
  document.querySelector('.user_output').innerHTML = '';
  document.getElementById('user_guess').value = '';
  document.getElementById('confirm_btn').disabled = false;
  document.getElementById('images').src = ''; 
  guesses = [];
  random_number = rand(1,1000);

  game()
}


const game = function () {
  // pašalinam sena event listener
  document.getElementById('confirm_btn').removeEventListener('click', handleGuess);

  //prideda nauja event listener
  document.getElementById('confirm_btn').addEventListener('click', handleGuess);
  document.querySelector('.new_game_btn').addEventListener('click', function () {
    new_game();
  });
};



new_game()





