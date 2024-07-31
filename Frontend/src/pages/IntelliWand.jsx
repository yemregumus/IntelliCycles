import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { TypeAnimation } from 'react-type-animation';
import { getQuestions, getAnswer } from "../../api";

const IntelliWand = () => {
    const [show, setShow] = useState(false);
    const [curQuestion, setCurQuestion] = useState("");
    const [curAnswer, setCurAnswer] = useState("");
    const [doneTyping, setDoneTyping] = useState(false);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const fetchedQuestions = await getQuestions();
                setQuestions(fetchedQuestions);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchQuestions();
    }, []);

    const handleQuestionClick = async (question) => {
        try {
            setCurQuestion(question.question);
            
            const answer = await getAnswer(question.id);
            setCurAnswer(answer);
            setDoneTyping(false);
            setShow(true);
            // setDoneTyping(true);
        } catch (error) {
            console.error('Error fetching answer:', error);
        }
    };

    return (
        <Container className="text-white text-center mt-4 rounded-3xl bg-zinc-950 bg-opacity-60 p-4 px-5 h-full flex flex-col justify-between">
            <div className="items-center mx-auto min-w-96 h-full text-white text-4xl text-center my-3 border-b-2 max-w-[70rem] pb-3">
                IntelliWand
            </div>
            <div className="h-full text-xl text-black w-full">
                <div className="bg-white/75 text-left px-3 py-2 rounded-t-xl rounded-br-xl w-fit">
                    What can I assist you with?
                    {questions.map((question, index) => (
                        <div 
                            key={index} 
                            className="bg-white/75 my-2 hover:bg-rose-200 transition rounded-xl px-3 py-2 w-fit cursor-pointer"
                            onClick={() => handleQuestionClick(question)}
                        >
                            {question.question}
                        </div>
                    ))}
                </div>
                {show && (
                    <>
                        <div className="bg-white/75 text-right px-3 py-2 rounded-t-xl rounded-bl-xl w-fit ml-auto mt-4">
                            <TypeAnimation
                                key={curQuestion}  // Ensure re-render
                                sequence={[
                                    curQuestion,
                                    500,
                                    () => { setDoneTyping(true); }
                                ]}
                                wrapper="div"
                                speed={75}
                            />
                        </div>
                        {doneTyping && (
                            <div className="bg-white/75 text-left px-3 py-2 rounded-t-xl rounded-br-xl w-fit h-fit mr-auto mt-4">
                                <TypeAnimation
                                     style={{ whiteSpace: 'pre-line', height: '195px', display: 'block' }}
                                    key={curAnswer}  // Ensure re-render
                                    sequence={[
                                        curAnswer,
                                        500,
                                    ]}
                                    wrapper="div"
                                    speed={75}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </Container>
    );
};

export default IntelliWand;
