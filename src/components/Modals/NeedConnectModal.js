import { useEffect } from 'react';
import PropTypes from 'prop-types';


import SmallModalHOC from '../HOC/SmallModalHOC';

const NoConnectModal = ({
  setModalOpen, modal, setModal, router,
}) => {
  useEffect(() => {
    setModalOpen(modal);
  }, [modal]);

  const goBackToMainPage = () => {
    setModal(false);
    router.push('/');
  };

  return (
    <div className="padding-30 text-align-center">
      <h2 className="font-size-2rem margin-top-5 color-dark-one">Attention!</h2>
      <p className="color-dark-two">
        You need to log in with a username to play BigTwo.io!
      </p>
      <button type="button" onClick={goBackToMainPage} className="padding-20 border-radius-20 background-dark-three color-dark-four">
        Back to Main Page
      </button>

      <style jsx>
        {`

        `}
      </style>
    </div>
  );
};

NoConnectModal.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default SmallModalHOC(NoConnectModal);
