import './sidebar.css'
import { Button } from '@mui/material';
import {AutoAwesome, MenuBook} from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector} from "react-redux";
import { rootState } from "../../redux/interface";
import {getHint} from '../../redux/boardSlice';
import { showSnackbar} from '../../redux/snackbarSlice';

const SideBar = () => {
  const correctWord = useSelector((state:rootState) => state.board.correctWord)
  const guessedLetters= useSelector((state:rootState) => state.board.hints.guessedLetters)
  const hintUsed= useSelector((state:rootState) => state.board.hints.hintUsed)
  const hintGiven= useSelector((state:rootState) => state.board.hints.hintGiven)
  const dispatch = useDispatch()

  const hintArray = [...hintGiven, "", "", ""].slice(0, 3); 
  const clickHint = () => {
    const availableLetters = correctWord.split("").filter(letter => !guessedLetters.includes(letter));
    if (availableLetters.length > 0 && hintUsed<3) {
      const randomLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)];
      dispatch(getHint(randomLetter))
      hintArray.push(randomLetter)
    } else if (hintUsed === 3) {
      dispatch(showSnackbar("No more hint available"))
    }
    else if (availableLetters.length <=0) {
      dispatch(showSnackbar("You've got all the needed letters."))
    }
  };

  // Dialog
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    }

  return (
    <div className='sidebar'>
        <Button className='sidebar-btn' endIcon={<MenuBook/>} onClick={handleClickOpen}>Tutorial</Button>
        <div className='hint'>
            <Button className='sidebar-btn' onClick={clickHint} endIcon={<AutoAwesome/>}>Hint</Button>
            <div className='hint-list'>
                {hintArray.map((letter, index) => {
                  if (letter === "") return <span key={index} className='hint-item' />
                    else return <h1 key={index}>{letter}</h1>
          })}
            </div>
        </div>
        {/* Tutorial Dialog */}
        <Dialog onClose={handleClose} open={open}>
        <div className='tutorial-dialog'>
        <DialogTitle>
        Welcome to Wordwit!
        </DialogTitle>
        <DialogContent style={{paddingBottom: "0"}}>
          <Typography>
            Guess the 5-letter word in 6 tries!<br/>
            <b>Enter</b> to submit your guess.<br/>
            Letters show:<br/>
            <span className='tutorial-colorbox' style={{backgroundColor: 'var(--color-green)'}}/>&nbsp;
             Green = Correct letter, right spot!<br/>
            <span className='tutorial-colorbox' style={{backgroundColor: 'var(--bold-yellow)'}}/>&nbsp;
            Yellow = Correct letter, wrong spot.<br/>
            <span className='tutorial-colorbox' style={{backgroundColor: 'var(--color-gray)'}}/>&nbsp;
            Gray = Not in the word.<br/>
            <b>Back</b> to delete letters.<br/>
            <b>Hint</b> to reveal a letter – you get 3 hints!<br/>
            Have fun guessing! 🎉
          </Typography>
        </DialogContent>
        <DialogActions style={{paddingRight: "24px"}}>
          <Button onClick={handleClose}>
            Got it!
          </Button>
        </DialogActions>
        </div>
      </Dialog>
    </div>
  )
}

export default SideBar