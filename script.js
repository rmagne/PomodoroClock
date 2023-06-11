import React from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0';



const BreakLengthContext = React.createContext({
  breakLength: "",
  setBreakLength: () => {} });

const SessionLengthContext = React.createContext({
  sessionLength: "",
  setSessionLength: () => {} });




const App = () => {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);

  const breakValue = React.useMemo(() => ({ breakLength, setBreakLength }), [breakLength]);
  const sessionValue = React.useMemo(() => ({ sessionLength, setSessionLength }), [sessionLength]);



  return /*#__PURE__*/(
    React.createElement(BreakLengthContext.Provider, { value: breakValue }, /*#__PURE__*/
    React.createElement(SessionLengthContext.Provider, { value: sessionValue }, /*#__PURE__*/

    React.createElement("div", { id: "app" }, /*#__PURE__*/
    React.createElement("div", { id: "wrapper" }, /*#__PURE__*/
    React.createElement("div", { id: "setterDiv" }, /*#__PURE__*/
    React.createElement(BreakElement, null), /*#__PURE__*/
    React.createElement(SessionElement, null)), /*#__PURE__*/

    React.createElement(Timer, null))))));






};



const BreakElement = () => {
  const { breakLength, setBreakLength } = React.useContext(BreakLengthContext);

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  return /*#__PURE__*/(
    React.createElement("div", { id: "break-element" }, /*#__PURE__*/
    React.createElement("h3", { id: "break-label" }, "BREAK LENGTH"), /*#__PURE__*/
    React.createElement("button", { id: "break-decrement", className: "btn btn-outline-info shadow-none", onClick: () => handleBreakDecrement() }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-minus" })), /*#__PURE__*/
    React.createElement("span", { id: "break-length", className: "timeLength" }, breakLength), /*#__PURE__*/
    React.createElement("button", { id: "break-increment", className: "btn btn-outline-info shadow-none", onClick: () => handleBreakIncrement() }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-plus" }))));


};

const SessionElement = () => {

  const { sessionLength, setSessionLength } = React.useContext(SessionLengthContext);

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
    }
  };


  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
    }
  };


  return /*#__PURE__*/(
    React.createElement("div", { id: "session-element" }, /*#__PURE__*/
    React.createElement("h3", { id: "session-label" }, "SESSION LENGTH"), /*#__PURE__*/
    React.createElement("button", { id: "session-decrement", className: "btn btn-outline-info shadow-none", onClick: () => handleSessionDecrement() }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-minus" })), /*#__PURE__*/
    React.createElement("span", { id: "session-length", className: "timeLength" }, sessionLength), /*#__PURE__*/
    React.createElement("button", { id: "session-increment", className: "btn btn-outline-info shadow-none", onClick: () => handleSessionIncrement() }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-plus" }))));



};

function Timer() {

  const { breakLength, setBreakLength } = React.useContext(BreakLengthContext);
  const { sessionLength, setSessionLength } = React.useContext(SessionLengthContext);
  const [running, setRunning] = React.useState(false);
  const [isSessionRunning, setIsSessionRunning] = React.useState(true);

  let breakLeft = breakLength * 60;
  let sessionLeft = sessionLength * 60;


  const [timeDisplayed, setTimeDisplayed] = React.useState(sessionLeft);

  const audioBeep = React.useRef(null);

  const handleStartStop = () => {
    setRunning(prevRunning => !prevRunning);
  };


  const handleReset = () => {
    setRunning(false);
    audioBeep.current.pause();
    audioBeep.current.CurrentTime = 0;
    setBreakLength(5);
    setSessionLength(25);
    setTimeDisplayed(sessionLeft);
    setIsSessionRunning(true);
  };

  React.useEffect(() => {
    if (!running) {
      setTimeDisplayed(sessionLeft);}
  }, [sessionLeft]);

  React.useEffect(() => {
    if (!running && !isSessionRunning) {
      setTimeDisplayed(breakLeft);}
  }, [breakLeft]);



  React.useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setTimeDisplayed(prevTimeDisplayed => {
          if (prevTimeDisplayed > 0) {
            return prevTimeDisplayed - 1;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [running]);






  React.useEffect(() => {
    if (timeDisplayed === 0) {
      audioBeep.current.play();
      setTimeout(() => {
        setIsSessionRunning(!isSessionRunning);
        setTimeDisplayed(isSessionRunning ? breakLeft : sessionLeft);
      }, 1000);
    }
  }, [timeDisplayed]);



  function fancyTimeFormat(time) {
    // Hours, minutes and seconds
    const mins = ~~Math.floor(time / 60);
    const secs = ~~time % 60;


    let ret = "";
    ret += mins < 10 ? "0" : "";
    ret += mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;

    return ret;
  }

  const TimerLabel = () => {
    if (isSessionRunning) {
      return /*#__PURE__*/React.createElement("h1", { id: "timer-label" }, "Session");
    } else {
      return /*#__PURE__*/React.createElement("h1", { id: "timer-label" }, "Break");
    }
  };




  return /*#__PURE__*/(
    React.createElement("div", { id: "timer" }, /*#__PURE__*/
    React.createElement("audio", {
      id: "beep",
      preload: "auto",
      ref: audioBeep,
      src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" }), /*#__PURE__*/

    React.createElement("div", null, /*#__PURE__*/
    React.createElement(TimerLabel, null), /*#__PURE__*/
    React.createElement("h3", { id: "time-left" }, fancyTimeFormat(timeDisplayed))), /*#__PURE__*/

    React.createElement("div", null, /*#__PURE__*/
    React.createElement("button", { id: "start_stop", onClick: handleStartStop, className: "btn btn-primary shadow-none" }, "Start-Stop"), /*#__PURE__*/
    React.createElement("button", { id: "reset", onClick: handleReset, className: "btn btn-danger shadow-none" }, "Reset"))));




};


ReactDOM.render( /*#__PURE__*/
React.createElement(App, null), document.getElementById('root'));