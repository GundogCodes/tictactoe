	/*----- constants -----*/
	const PLAYERS = {
		'0':' ',
		'1':'x',
		'-1':'o'
	}

	const winningCombos = {
		1:[
			[1,0,0], //column 0
			[1,0,0], //column 1
			[1,0,0] //column 2
		//	r0 r1 r2
		],
		2:[
			[1,1,1], //column 0
			[0,0,0], //column 1
			[0,0,0] //column 2
		//	r0 r1 r2
		],
		3:[
			[1,0,0], //column 0
			[0,1,0], //column 1
			[0,0,1] //column 2
		//	r0 r1 r2
		],
		4:[
			[0,1,0], //column 0
			[0,1,0], //column 1
			[0,1,0] //column 2
		//	r0 r1 r2
		],
		5:[
			[0,0,1], //column 0
			[0,0,1], //column 1
			[0,0,1] //column 2
		//	r0 r1 r2
		],
		6:[
			[0,0,0], //column 0
			[1,1,1], //column 1
			[0,0,0] //column 2
		//	r0 r1 r2
		],
		7:[
			[0,0,0], //column 0
			[0,0,0], //column 1
			[1,1,1] //column 2
		//	r0 r1 r2
		],
		8:[
			[0,0,1], //column 0
			[0,1,0], //column 1
			[1,0,0] //column 2
		//	r0 r1 r2
		],
		9:[
			[-1,0,0], //column 0
			[-1,0,0], //column 1
			[-1,0,0] //column 2
		//	r0 r1 r2
		],
		10:[
			[-1,-1,-1], //column 0
			[0,0,0], //column 1
			[0,0,0] //column 2
		//	r0 r1 r2
		],
		11:[
			[-1,0,0], //column 0
			[0,-1,0], //column 1
			[0,0,-1] //column 2
		//	r0 r1 r2
		],
		12:[
			[0,-1,0], //column 0
			[0,-1,0], //column 1
			[0,-1,0] //column 2
		//	r0 r1 r2
		],
		13:[
			[0,0,-1], //column 0
			[0,0,-1], //column 1
			[0,0,-1] //column 2
		//	r0 r1 r2
		],
		14:[
			[0,0,0], //column 0
			[-1,-1,-1], //column 1
			[0,0,0] //column 2
		//	r0 r1 r2
		],
		15:[
			[0,0,0], //column 0
			[0,0,0], //column 1
			[-1,-1,-1] //column 2
		//	r0 r1 r2
		],
		16:[
			[0,0,-1], //column 0
			[0,-1,0], //column 1
			[-1,0,0] //column 2
		//	r0 r1 r2
		]
	}
	const winAmount = 3;
	

	/*----- state variables -----*/
	let turn;
	let winner;
	let board;


	/*----- cached elements  -----*/
	const playAgainBtn = document.querySelector('button')
	const boxEls = document.querySelectorAll('section > div')
	const messageEl  = document.querySelector('h3')
	//console.log(boxEls)
	/*----- event listeners -----*/
	playAgainBtn.addEventListener('click',init)
	let buttonBox = []
	for(let box of boxEls){
		box.addEventListener('click',handleClick)
	}


	/*----- functions -----*/
	init()
function init(){
	turn = 1
	winner = null
	board = [
		[0,0,0], //column 0
		[0,0,0], //column 1
		[0,0,0] //column 2
	//	r0 r1 r2
	]
	
	render()
}

function render(){
	renderControls()
}


function handleClick(event){
	
	const clickedBox = event.currentTarget.getAttribute('id')
	//console.log(clickedBox)
	const colIdx = clickedBox[1]
	const rowIdx = clickedBox[3]
	//console.log(colIdx,rowIdx)
	const collArr = board[colIdx]
	rowVal = turn
	collArr[rowIdx] = turn
	const boxId = `c${colIdx}r${rowIdx}`
	const cellEl = document.getElementById(boxId)
	cellEl.setAttribute('id','cellEl')
		cellEl.innerHTML = `<h1>${PLAYERS[rowVal]}</h1>`
	turn = turn*-1
	renderMessage()
	winner = getWinner(board,colIdx,rowIdx,rowVal)
	
	
}

function getWinner(board,colIdx,rowIdx,rowVal){
	console.log(`	col idx ${colIdx}
					row idx ${rowIdx}	
					row cal ${rowVal}`)
	checkVertical(board,colIdx,rowIdx,rowVal)
	checkHorizontal(board,colIdx,rowIdx,rowVal)
	
	
}

function checkVertical(board,colIdx,rowIdx,rowVal){
	
}

function checkHorizontal(board,colIdx,rowIdx,rowVal){

}

function renderMessage(){
	
	console.log(turn)
	if(winner === 'T'){
        messageEl.innerText = "IT's A TIE!!!"
    } else if (winner === 1 || winner === -1){
        messageEl.innerHTML = `${PLAYERS[turn]}Wins!!`
        
    } else {
        messageEl.innerHTML = `${PLAYERS[turn].toUpperCase()}'s Turn`
		if(turn === 1){
			messageEl.style.color = 'pink'
		} else if (turn === -1){
			messageEl.style.color = 'green'
		}

}
}


function renderControls(){
	playAgainBtn.style.visibility = winner ? 'visible':  'hidden'
}


