import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import faqs from "./Faqs";
import "./FaqPage.scss";

interface FaqItem {
  question: string;
  answer: string;
}

const styles = {
  h2: {
    fontSize: "2rem",
    textAlign: "center",
    fontWeight: 900,
    marginBottom: "1rem",
  },
  questions: {
    fontSize: "1.8rem",
  },
  answers: {
    padding: "1.1rem",
  },
};
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
        <Typography sx={styles.h2} variant="h2">
          Frequently Asked Questions
        </Typography>
        <List>
          {faqData.map((faqItem: FaqItem, index: number) => (
            <React.Fragment key={index}>
              <ListItem button onClick={() => toggleAnswerVisibility(index)}>
                <ListItemIcon>
                  <CircleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={faqItem.question}
                  style={{ fontSize: "1.4rem" }}
                />
              </ListItem>
              <Collapse in={visibleAnswers[index]}>
                <Typography
                  sx={styles.answers}
                  variant="body1"
                  className="answer"
                >
                  {faqItem.answer}
                </Typography>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </div>
    </main>
  );
}

export default FaqPage;
