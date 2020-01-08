/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';

const withSmallModal = (WrappedComponent) => (props) => {
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
            z-index: 4000;
            visibility: hidden;
            -webkit-backface-visibility: hidden;
            -moz-backface-visibility: hidden;
            backface-visibility: hidden;
            -webkit-transform: translateX(-50%) translateY(-50%);
            -moz-transform: translateX(-50%) translateY(-50%);
            -ms-transform: translateX(-50%) translateY(-50%);
            transform: translateX(-50%) translateY(-50%);
          }
          .md-show {
            visibility: visible;
          }
          .md-content {
            -webkit-transform: scale(0.7);
            -moz-transform: scale(0.7);
            -ms-transform: scale(0.7);
            transform: scale(0.7);
            opacity: 0;
            -webkit-transition: all 0.3s;
            -moz-transition: all 0.3s;
            transition: all 0.3s;
            background-color: #fefefe;
            position: relative;
            border-radius: 3px;
            margin: 0 auto;
          }
          .md-show .md-content {
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            transform: scale(1);
            opacity: 1;
          }
          .md-overlay {
            position: fixed;
            width: 100%;
            height: 100%;
            visibility: hidden;
            top: 0;
            left: 0;
            z-index: 3000;
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

export default withSmallModal;
