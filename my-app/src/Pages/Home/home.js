import React, { useState } from "react";
import SignIn from "../../Components/Signin/Signin";
import SignUp from "../../Components/Signup/Signup";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(null); // "signin" or "signup"

  const closeModal = () => setShowModal(null);

  return (
    <div className="text-red-800 overflow-x-hidden">
      {/* Header */}
      <header className="bg-transparent text-white absolute top-0 left-0 w-full z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-8">
          <h4 className="text-2xl font-bold">GymFlow</h4>

          {/* Mobile Menu */}
          <div className="relative sm:hidden">
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Toggle Menu"
            >
              Menu
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-gray-800 rounded-lg shadow-lg w-40">
                <button
                  onClick={() => setShowModal("signin")}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowModal("signup")}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden sm:flex space-x-4">
            <button
              onClick={() => setShowModal("signin")}
              className="bg-gradient-to-r from-green-500 to-blue-700 text-white py-2 px-4 rounded-lg"
            >
              Login
            </button>
            <button
              onClick={() => setShowModal("signup")}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="text-white h-screen w-screen bg-black bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/gym4.jpg')",
        }}
      >
        {/* Optional content inside hero */}
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Why GymFlow?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Member Management</h3>
              <p>
                Easily track and manage memberships, renewals, and attendance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Class Scheduling</h3>
              <p>
                Organize classes and sessions with an intuitive scheduling
                system.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">
                Performance Tracking
              </h3>
              <p>
                Monitor member progress and provide personalized fitness plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 bg-gradient-to-r from-green-500 to-blue-700 text-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            About Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-4">Who We Are</h3>
              <p className="text-lg mb-4">
                At GymFlow, we are passionate about empowering gyms and fitness
                enthusiasts with technology to achieve their best.
              </p>
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-lg">
                To streamline gym operations and enhance the fitness journey for
                all members.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
                alt="Fitness Icon"
                className="w-64 h-64 md:w-72 md:h-72 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4">
        <div className="text-center text-sm">
          &copy; 2025 GymFlow. All rights reserved.
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 relative w-11/12 sm:w-2/3 lg:w-1/3">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              &#x2715;
            </button>
            {showModal === "signin" && <SignIn />}
            {showModal === "signup" && <SignUp />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
