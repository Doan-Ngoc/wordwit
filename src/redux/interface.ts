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

export interface SnackbarState {
    message: string;
    open: boolean;
    gameEnded: boolean
}

export interface rootState {
    board: boardState,
    hint: hintsState,
    snackbar: SnackbarState
}