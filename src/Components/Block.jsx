import React, { useRef, useEffect } from "react";

const Block = ({ block, addBlock, updateBlockPosition, connections }) => {
  // Use a ref to keep a reference to the block element
  const blockRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Check if the block is being dragged
      if (blockRef.current && blockRef.current.dataset.dragging === "true") {
        // Get the bounding rectangle of the block's parent element
        const rect = blockRef.current.parentElement.getBoundingClientRect();
        // Calculate the new x and y positions for the block
        const x = e.clientX - rect.left - blockRef.current.offsetWidth / 2;
        const y = e.clientY - rect.top - blockRef.current.offsetHeight / 2;
        // Update the block's position using the provided function
        updateBlockPosition(block.id, x, y);
      }
    };

    const handleMouseUp = () => {
      // Stop dragging the block when the mouse is released
      if (blockRef.current) blockRef.current.dataset.dragging = "false";
    };

    // Add event listeners for mouse move and mouse up
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [updateBlockPosition, block.id]); // Only rerun this effect if updateBlockPosition or block.id changes

  const handleMouseDown = () => {
    // Start dragging the block when the mouse is pressed down
    if (blockRef.current) blockRef.current.dataset.dragging = "true";
  };

  return (
    <>
      {/* Render a line to the parent block if there is one */}
      {block.parent && (
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        >
          <line
            x1={connections.find((b) => b.id === block.parent).x + 50}
            y1={connections.find((b) => b.id === block.parent).y + 25}
            x2={block.x + 50}
            y2={block.y + 25}
            stroke="gray"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>
      )}
      {/* Render the block */}
      <div
        ref={blockRef}
        onMouseDown={handleMouseDown}
        className="absolute w-24 h-12 bg-pink-100 text-white flex items-center justify-center rounded-lg shadow-lg cursor-pointer select-none"
        style={{ top: block.y, left: block.x }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent the event from propagating to parent elements
            addBlock(block.id); // Add a new block
          }}
          className="p-1 bg-pink-600 text-white rounded-md shadow-md hover:bg-pink-700 focus:outline-none"
        >
          +
        </button>
      </div>
    </>
  );
};

export default Block;
