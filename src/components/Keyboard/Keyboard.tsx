import React, {useEffect, useState} from 'react'
import './keyboard.css'
import { showSnackbar, endGame } from '../../redux/snackbarSlice';
import AppSnackbar from '../Snackbar/Snackbar';
import wordList from '../../wordList.json'
import { useDispatch, useSelector} from "react-redux";
import Key from '../Key/Key';
import { rootState } from "../../redux/interface";
import { setBoard, decPos, incRow, addGuessedLetter} from '../../redux/boardSlice';

const Keyboard: React.FC = () => {
  const dispatch = useDispatch()
  const board = useSelector((state:rootState) => state.board.board)
  const position = useSelector((state:rootState) => state.board.pos)
  const reduxRow = useSelector((state:rootState) => state.board.row)
  const correctWord = useSelector((state:rootState) => state.board.correctWord)
  // const guessedLetters= useSelector((state:rootState) => state.board.hints.guessedLetters)
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600); // Example breakpoint for small screens
    };

    // Initial check and event listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  const keyboardRows: string[] = [
        "q w e r t y u i o p",
        "a s d f g h j k l",
        "z x c v b n m",
      ];

  let allWords: string[] = wordList.map(item => item.word);
  
  //Word created by the last 5 letters
  let board5Words: string = `${board[position-5]}${board[position-4]}${board[position-3]}${board[position-2]}${board[position-1]}`;

  //Click the Back button
  const clickBack = () => {
    if (Math.floor((position-1)/5) < reduxRow) return
    const newBoard = [...board]
    newBoard[position-1]=""
    dispatch(decPos())
    dispatch(setBoard(newBoard))
  }

  //Click the Enter button
  const clickEnter = () => {
    //Check if the guess is a valid word
    if (!allWords.includes(board5Words.toLowerCase())) {
      dispatch(showSnackbar('Invalid word!'))
    }
    if (allWords.includes(board5Words.toLowerCase())) {
    //If the player has filled up all 6 letters of 1 row
    if (position % 5 === 0 && position !== 0) {
      dispatch(incRow())
      // Track guessed letters
      board5Words.split("").forEach(letter => {
        dispatch(addGuessedLetter(letter))
      });
    //Alert if the player guessed the correct word
      if (board5Words === correctWord) {
        setTimeout(() => {
          dispatch(endGame('You got the right answer!'))
        }, 0)
      }
    //Give the correct answer when the player used all the guesses
      else if (board5Words !== correctWord && position === 30) {
        setTimeout(() => {
          dispatch(endGame("The word is: " + correctWord))
        }, 0);
    }
  }}}

  return (
    <div className='keyboard-container'>
          {isSmallScreen ? (
            <>
        {keyboardRows.map((row, idx) => {
        return (
        <div key={idx} className='letter-row'>
        {row.split(" ").map((letter, letterIdx) => {
          return (
            <div className='letter-button' key={letterIdx}>
              <Key letter={letter} />
            </div>
          )
         })}
         </div>
        )})}
         <div className='letter-row'>
          <span onClick={clickEnter} className="enter-button">
            Enter
          </span>
          <span onClick={clickBack} className="back-button">
            Back
          </span>
        </div>
         </>
          )
      : (
      <>
         {keyboardRows.map((row, idx) => {
        return (
        <div key={idx} className='letter-row'>
            {idx === 2 && (
              <span className="enter-button" onClick={clickEnter}>
                Enter
              </span>
            )}
         {row.split(" ").map((letter, letterIdx) => {
          return (
            <div className='letter-button' key={letterIdx}>
              <Key letter={letter} />
              {letter === "m" && <span className="back-button" onClick={clickBack}>Back</span>}
            </div>
          )
         })}
        </div>
    )})}
      </>
      )}
      <AppSnackbar />
        </div>
  )
}
export default Keyboard