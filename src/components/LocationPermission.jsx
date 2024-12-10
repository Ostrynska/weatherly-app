import React from 'react';

const LocationPermissionModal = ({ onAllow, onBlock }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Weather For You wants to know your current location!</h2>
        <p style={styles.text}>
          <span style={styles.icon}>📍</span> Permission to know your location
        </p>
        <div style={styles.buttons}>
          <button onClick={onAllow} style={styles.allowButton}>
            Allow
          </button>
          <button onClick={onBlock} style={styles.blockButton}>
            Block
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  modal: {
    background: '#fff',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  text: {
    margin: '10px 0',
    fontSize: '16px',
    color: '#333',
  },
  icon: {
    fontSize: '24px',
    marginRight: '5px',
  },
  buttons: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  allowButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  blockButton: {
    backgroundColor: '#ccc',
    color: '#333',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

export default LocationPermissionModal;
