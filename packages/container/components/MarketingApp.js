import React, { useEffect, useRef } from 'react';
import { mount } from 'marketing/MarketingApp';

export default () => {
  const ref = useRef(null);

  console.log('this is container change');

  useEffect(() => {
    if (ref) {
      mount(ref.current)
    }
  }, []);

  return <div ref={ref} />
};