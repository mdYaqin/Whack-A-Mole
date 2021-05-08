
//Creating H1 Element and Inner Text and appending newly created element to parent (body)
const title = document.createElement('h1')
title.innerText= "Whack-A-Mole"
const body = document.querySelector('body')
body.appendChild(title)
title.setAttribute('class', 'title')

//Creating button element 
const button = document.createElement('button')
button.innerText = "Start"
body.appendChild(button)
button.setAttribute('class', 'button')

//Creating a pop (sound) element for mouse event
const pop = document.querySelector('#pop');


//Creating a score element
const score = document.createElement('h2')
score.innerText = 0
body.appendChild(score)
score.setAttribute('class', 'score')

//Creating a countdown element
const countDown = document.createElement('h3')
// countDown.innerText = 15
body.appendChild(countDown)
countDown.setAttribute('class', 'countDown')
     

//Creating a table element
const table = document.createElement('table')
body.appendChild(table)
table.setAttribute('class', 'table')



//Creating Row element
//Creating Column Element 
//Creating for loop for Row & Column
//Append col to row
//Append row to table

let rows = 2
let cols = 3
let currentScore = 0
for (let i = 1; i <= rows; i++) {
     const row = document.createElement('tr')
     row.setAttribute('class', 'row')
     table.appendChild(row)

     for (let j = 1; j <= cols; j++) {
          const col = document.createElement('td')
          col.setAttribute('class', 'column');
          row.appendChild(col)
         

          //Creating a mole element ('div')
          const mole = document.createElement('div')
          // mole.setAttribute('id', number of row & column iteration)
          mole.setAttribute('id', `r${i}c${j}`)
          col.appendChild(mole)
}
}

//Creating a Function to generate a random number for the mole to appear next
//Condition to ensure that mole does not appear on the same col
// Creating a previous position variable for mole to get the data

const molePreviousPos = {row:null, col:null}
const moleCurrentPos = {row:null , col:null} 
const moleAppear = () => {

     let randomRow;
     let randomCols;
     do {randomRow = Math.ceil(Math.random() * rows)
     randomCols = Math.ceil(Math.random() * cols)}

     while (moleCurrentPos.row === randomRow  && moleCurrentPos.col === randomCols);

     
     
     //Save previous location to remove mole class
     molePreviousPos.row = moleCurrentPos.row
     molePreviousPos.col = moleCurrentPos.col
     moleCurrentPos.row = randomRow; moleCurrentPos.col = randomCols 

     //Callback function of moleOut to invoke the moleOut function
     //After the mole goes to next column, removeMole function will be invoked to remove the mole class from the previous column
     //To check if mole previous position is not null as null is the initial start of the game
     moleOut(moleCurrentPos.row, moleCurrentPos.col) 
     if(molePreviousPos.row !== null && molePreviousPos.col !== null){
     removeMole(molePreviousPos.row, molePreviousPos.col)
}}

console.log(moleCurrentPos)

//Creating a moleOut function to ensure mole appears
function moleOut (row, col) {

     const mole = document.getElementById(`r${row}c${col}`)
     mole.setAttribute('class', 'mole')


}

//Creating a removeMole function to ensure mole class is removed before the mole appear in the next column 
function removeMole (row, col) {

   
     const mole = document.getElementById(`r${row}c${col}`)
     mole.removeAttribute('class', 'mole')


}

//Creating an update score function to keep track of the user score
function updateScore () {

   document.querySelector('.score').innerText = currentScore
     
}

//Creating timeout for mole appear = 1 sec
let i = 15;
document.querySelector('button').onclick = function(){
let a = setInterval(function() {
document.querySelector('.countDown').textContent = `${i}`;
i--;


if(i<0) {
         clearInterval(a);
         alert('GAME OVER! Your final score is ' + currentScore)
     location.reload()
     }

       
   moleAppear() 
    }
, 1000);
}



//Creating an Event Listener to capture the mole everytime a mouse event is clicked at the mole
document.addEventListener('click', function (e){
    if (e.target.querySelector('div').className === 'mole') {
         pop.play()
currentScore ++
    }

    updateScore()
})










