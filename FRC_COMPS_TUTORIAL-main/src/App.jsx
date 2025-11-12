import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Auth/Login";
import Header from "./components/Common/Header";
import TutorialList from "./components/Tutorial/TutorialList";
import { useProgress } from "./hooks/useProgress";
import ReactMarkdown from "react-markdown";
import { DndContext, useDraggable, useDroppable, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { tutorialData } from "./data/tutorialData";
import "./App.css";

/* ============================================================
   MEDIA DISPLAY
   ============================================================ */
const MediaDisplay = ({ media, title }) => {
  if (!media) return null;
  const items = Array.isArray(media) ? media : [media];
  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      {items.map((item, idx) => {
        const key = `${title || "media"}-${idx}`;
        if (item.type === "image") {
          return (
            <img
              key={key}
              src={item.src}
              alt={item.alt || title || "Lesson media"}
              style={{
                maxWidth: "100%",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            />
          );
        }
        if (item.type === "video") {
          const isEmbed =
            typeof item.src === "string" &&
            (item.src.includes("youtube.com") ||
              item.src.includes("vimeo.com") ||
              item.src.includes("embed"));
          if (isEmbed) {
            return (
              <div
                key={key}
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                  overflow: "hidden",
                  borderRadius: "8px",
                  marginBottom: "15px",
                }}
              >
                <iframe
                  src={item.src}
                  title={title || "video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                />
              </div>
            );
          }
          return (
            <video
              key={key}
              src={item.src}
              controls
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            >
              Your browser does not support the video tag.
            </video>
          );
        }
        if (item.type === "audio") {
          return (
            <audio
              key={key}
              src={item.src}
              controls
              style={{
                width: "100%",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              Your browser does not support the audio element.
            </audio>
          );
        }
        if (item.src) {
          return (
            <img
              key={key}
              src={item.src}
              alt={item.alt || title || "Lesson media"}
              style={{
                maxWidth: "100%",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

/* ============================================================
   QUIZ VIEW
   ============================================================ */
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
      return {
        ...baseStyle,
        backgroundColor: "#d4edda",
        borderColor: "#28a745",
        color: "#155724",
      };
    }
    if (selectedOption === optionKey && optionKey !== lesson.correctAnswer) {
      return {
        ...baseStyle,
        backgroundColor: "#f8d7da",
        borderColor: "#dc3545",
        color: "#721c24",
      };
    }
    return { ...baseStyle, opacity: 0.6 };
  };

  return (
    <div style={{ padding: "20px"}}>
      <h3>{lesson.title}</h3>
      <ReactMarkdown>{lesson.content}</ReactMarkdown>
      <MediaDisplay media={lesson.media} title={lesson.title} />
      <div style={{ marginBottom: "20px" }}>
        <h4>Question:</h4>
        <p style={{ fontSize: "16px", fontWeight: "500" }}>{lesson.question}</p>
        <div>
          {Object.entries(lesson.options).map(([key, value]) => (
            <div
              key={key}
              style={getOptionStyle(key)}
              onClick={() => !showResult && setSelectedOption(key)}
            >
              <label style={{ cursor: "pointer", display: "block" }}>
                <input
                  type="radio"
                  name="quiz-option"
                  value={key}
                  checked={selectedOption === key}
                  onChange={() => !showResult && setSelectedOption(key)}
                  disabled={showResult}
                  style={{ marginRight: "10px" }}
                />
                <strong>{key.toUpperCase()}:</strong>
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    fontFamily:
                      "Fira Code, Menlo, Monaco, Consolas, 'Courier New', monospace",
                    fontSize: "0.95rem",
                    lineHeight: "1.5",
                    margin: "8px 0 0 0",
                  }}
                >
                  {value}
                </pre>
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
            <div
              style={{
                padding: "15px",
                backgroundColor: "#d4edda",
                color: "#155724",
                borderRadius: "4px",
              }}
            >
              ✅ Correct! {lesson.explanation}
            </div>
          ) : (
            <div
              style={{
                padding: "15px",
                backgroundColor: "#f8d7da",
                color: "#721c24",
                borderRadius: "4px",
              }}
            >
              ❌ Incorrect. {lesson.explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ============================================================
   DRAG & DROP HELPERS
   ============================================================ */
function Droppable({ id, children, label }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      data-droppable-id={id}
      style={{
        minHeight: "150px",
        padding: "10px",
        border: "2px solid #000",
        // borderWidth: "1px",
        borderRadius: "px",
        backgroundColor: isOver ? "#d4edda" : "#f8f9fa",
      }}
    >
      {children.length === 0 ? (
        <span style={{ color: "#888" }}>{label ?? "Drop blocks here"}</span>
      ) : (
        children
      )}
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
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    whiteSpace: "pre",
    fontFamily:
      "Fira Code, Menlo, Monaco, Consolas, 'Courier New', monospace",
    fontSize: "0.9rem",
    lineHeight: "1.4",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    textAlign: "left",
  };
  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <code>{label}</code>
    </div>
  );
}

const SortableBlock = ({ id, block, removeBlock }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
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
    fontFamily:
      "Fira Code, Menlo, Monaco, Consolas, 'Courier New', monospace",
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
      <code>{block}</code>
    </div>
  );
};

/* ============================================================
   CODING VIEW
   ============================================================ */
const CodingView = ({
  lesson,
  isCorrect,
  onCheck,
  showHint,
  setShowHint,
  feedback,
  incorrectAttempts,
}) => {
  const [availableBlocks, setAvailableBlocks] = useState([]);
  const [userBlocks, setUserBlocks] = useState([]);

  useEffect(() => {
    setAvailableBlocks([...lesson.codeBlocks].sort(() => Math.random() - 0.5));
    setUserBlocks([]);
  }, [lesson]);

  const removeBlock = (blockId) => {
    setUserBlocks((prev) => prev.filter((b) => b !== blockId));
    setAvailableBlocks((prev) => [...prev, blockId]);
  };

  const handleCheck = () => {
    onCheck(userBlocks);
  };

  return (
    <div
      style={{
        // display: "grid",
        // gridTemplateColumns: "1fr 1fr",
        display: "flex",
        alignItems: "flex-start",
        gap: "20px",
        minHeight: "500px",
        
      }}
    >
      {/* LEFT SIDE: Instructions and feedback */}
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          display: "inline-block",
        }}
      >
        <h3>{lesson.title}</h3>
        <ReactMarkdown>{lesson.content}</ReactMarkdown>
        <MediaDisplay media={lesson.media} title={lesson.title} />

        {feedback && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: isCorrect ? "#d4edda" : "#fff3cd",
              color: isCorrect ? "#155724" : "#856404",
              borderRadius: "4px",
              whiteSpace: "pre-wrap",
            }}
          >
            {feedback}
          </div>
        )}

        {/* Show hint button only after 3 failed attempts */}
        {incorrectAttempts >= 3 && (
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
        )}

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

      {/* RIGHT SIDE: Drag and drop zone */}
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

            if (fromAvailable && overId === "dropzone") {
              setAvailableBlocks((prev) => prev.filter((b) => b !== activeId));
              setUserBlocks((prev) => [...prev, activeId]);
              return;
            }
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
            if (fromUser && userBlocks.includes(overId)) {
              const oldIndex = userBlocks.indexOf(activeId);
              const newIndex = userBlocks.indexOf(overId);
              if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
                setUserBlocks(arrayMove(userBlocks, oldIndex, newIndex));
              }
              return;
            }
            if (fromUser && (overId === "availableZone" || !overId)) {
              setUserBlocks((prev) => prev.filter((b) => b !== activeId));
              setAvailableBlocks((prev) => [...prev, activeId]);
              return;
            }
          }}
        >
          <Droppable id="dropzone" label="Drop blocks here">
            <SortableContext items={userBlocks} strategy={rectSortingStrategy}>
              {userBlocks.map((b) => (
                <SortableBlock
                  key={b}
                  id={b}
                  block={b}
                  removeBlock={removeBlock}
                />
              ))}
            </SortableContext>
          </Droppable>
          <Droppable id="availableZone" label="Available blocks">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {availableBlocks.map((b) => (
                <Draggable key={b} id={b} label={b} />
              ))}
            </div>
          </Droppable>
        </DndContext>

        <button
          onClick={handleCheck}
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


/* ============================================================
   PAGE COMPONENTS FOR ROUTING
   ============================================================ */
const TutorialListPage = () => {
  const navigate = useNavigate();
  const handleSelectTutorial = (tutorial) => {
    navigate(`/tutorial/${tutorial.id}/lesson/1`);
  };
  return <TutorialList onSelectTutorial={handleSelectTutorial} />;
};

const TutorialLessonPage = () => {
  const { tutorialId, lessonId } = useParams();
  const navigate = useNavigate();
  const { updateProgress, isLessonCompleted } = useProgress();

  const tutorial = tutorialData.find((t) => t.id.toString() === tutorialId);
  if (!tutorial) return <div>Tutorial not found</div>;
  const index = parseInt(lessonId) - 1;
  const lesson = tutorial.lessons[index];
  if (!lesson) return <div>Lesson not found</div>;

  const isCompleted = isLessonCompleted(tutorial.id, lesson.id);

  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [showResult, setShowResult] = useState(false);

const [codeCorrect, setCodeCorrect] = useState(null);
const [showHint, setShowHint] = useState(false);
const [incorrectAttempts, setIncorrectAttempts] = useState(0);
const [feedback, setFeedback] = useState("");


  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <button onClick={() => navigate("/tutorials")} className="back-btn">← Back to Tutorials</button>
      <h1>{tutorial.title}</h1>
      <p>
        Lesson {index + 1} of {tutorial.lessons.length}
      </p>
      {/* {isCompleted && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#cce5ff",
            color: "#004085",
            borderRadius: "4px",
            marginBottom: "15px",
            textAlign: "center",
          }}
        >
          🎉 Lesson completed!
        </div>
      )} */}
      {lesson.type === "lecture" && (
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            
          }}
        >
          <h3>{lesson.title}</h3>
          <ReactMarkdown>{lesson.content}</ReactMarkdown>
          <MediaDisplay media={lesson.media} title={lesson.title} />
        </div>
      )}
      {/* QUIZ LESSON */}
{lesson.type === "quiz" && (
  <QuizView
    lesson={lesson}
    userAnswer={userAnswer}
    isCorrect={isCorrect}
    showResult={showResult}
    onAnswer={(answer) => {
      setUserAnswer(answer);
      const correct = answer === lesson.correctAnswer;
      setIsCorrect(correct);
      setShowResult(true);
      // if (correct) updateProgress(tutorial.id, lesson.id);
    }}
  />
)}

{/* CODING LESSON */}
{lesson.type === "coding" && (
  <CodingView
    lesson={lesson}
    isCorrect={codeCorrect}
    showHint={showHint}
    setShowHint={setShowHint}
    feedback={feedback}
    incorrectAttempts={incorrectAttempts}
    onCheck={(userCode) => {
      const correctCode = lesson.solution;
      const isCorrect = userCode.join("\n") === correctCode.join("\n");

      // Count how many correct lines from top
      let matchCount = 0;
      for (let i = 0; i < Math.min(userCode.length, correctCode.length); i++) {
        if (userCode[i] === correctCode[i]) matchCount++;
        else break;
      }

      if (isCorrect) {
        setCodeCorrect(true);
        setFeedback(`✅ Perfect! Your code is fully correct.`);
        // updateProgress(tutorial.id, lesson.id);
      } else {
        setCodeCorrect(false);
        setIncorrectAttempts((prev) => prev + 1);
        if (matchCount > 0) {
          setFeedback(`❌ You have ${matchCount} block${matchCount > 1 ? "s" : ""} correct from the top.`);
        } else {
          setFeedback("❌ No blocks in the correct position yet, keep trying!");
        }
      }
    }}
  />
)}



            {/* ======= LESSON NAV BUTTONS ======= */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {tutorial.lessons.map((l, i) => (
          <button
            key={l.id}
            onClick={() => navigate(`/tutorial/${tutorial.id}/lesson/${i + 1}`)}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "1px solid #007bff",
              backgroundColor: i === index ? "#007bff" : "white",
              color: i === index ? "white" : "#007bff",
              cursor: "pointer",
              fontWeight: i === index ? "bold" : "normal",
              transition: "all 0.2s ease",
            }}
          >
            {`Lesson ${i + 1}`}
          </button>
        ))}
      </div>


      <div className="nav-buttons">
  <button
    className="nav-btn prev-btn"
    disabled={index === 0}
    onClick={() => navigate(`/tutorial/${tutorial.id}/lesson/${index}`)}
  >
    ← Previous
  </button>

  <button
    className="nav-btn next-btn"
    disabled={index === tutorial.lessons.length - 1}
    onClick={() => navigate(`/tutorial/${tutorial.id}/lesson/${index + 2}`)}
  >
    Next →
  </button>
</div>
    </div>
  );
};

/* ============================================================
   MAIN APP
   ============================================================ */
const App = () => {
  const { user } = useAuth();
  return (
    <Router>
      <div className="App">
        <Header />
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route path="/" element={<TutorialListPage />} />
            <Route path="/tutorials" element={<TutorialListPage />} />
            <Route
              path="/tutorial/:tutorialId/lesson/:lessonId"
              element={<TutorialLessonPage />}
            />
          </Routes>
        )}
      </div>
    </Router>
  );
};

/* ============================================================
   EXPORT WRAPPED APP
   ============================================================ */
export default function AppWithProviders() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
