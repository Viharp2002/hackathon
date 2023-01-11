import { useContext, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { userApi } from "./config/api";
import { AuthContext } from "./context/auth";
import Admin from "./pages/admin";
import Home from "./pages/home";
import Schem from "./pages/schem";

function App() {

  let { user, dispatch } = useContext(AuthContext);

  let fetchUserInfo = async (token) => {
    let res = await fetch(userApi, {
      headers: {
        "authorization": token
      }
    });
    let data = await res.json();
    if (data.success) {
      dispatch({ type: "SET_USER", data: data.msg })
    }
  }

  useEffect(() => {
    let token = localStorage.getItem("hack_token");
    if (token) {
      dispatch({
        type: "SET_AUTH",
        data: token
      })

      fetchUserInfo(token);
    }
  }, [])


  return (
    <div className="App">
      <Navbar></Navbar>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schem/:id" element={<Schem />} />
          {user?.isAdmin && <Route path="/admin/*" element={<Admin />} />
          }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
