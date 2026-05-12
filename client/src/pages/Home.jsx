import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

 const auth = JSON.parse(localStorage.getItem("auth"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("logout successfully")

    navigate("/");
  };
  return (
    <>
      <div className="min-h-full w-full">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Welcome <span>{auth?.user?.name} !</span>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a onClick={handleLogout} className="nav-link active" aria-current="page" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div
          style={{ height: "80vh" }}
          className="justify-center flex text-center items-center"
        >
          <h1> Home Page</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
