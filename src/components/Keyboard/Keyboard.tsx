import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector} from "react-redux";
import './keyboard.css'
import wordList from '../../wordList.json'
import Key from '../Key/Key';
import { rootState } from "../../redux/interface";
import { setBoard, incPos, decPos, incRow, addGuessedLetter} from '../../redux/boardSlice';

const Keyboard: React.FC = () => {
  const board = useSelector((state:rootState) => state.board.board)
  const position = useSelector((state:rootState) => state.board.pos)
  const reduxRow = useSelector((state:rootState) => state.board.row)
  const correctWord = useSelector((state:rootState) => state.board.correctWord)
  const guessedLetters= useSelector((state:rootState) => state.board.hints.guessedLetters)
  const dispatch = useDispatch()
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
    // dispatch(getHint("a"))
    console.log( correctWord )
    console.log('boardword', board5Words)
    //Check if the guess is a valid word
    if (!allWords.includes(board5Words.toLowerCase())) {
      alert("Invalid word")
    }
    if (allWords.includes(board5Words.toLowerCase())) {
    //If the player has filled up all 6 letters of 1 row
    if (position % 5 === 0 && position !== 0) {
      dispatch(incRow())
      console.log('board5words', board5Words)
      // Track guessed letters
      board5Words.split("").forEach(letter => {
        dispatch(addGuessedLetter(letter))
      });
    //Alert if the player guessed the correct word
      if (board5Words === correctWord) {
        console.log('doan dung')
        setTimeout(() => {
          alert("You got the right answer!");
          window.location.reload();
        }, 0)
      }
    //Give the correct answer when the player used all the guesses
      else if (board5Words !== correctWord && position === 30) {
        setTimeout(() => {
          alert("The word is: " + correctWord);
          window.location.reload();
        }, 0);
    }
  }}}

  return (
    <div className='keyboard-container'>
        {keyboardRows.map((row, idx) => {
        return (
        <div key={idx} className='row'>
            {idx === 2 && (
              <span className='letter-row' onClick={clickEnter}>
                Enter
              </span>
            )}
         {row.split(" ").map((letter, letterIdx) => {
          return (
            <div className='letter-row' key={letterIdx}>
              <Key letter={letter} />
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