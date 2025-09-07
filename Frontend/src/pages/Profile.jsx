import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Edit,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Mail,
  Calendar,
} from "lucide-react";

// A reusable card component for a consistent look
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-[1.01] ${className}`}
  >
    {children}
  </div>
);

const Profile = () => {
  const { user } = useAuth();

  // Handle loading state
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-xl font-medium">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <div className="flex justify-end">
        <Link
          to="/updateprofile"
          className="bg-purple-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
        >
          <Edit className="h-4 w-4" />
          Edit Profile
        </Link>
      </div>

      {/* Main Profile Header */}
      <Card>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
          <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-600 object-cover overflow-hidden">
            {/* Using a placeholder for avatar */}
            {user?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              ?.toUpperCase()}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
              {user?.name}
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              {user?.role || "Developer"}
            </p>
            <p className="text-gray-500 mt-2">
              {user?.bio || "No bio provided."}
            </p>
          </div>
        </div>
      </Card>

      {/* Contact & Social Links */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Contact & Social
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center text-sm text-gray-700">
            <Mail className="h-4 w-4 mr-2 text-blue-500" />
            {user?.email}
          </div>
          {user?.location && (
            <div className="flex items-center text-sm text-gray-700">
              <MapPin className="h-4 w-4 mr-2 text-red-500" />
              {user.location}
            </div>
          )}
          {user?.website && (
            <a
              href={user.website}
              className="flex items-center text-sm text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Globe className="h-4 w-4 mr-2 text-green-500" />
              Website
            </a>
          )}
          {user?.linkedin && (
            <a
              target="blank"
              href={`https://linkedin.com/in/${user.linkedin}`}
              className="flex items-center text-sm text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
              LinkedIn
            </a>
          )}
          {user?.github && (
            <a
              target="blank"
              href={`https://github.com/${user.github}`}
              className="flex items-center text-sm text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Github className="h-4 w-4 mr-2 text-gray-800" />
              GitHub
            </a>
          )}
          {user?.joinDate && (
            <div className="flex items-center text-sm text-gray-700">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              Joined {new Date(user.joinDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skills & Bio */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.skills?.length > 0 ? (
                user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No skills added yet.</p>
              )}
            </div>
          </Card>

          {/* Projects */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">8</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    Projects Completed
                  </div>
                  <div className="text-sm text-gray-600">All successful</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">8</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    Ongoing Projects
                  </div>
                  <div className="text-sm text-gray-600">Making an impact</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Achievements Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Achievements
            </h2>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <span className="text-yellow-500 mr-2">🌟</span>
                <span className="text-sm text-gray-700">
                  Awarded "Top Contributor"
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-2">🏆</span>
                <span className="text-sm text-gray-700">
                  Project Manager Certification
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">💡</span>
                <span className="text-sm text-gray-700">
                  Innovative Idea Prize
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
