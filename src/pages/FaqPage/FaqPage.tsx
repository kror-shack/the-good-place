import React, { useState } from "react";
import "./FaqPage.scss";
import CircleIcon from "@mui/icons-material/Circle";
import faqs from "./Faqs";

interface FaqItem {
  question: string;
  answer: string;
}

function FaqPage() {
  const faqData: FaqItem[] = faqs;
  const [visibleAnswers, setVisibleAnswers] = useState<boolean[]>([]);

  const toggleAnswerVisibility = (index: number) => {
    const updatedVisibleAnswers = [...visibleAnswers];
    updatedVisibleAnswers[index] = !updatedVisibleAnswers[index];
    setVisibleAnswers(updatedVisibleAnswers);
  };

  return (
    <main className="FaqPage">
      <div>
        <h1>Frequently Asked Questions</h1>
        <ul>
          {faqData.map((faqItem: FaqItem, index: number) => (
            <li key={index}>
              <CircleIcon />
              <div className="container">
                <h3 onClick={() => toggleAnswerVisibility(index)}>
                  {faqItem.question}
                </h3>
                {visibleAnswers[index] && (
                  <p className="answer">{faqItem.answer}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default FaqPage;
