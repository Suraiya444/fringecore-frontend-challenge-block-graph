// import React, { useState } from "react";
import Block from "./Components/Block";
import { useState } from "react";

const App = () => {
  const [blocks, setBlocks] = useState([
    { id: 1, x: Math.random() * 500, y: Math.random() * 500, parent: null },
  ]);

  const addBlock = (parentId) => {
    setBlocks((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        x: Math.random() * 500,
        y: Math.random() * 500,
        parent: parentId,
      },
    ]);
  };

  const updateBlockPosition = (id, x, y) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, x, y } : block))
    );
  };

  return (
    <div className="relative w-screen h-screen bg-gray-100">
      {blocks.map((block) => (
        <Block
          key={block.id}
          block={block}
          addBlock={addBlock}
          updateBlockPosition={updateBlockPosition}
          connections={blocks}
        />
      ))}
    </div>
  );
};

export default App;
