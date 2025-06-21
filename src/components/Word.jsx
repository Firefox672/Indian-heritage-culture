// Word.js
import React from 'react';

const Word = React.forwardRef(({ children, style }, ref) => {
  return (
    <span ref={ref} className="title-word" style={style}>
      {children}
    </span>
  );
});

export default Word;
