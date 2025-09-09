import React from "react";
import { useProjects } from "../contexts/ProjectContext";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import {
  Plus,
  FolderKanban,
  LineChart,
  Users,
  CheckCircle2,
  Clock,
} from "lucide-react";



// --- Reusable Card Component ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-white p-6 rounded-2xl shadow-sm ${className}`}>
    {children}
  </div>
);

const Dashboard = () => {
  let projects = [];
  let user = null;
  try {
    const context = useProjects();
    const auth = useAuth();
    user = auth && auth.user ? auth.user : null;
    projects = context && context.projects ? context.projects : [];
  } catch (e) {
    projects = [];
  }
  // Only show projects created by the logged-in user (by email)
  const myProjects = user && user.email ? projects.filter(p => p.authorEmail === user.email) : [];
  // Dynamic counts
  const ongoingCount = myProjects.filter(p => (p.status || '').toLowerCase() === 'active' || (p.status || '').toLowerCase() === 'ongoing').length;
  const completedCount = myProjects.filter(p => (p.status || '').toLowerCase() === 'completed' || (p.status || '').toLowerCase() === 'done' || (p.status || '').toLowerCase() === 'finished').length;
  const activeCollabCount = myProjects.reduce((sum, p) => sum + (p.collaborators || 0), 0);
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, Tanmay Manda!
            </h1>
            <p className="mt-1 text-slate-500">
              Let's see what's happening with your projects today.
            </p>
          </div>
          <Link
            to="/create-project" // Assuming this is your route for creating a new project
            className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            <Plus size={20} />
            Create New Project
          </Link>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <FolderKanban className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {ongoingCount}
              </p>
              <p className="text-sm text-slate-500">Ongoing Projects</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle2 className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
              <p className="text-sm text-slate-500">Projects Completed</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeCollabCount}</p>
              <p className="text-sm text-slate-500">Active Collaborations</p>
            </div>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* My Ongoing Projects Section */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">
              My Ongoing Projects
            </h2>
            {user && myProjects.length === 0 ? (
              <div className="text-slate-500">You have not created any projects yet.</div>
            ) : user ? (
              myProjects.map((project) => (
                <Card key={project.id} className="transition-transform hover:scale-[1.02] duration-300">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        {project.description}
                      </p>
                    </div>
                    <span className="text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full whitespace-nowrap">
                      {project.status}
                    </span>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-slate-500">Progress</span>
                      <span className="text-sm font-semibold text-gray-800">
                        {project.progress ? project.progress : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${project.progress ? project.progress : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
                    <div className="flex -space-x-2">
                      {project.team && project.team.map((avatarUrl, index) => (
                        <img
                          key={index}
                          className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                          src={avatarUrl}
                          alt="Team member"
                        />
                      ))}
                    </div>
                    <Link
                      to={`/project/${project.id}`}
                      className="text-sm font-semibold text-blue-600 hover:underline"
                    >
                      View Project
                    </Link>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-slate-500">Please sign in to view your projects.</div>
            )}
          </div>

          {/* Recent Activity Section */}
          <div className="lg:col-span-1">
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Recent Activity
              </h2>
              <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 rounded-lg">
                <Clock className="text-slate-400" size={40} />
                <p className="mt-4 font-semibold text-gray-800">
                  No activity yet
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Updates from your projects will appear here.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;