import React from 'react'
import styled from "styled-components";
import Mole from './Mole';
import { useState, useEffect, useCallback } from "react";

const molesArr = [0, 1, 2, 3, 4, 5];

function GameLayout({ randomMole }) {
	const [isStart, setIsStart] = useState(null)
	const [isStop, setIsStop] = useState(false)
	const [hitCount, setHitCount] = useState(0)
	const [moles, setMole] = useState(molesArr)
	let runtimes = 20;
	const startGame = useCallback(() => {

		setIsStart(true)
		selectMole();
	}, [])
	const playAgain = () => {
		setIsStop(false);
		setMole(molesArr);
		console.log(moles,molesArr)
		runtimes = 20;
		setHitCount(0);
		setIsStart(true);
		selectMole();
	}
	const handleHit = () => {

		setHitCount(hitCount + 1);
	}

	const randomTime = (min, max) => {
		return Math.round(Math.random() * (max - min) + min);
	}
	const selectMole = () => {
		let index = Math.floor(Math.random() * 6);
		let lastindex = index;
		setMole(moles => {
			const molesCopy = moles.concat();
			molesCopy[index] = 'peeper';
			return molesCopy;
		});
		if (runtimes !== 0) {
			const time = randomTime(350, 900);
			setTimeout(() => {
				let newLastIndex = lastindex;
				const molesCopy = moles.concat();
				const lastElement = molesCopy[index];
				selectMole();
				setMole(moles => {
					const molesCopy = moles.concat();
					molesCopy[newLastIndex] = lastElement;
					return molesCopy;
				});
			}, time);
			runtimes--;
		}
		else {
			setIsStop(true);
			setMole(molesArr)
		}



	}
	return (
		<div >
			{isStop && (
				<Dialog
					className="finish-dialog"
					title="Time's up"
					text={`Your score is ${hitCount}!`}
					buttonName='Play again'
					callback={playAgain}
				/>
			)}
			{!isStart && (
				<Dialog
					className="start-dialog"
					title="Whack a Mole"
					text="Click the button to start!"
					buttonName="start"
					callback={startGame}
				/>
			)}
			<div className="game-status">
	
				<Display className="score" title="Score" text={hitCount} />
			</div>
			{isStart && (<div className="stage">
				{moles && moles.map((mole, i) =>
					<div className="cell" key={i}>
						<div className="hole-mask">
							<div className="hole">
								<Mole mole={mole} hitIt={handleHit} />

							</div>
						</div>
					</div>
				)}

			</div>
			)}

		</div>
	)
}

const Display = props => (
	<StyledDisplayComponent {...props} />
)
const Dialog = props => (
	<StyledDialogComponent {...props} />
)
const DisplayComponent = ({ className, title, text }) => (
	<div className={className}>{`${title}: ${text}`}</div>
)
const DialogComponent = ({ className, title, text, buttonName, callback }) => (
	<div className={className}>
		<div className="dialog-content">
			<div className="dialog-content-inner">
				<h1 className="dialog-title">{title}</h1>
				<p className="dialog-text">{text}</p>
				<button
					className="dialog-button"
					onClick={callback}
				>
					{buttonName}
				</button>
			</div>
		</div>

	</div>
)
const StyledDialogComponent = styled(DialogComponent)`
	& .dialog-content {
		background-color: white;
    box-sizing: border-box;
		border-radius: 2em;
		color: #333;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 300px;
		text-align: center;
    padding: 2em;
		position: absolute;
		top: calc(50% - 150px);
		left: calc(50% - 200px);
		width: 400px;
		z-index: 2;
	}
	
  & .dialog-title {
    font-size: 1.6em;
    margin: 0;
  }

	& .dialog-text {
		color: #777;
    font-size: 15px;
    margin: 4em 0 0;
	}
  
//   & .dialog-button {
//     font-size: .6em;
// 	margin:2em 0 0;
	
//   }
  .dialog-button {
	margin:2em 0 0;
	box-shadow:inset 0px 1px 0px 0px #caefab;
	background-color:#77d42a;
	border-radius:6px;
	border:1px solid #268a16;
	display:inline-block;
	cursor:pointer;
	color:#306108;
	font-family:Trebuchet MS;
	font-size:15px;
	font-weight:bold;
	padding:6px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #aade7c;
}
.dialog-button:hover {
	background-color:#5cb811;
}
.dialog-button:active {
	position:relative;
	top:1px;
}


	
`


const StyledDisplayComponent = styled(DisplayComponent)`
	font-size: 15px;
`

export default GameLayout
