import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "../../Styles/Footbar.module.css"; 
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
        <div className={`md:hidden w-[100vw]`}>
            <div className={` ${styles.main} ` }>
                <div className={styles.links}>
                    <ul className="md:flex ">
                        <Link to="/">
                            <li
                                className={`${styles.linkLi}`}
                                onClick={() => setSelectedPage("home")}
                            >
                                <img src={selectedPage === "home" ? "https://cdn-icons-png.flaticon.com/128/1946/1946436.png" : "https://cdn-icons-png.flaticon.com/128/1946/1946488.png" }/>
                            </li>
                        </Link>
                        <Link to="/news">
                            <li
                                className={`${styles.linkLi}`}
                                onClick={() => setSelectedPage("updates")}
                            >
                                <img src={
                                    selectedPage === "updates" ? "https://cdn-icons-png.flaticon.com/128/8951/8951933.png" : "https://cdn-icons-png.flaticon.com/128/8951/8951617.png"  
                                }/>
                            </li>
                        </Link>
                        <Link to="/jobs">
                            <li
                                className={`${styles.linkLi} `}
                                onClick={() => setSelectedPage("exams")}
                            >
                                <img src= {selectedPage === "exams" ? "https://cdn-icons-png.flaticon.com/128/9316/9316703.png" : "https://cdn-icons-png.flaticon.com/128/9316/9316720.png"
                                }/>
                            </li>
                        </Link>
                        {/* <Link to="/study">
                            <li
                                className={`${styles.linkLi} `}
                                onClick={() => setSelectedPage("study")}
                            >
                                 <img src= {
                                    selectedPage === "study" ? "https://cdn-icons-png.flaticon.com/128/2280/2280294.png" : "https://cdn-icons-png.flaticon.com/128/2280/2280151.png"
                                } />
                            </li>
                        </Link> */}
                        <Link to="/tests">
                            <li
                                className={`${styles.linkLi}`}
                                onClick={() => setSelectedPage("tests")}
                            >
                                <img src={
                                    selectedPage === "tests" ? "https://cdn-icons-png.flaticon.com/128/535/535582.png" : "https://cdn-icons-png.flaticon.com/128/535/535633.png"
                                }/>
                            </li>
                        </Link>
                    </ul>
                </div>        

            </div>
            </div>
        </>
    );
};

export default Navbar;
