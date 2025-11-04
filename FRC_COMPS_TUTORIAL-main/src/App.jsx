import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Auth/Login";
import Header from "./components/Common/Header";
import TutorialList from "./components/Tutorial/TutorialList";
import { useProgress } from "./hooks/useProgress";
import ReactMarkdown from "react-markdown";
import { DndContext, useDraggable, useDroppable, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./App.css";

// ------------------------
// Quiz Component
// ------------------------
const QuizView = ({ lesson, onAnswer, userAnswer, isCorrect, showResult }) => {
  const [selectedOption, setSelectedOption] = useState(userAnswer || "");

  const handleSubmit = () => {
    if (selectedOption) onAnswer(selectedOption);
  };

  const getOptionStyle = (optionKey) => {
    const baseStyle = {
      padding: "15px",
      margin: "10px 0",
      border: "2px solid #ddd",
      borderRadius: "8px",
      cursor: "pointer",
      backgroundColor: "white",
      transition: "all 0.2s ease",
    };

    if (!showResult) {
      return {
        ...baseStyle,
        backgroundColor: selectedOption === optionKey ? "#e3f2fd" : "white",
        borderColor: selectedOption === optionKey ? "#2196f3" : "#ddd",
      };
    }

    if (optionKey === lesson.correctAnswer) {
      return { ...baseStyle, backgroundColor: "#d4edda", borderColor: "#28a745", color: "#155724" };
    }

    if (selectedOption === optionKey && optionKey !== lesson.correctAnswer) {
      return { ...baseStyle, backgroundColor: "#f8d7da", borderColor: "#dc3545", color: "#721c24" };
    }

    return { ...baseStyle, opacity: 0.6 };
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>{lesson.title}</h3>
      <div style={{ marginBottom: "20px", lineHeight: "1.6" }}>
        <ReactMarkdown>{lesson.content}</ReactMarkdown>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>Question:</h4>
        <p style={{ fontSize: "16px", fontWeight: "500", marginBottom: "20px" }}>
          {lesson.question}
        </p>

        <div>
          {Object.entries(lesson.options).map(([key, value]) => (
            <div
              key={key}
              style={getOptionStyle(key)}
              onClick={() => !showResult && setSelectedOption(key)}
            >
              <label style={{ cursor: "pointer", display: "block", width: "100%" }}>
                <input
                  type="radio"
                  name="quiz-option"
                  value={key}
                  checked={selectedOption === key}
                  onChange={() => !showResult && setSelectedOption(key)}
                  style={{ marginRight: "10px" }}
                  disabled={showResult}
                />
                <strong>{key.toUpperCase()}:</strong> {value}
              </label>
            </div>
          ))}
        </div>
      </div>

      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          style={{
            padding: "12px 24px",
            backgroundColor: selectedOption ? "#007bff" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: selectedOption ? "pointer" : "not-allowed",
            fontSize: "16px",
          }}
        >
          Submit Answer
        </button>
      )}

      {showResult && (
        <div style={{ marginTop: "20px" }}>
          {isCorrect ? (
            <div style={{ padding: "15px", backgroundColor: "#d4edda", color: "#155724", borderRadius: "4px" }}>
              <strong>✅ Correct!</strong> {lesson.explanation}
            </div>
          ) : (
            <div style={{ padding: "15px", backgroundColor: "#f8d7da", color: "#721c24", borderRadius: "4px" }}>
              <strong>❌ Incorrect.</strong> {lesson.explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ------------------------
// Drag-and-Drop Components
// ------------------------
function Droppable({ id, children, label }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      data-droppable-id={id}
      style={{
        minHeight: "150px",
        padding: "10px",
        border: "2px dashed #ccc",
        borderRadius: "8px",
        backgroundColor: isOver ? "#d4edda" : "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "stretch",
      }}
    >
      {children.length === 0 ? <span style={{ color: "#888" }}>{label ?? "Drop blocks here"}</span> : children}
    </div>
  );
}

function Draggable({ id, label }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    padding: "10px 12px",
    margin: "6px 6px 0 0",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "6px",
    cursor: "grab",
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    whiteSpace: "pre",
    fontFamily: "Fira Code, Menlo, Monaco, Consolas, 'Courier New', monospace",
    fontSize: "0.9rem",
    lineHeight: "1.4",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    textAlign: "left",
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <code style={{ display: "block", whiteSpace: "pre" }}>{label}</code>
    </div>
  );
}

const SortableBlock = ({ id, block, removeBlock }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    padding: "10px 12px",
    margin: "6px 0",
    backgroundColor: "#e3f2fd",
    border: "1px solid #2196f3",
    borderRadius: "6px",
    cursor: "grab",
    transform: CSS.Transform.toString(transform),
    transition,
    whiteSpace: "pre",
    fontFamily: "Fira Code, Menlo, Monaco, Consolas, 'Courier New', monospace",
    fontSize: "0.9rem",
    lineHeight: "1.4",
    textAlign: "left",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onDoubleClick={() => removeBlock(id)}
    >
      <code style={{ display: "block", whiteSpace: "pre" }}>{block}</code>
    </div>
  );
};

// ------------------------
// Coding View
// ------------------------
const CodingView = ({ lesson, isCorrect, onCheck, showHint, setShowHint }) => {
  const [availableBlocks, setAvailableBlocks] = useState([]);
  const [userBlocks, setUserBlocks] = useState([]);

  useEffect(() => {
    setAvailableBlocks([...lesson.codeBlocks].sort(() => Math.random() - 0.5));
    setUserBlocks([]);
  }, [lesson]);

  const removeBlock = (blockId) => {
    setUserBlocks(userBlocks.filter((b) => b !== blockId));
    setAvailableBlocks([...availableBlocks, blockId]);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", minHeight: "500px" }}>
      {/* Instructions */}
      <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
        <h3>{lesson.title}</h3>
        <ReactMarkdown>{lesson.content}</ReactMarkdown>
        {isCorrect === true && <div style={{ marginTop: "10px", color: "green" }}>✅ Correct!</div>}
        {isCorrect === false && <div style={{ marginTop: "10px", color: "red" }}>❌ Try again!</div>}
        <button
          onClick={() => setShowHint(!showHint)}
          style={{
            padding: "10px 20px",
            marginTop: "10px",
            backgroundColor: "#ffc107",
            color: "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {showHint ? "Hide" : "Show"} Solution
        </button>
        {showHint && (
          <pre
            style={{
              backgroundColor: "#f8f9fa",
              padding: "10px",
              borderRadius: "4px",
              marginTop: "10px",
            }}
          >
            {lesson.solution.join("\n")}
          </pre>
        )}
      </div>

      {/* Drag-and-Drop */}
      <div>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={(event) => {
            const { active, over } = event;
            const activeId = active?.id;
            const overId = over?.id ?? null;
            if (!activeId) return;

            const fromAvailable = availableBlocks.includes(activeId);
            const fromUser = userBlocks.includes(activeId);

            // Drag from available -> dropzone
            if (fromAvailable && overId === "dropzone") {
              setAvailableBlocks((prev) => prev.filter((b) => b !== activeId));
              setUserBlocks((prev) => [...prev, activeId]);
              return;
            }

            // Drag from available -> insert before a block in dropzone
            if (fromAvailable && userBlocks.includes(overId)) {
              setAvailableBlocks((prev) => prev.filter((b) => b !== activeId));
              setUserBlocks((prev) => {
                const copy = [...prev];
                const idx = copy.indexOf(overId);
                copy.splice(idx, 0, activeId);
                return Array.from(new Set(copy));
              });
              return;
            }

            // Reorder inside dropzone
            if (fromUser && userBlocks.includes(overId)) {
              const oldIndex = userBlocks.indexOf(activeId);
              const newIndex = userBlocks.indexOf(overId);
              if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
                setUserBlocks(arrayMove(userBlocks, oldIndex, newIndex));
              }
              return;
            }

            // Dragging from dropzone back to available
            if (fromUser && (overId === "availableZone" || !overId)) {
              setUserBlocks((prev) => prev.filter((b) => b !== activeId));
              setAvailableBlocks((prev) => [...prev, activeId]);
              return;
            }
          }}
        >
          {/* Dropzone */}
          <Droppable id="dropzone" label="Drop blocks here">
            <SortableContext items={userBlocks} strategy={rectSortingStrategy}>
              {userBlocks.map((b) => (
                <SortableBlock key={b} id={b} block={b} removeBlock={removeBlock} />
              ))}
            </SortableContext>
          </Droppable>

          {/* Available blocks area */}
          <Droppable id="availableZone" label="Available blocks">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
              {availableBlocks.map((b) => (
                <Draggable key={b} id={b} label={b} />
              ))}
            </div>
          </Droppable>
        </DndContext>

        <button
          onClick={() => onCheck(userBlocks.join("\n") === lesson.solution.join("\n"))}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Check Answer
        </button>
      </div>
    </div>
  );
};

// ------------------------
// Tutorial View
// ------------------------
const TutorialView = ({ tutorial, onBack }) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResult, setShowQuizResult] = useState(false);
  const { updateProgress, isLessonCompleted } = useProgress();

  const currentLesson = tutorial.lessons[currentLessonIndex];
  const isCompleted = isLessonCompleted(tutorial.id, currentLesson.id);
  const isQuizLesson = currentLesson.type === "quiz";
  const isLectureLesson = currentLesson.type === "lecture";

  useEffect(() => {
    setIsCorrect(null);
    setShowHint(false);
    setShowQuizResult(false);
  }, [currentLessonIndex]);

  const handleQuizAnswer = (selectedOption) => {
    const lessonKey = `${tutorial.id}-${currentLesson.id}`;
    setQuizAnswers((prev) => ({ ...prev, [lessonKey]: selectedOption }));

    const correct = selectedOption === currentLesson.correctAnswer;
    setIsCorrect(correct);
    setShowQuizResult(true);

    if (correct) updateProgress(tutorial.id, currentLesson.id);
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < tutorial.lessons.length - 1) setCurrentLessonIndex(currentLessonIndex + 1);
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) setCurrentLessonIndex(currentLessonIndex - 1);
  };

  const markLectureAsComplete = () => {
    updateProgress(tutorial.id, currentLesson.id);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={onBack} style={{ padding: "10px 20px", cursor: "pointer" }}>← Back to Tutorials</button>
        <div style={{ textAlign: "center" }}>
          <h1>{tutorial.title}</h1>
          <p>Lesson {currentLessonIndex + 1} of {tutorial.lessons.length} {isQuizLesson ? " (Quiz)" : " (Coding)"}</p>
        </div>
      </div>

      {isCompleted && <div style={{ padding: "10px", backgroundColor: "#cce5ff", color: "#004085", borderRadius: "4px", marginBottom: "15px", textAlign: "center" }}>🎉 Lesson completed!</div>}

      <div style={{ marginBottom: "20px" }}>
        {isLectureLesson && (
          <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9", marginBottom: "20px" }}>
            <h3>{currentLesson.title}</h3>
            <ReactMarkdown>{currentLesson.content}</ReactMarkdown>
            <button onClick={markLectureAsComplete} style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "20px" }}>Mark as Complete</button>
          </div>
        )}

        {isQuizLesson ? (
          <QuizView
            lesson={currentLesson}
            onAnswer={handleQuizAnswer}
            userAnswer={quizAnswers[`${tutorial.id}-${currentLesson.id}`]}
            isCorrect={isCorrect}
            showResult={showQuizResult}
          />
        ) : (
          !isLectureLesson && (
            <CodingView
              lesson={currentLesson}
              isCorrect={isCorrect}
              onCheck={setIsCorrect}
              showHint={showHint}
              setShowHint={setShowHint}
            />
          )
        )}
      </div>

      <div style={{ marginTop: "30px", display: "flex", justifyContent: "space-between" }}>
        <button onClick={handlePrevLesson} disabled={currentLessonIndex === 0} style={{ padding: "10px 20px", cursor: currentLessonIndex === 0 ? "not-allowed" : "pointer", opacity: currentLessonIndex === 0 ? 0.5 : 1 }}>← Previous Lesson</button>
        <button onClick={handleNextLesson} disabled={currentLessonIndex === tutorial.lessons.length - 1} style={{ padding: "10px 20px", cursor: currentLessonIndex === tutorial.lessons.length - 1 ? "not-allowed" : "pointer", opacity: currentLessonIndex === tutorial.lessons.length - 1 ? 0.5 : 1 }}>Next Lesson →</button>
      </div>
    </div>
  );
};

// ------------------------
// Main App
// ------------------------
const AppContent = () => {
  const { user } = useAuth();
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  if (!user) return <Login />;

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {selectedTutorial ? (
          <TutorialView tutorial={selectedTutorial} onBack={() => setSelectedTutorial(null)} />
        ) : (
          <TutorialList onSelectTutorial={setSelectedTutorial} />
        )}
      </main>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
