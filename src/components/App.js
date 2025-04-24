import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((question) => setQuestions(question));
  }, []);

  function handleAddQuestions(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handledeleteQuestions(deleteQuestion) {
    const updatedQuestions = questions.filter(
      (question) => question.id !== deleteQuestion.id
    );
    setQuestions(updatedQuestions);
  }

  function handleUpdateQuestions(updateQuestion) {
    const updatedQuestions = questions.map((question) => {
      if (question.id === updateQuestion.id) {
        return updateQuestion;
      } else {
        return question;
      }
    });
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestions} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handledeleteQuestions}
          onUpdateQuestion={handleUpdateQuestions}
        />
      )}
    </main>
  );
}

export default App;
