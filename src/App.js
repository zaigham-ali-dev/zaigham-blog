
import './App.css';
import { useEffect, useState } from "react";
import Signin from "./Signin";
import CreatePost from "./CreatePost";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import {firebaseConfig} from "./firebase";
import Navbar from "./navbar";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

return (
  <>
    <Navbar />
    {user ? <CreatePost /> : <Signin />}
  </>
);
}
export default App;  