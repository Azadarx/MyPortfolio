import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, User, Briefcase } from "lucide-react";
import MRProfileImg from "../assets/MRprofile.jpg";
import ProfileImg from "../assets/profile.jpg";
import { useNavigate } from "react-router-dom";

const ProfileSelector = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  // Simulated profile images - replace with actual imports
  const profileImages = {
    developer: ProfileImg,
    medicalRep: MRProfileImg,
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

        // Default profiles
        setProfiles([
          {
            id: 1,
            slug: "full-stack-developer",
            title: "Full Stack Developer",
            subtitle: "Building Digital Solutions",
            image: profileImages.developer,
            redirectPath: "/developer",
            active: true,
            icon: User,
            gradient: "from-blue-600 via-indigo-600 to-blue-700",
          },
          {
            id: 2,
            slug: "medical-representative",
            title: "Medical Representative",
            subtitle: "Healthcare Professional",
            image: profileImages.medicalRep,
            redirectPath: "/medical-rep",
            active: true,
            icon: Briefcase,
            gradient: "from-blue-600 via-purple-600 to-indigo-700",
          },
        ]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleProfileClick = (redirectPath) => {
    navigate(redirectPath);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(37,99,235,0.15),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(79,70,229,0.1),transparent_50%)]" />
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-indigo-600 rounded-full filter blur-3xl opacity-10 animate-pulse" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10"
        >
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto mb-6" />
            <div
              className="absolute inset-0 w-20 h-20 border-4 border-indigo-600/20 border-b-indigo-600 rounded-full animate-spin mx-auto"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            />
          </div>
          <p className="text-slate-300 text-lg font-medium">
            Loading profiles...
          </p>
        </motion.div>
      </div>
    );
  }

  if (error && profiles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md relative z-10"
        >
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-red-500/20">
            <svg
              className="w-12 h-12 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Unable to Load Profiles
          </h2>
          <p className="text-slate-400 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-slate-900 px-4 py-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_30%_20%,rgba(37,99,235,0.15),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(79,70,229,0.1),transparent_50%)]" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-10 animate-pulse" />
      <div className="absolute -bottom-16 -left-16 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-10 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600 rounded-full filter blur-3xl opacity-5" />

      <div className="max-w-6xl w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-3 sm:mb-4 md:mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full mb-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] sm:text-xs font-medium text-blue-400">
              Choose Your Profile
            </span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
            Welcome
          </h1>
          <div className="h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 mx-auto mb-2" />
          <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
            Select a profile to explore the professional journey
          </p>
        </motion.div>

        {/* Profile Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-4xl mx-auto px-2 sm:px-0"
        >
          {profiles.map((profile, index) => {
            const Icon = profile.icon;
            return (
              <motion.div
                key={profile.slug}
                variants={itemVariants}
                onClick={() => handleProfileClick(profile.redirectPath)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group cursor-pointer"
              >
                <div className="relative">
                  {/* Glow Effect */}
                  <div
                    className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${profile.gradient} opacity-0 group-hover:opacity-75 blur-2xl transition-all duration-500`}
                  />

                  {/* Card */}
                  <div className="relative bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-500 group-hover:border-blue-500/50 group-hover:shadow-2xl group-hover:shadow-blue-500/20 group-hover:-translate-y-2">
                    {/* Profile Image */}
                    <div className="relative mx-auto w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 mb-3 sm:mb-4">
                      {/* Animated rings */}
                      <div
                        className={`absolute -inset-4 rounded-full bg-gradient-to-r ${profile.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}
                      />
                      <div
                        className={`absolute -inset-2 rounded-full bg-gradient-to-br ${profile.gradient} opacity-20 group-hover:opacity-40 blur-md transition-opacity duration-500`}
                      />

                      {/* Image container */}
                      <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-blue-500/30 ring-offset-2 sm:ring-offset-4 ring-offset-slate-800 group-hover:ring-blue-400/60 transition-all duration-500 group-hover:ring-offset-8 group-hover:scale-105">
                        <img
                          src={profile.image}
                          alt={profile.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Gradient overlay */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500`}
                        />

                        {/* Icon badge */}
                        <div
                          className={`absolute bottom-0.5 sm:bottom-1 right-0.5 sm:right-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${profile.gradient} flex items-center justify-center shadow-lg transform translate-y-16 group-hover:translate-y-0 transition-transform duration-500`}
                        >
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                      </div>

                      {/* Decorative corners */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/50 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/50 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-indigo-400 transition-all duration-300">
                        {profile.title}
                      </h2>
                      <p className="text-slate-400 mb-3 sm:mb-4 text-xs sm:text-sm font-medium">
                        {profile.subtitle}
                      </p>

                      {/* Explore Button */}
                      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-700/50 backdrop-blur-sm rounded-xl group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/25">
                        <span className="text-xs sm:text-sm text-slate-300 group-hover:text-white font-medium transition-colors duration-300">
                          Explore Profile
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>

                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ${
                          hoveredIndex === index ? "animate-shine" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-3 sm:mt-4 md:mt-6"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-xs sm:text-sm text-slate-500">
              Click on any profile to continue
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes shine {
          to {
            transform: translateX(100%);
          }
        }
        .animate-shine {
          animation: shine 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ProfileSelector;
