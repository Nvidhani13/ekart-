import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <hr style={styles.divider} />
      <p>&copy; 1996-2024, eKart.com, Inc. or its affiliates</p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: 'white',
    color: 'black',
    padding: '10px',
    textAlign: 'center',
    position: 'fixed',
    bottom: '0',
    width: '100%',
  },
  divider: {
    width: '100px', // Adjust the width of the line
    borderTop: '2px solid #333', // Adjust the color of the line
    margin: '0 auto', // Center the line
  },
};

export default Footer;
