import { useEffect, useRef } from 'react';

const withStateRef = (WrappedComponent) => {
  function useStateRef(state) {
    const stateRef = useRef(state);
    useEffect(() => {
      stateRef.current = state;
    });
    return stateRef;
  }

  return () => <WrappedComponent useStateRef={useStateRef} />;
};

export default withStateRef;
