import Description from '../Description/Description';
import Options from '../Options/Options';
import { useState, useEffect } from 'react';
import Feedback from '../Feedback/Feedback';
import Notification from '../Notification/Notification';
import css from './App.module.css';


export default function App() {

  const [feedback, setFeedback] = useState(() => {
    const clicks = window.localStorage.getItem("clicks");
    if (clicks === null) {
      return {
	good: 0,
	neutral: 0,
	bad: 0
};
    } else {
      return JSON.parse(clicks);
    }
  });
  const updateFeedback = feedbackType => {
    setFeedback({
      ...feedback,
      [feedbackType]: feedback[feedbackType] + 1,
    });
  };

  const resetFeedback = () =>{
    setFeedback({
      	good: 0,
	neutral: 0,
	bad: 0
    }

    )
   }


  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  const positivePercentage = totalFeedback === 0 ? 0 : Math.round((feedback.good / totalFeedback) * 100);
  
  useEffect(() => {
    window.localStorage.setItem("clicks", JSON.stringify(feedback));
  }, [feedback]);

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
       
        
      />
{totalFeedback !== 0 ? (<Feedback feedback={feedback}
        totalFeedback={totalFeedback}
        positivePercentage={positivePercentage}
      />) : (<Notification />)}

  
    </>
  )
}