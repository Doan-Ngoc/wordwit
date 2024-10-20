import React, {useEffect} from 'react'
import { useDispatch, useSelector,  } from "react-redux";
import './keyboard.css'
import wordList from '../../words.json'
import Key from '../Key/Key';
import { rootState } from "../interface";
import { setBoard, incPos, decPos, incRow} from '../../redux/boardSlice';

const Keyboard: React.FC = () => {
  const board = useSelector((state:rootState) => state.board.board)
  const position = useSelector((state:rootState) => state.board.pos)
  const reduxRow = useSelector((state:rootState) => state.board.row)
  const correctWord = useSelector((state:rootState) => state.board.correctWord)
  const dispatch = useDispatch()
  const keyboardRows: string[] = [
        "q w e r t y u i o p",
        "a s d f g h j k l",
        "z x c v b n m",
      ];

  let allWords: string[] = wordList.words;
  //Word created by the last 5 letters
  let board5Words: string = `${board[position-5]}${board[position-4]}${board[position-3]}${board[position-2]}${board[position-1]}`.toLowerCase();

  useEffect(() => {
    if (board5Words === correctWord) {
      alert("You got the right answer!");
    }
  }, [board5Words, correctWord]);


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
    console.log( correctWord )
    if (!allWords.includes(board5Words)) {
      alert("Invalid word")
    }
    if (allWords.includes(board5Words)) {
    if (position % 5 === 0 && position !== 0) {
      dispatch(incRow())
  //Alert if the player guessed the correct word
      if (board5Words.toUpperCase() === correctWord) {
        setTimeout(() => {
          alert("You got the right answer!");
        }, 0)
      }
    //Give the correct answer when the player used all the guesses
      else if (board5Words.toUpperCase() !== correctWord && position === 30) {
        setTimeout(() => {
          alert("The word is: " + correctWord);
        }, 0);
    }
  }}}
    // if(position === 30 && allWords.includes(board5Words)) {
    //   alert("The word is: " + correctWord);
    // }
  // }

  return (
    <div className='keyboard-container'>
        {keyboardRows.map((row, idx) => {
        return (
        <div className='row'>
            {idx === 2 && (
              <span className='letter-row' onClick={clickEnter}>
                Enter
              </span>
            )}
         {row.split(" ").map((letter, idx) => {
          return (
            <div className='letter-row'>
              <Key letter={letter.toUpperCase()} />
              {letter === "m" && <span onClick={clickBack}>Back</span>}
            </div>
          )
         })}
        </div>
    )})}
    </div>
  )
}
export default Keyboard