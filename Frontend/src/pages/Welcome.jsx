import React from "react";
//import { useNavigate } from "react-router-dom";

const Welcome = () => {
    //const navigate = useNavigate();
    return(
        <>
            <div className="text-white text-center mt-20 rounded-3xl bg-zinc-950 bg-opacity-60 p-4 h-full w-5/6 mx-auto ">
                <div className="text-4xl border-b-4 max-w-[40rem] mx-auto pb-4 mb-5">
                    Welcome To IntelliCycles
                </div> 
                <div className="w-5/6 mx-auto text-lg">
                    <p>
                        Welcome to Team-3&apos;s project INTELLICYCLES an innovative tool for user&apos;s to keep
                        track of their Tasks, Habits, Reminders and Events in one centralized place.
                       
                    </p>
                    <br />
                    <p className="text-left"> First let&apos;s understand what each one of these mean:-</p>
                    <ul className="list-disc list-inside text-left">
                      <li>
                        <strong>Task:</strong> Something that needs to be done. For example, get the 
                        groceries, or start working on an assignment.
                      </li>
                      <li>
                        <strong>Reminder:</strong> Though users have the option to add reminders to 
                        any task, habit, or event, they can also create an independent reminder. For 
                        example, turn off the oven in 30 minutes or look for concert tickets.
                      </li>
                      <li>
                        <strong>Habit:</strong> A useful component that allows the user to create 
                        recurring habits for adopting a healthy habit or quitting a bad habit. The 
                        more consecutive habits you complete, the streak count rises, motivating the 
                        user. For example, eat an apple a day, drink 3 bottles of water daily, and more.
                      </li>
                      <li>
                        <strong>Event:</strong> Users can create calendar events, which are essentially 
                        normal appointment scheduling events. These can also include people&apos;s birthdays, 
                        anniversaries, and more.
                      </li>
                    </ul>
                    <br />
                    <p>To this application added are the benefits of AI that helps the user&apos;s to automate
                        some tedious tasks like creating or editing a new event and obtaining suggestions
                        on improving personal lifestyle with the app.
                    </p>
                    <br />
                    <p>
                        Without further ado Sign-in/Register for the account today!
                    </p>
                    <br />
                    {/* <Row>
                      <Col className="bg-teal-800 text-3xl hover:bg-teal-950 transition duration-150 p-3 rounded-full mx-5 w-64" onClick={() => navigate('/signin')}>
                          Sign-In
                      </Col>
                      <Col className="bg-teal-800 text-3xl hover:bg-teal-950 transition duration-150 p-3 rounded-full mx-5 w-64" onClick={() => navigate('/register')}>
                          Register
                      </Col>
                    </Row> */}
                </div>
            </div>
        </>
    )
}

export default Welcome;