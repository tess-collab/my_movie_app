import React, { useEffect } from 'react';

function AlertBox({ message, onClose }) {
    // Automatically close the alert after a few seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Alert will disappear after 3 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div style={styles.alertBox}>
            <p>{message}</p>
            <button onClick={onClose} style={styles.closeButton}>×</button>
        </div>
    );
}

const styles = {
    alertBox: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        backgroundColor: '#4caf50',
        color: 'white',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
    },
    closeButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default AlertBox;
