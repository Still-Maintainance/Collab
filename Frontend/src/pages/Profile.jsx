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

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-[1.01] ${className}`}
  >
    {children}
  </div>
);

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-xl font-medium">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6">
      {/* Edit Button */}
      <div className="flex justify-end">
        <Link
          to="/updateprofile"
          className="bg-purple-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
        >
          <Edit className="h-4 w-4" />
          Edit Profile
        </Link>
      </div>

      {/* Header */}
      <Card>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
          <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-600 overflow-hidden">
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
            <p className="text-gray-500 mt-2">{user?.careerSummary}</p>
          </div>
        </div>
      </Card>

      {/* Contact Info */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Contact & Social
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center text-sm text-gray-700">
            <Mail className="h-4 w-4 mr-2 text-blue-500" />
            {user?.email}
          </div>
         
          
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
          {user?.date && (
            <div className="flex items-center text-sm text-gray-700">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              Joined {new Date(user.date).toLocaleDateString()}
            </div>
          )}
        </div>
      </Card>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Skills */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.skills?.length > 0 ? (
                user.skills.map((skill, i) => (
                  <span
                    key={i}
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

          {/* Languages */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {user?.languages?.length > 0 ? (
                user.languages.map((lang, i) => (
                  <span
                    key={i}
                    className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {lang}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No languages added yet.</p>
              )}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Work Experience
            </h2>
            <ul className="space-y-2">
              {user?.workExperience?.length > 0 ? (
                user.workExperience.map((exp, i) => (
                  <li key={i} className="text-sm text-gray-700">
                    <span className="font-medium">{exp.role}</span> at{" "}
                    <span className="italic">{exp.company}</span> (
                    {exp.duration})
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No work experience added yet.</p>
              )}
            </ul>
          </Card>

          {/* Certifications */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Certifications
            </h2>
            <ul className="space-y-2">
              {user?.certifications?.length > 0 ? (
                user.certifications.map((cert, i) => (
                  <li key={i} className="text-sm text-gray-700">
                    {cert.name} - {cert.issuer} ({cert.date})
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No certifications added yet.</p>
              )}
            </ul>
          </Card>
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Hobbies
            </h2>
            <div className="flex flex-wrap gap-2">
              {user?.hobbies?.length > 0 ? (
                user.hobbies.map((hobby, i) => (
                  <span
                    key={i}
                    className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {hobby}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No hobbies added yet.</p>
              )}
            </div>
          </Card>
        </div>

        {/* Achievements Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Achievements
            </h2>
            <ul className="space-y-2">
              {user?.achievements?.length > 0 ? (
                user.achievements.map((ach, i) => (
                  <li key={i} className="text-sm text-gray-700">
                    {ach.title} - {ach.description}
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No achievements added yet.</p>
              )}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
