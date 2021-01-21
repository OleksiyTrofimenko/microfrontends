import React, { useEffect, useRef } from 'react';
import { mount } from 'auth/AuthApp';
import { useHistory } from 'react-router-dom';

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (ref) {
      const { onParentNavigate } = mount(ref.current, {
        initialPath: history.location.pathname,
        onNavigate: ({ pathname: nextPathname }) => {
          const { pathname } = history.location;

          // prevent history object change loop
          // only if this things are different, we need to navigate
          if (pathname !== nextPathname) {
            history.push(nextPathname);
          }
        },
        onSignIn: () => {
          onSignIn();
        },
        // onSignIn short hand because property is duplicated
      });

      history.listen(onParentNavigate);
    }
  }, []);

  return <div ref={ref} />;
};
