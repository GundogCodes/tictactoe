	/*----- constants -----*/

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
	console.log(boxEls)
	const messageEl  = document.querySelector('h3')


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
	renderBoard()
	renderMessage()
	renderControls()
}

function handleClick(e){
	//update board
	const clickedBox = e.currentTarget.getAttribute('id')
	const colIdx = clickedBox[1]
	const rowIdx = clickedBox[3]
	console.log('clickedBox',clickedBox,colIdx,rowIdx,'turn: ', turn)
	const colArr = board[colIdx]
	//console.log(board)
	colArr[rowIdx] = turn
	rowVal  = turn
	board[colIdx][rowIdx] = rowVal
	
	console.log('this is row val',rowVal)
	console.log(' PLAYERS RowVal',PLAYERS[rowVal])

	renderBoard()
	

	
	turn = turn *-1
	renderMessage()
}

function getWinner(board,colIdx,rowIdx,rowVal){
	console.log(`col idx ${colIdx}
row idx ${rowIdx}	
row val(turn) ${rowVal}`)
	checkVerticalWin(colIdx,rowIdx) ||
	checkHorizontal(colIdx,rowIdx) ||
	checkDiagonalWin(colIdx,rowIdx);
}

function checkVerticalWin(colIdx,rowIdx){
	
}

function checkHorizontalWin(colIdx,rowIdx){
	
	
}

function renderMessage(){
	
	if(winner === 'T'){
        messageEl.innerText = "IT's A TIE!!!"
    } else if (winner === 1 || winner === -1){
        messageEl.innerHTML = `${PLAYERS[winner].toUpperCase()} WINS!`
		if(winner === 1){
			messageEl.style.color = xColor
		} else if (winner === -1){
			messageEl.style.color = oColor
		}
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
	board.forEach(function(colArr,colIdx){
		colArr.forEach(function(rowVal,rowIdx){
			const boxId = `c${colIdx}r${rowIdx}`
			const boxEl = document.getElementById(boxId)
			boxEl.innerHTML = `<h1>${PLAYERS[rowVal]}</h1>`
			if(rowVal ===1){
				boxEl.style.color = xColor
			} else if(rowVal === -1){
				boxEl.style.color = oColor
			} else if(rowVal === 0){
				boxEl.style.color = 'white'
			}
			

		})
	})

}
