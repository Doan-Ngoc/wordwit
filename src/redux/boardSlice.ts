import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import wordList from "../wordList.json"
import { boardState, hintsState } from './interface'

let randomNum = Math.floor(Math.random() * wordList.length);

// export interface boardState {
//    board: string[],
//    pos: number,
//    row: number,
//    correctWord: string,
//    guessedLetters: string[]
//   }

const initialState : boardState = {
    board:["", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", ""
       ],
    pos: 0,
    row: 0,
    correctWord: wordList[randomNum].word.toUpperCase(),
    hints: {
        hintUsed: 0,
        hintGiven: [],
        guessedLetters: []
    }
}
export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setBoard: (state, action) => {
            state.board = action.payload
        },
        incPos: (state) => {
            state.pos++
        },
        decPos: (state) => {
            state.pos--
        },
        incRow:(state) => {
            state.row++
        },
        addGuessedLetter: (state, action) => {
            state.hints.guessedLetters.push(action.payload);
        }
        ,
        getHint: (state, action) => {
            const hintedLetter = action.payload;
            // Check if the letter is not already in the guessedLetters array
            if (state.hints.hintUsed < 3) {
            if (!state.hints.guessedLetters.includes(hintedLetter)) {
             state.hints.guessedLetters.push(hintedLetter);
             state.hints.hintGiven.push(hintedLetter)
             state.hints.hintUsed++
             }
            }
        }
    }
})

export const {setBoard, incPos, decPos, incRow,addGuessedLetter, getHint} = boardSlice.actions
export default boardSlice.reducer