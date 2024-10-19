import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import './keyboard.css'
import Key from '../Key/Key';
import { rootState } from "../interface";
import { setBoard, incPos, decPos, incRow} from '../../redux/boardSlice';

const Keyboard: React.FC = () => {
  const board = useSelector((state:rootState) => state.board.board)
  const position = useSelector((state:rootState) => state.board.pos)
  const reduxRow = useSelector((state:rootState) => state.board.row)
  const dispatch = useDispatch()
  const keyboardRows: string[] = [
        "q w e r t y u i o p",
        "a s d f g h j k l",
        "z x c v b n m",
      ];

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
    if (position % 5 === 0 && position !== 0) {
      dispatch(incRow())
    }
  }

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