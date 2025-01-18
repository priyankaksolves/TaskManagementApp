import React from 'react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Are you sure?</h3>
        <p>Do you really want to delete this item? This process cannot be undone.</p>
        <div style={styles.buttons}>
          <button style={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button style={styles.confirmButton} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    textAlign: 'center' as const,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  buttons: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  confirmButton: {
    backgroundColor: '#d9534f',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ConfirmDeleteModal;
