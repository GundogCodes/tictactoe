	/*----- constants -----*/

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

	const PLAYERS = {
		'0':' ',
		'1':'x',
		'-1':'o'
	}

	const winAmount = 2
	const xColor = '#D62828'
	const oColor = '#FCBF49'
	

	/*----- state variables -----*/
	let turn;
	let winner;
	let board;



	/*----- cached elements  -----*/
	const playAgainBtn = document.querySelector('button')
	const boxEls = [...document.querySelectorAll('#board > div')]
	const messageEl  = document.querySelector('h3')
	//console.log(boxEls)
	/*----- event listeners -----*/
	playAgainBtn.addEventListener('click',init)

	//document.querySelector('#board > div').addEventListener('click',handleClick)
	boxEls.forEach(function(box){
		box.addEventListener('click',handleClick)
	})
	


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

	renderMessage()
	renderControls()
	
}


function handleClick(e){
	//update board
	const clickedBox = e.currentTarget.getAttribute('id')
	const colIdx = clickedBox[1]
	const rowIdx = clickedBox[3]
	console.log(colIdx,rowIdx,'turn: ', turn)
	const colArr = board[colIdx]
	console.log(board)
	colArr[rowIdx] = turn
	rowVal  = turn
	board[colIdx][rowIdx] = rowVal
	
	console.log('this is row val',rowVal)
	console.log(' PLAYERS RowVal',PLAYERS[rowVal])

	
	const boxEl = document.getElementById(clickedBox)
	boxEl.innerHTML =`<h1>${PLAYERS[turn]}</h1>`
	boxEl.setAttribute('id','boxEl')
	if(rowVal ===1){
		boxEl.style.color = xColor
	} else if(rowVal === -1){
		boxEl.style.color = oColor
	}

	turn = turn *-1
	render()
	
	

}

function getWinner(board,colIdx,rowIdx,rowVal){
	console.log(`col idx ${colIdx}
row idx ${rowIdx}	
row val(turn) ${rowVal}`)
	checkVertical(board,colIdx,rowIdx,rowVal)
	checkHorizontal(board,colIdx,rowIdx,rowVal)
	
	
}

function checkVertical(board,colIdx,rowIdx){
	
}

function checkHorizontal(board,colIdx,rowIdx){
	
	
}



function renderMessage(){
	
	//console.log(turn)
	if(winner === 'T'){
        messageEl.innerText = "IT's A TIE!!!"
    } else if (winner === 1 || winner === -1){
        messageEl.innerHTML = `${PLAYERS[winner]}Wins!!`
        
    } else {
        messageEl.innerHTML = `${PLAYERS[turn].toUpperCase()}<span>'s Turn</span>`
		if(turn === 1){
			messageEl.style.color = xColor
		} else if (turn === -1){
			messageEl.style.color = oColor
		}

}
}


function renderControls(){
	playAgainBtn.style.visibility = winner ? 'visible':  'hidden'
}






function renderBoard(){
	
   
	
  
}
 
