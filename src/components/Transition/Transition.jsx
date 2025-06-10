import React from "react";
import { motion } from "framer-motion";
import "./Transition.css";

const calculateRandomBlockDelay = (rowIndex, totalRows) => {
  const blockDelay = Math.random() * 0.5;
  const rowDelay = (totalRows - rowIndex - 1) * 0.05;
  return blockDelay + rowDelay;
};

// Modified HOC to be compatible with Fast Refresh
const Transition = (Page) => {
  // Create a named component with forwardRef to preserve component identity
  const WrappedComponent = React.forwardRef((props, ref) => {
    return (
      <>
        <Page {...props} ref={ref} />

        <div className="blocks-container transition-in">
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <div className="row" key={rowIndex}>
              {Array.from({ length: 11 }).map((_, blockIndex) => (
                <motion.div
                  key={blockIndex}
                  className="block"
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0 }}
                  exit={{ scaleY: 0 }}
                  transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                    delay: calculateRandomBlockDelay(rowIndex, 10),
                  }}
                ></motion.div>
              ))}
            </div>
          ))}
        </div>

        <div className="blocks-container transition-out">
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <div className="row" key={rowIndex}>
              {Array.from({ length: 11 }).map((_, blockIndex) => (
                <motion.div
                  key={blockIndex}
                  className="block"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 0 }}
                  exit={{ scaleY: 1 }}
                  transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                    delay: calculateRandomBlockDelay(rowIndex, 10),
                  }}
                ></motion.div>
              ))}
            </div>
          ))}
        </div>
      </>
    );
  });
  
  // Set proper display name for React DevTools and debugging
  const displayName = Page.displayName || Page.name || 'Component';
  WrappedComponent.displayName = `Transition(${displayName})`;
  
  return WrappedComponent;
};

export default Transition;
