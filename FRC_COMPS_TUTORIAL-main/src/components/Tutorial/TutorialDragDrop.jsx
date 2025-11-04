import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

function Draggable({ id, label }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "8px",
    margin: "5px",
    cursor: "grab",
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {label}
    </div>
  );
}

function Droppable({ id, children, isCorrect }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const style = {
    border: "2px dashed gray",
    background: isOver ? "#d4edda" : "white",
    padding: "20px",
    borderRadius: "8px",
    minHeight: "60px",
    minWidth: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: isCorrect === true ? "green" : isCorrect === false ? "red" : "black",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

export default function TutorialDragDrop({ dragDrop }) {
  if (!dragDrop) return null; // Only render if lesson has dragDrop data

  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over) {
      setAnswers((prev) => ({ ...prev, [over.id]: active.id }));
    }
  };

  const handleCheck = () => setChecked(true);

  const isCorrect = (slotId) =>
    checked ? answers[slotId] === dragDrop.correctAnswers[slotId] : null;

  const allCorrect =
    checked &&
    Object.keys(dragDrop.correctAnswers).every(
      (key) => answers[key] === dragDrop.correctAnswers[key]
    );

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h3>{dragDrop.question}</h3>

      <DndContext onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
          {dragDrop.slots.map((slotId) => (
            <Droppable key={slotId} id={slotId} isCorrect={isCorrect(slotId)}>
              {answers[slotId] || "_____"}
            </Droppable>
          ))}
        </div>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {dragDrop.options.map((option) => (
            <Draggable key={option} id={option} label={option} />
          ))}
        </div>
      </DndContext>

      <button
        onClick={handleCheck}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "6px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Check Answer
      </button>

      {checked && (
        <div style={{ marginTop: "20px" }}>
          {allCorrect ? (
            <h3 style={{ color: "green" }}>✅ All answers are correct!</h3>
          ) : (
            <h3 style={{ color: "red" }}>❌ Try again!</h3>
          )}
        </div>
      )}
    </div>
  );
}
