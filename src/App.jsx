import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Footbar from "./Components/Navbar/Footbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import styles from "./App.module.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NewsPage from "./Components/News/NewsPage";
import JobsPage from "./Components/Jobs/JobsPage";
import StudyPage from "./Components/Study/StudyPage";
import TestPage from "./Components/Tests/TestPage";
import JobsAdmin from "./Components/Admin/JobsAdmin";
import JobPostAdmin from "./Components/Admin/JobPostAdmin";
import JobShow from "./Components/Jobs/JobShow";
import TestStart from "./Components/Tests/TestStart";
import TestSolution from "./Components/Tests/TestSolution";
import Admin from "./Components/Admin/admin";
import UpdatesAdmin from "./Components/Admin/UpdatesAdmin";
import UpdatePostAdmin from "./Components/Admin/UpdatesPostAdmin";
import TestsAdmin from "./Components/Admin/TestAdmin";
import TestPostAdmin from "./Components/Admin/TestPostAdmin";
import AdminSignUp from "./Components/Admin/AdminSignUp";
import AdminLogin from "./Components/Admin/AdminLogin";
import UpdateEditAdmin from "./Components/Admin/UpdatesEditAdmin";
import JobEditAdmin from "./Components/Admin/JobEditAdmin";


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
        { path: "tests/:testId", element: <TestStart /> },
        { path: "tests/solution/:testId", element: <TestSolution /> },
        { path:"admin", element: <Admin/>},
        { path: "admin/jobs-admin", element: <JobsAdmin /> },
        { path: "admin/jobs-admin/jobs-post-admin", element: <JobPostAdmin /> },
        { path: "admin/updates-admin", element: <UpdatesAdmin /> },
        { path: "admin/updates-admin/updates-post-admin", element: <UpdatePostAdmin /> },
        { path: "admin/tests-admin", element: <TestsAdmin /> },
        { path: "admin/tests-admin/test-post-admin", element: <TestPostAdmin /> },
        { path: "adminSignUp", element: <AdminSignUp /> },
        { path: "adminLogin", element: <AdminLogin/>},
        { path: "admin/updates-admin/updates-edit-admin/:updateId", element: <UpdateEditAdmin />},
        { path: "admin/jobs-admin/jobs-edit-admin/:jobId", element: <JobEditAdmin />}
      ],
    },
  ]);

  return (
    <div className={styles.App}>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
