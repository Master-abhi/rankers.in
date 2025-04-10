import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "../../Styles/Navbar.module.css"; 
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseinit";


const Navbar = () => {
    const location = useLocation(); // To get the current URL path
    const [selectedPage, setSelectedPage] = useState("");
    const [userDetail, setUserDetail] =  useState(null)

    // const fetchuser = async ()=>{
    //     auth.onAuthStateChanged(async(user)=>{
    //         if(user){
    //             const docRef = doc(db, "Users", user.uid);
    //             const docId = await getDoc(docRef);
    //             if (docId.exists()){
    //                 setUserDetail(docId.data())
    //                 console.log(docId.data())
    //             }

    //         }
    //         else{
    //             console.log("user not logged in.")
    //         }
    //     })
    // }

//   useEffect(()=>{
//     fetchuser();
// },[])

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
                {/* <img className="h-[30px] w-auto m-0" /> */}
                SARKARI WORLD
                </Link>
                </div>
                <div className={styles.links}>
                    <ul className="md:flex hidden">
                        <Link to="/">
                            <li
                                className={`mx-6 w-16 h-8 flex items-center justify-center text-center rounded-md hover:text-[#F6D941] font-400 hover:font-bold  ${
                                    selectedPage === "home" ? styles.selectedLink : ""
                                }`}
                                onClick={() => setSelectedPage("home")}
                            >
                                Home
                            </li>
                        </Link>
                        <Link to="/sarkari-news">
                            <li
                                className={`mx-6 w-16 h-8 flex items-center justify-center text-center rounded-md hover:text-[#F6D941] font-400 hover:font-bold  ${
                                    selectedPage === "updates" ? styles.selectedLink : ""
                                }`}
                                onClick={() => setSelectedPage("updates")}
                            >
                                News
                            </li>
                        </Link>
                        <Link to="/sarkari-jobs-notification">
                            <li
                                className={`mx-6 w-16 h-8 flex items-center justify-center text-center rounded-md hover:text-[#F6D941] font-400 hover:font-bold  ${
                                    selectedPage === "exams" ? styles.selectedLink : ""
                                }`}
                                onClick={() => setSelectedPage("exams")}
                            >
                                Jobs
                            </li>
                        </Link>
                        {/* <Link to="/sarkari-study">
                            <li
                                className={`mx-8 hover:text-black ffont-400 hover:border-b ${
                                    selectedPage === "study" ? styles.selectedLink : ""
                                }`}
                                onClick={() => setSelectedPage("study")}
                            >
                                Study
                            </li>
                        </Link> */}
                        <Link to="/sarkari-tests">
                            <li
                                className={`mx-6 w-16 h-8 flex items-center justify-center text-center rounded-md hover:text-[#F6D941] font-400 hover:font-bold  ${
                                    selectedPage === "tests" ? styles.selectedLink : ""
                                }`}
                                onClick={() => setSelectedPage("tests")}
                            >
                                Tests
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="mx-4">
                    {/* <div className="bg-white rounded-full h-10 w-10 text-black flex items-center justify-center">
                        <p>ID</p>
                    </div> */}
                </div>




            </div>
            <Outlet />
        </>
    );
};

export default Navbar;

