export interface hintsState {
    hintUsed: number;
    hintGiven: string[],
    guessedLetters: string[];
}

export interface boardState {
    board: string[],
    pos: number,
    row: number,
    correctWord: string,
    hints: hintsState
}

export interface rootState {
    board: boardState
}