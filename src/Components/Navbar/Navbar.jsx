import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "../../Styles/Navbar.module.css"; 
import { useState, useEffect } from "react";


const Navbar = () => {
    const location = useLocation(); // To get the current URL path
    const [selectedPage, setSelectedPage] = useState("");

    // Set the selected page based on the current URL when the component mounts
    useEffect(() => {
        const path = location.pathname;
        if (path === "/") {
            setSelectedPage("home");
        } else if (path === "/news") {
            setSelectedPage("updates");
        } else if (path === "/jobs") {
            setSelectedPage("exams");
        } else if (path === "/study") {
            setSelectedPage("study");
        } else if (path === "/tests") {
            setSelectedPage("tests");
        }
    }, [location.pathname]); // Trigger effect when location changes

    return (
        <>
            <div className={styles.main}>
                <div className={styles.logo}>
                <Link to="/">
                     <img className="h-[80px] w-[190px] rounded-md" src="src\assets\Rankers_logow.png"/> 
                </Link>
                </div>
                <div className={styles.links}>
                    <ul className="md:flex hidden">
                        <Link to="/">
                            <li
                                className={`mx-8 hover:text-black font-400 hover:border-b ${
                                    selectedPage === "home" ? styles.selectedLink : ""
                                }`}
                                onClick={() => setSelectedPage("home")}
                            >
                                Home
                            </li>
                        </Link>
                        <Link to="/news">
                            <li
                                className={`mx-8 hover:text-black font-400 hover:border-b ${
                                    selectedPage === "updates" ? styles.selectedLink : ""
                                }`}
                                onClick={() => setSelectedPage("updates")}
                            >
                                Updates
                            </li>
                        </Link>
                        <Link to="/jobs">
                            <li
                                className={`mx-8 hover:text-black font-400 hover:border-b ${
                                    selectedPage === "exams" ? styles.selectedLink : ""
                                }`}
                                onClick={() => setSelectedPage("exams")}
                            >
                                Exams
                            </li>
                        </Link>
                        {/* <Link to="/study">
                            <li
                                className={`mx-8 hover:text-black ffont-400 hover:border-b ${
                                    selectedPage === "study" ? styles.selectedLink : ""
                                }`}
                                onClick={() => setSelectedPage("study")}
                            >
                                Study
                            </li>
                        </Link> */}
                        <Link to="/tests">
                            <li
                                className={`mx-8 hover:text-black font-400 hover:border-b ${
                                    selectedPage === "tests" ? styles.selectedLink : ""
                                }`}
                                onClick={() => setSelectedPage("tests")}
                            >
                                Tests
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="mx-8">
                    <div className="bg-white rounded-full h-10 w-10 text-black flex items-center justify-center">
                        <p>ID</p>
                    </div>
                </div>




            </div>
            <Outlet />
        </>
    );
};

export default Navbar;

