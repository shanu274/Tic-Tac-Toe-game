//I've tried to explain each JavaScript line with comments....Hope you'll understand

//selecting all required elements
const selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".options .playerX"),
selectBtnO = selectBox.querySelector(".options .playerO"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

let playerXImg = "image/x.jpg", // Path to X image
    playerOImg = "image/o.jpg", // Path to O image
    playerSign = "X", // Default player sign
    runBot = true; // Bot status

window.onload = () => {
    allBox.forEach(box => box.setAttribute("onclick", "clickedBox(this)"));
}

selectBtnX.onclick = ()=>{
    selectBox.classList.add("hide"); //hide select box
    playBoard.classList.add("show"); //show the playboard section
}

selectBtnO.onclick = ()=>{ 
    selectBox.classList.add("hide"); //hide select box
    playBoard.classList.add("show"); //show the playboard section
    players.classList.add("active", "player"); //set class attribute in players with players active player values
}



// user click function
function clickedBox(element){
    if(players.classList.contains("player")){
        playerSign = "O"; //if player choose (O) then change playerSign to O
        element.innerHTML = `<img src="${playerOImg}" alt="O">`;
        players.classList.remove("active"); ///add active class in players
        
    }else{
        element.innerHTML = `<img src="${playerXImg}" alt="X">`;
        players.classList.add("active"); ///add active class in players
    }
    element.setAttribute("id", playerSign);
    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";

    selectWinner(); //calling selectWinner function
     let randomTimeDelay = Math.random() * 1000 + 200;
     setTimeout(() => bot(runBot), randomTimeDelay);
}

// Bot auto select function
function bot(){
    if(!runBot) return;

    playerSign = players.classList.contains("player") ? "X" : "O";
    let availableBoxes = [...allBox].filter(box => box.childElementCount === 0);
    if(availableBoxes.length === 0) return;

    let randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
    randomBox.innerHTML = `<img src="${playerSign === "X" ? playerXImg : playerOImg}" alt="${playerSign}">`;
    randomBox.setAttribute("id", playerSign);
    randomBox.style.pointerEvents = "none";
    players.classList.toggle("active");

    selectWinner();
    playBoard.style.pointerEvents = "auto";
    playerSign = "X";
}

// Get ID value of box
function getIdVal(classname){
    return document.querySelector(`.box${classname}`).id;
}

// Check winning combination
function checkIdSign(val1, val2, val3, sign){
    return getIdVal(val1) === sign && getIdVal(val2) === sign && getIdVal(val3) === sign;
}

// Select winner
function selectWinner(){
    if (checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) || 
        checkIdSign(7, 8, 9, playerSign) || checkIdSign(1, 4, 7, playerSign) || 
        checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign) || 
        checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7, playerSign)) {
        
        runBot = false;
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
            wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
        }, 700);
    } else if ([...allBox].every(box => box.id)) {
        runBot = false;
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
            wonText.textContent = "Match has been drawn!";
        }, 700);
    }
}

// Replay button click
replayBtn.onclick = () => {
    window.location.reload();
}