import * as React from 'react';
import './snackbar.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { endGame, hideSnackbar } from '../../redux/snackbarSlice'; 

const AppSnackbar: React.FC = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state: RootState) => state.snackbar);

  const handleSnackbar = () => {
    dispatch(hideSnackbar());
    if (snackbar.gameEnded) {
    window.location.reload();
    }
  };

  const action = (
    <React.Fragment>
      <button className="snackbar-btn" color="success" onClick={handleSnackbar} style={{
         border: 'none',
         marginRight: "15px",
         cursor:"pointer"
      }}
      
      >
        {snackbar.gameEnded ? "New Game" : "OK"}
      </button>
    </React.Fragment>
  );

  return (
    <Box sx={{width: '100%'}}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbar.open}
        onClose={handleSnackbar}
        message={snackbar.message}
        action={action}
        sx={{ '& .MuiSnackbarContent-root': { 
            backgroundColor: 'var(--bold-yellow)',
            color: 'black'
        }}}
      />
    </Box>
  );
};

export default AppSnackbar;
