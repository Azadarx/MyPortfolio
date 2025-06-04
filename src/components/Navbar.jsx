import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Moon, Sun, Monitor, LogIn, LogOut } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("none");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { currentTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Define base navigation links
  const baseNavLinks = [
    { title: "Home", href: "/", id: "home" },
    { title: "About", href: "/about", id: "about" },
    { title: "Projects", href: "/projects", id: "projects" },
    { title: "Skills", href: "/skills", id: "skills" },
    { title: "Contact", href: "/contact", id: "contact" },
  ];

  // Conditionally add Admin Dashboard link if authenticated
  const navLinks = isAuthenticated
    ? [
        ...baseNavLinks,
        {
          title: "Admin Dashboard",
          href: "/admin/dashboard",
          id: "admin/dashboard",
        },
      ]
    : baseNavLinks;

  // Get current path without the leading slash
  const currentPath =
    location.pathname === "/" ? "home" : location.pathname.substring(1);

  // Check authentication status on mount and when location changes
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setIsAuthenticated(!!token);
  }, [location]);

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Determine scroll direction
          if (currentScrollY > lastScrollY) {
            setScrollDirection("down");
          } else if (currentScrollY < lastScrollY) {
            setScrollDirection("up");
          }

          // Set navbar background when scrolled
          setScrolled(currentScrollY > 20);

          // Update last scroll position
          setLastScrollY(currentScrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
    navigate("/admin-login");
    closeMenu();
  };

  // Dynamic navbar styles based on scroll position and theme
  const getNavbarClasses = () => {
    const baseClasses =
      "fixed top-0 left-0 w-full z-50 transition-all duration-500";

    if (currentTheme === "dark") {
      return `${baseClasses} ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-teal-500/5 border-b border-teal-500/10"
          : "bg-slate-900/80"
      }`;
    } else {
      return `${baseClasses} ${
        scrolled
          ? "bg-slate-50/95 backdrop-blur-md shadow-lg border-b border-slate-200"
          : "bg-white/80"
      }`;
    }
  };

  // Add auto-hide behavior when scrolling down (only when not at the top)
  const getNavbarTransform = () => {
    if (scrollDirection === "down" && scrolled && !isOpen) {
      return "transform -translate-y-full";
    }
    return "transform translate-y-0";
  };

  // Optimized theme toggle component
  const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
      <button
        onClick={toggleTheme}
        className="p-1.5 sm:p-2 rounded-full hover:bg-teal-500/20 dark:hover:bg-teal-400/20 transition-all duration-300 relative overflow-hidden group flex-shrink-0"
        aria-label="Toggle theme"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
        {theme === "dark" && (
          <Moon
            size={18}
            className="text-teal-600 relative z-10 group-hover:text-teal-700 transition-colors duration-300 sm:w-5 sm:h-5"
          />
        )}
        {theme === "light" && (
          <Sun
            size={18}
            className="text-teal-400 relative z-10 group-hover:text-teal-300 transition-colors duration-300 sm:w-5 sm:h-5"
          />
        )}
        {theme === "system" && (
          <Monitor
            size={18}
            className="text-teal-600 dark:text-teal-400 relative z-10 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors duration-300 sm:w-5 sm:h-5"
          />
        )}
      </button>
    );
  };

  return (
    <header className={`${getNavbarClasses()} ${getNavbarTransform()}`}>
      <nav className="w-full max-w-none">
        <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-18 lg:h-20">
            {/* Logo - Responsive and perfectly aligned */}
            <div className="flex-shrink-0 min-w-0">
              <Link
                to="/"
                className={`${
                  currentTheme === "dark" ? "text-white" : "text-slate-800"
                } transition-colors group flex items-center`}
              >
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span className="text-teal-500 font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl relative inline-block">
                    <span className="hidden min-[400px]:inline">SYED AZADAR HUSSAIN</span>
                    <span className="inline min-[400px]:hidden">S. AZADAR</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-400 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                  </span>
                  <span className="text-slate-400 font-light text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">|</span>
                  <span
                    className={`font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl relative ${
                      currentTheme === "dark" ? "text-white" : "text-slate-700"
                    }`}
                  >
                    Dev
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-400 opacity-0 group-hover:w-full group-hover:opacity-100 transition-all duration-300 ease-in-out delay-100"></span>
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop navigation - Perfectly spaced for all screen sizes */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center space-x-2 xl:space-x-4 2xl:space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    to={link.href}
                    className={`text-xs xl:text-sm 2xl:text-base font-medium transition-all duration-300 relative group px-2 xl:px-3 2xl:px-4 py-2 whitespace-nowrap ${
                      currentPath === link.id
                        ? "text-teal-500 dark:text-teal-400"
                        : currentTheme === "dark"
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-slate-900"
                    }`}
                  >
                    {link.title}
                    <span
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-300 ease-in-out ${
                        currentPath === link.id ? "w-3/4" : "w-0 group-hover:w-3/4"
                      }`}
                    ></span>
                  </Link>
                ))}
                
                {/* Auth Button */}
                <div className="ml-2 xl:ml-4 2xl:ml-6">
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className={`text-xs xl:text-sm 2xl:text-base font-medium transition-all duration-300 relative group flex items-center px-2 xl:px-3 2xl:px-4 py-2 whitespace-nowrap ${
                        currentTheme === "dark"
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-700 hover:text-slate-900"
                      }`}
                    >
                      <LogOut size={14} className="mr-1.5 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5" />
                      Logout
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-300 ease-in-out w-0 group-hover:w-3/4"></span>
                    </button>
                  ) : (
                    <Link
                      to="/admin-login"
                      className={`text-xs xl:text-sm 2xl:text-base font-medium transition-all duration-300 relative group flex items-center px-2 xl:px-3 2xl:px-4 py-2 whitespace-nowrap ${
                        currentPath === "admin-login"
                          ? "text-teal-500 dark:text-teal-400"
                          : currentTheme === "dark"
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-700 hover:text-slate-900"
                      }`}
                    >
                      <LogIn size={14} className="mr-1.5 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5" />
                      Admin
                      <span
                        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-300 ease-in-out ${
                          currentPath === "admin-login"
                            ? "w-3/4"
                            : "w-0 group-hover:w-3/4"
                        }`}
                      ></span>
                    </Link>
                  )}
                </div>
                
                {/* Theme Toggle */}
                <div className="ml-2 xl:ml-4 2xl:ml-6 pl-2 xl:pl-4 2xl:pl-6 border-l border-gray-300 dark:border-gray-600">
                  <ThemeToggle />
                </div>
              </div>
            </div>

            {/* Tablet navigation - Medium screens */}
            <div className="hidden md:flex lg:hidden items-center">
              <div className="flex items-center space-x-1">
                {baseNavLinks.slice(0, 3).map((link) => (
                  <Link
                    key={link.id}
                    to={link.href}
                    className={`text-xs font-medium transition-all duration-300 relative group px-2 py-2 whitespace-nowrap ${
                      currentPath === link.id
                        ? "text-teal-500 dark:text-teal-400"
                        : currentTheme === "dark"
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-slate-900"
                    }`}
                  >
                    {link.title}
                    <span
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-300 ease-in-out ${
                        currentPath === link.id ? "w-3/4" : "w-0 group-hover:w-3/4"
                      }`}
                    ></span>
                  </Link>
                ))}
                <div className="ml-2 pl-2 border-l border-gray-300 dark:border-gray-600">
                  <ThemeToggle />
                </div>
                <button
                  onClick={toggleMenu}
                  className={`ml-2 p-2 rounded-md ${
                    currentTheme === "dark"
                      ? "text-gray-300 hover:bg-teal-400/20"
                      : "text-gray-700 hover:bg-teal-500/20"
                  } transition-colors duration-300 relative overflow-hidden group`}
                  aria-label="Toggle menu"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                  {isOpen ? (
                    <X
                      size={20}
                      className={`relative z-10 ${
                        currentTheme === "dark"
                          ? "group-hover:text-teal-400"
                          : "group-hover:text-teal-600"
                      } transition-colors duration-300`}
                    />
                  ) : (
                    <Menu
                      size={20}
                      className={`relative z-10 ${
                        currentTheme === "dark"
                          ? "group-hover:text-teal-400"
                          : "group-hover:text-teal-600"
                      } transition-colors duration-300`}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile menu button - Small screens */}
            <div className="flex items-center md:hidden">
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <button
                  onClick={toggleMenu}
                  className={`p-1.5 sm:p-2 rounded-md ${
                    currentTheme === "dark"
                      ? "text-gray-300 hover:bg-teal-400/20"
                      : "text-gray-700 hover:bg-teal-500/20"
                  } transition-colors duration-300 relative overflow-hidden group`}
                  aria-label="Toggle menu"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                  {isOpen ? (
                    <X
                      size={20}
                      className={`relative z-10 ${
                        currentTheme === "dark"
                          ? "group-hover:text-teal-400"
                          : "group-hover:text-teal-600"
                      } transition-colors duration-300 sm:w-6 sm:h-6`}
                    />
                  ) : (
                    <Menu
                      size={20}
                      className={`relative z-10 ${
                        currentTheme === "dark"
                          ? "group-hover:text-teal-400"
                          : "group-hover:text-teal-600"
                      } transition-colors duration-300 sm:w-6 sm:h-6`}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer - Perfectly responsive for all mobile sizes */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${
          isOpen ? "visible" : "invisible"
        }`}
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
      >
        {/* Backdrop with blur effect */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        />

        {/* Drawer content - Perfectly sized for all devices */}
        <div
          className={`absolute top-0 right-0 w-full min-[400px]:w-4/5 sm:w-3/4 md:w-2/3 h-full ${
            currentTheme === "dark" ? "bg-slate-900" : "bg-white"
          } shadow-xl shadow-teal-900/20 flex flex-col transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile drawer header */}
          <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <div
              className={`text-base sm:text-lg md:text-xl font-bold ${
                currentTheme === "dark" ? "text-white" : "text-slate-800"
              } truncate pr-2`}
            >
              <span className="text-teal-500">SYED AZADAR</span>
              <span className="text-slate-400 mx-1">|</span>
              <span>Dev</span>
            </div>
            <button
              onClick={closeMenu}
              className={`p-2 rounded-md ${
                currentTheme === "dark"
                  ? "text-gray-300 hover:bg-teal-400/20"
                  : "text-gray-700 hover:bg-teal-500/20"
              } transition-colors duration-300 flex-shrink-0`}
              aria-label="Close menu"
            >
              <X
                size={24}
                className={
                  currentTheme === "dark" ? "text-teal-400" : "text-teal-600"
                }
              />
            </button>
          </div>

          {/* Mobile menu links - Perfectly spaced for touch */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="flex flex-col space-y-4 sm:space-y-6">
              {navLinks.map((link, index) => (
                <Link
                  key={link.id}
                  to={link.href}
                  onClick={closeMenu}
                  className={`text-base sm:text-lg md:text-xl font-medium transition-colors duration-300 relative group flex items-center py-2 ${
                    currentPath === link.id
                      ? currentTheme === "dark"
                        ? "text-teal-400"
                        : "text-teal-500"
                      : currentTheme === "dark"
                      ? "text-gray-300"
                      : "text-gray-700"
                  } animate-fade-slide-in`}
                  style={{
                    animationDelay: `${index * 50 + 100}ms`,
                  }}
                >
                  {link.title}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-300 ease-in-out ${
                      currentPath === link.id
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              ))}
              
              {/* Auth button in mobile menu */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className={`text-base sm:text-lg md:text-xl font-medium transition-colors duration-300 relative group flex items-center py-2 ${
                      currentTheme === "dark" ? "text-gray-300" : "text-gray-700"
                    } animate-fade-slide-in`}
                    style={{
                      animationDelay: `${navLinks.length * 50 + 100}ms`,
                    }}
                  >
                    <LogOut size={20} className="mr-3 sm:w-6 sm:h-6" />
                    Logout
                    <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-300 ease-in-out w-0 group-hover:w-full"></span>
                  </button>
                ) : (
                  <Link
                    to="/admin-login"
                    onClick={closeMenu}
                    className={`text-base sm:text-lg md:text-xl font-medium transition-colors duration-300 relative group flex items-center py-2 ${
                      currentPath === "admin-login"
                        ? currentTheme === "dark"
                          ? "text-teal-400"
                          : "text-teal-500"
                        : currentTheme === "dark"
                        ? "text-gray-300"
                        : "text-gray-700"
                    } animate-fade-slide-in`}
                    style={{
                      animationDelay: `${navLinks.length * 50 + 100}ms`,
                    }}
                  >
                    <LogIn size={20} className="mr-3 sm:w-6 sm:h-6" />
                    Admin Login
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-300 ease-in-out ${
                        currentPath === "admin-login"
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Social links footer in mobile menu */}
          <div
            className={`p-4 sm:p-6 border-t ${
              currentTheme === "dark" ? "border-gray-700" : "border-gray-200"
            } animate-fade-in`}
            style={{ animationDelay: "400ms" }}
          >
            <p
              className={`text-sm ${
                currentTheme === "dark" ? "text-gray-400" : "text-gray-500"
              } mb-3`}
            >
              Connect with me
            </p>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { name: "GitHub", icon: "github" },
                { name: "LinkedIn", icon: "linkedin" },
                { name: "Twitter", icon: "twitter" },
              ].map((platform, index) => (
                <button
                  key={platform.name}
                  className={`px-3 py-2 text-sm ${
                    currentTheme === "dark"
                      ? "text-gray-300 hover:bg-teal-400/20"
                      : "text-gray-700 hover:bg-teal-500/20"
                  } rounded-md transition-colors duration-300 animate-fade-in text-center`}
                  style={{ animationDelay: `${index * 100 + 500}ms` }}
                >
                  {platform.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;