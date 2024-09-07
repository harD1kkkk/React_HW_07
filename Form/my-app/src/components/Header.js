import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Modal } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import LoginPage from '../components/LoginPage';

function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyWebsite
          </Typography>
          {currentUser ? (
            <Typography variant="h6">
              Welcome, {currentUser.username}
            </Typography>
          ) : (
            <IconButton color="inherit" onClick={openModal}>
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Modal open={modalIsOpen} onClose={closeModal}>
        <div style={styles.modalContent}>
          <LoginPage closeModal={closeModal} />
        </div>
      </Modal>
    </>
  );
}

const styles = {
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: 24,
  },
};

export default Header;