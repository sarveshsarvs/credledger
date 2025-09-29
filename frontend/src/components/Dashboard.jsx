import { useNavigate } from "react-router-dom";
import { UserPlus, Users, GraduationCap } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B143F] via-[#2D1B4F] to-[#4B2C82] flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-cyan-400 mr-3 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Learner Hub
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Manage and track your learners' progress with ease
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Add New Learner Card */}
          <div className="p-8 bg-white bg-opacity-10 rounded-2xl shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Add New Learner</h2>
            <p className="text-gray-300 mb-4">
              Register a new learner and track their course progress
            </p>
            <button
              onClick={() => navigate("/add-learner")}
              className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 font-semibold py-3 rounded-lg hover:scale-105 transition-transform duration-300"
            >
              Get Started
            </button>
          </div>

          {/* Show All Learners Card */}
          <div className="p-8 bg-white bg-opacity-10 rounded-2xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">View All Learners</h2>
            <p className="text-gray-300 mb-4">
              Browse and manage all registered learners in one place
            </p>
            <button
              onClick={() => navigate("/show-learners")}
              className="w-full border-2 border-white text-white font-semibold py-3 rounded-lg hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
            >
              View Learners
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-300">
            Empowering education through technology
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
