import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

function HomePage() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
  }, []);

  return (
    <div>
      <Header />
      <main style={styles.main}>
        {currentUser ? (
          <h1>Welcome, {currentUser.username}!</h1>
        ) : (
          <h1>Welcome to MyWebsite!</h1>
        )}
        <p>This is the home page.</p>
      </main>
    </div>
  );
}

const styles = {
  main: {
    padding: '2rem',
    textAlign: 'center',
  },
};

export default HomePage;