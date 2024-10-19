import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../interface";
import './square.css'
import {motion} from 'framer-motion'

interface IProps {
    val: string,
    squareIdx: number
}

const Square: React.FC<IProps> = (props) => {
    const {val, squareIdx} = props
    //Redux states
    const correctWord = useSelector((state:rootState) => state.board.correctWord)
    const position = useSelector((state:rootState) => state.board.pos)
    const reduxRow = useSelector((state:rootState) => state.board.row)
    //States
    const [correct, setCorrect] = useState<boolean>(false)
    const [almost, setAlmost] = useState<boolean>(false)
    const [wrong, setWrong] = useState<boolean>(false)

  //Logic to calculate which index of the correct word is the current square 
  let wordLastIndex = 4
  let currentPos =
    position === 5
      ? wordLastIndex
      : position > 5 && position % 5 === 0
      ? wordLastIndex
      : (position % 5) - 1

    //Animation
    const variants = {
      filled: () => ({
        scale: [1.2, 1],
        transition: {
          duration: 0.2,
        },
      }),
      unfilled: () => ({
        scale: [1.2, 1],
        transition: {
          duration: 0.2,
        },
      }),
    };

    useEffect(() => {
      if (correctWord[currentPos] === val) {
        setCorrect(true)
      }
      else if (!correct && val !== "" && correctWord.includes(val)) {
          setAlmost(true)
      }
      else if (!correct && val !== "" && !correctWord.includes(val)) {
        setWrong(true)
      }
      return () => {
        setCorrect(false)
        setAlmost(false)
        setWrong(false)
      }
    }, [val])

    const status: any = Math.floor(squareIdx/5) < reduxRow && (correct ? "correct" : almost ? "almost" : wrong ? "wrong" : "")

  return (
    <motion.div animate={val ? "filled" : "unfilled"} variants={variants}>
    <div className='square' id={status}>{val}</div>
    </motion.div>
  )
}

export default Square