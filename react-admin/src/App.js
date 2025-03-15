import { ColorModeContext, useMode } from "./theme";
import { CssBaseline,ThemeProvider } from "@mui/material";
import { Routes, Route} from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import ChamCong from "./scenes/chamcong";
import Document from "./scenes/documentt";
// import FAQ from "./scenes/faq";
import Calendar from "./scenes/calendar";

function App() {
  const [theme, colorMode] = useMode();

  return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar/>
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/team" element={<Team />}/>
          <Route path="/chamcong" element={<ChamCong />}/>
          <Route path="/documentt" element={<Document />}/>
          <Route path="/calendar" element={<Calendar />}/>
        </Routes>
      </main>
    </div>
    </ThemeProvider>
  </ColorModeContext.Provider>

  );
}

export default App;
