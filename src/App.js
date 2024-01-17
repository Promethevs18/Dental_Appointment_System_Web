import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Appointments from "./scenes/dashboard/dashboard";
import CreateAppointment from "./scenes/dashboard/dashboard";
import About from "./scenes/about/about";
import Team from "./scenes/patients/patients";
import "./App.css";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import Authentication from "./scenes/authentication/authentication";
import "react-toastify/dist/ReactToastify.css";
import Form from "./scenes/form/create_walkin";
import Details from "./scenes/view_details/Details";
import { ToastContainer } from "react-toastify";
import Lister from "./scenes/attendanceLister/lister";

function App() {
  const [theme, colorMode] = useMode();
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("Dashboard");

  //eto ang magchecheck if may user na nakalogin
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar setActive={setActive} active={active} user={user} />
          <main className="content">
            <Topbar />
            <ToastContainer position="top-center" />
            <Routes setUser={user}>
              <Route
                path="/"
                element={<Dashboard setActive={setActive} user={user} />}
              />
              <Route
                path="/Appointments"
                element={<Appointments user={user} />}
              />
              <Route path="/patients" element={<Team user={user} />} />
              <Route
                path="/CreateAppointment"
                element={<CreateAppointment user={user} />}
              />
              <Route path="/about" element={<About user={user} />} />
              <Route path="/walk-in" element={<Form user={user} />} />
              <Route path="/auth" element={<Authentication setUser={user} />} />
              <Route path="/details" element={<Details user={user} />} />
              <Route path="/lister" element={<Lister user={user} />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

//THIS PROJECT WAS MADE BY PROMETHEUS
