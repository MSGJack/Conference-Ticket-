import "./App.css";
import { FormProvider } from "./Context/formContext";
import { Home } from "./Page/Home";
import { Ticket } from "./Page/Ticket";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <FormProvider>
        <div className="purple-bg">
          <div className="bg-wrap">
            <img src="/pattern-circle.svg" className="circle-top" />
            <img src="/logo-full.svg" className="logo-head" />
            <img className="squiggly-top" src="pattern-squiggly-line-top.svg" />
            <img src="/pattern-circle.svg" className="circle-middle" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ticket" element={<Ticket />} />
            </Routes>
            <img className="squiggle-bottom" />
          </div>
        </div>
      </FormProvider>
    </>
  );
}

export default App;

