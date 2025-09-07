import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProjectProvider } from "./contexts/ProjectContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import CreatePost from "./pages/CreatePost";
import BrowseProjects from "./pages/BrowseProjects";
import ProjectDetails from "./pages/ProjectDetails";
import CollaborationSpace from "./pages/CollaborationSpace";
import ProfileUpdation from "./pages/ProfileUpdation";
import ProfileSetup from "./pages/ProfileSetup";
import SignInAfter from "./pages/SignInAfter";

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/dashboard"
                element={
                  <Layout>
                    <Dashboard />
                  </Layout>
                }
              />
              <Route
                path="/profile"
                element={
                  <Layout>
                    <Profile />
                  </Layout>
                }
              />
              <Route
                path="/edit-profile"
                element={
                  <Layout>
                    <EditProfile />
                  </Layout>
                }
              />
              <Route
                path="/create-post"
                element={
                  <Layout>
                    <CreatePost />
                  </Layout>
                }
              />
              <Route
                path="/browse-projects"
                element={
                  <Layout>
                    <BrowseProjects />
                  </Layout>
                }
              />
              <Route
                path="/project/"
                element={
                  <Layout>
                    <ProjectDetails />
                  </Layout>
                }
              />
              <Route
                path="/collaboration/:id"
                element={
                  <Layout>
                    <CollaborationSpace />
                  </Layout>
                }
              />
              <Route path="/updateprofile" element={<ProfileUpdation />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profilesetup" element={<ProfileSetup />}></Route>
              <Route path="/signinafter" element={<SignInAfter />}></Route>
            </Routes>
          </div>
        </Router>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;
