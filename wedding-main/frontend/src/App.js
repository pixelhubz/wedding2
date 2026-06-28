import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeddingInvite from "@/pages/WeddingInvite";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeddingInvite />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
