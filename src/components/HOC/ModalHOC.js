/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';

const withModal = (WrappedComponent) => (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className={`md-modal ${modalOpen ? 'md-show' : ''}`}>
        <div className="md-content">
          <WrappedComponent
            setModalOpen={setModalOpen}
            {...props}
          />
        </div>
      </div>
      <div className="md-overlay" />
      <style jsx>
        {`
          .md-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            width: 50%;
            max-width: 630px;
            min-width: 320px;
            height: auto;
            z-index: 2000;
            visibility: hidden;
            backface-visibility: hidden;
            transform: translateX(-50%) translateY(-50%);
          }
          .md-show {
            visibility: visible;
          }
          .md-content {
            background-color: #fefefe;
            margin: 15% auto; /* 15% from the top and centered */
            padding: 20px;
            border: 1px solid #888;
            width: 80%; /* Could be more or less, depending on screen size */
            z-index: 10;
            transition: all 0.3s;
          }
          .md-overlay {
            position: fixed;
            width: 100%;
            height: 100%;
            visibility: hidden;
            top: 0;
            left: 0;
            z-index: 1000;
            opacity: 0;
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
            transition: all 0.3s;
          }

          .md-show ~ .md-overlay {
            opacity: 1;
            visibility: visible;
          }
        `}
      </style>
    </>
  );
};

export default withModal;
