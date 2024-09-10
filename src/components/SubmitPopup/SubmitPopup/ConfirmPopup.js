/*<ConfirmPopup
isModalOpen={isExitPage}
handleLogoutConfirm={handleNavigateConfirm}
handleCancel={handleCancelNavigate}
title="Are you sure want to exit ?"
headerTitle="Exit application"
/>*/

import Modal from "react-modal";
const ConfirmPopup = ({
  isModalOpen,
  handleCancel,
  cancelBtn,
  title,
  handleSubmitConfirm,
  headerTitle,
}) => {
  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.1)",
      zIndex: 999,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      padding: "0px",
      border: "none",
    },
  };
  return (
    <Modal
      isOpen={isModalOpen}
      style={modalStyles}
      onRequestClose={() => handleCancel(false)}
    >
      <div className="logout-confirmation-modal-container">
        <div className="header-modal">
          <span>{headerTitle}</span>
        </div>
        <div className="modal-body">
          <div className="confirmation-text">{title}</div>
          <div className="action-buttons">
            <button
              className="btn-cancel"
              id="btn-cancel"
              onClick={() => handleCancel(false)}
            >
              No
            </button>
            <button
              className="btn-okay"
              id="btn-okay"
              onClick={handleSubmitConfirm}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmPopup;
