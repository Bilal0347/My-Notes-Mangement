import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>hi!</h1>} />
      <Route path="/new" element={<h1>new note</h1>} />
      <Route path="/:id">
        <Route index element={<h1>Show note</h1>} />
        <Route path="edit" element={<h1>edit note</h1>} />
      </Route>
      <Route path="*" element={<h1>Home</h1>} />
    </Routes>
  );
}

export default App;
