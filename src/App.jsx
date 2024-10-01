import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Footbar from "./Components/Navbar/Footbar";

import styles from "./App.module.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NewsPage from "./Components/News/NewsPage";
import JobsPage from "./Components/Jobs/JobsPage";
import StudyPage from "./Components/Study/StudyPage";
import TestPage from "./Components/Tests/TestPage";
import JobsAdmin from "./Components/Jobs/admin/JobsAdmin";
import JobPostAdmin from "./Components/Jobs/admin/JobPostAdmin";
import JobShow from "./Components/Jobs/JobShow";
import TestStart from "./Components/Tests/TestStart";
import TestSolution from "./Components/Tests/TestSolution";
import Admin from "./Components/Jobs/admin/admin";

function Layout() {
  return (
    <>
      <Navbar />
      <Footbar />
    </>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Use Layout for consistent Navbar and Footbar
      children: [
        { index: true, element: <Home /> },
        { path: "news", element: <NewsPage /> },
        { path: "jobs", element: <JobsPage /> },
        { path: "study", element: <StudyPage /> },
        { path: "tests", element: <TestPage /> },
        { path: "jobs/:jobId", element: <JobShow /> },
        { path: "tests/new-test", element: <TestStart /> },
        { path: "tests/new-test/solution", element: <TestSolution /> },
        {path:"admin", element: <Admin/>},
        { path: "admin/jobs-admin", element: <JobsAdmin /> },
        { path: "admin/jobs-admin/jobs-post-admin", element: <JobPostAdmin /> },
      ],
    },
  ]);

  return (
    <div className={styles.App}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
