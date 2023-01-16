import React from "react";
import { Link } from "react-router-dom";
import image from "../../../public/hero.webp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import facebook from "../../../public/Meta-Logo.png";
import google from "../../../public/google-removebg-preview.png";
import amazon from "../../../public/amazon-removebg-preview.png";
import harvard from "../../../public/harvard-removebg-preview.png";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
const LandingPage = () => {
  return (
    <div className="w-full h-full">
      <nav className="w-full bg-fourth text-white p-4 flex items-center">
        <a className="flex items-center gap-2" href="/">
          <img src="../../../public/class.svg" alt="" className="w-8" />
          <p className="font-bold text-xl">Classify</p>
        </a>
        <div className="text-xl font-bold flex gap-4 ml-auto">
          <Link
            to={"/login"}
            className="hover:bg-thirdy transition-all px-2 py-1 rounded-lg hover:-translate-y-1"
          >
            Login
          </Link>
          <Link
            to={"/signup"}
            className="hover:bg-thirdy transition-all px-2 py-1 rounded-lg hover:-translate-y-1"
          >
            signup
          </Link>
        </div>
      </nav>
      <section className="flex flex-col items-center py-40 px-48 gap-8">
        <div className="flex justify-center items-center flex-col md:flex-row">
          <img
            src={image}
            alt=""
            className="w-[50%] rounded-lg hidden md:block"
          />
          <div className="flex flex-col gap-6 justify-between">
            <h2 className="text-5xl uppercase">Learn without limits!</h2>
            <p className="text-5xl text-thirdy">
              The first real time, easy to use, free classes scheduling platform
            </p>
            <Link
              to={"/signup"}
              className="text-2xl bg-fourth  w-fit px-2 py-1 text-white font-bold mt-4 transition-all hover:bg-thirdy"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </section>
      <section className="flex flex-col  py-24 px-8 md:px-48  gap-8 bg-primary">
        <p className="text-md font-bold uppercase">features</p>
        <div className="flex flex-col md:flex-row gap-4 py-8 ">
          <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-lg transition-all hover:scale-[1.02]">
            <div className="w-fit bg-fourth text-white p-2 rounded-[50%]">
              <PersonIcon fontSize="medium" />
            </div>
            <h3 className="font-bold text-xl">User Creation and Login</h3>
            <p className="text-lg">
              Easy to use registratio. Quick login and a secure connection.
            </p>
          </div>
          <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-lg transition-all hover:scale-[1.02]">
            <div className="w-fit bg-fourth text-white p-2 rounded-[50%]">
              <CalendarMonthIcon fontSize="medium" />
            </div>
            <h3 className="font-bold text-xl">Online Scheduling</h3>
            <p className="text-lg">
              Schedule you favorite class in an easy to use UI. Filter by dates,
              class utilities and aviliabilty.
            </p>
          </div>
          <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-lg transition-all hover:scale-[1.02]">
            <div className="w-fit bg-fourth text-white p-2 rounded-[50%]">
              <AdminPanelSettingsIcon fontSize="medium" />
            </div>
            <h3 className="font-bold text-xl">Admin Control Panel</h3>
            <p className="text-lg">
              Login in to you admin account and use the dashboard to Monitor
              your users, Aceept or deny Events or Create new classes
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col  py-24 px-8 md:px-48 gap-8 ">
        <div className="w-full">
          <p className="text-md font-bold uppercase">our customers</p>
          <div className="flex w-full justify-between items-center flex-wrap">
            <img
              src={facebook}
              className="w-28 md:w-36 bg-blend-multiply"
              alt=""
            />
            <img
              src={google}
              className="w-28 md:w-36 bg-blend-multiply"
              alt=""
            />
            <img
              src={amazon}
              className="w-28 md:w-40 bg-blend-multiply"
              alt=""
            />
            <img
              src={harvard}
              className="w-28 md:w-40   bg-blend-multiply"
              alt=""
            />
          </div>
        </div>
      </section>

      <footer className="bg-fourth px-8 md:px-48 py-8 flex flex-col md:flex-row items-center justify-around">
        <div className="flex flex-col">
          <a
            href="/"
            className="flex flex-col justify-center items-center w-fit"
          >
            <img src="../../../public/class.svg" alt="" className="w-12" />
            <p className="font-bold text-xl text-white">Classify</p>
          </a>
        </div>
        <div className="flex flex-col">
          <div className="text-white flex gap-1">
            <p>Omer:</p>
            <a
              href="https://www.linkedin.com/in/omer-liraz-12a337230/"
              className="hover:text-secondary transition-all ml-auto"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://github.com/o6mer"
              className="hover:text-secondary transition-all"
            >
              <GitHubIcon />
            </a>
          </div>
          <div className="text-white flex gap-1">
            <p>Netanel:</p>
            <a
              href="https://www.linkedin.com/in/netanel-arbiv-4553101b5/"
              className="hover:text-secondary transition-all ml-auto"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://github.com/netpes"
              className="hover:text-secondary transition-all"
            >
              <GitHubIcon />
            </a>
          </div>
          <div className="text-white flex gap-1">
            <p>Roei:</p>

            <a
              href="https://github.com/RoeiZaro"
              className="hover:text-secondary transition-all ml-auto"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
        <p className="text-xl text-white w-[70%]">
          This project was created by Omer Liraz, Netanel Arbiv and Roei Zaro as
          a mid coruse project in Cyber Pro university.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
