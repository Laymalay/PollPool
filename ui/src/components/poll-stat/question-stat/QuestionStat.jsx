import React from "react";
import PieChart from "react-minimal-pie-chart";
import { useQuery } from "react-apollo";
import { Form, Row, Col, Button } from "react-bootstrap";
import randomColor from "randomcolor";

import { getQuestionQuery } from "../../../schema/queries";
import Loading from "../../shared/loading";

import "./QuestionStat.css";

const QuestionStat = ({ question: { id } }) => {
  const { data: { question } = {}, loading, error } = useQuery(
    getQuestionQuery,
    {
      variables: {
        id
      }
    }
  );

  if (loading) return <Loading />;
  if (error) return <>Error</>;

  console.log(question);

  const { answeredQuestions, choices, answer } = question;
  let stat = {};

  choices.forEach(
    ({ id, title }) =>
      (stat[id] = {
        value: 0,
        title: title,
        color: randomColor({ luminosity: "light", hue: "random", alpha: 0.5 })
      })
  );

  answeredQuestions.forEach(answer => {
    stat[answer.choice.id].value += 1;
  });

  return (
    <>
      <div className="question-stat-content">
        <p className="question-stat-title">{question.title}</p>

        <div className="question-stat-choices">
          {Object.values(stat).map(({ title, color }) => (
            <p style={{ color: color }}>
              {answer == title && <span className="oi oi-check"></span>}
              {title}
            </p>
          ))}
        </div>

        <PieChart
          className="question-chart"
          animate
          label
          labelPosition={50}
          labelStyle={{
            fill: "white",
            fontFamily: "sans-serif",
            fontSize: "13px"
          }}
          data={Object.values(stat).filter(({ value }) => value != 0)}
        />
      </div>

    </>
  );
};

export default QuestionStat;
