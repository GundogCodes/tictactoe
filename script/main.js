	//TicTacToe
	//Gunish Sharma
	/*----- constants -----*/

	const PLAYERS = {
		'0':' ',
		'1':'x',
		'-1':'o'
	}

	const winAmount = 3
	const xColor = '#D62828'
	const oColor = '#FCBF49'
	
	/*----- state variables -----*/

	let turn;
	let winner;
	let board;
	let xPoints;
	let oPoints;

	let gameWinner;

	/*----- cached elements  -----*/
	const xPointsEl = document.getElementById('xPoints')
	const oPointsEl = document.getElementById('oPoints')
	const playAgainBtn = document.querySelector('button')
	const boxEls = [...document.querySelectorAll('#board > div')]
	//console.log(boxEls)
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
		xPoints = 0
		oPoints = 0
		turn = 1
		winner = null
		gameWinner = null
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
		renderBoard(winner)
		renderControls()
		renderPoints(xPoints,oPoints)
		
	}


	function handleClick(e){
		//update board
		const clickedBox = e.currentTarget.getAttribute('id')
		let colIdx = clickedBox[1]
		let rowIdx = clickedBox[3]
		console.log('clickedBox',clickedBox,colIdx,rowIdx,'turn: ', turn)
		const colArr = board[colIdx]
		//console.log(board)
		colArr[rowIdx] = turn
		rowVal  = turn
		board[colIdx][rowIdx] = rowVal
		
		//console.log('this is row val',rowVal)
		//console.log(' PLAYERS RowVal',PLAYERS[rowVal])

		renderBoard()
		colIdx = parseInt(colIdx)
		rowIdx = parseInt(rowIdx)
		turn = parseInt(turn)
		winner = getWinner(colIdx,rowIdx,turn)
		
		console.log('Winner is:',winner,'!!')
		turn = turn *-1
		
		renderMessage(winner)
		if(winner === undefined){
			winner = checkForTie()
			console.log('should be T',winner)
			renderMessage(winner)
			
		
		} else if(winner === 1){
			xPoints ++
			
			clearBoard()
			
		} else if (winner ===-1){
			oPoints ++
		
			clearBoard()
			
		}
		
		renderPoints(xPoints,oPoints)
		
		renderControls()
	
	}

	function getWinner(colIdx,rowIdx,turn){
		console.log(`col idx ${colIdx}
	row idx ${rowIdx}	
	row val(turn) ${turn}`)
		let vWin = checkVerticalWin(colIdx,rowIdx,turn) 
		let hWin = checkHorizontalWin(colIdx,rowIdx,turn) 
		let dWin = checkDiagonalWin(colIdx,rowIdx,turn);
		if(vWin){
			return vWin
		} else if(hWin){
			return hWin
		} else if(dWin){
			return dWin
		} else {return}
	}

	function checkVerticalWin(colIdx,rowIdx,rowVal){
		//console.log('rowVal: ',rowVal)
		const countDown = countAdjacent(colIdx,rowIdx,0,1)
		const countUp = countAdjacent(colIdx,rowIdx,0,-1)
		//console.log('count down: ',countDown, '+ count Up: ',countUp,'=',countDown+countUp )
		if(countDown === 2 || countUp ===2 || (countDown+countUp === 2)){
			console.log('Winner is:',rowVal,'!!')
			return rowVal
		}

	}

	function checkHorizontalWin(colIdx,rowIdx,rowVal){
		console.log('rowVal: ',rowVal)
		const countRight = countAdjacent(colIdx,rowIdx,1,0)
		const countLeft = countAdjacent(colIdx,rowIdx,-1,0)
		console.log('count Right: ',countRight, '+ count Left: ',countLeft	,'=',countRight+countLeft )
		if(countRight === 2 || countLeft ===2 || (countRight+countLeft === 2)){
			console.log('Winner is:',rowVal,'!!')
			return rowVal
		}
	}

	function checkDiagonalWin(colIdx,rowIdx,rowVal){
		console.log('rowVal: ',rowVal)
		const topRight = countAdjacent(colIdx,rowIdx,1,1)
		const topLeft = countAdjacent(colIdx,rowIdx,1,-1)
		const bottomRight = countAdjacent(colIdx,rowIdx,-1,1)
		const bottomLeft = countAdjacent(colIdx,rowIdx,-1,-1)
		console.log('topRight: ',topRight, '+ topLeft: ',topLeft,'+ bottom right',bottomRight,'+ bottom left','=',topRight+topRight+bottomRight+bottomLeft )
		if(topRight === 2 || topLeft ===2 || bottomRight===2|| bottomLeft===2||(topRight+bottomLeft === 2)|| (topLeft+bottomRight) ===2){
			console.log('Winner is:',rowVal,'!!')
			return rowVal
		}
	}

	function countAdjacent(colIdx,rowIdx,colOffset,rowOffset){
		console.log('type of colIdx',typeof(colIdx))
		let count = 0
		//Take in the current board positon
		const turnVal = board[colIdx][rowIdx]
		console.log('turn Val: ',turnVal)
		//based off which direction we're checking 
		colIdx += colOffset
		rowIdx += rowOffset
		console.log('colIdx,rowIdx after offset', colIdx,rowIdx)
		while(
			board[colIdx] !== undefined &&
			board[colIdx][rowIdx] !== undefined &&
			board[colIdx][rowIdx] === turnVal
		){

			count ++
			colIdx += colOffset
			rowIdx += rowOffset
		}
		//if in that direction there is the same row val as the current position add 1 to counter
		//if counter ==1 that means we have 3 of the same row vals in that direction meaning we have a winner
		return count
		
	}
	function checkForTie(){
		let boxFilled = 0
		board.forEach(function(colArr){
			colArr.forEach(function(rowVal){
				if (rowVal === 1 || rowVal ===-1){
					boxFilled++
				}
			})
		})
		console.log('All boxes filled?',boxFilled)
		if(boxFilled ===9){
			winner = 'T'
		}
		return winner
	}
	function renderMessage(winner){
		
		if(winner === 'T'){
			messageEl.innerText = "IT's A TIE!!!"
			clearBoard()
		} else if (winner === 1 || winner === -1){
			messageEl.innerHTML = `${PLAYERS[winner].toUpperCase()} WINS!`
			if(winner === 1){
				messageEl.style.color = xColor
			} else if (winner === -1){
				messageEl.style.color = oColor
			} else if (winner === null){ return }
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
		playAgainBtn.style.visibility = gameWinner ? 'visible':  'hidden'
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

	function renderPoints(xPoints,oPoints){
		console.log('The Points are XPoints: ',xPoints,'OPoints: ', oPoints)
		xPointsEl.style.color = xColor
		xPointsEl.innerHTML = xPoints
		
		oPointsEl.innerHTML = oPoints
		oPointsEl.style.color = oColor
		if(xPoints ===winAmount || oPoints ===winAmount){
			gameWinner = true
			renderControls()
		}
		
	}

	function clearBoard(){
		board.forEach(function(colArr,colIdx){
			colArr.forEach(function(rowVal,rowIdx){
				rowVal = 0
				const boxId = `c${colIdx}r${rowIdx}`
				const boxEl = document.getElementById(boxId)
				boxEl.innerHTML = ``
				

			})
		})
		board = [
			[0,0,0], //column 0
			[0,0,0], //column 1
			[0,0,0] //column 2
		//	r0 r1 r2
		]
	}



//THE END