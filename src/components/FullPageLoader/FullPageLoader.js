/*<ConfirmPopup
isModalOpen={isExitPage}
handleLogoutConfirm={handleNavigateConfirm}
handleCancel={handleCancelNavigate}
title="Are you sure want to exit ?"
headerTitle="Exit application"
/>*/

import Modal from "react-modal";
import { Loader } from "../../utils/Images";
const FullpageLoader = ({ isOpen }) => {
  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.2)",
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
      isOpen={isOpen}
      style={modalStyles}
      // onRequestClose={() => handleCancel(false)}
    >
      <div className="full-page-loader">
        <img
          className="rotate-img"
          src={Loader?.imgFile}
          alt={Loader?.imgName}
        />
        <span>Loading...</span>
      </div>
    </Modal>
  );
};

export default FullpageLoader;
