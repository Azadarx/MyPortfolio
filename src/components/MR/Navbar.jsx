import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Moon, Sun, Monitor, LogIn, LogOut } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const MRNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { currentTheme } = useTheme();
  const location = useLocation();
  // const navigate = useNavigate();

  const baseNavLinks = [
    { title: "Home", href: "/medical-rep", id: "/medical-rep" },
    {
      title: "About",
      href: "/medical-rep/about",
      id: "/medical-rep/about",
    },
    {
      title: "Experience",
      href: "/medical-rep/experience",
      id: "/medical-rep/experience",
    },
    {
      title: "Products",
      href: "/medical-rep/products",
      id: "/medical-rep/products",
    },
    {
      title: "Contact",
      href: "/medical-rep/contact",
      id: "/medical-rep/contact",
    },
  ];

  // const navLinks = isAuthenticated
  //   ? [
  //       ...baseNavLinks,
  //       {
  //         title: "Admin Dashboard",
  //         href: "/admin/dashboard",
  //         id: "/admin/dashboard",
  //       },
  //     ]
  //   : baseNavLinks;

  const navLinks = baseNavLinks;

  const currentPath = location.pathname;

  // useEffect(() => {
  //   const token = localStorage.getItem("jwtToken");
  //   setIsAuthenticated(!!token);
  // }, [location]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // const handleLogout = () => {
  //   localStorage.removeItem("jwtToken");
  //   setIsAuthenticated(false);
  //   navigate("/admin-login");
  //   closeMenu();
  // };

  const getNavbarClasses = () => {
    const baseClasses =
      "fixed top-0 left-0 w-full z-50 transition-all duration-500";

    if (currentTheme === "dark") {
      return `${baseClasses} ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-blue-500/10 border-b border-blue-500/20"
          : "bg-slate-900/90"
      }`;
    } else {
      return `${baseClasses} ${
        scrolled
          ? "bg-slate-100/95 backdrop-blur-md shadow-lg border-b border-blue-200/50"
          : "bg-slate-50/90"
      }`;
    }
  };
  const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
      <button
        onClick={toggleTheme}
        className="p-1.5 sm:p-2 rounded-full hover:bg-blue-500/20 dark:hover:bg-blue-400/20 transition-all duration-300 relative overflow-hidden group flex-shrink-0"
        aria-label="Toggle theme"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
        {theme === "dark" && (
          <Moon
            size={18}
            className="text-blue-600 relative z-10 group-hover:text-blue-700 transition-colors duration-300 sm:w-5 sm:h-5"
          />
        )}
        {theme === "light" && (
          <Sun
            size={18}
            className="text-blue-400 relative z-10 group-hover:text-blue-300 transition-colors duration-300 sm:w-5 sm:h-5"
          />
        )}
        {theme === "system" && (
          <Monitor
            size={18}
            className="text-blue-600 dark:text-blue-400 relative z-10 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300 sm:w-5 sm:h-5"
          />
        )}
      </button>
    );
  };

  return (
    <header className={`${getNavbarClasses()}`}>
      <nav className="w-full max-w-none">
        <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-18 lg:h-20">
            <div className="flex-shrink-0 min-w-0">
              <Link
                to="/"
                className={`${
                  currentTheme === "dark" ? "text-white" : "text-slate-800"
                } transition-colors group flex items-center`}
              >
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span className="text-blue-500 font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl relative inline-block">
                    <span className="hidden min-[400px]:inline">
                      SYED AZADAR HUSSAIN
                    </span>
                    <span className="inline min-[400px]:hidden">S. AZADAR</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-green-400 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                  </span>
                  <span className="text-slate-400 font-light text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                    |
                  </span>
                  <span
                    className={`font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl relative ${
                      currentTheme === "dark" ? "text-white" : "text-slate-700"
                    }`}
                  >
                    MR
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-green-400 opacity-0 group-hover:w-full group-hover:opacity-100 transition-all duration-300 ease-in-out delay-100"></span>
                  </span>
                </div>
              </Link>
            </div>

            {/* DESKTOP NAVIGATION */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center space-x-2 xl:space-x-4 2xl:space-x-6">
                {/* Portfolio Switcher Button */}
                <Link
                  to="/"
                  className={`text-xs xl:text-sm font-medium transition-all duration-300 relative overflow-hidden group px-3 xl:px-4 py-1.5 xl:py-2 whitespace-nowrap rounded-lg ${
                    currentTheme === "dark"
                      ? "bg-gradient-to-r from-blue-500/10 to-green-500/10 text-blue-400 hover:from-blue-500/20 hover:to-green-500/20 border border-blue-400/20 hover:border-blue-400/40"
                      : "bg-gradient-to-r from-blue-50 to-green-50 text-blue-600 hover:from-blue-100 hover:to-green-100 border border-blue-200 hover:border-blue-300"
                  }`}
                >
                  <span className="flex items-center gap-1.5 relative z-10">
                    <span className="text-sm xl:text-base">💻</span>
                    <span>Developer</span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-green-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                </Link>

                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    to={link.href}
                    className={`text-xs xl:text-sm 2xl:text-base font-medium transition-all duration-300 relative group px-2 xl:px-3 2xl:px-4 py-2 whitespace-nowrap ${
                      currentPath === link.id
                        ? "text-blue-500 dark:text-blue-400"
                        : currentTheme === "dark"
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-slate-900"
                    }`}
                  >
                    {link.title}
                    <span
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-green-400 transition-all duration-300 ease-in-out ${
                        currentPath === link.id
                          ? "w-3/4"
                          : "w-0 group-hover:w-3/4"
                      }`}
                    ></span>
                  </Link>
                ))}

                {/* ADMIN LOGIN/LOGOUT - DESKTOP - COMMENTED OUT */}
                {/* <div className="ml-2 xl:ml-4 2xl:ml-6">
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className={`text-xs xl:text-sm 2xl:text-base font-medium transition-all duration-300 relative group flex items-center px-2 xl:px-3 2xl:px-4 py-2 whitespace-nowrap ${
                        currentTheme === "dark"
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-700 hover:text-slate-900"
                      }`}
                    >
                      <LogOut
                        size={14}
                        className="mr-1.5 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5"
                      />
                      Logout
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-green-400 transition-all duration-300 ease-in-out w-0 group-hover:w-3/4"></span>
                    </button>
                  ) : (
                    <Link
                      to="/admin-login"
                      className={`text-xs xl:text-sm 2xl:text-base font-medium transition-all duration-300 relative group flex items-center px-2 xl:px-3 2xl:px-4 py-2 whitespace-nowrap ${
                        currentPath === "/admin-login"
                          ? "text-blue-500 dark:text-blue-400"
                          : currentTheme === "dark"
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-700 hover:text-slate-900"
                      }`}
                    >
                      <LogIn
                        size={14}
                        className="mr-1.5 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5"
                      />
                      Admin
                      <span
                        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-green-400 transition-all duration-300 ease-in-out ${
                          currentPath === "/admin-login"
                            ? "w-3/4"
                            : "w-0 group-hover:w-3/4"
                        }`}
                      ></span>
                    </Link>
                  )}
                </div> */}

                <div className="ml-2 xl:ml-4 2xl:ml-6 pl-2 xl:pl-4 2xl:pl-6 border-l border-gray-300 dark:border-gray-600">
                  <ThemeToggle />
                </div>
              </div>
            </div>

            {/* TABLET NAVIGATION */}
            <div className="hidden md:flex lg:hidden items-center">
              <div className="flex items-center space-x-1">
                {baseNavLinks.slice(0, 2).map((link) => (
                  <Link
                    key={link.id}
                    to={link.href}
                    className={`text-xs font-medium transition-all duration-300 relative group px-2 py-2 whitespace-nowrap ${
                      currentPath === link.id
                        ? "text-blue-500 dark:text-blue-400"
                        : currentTheme === "dark"
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-slate-900"
                    }`}
                  >
                    {link.title}
                    <span
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-green-400 transition-all duration-300 ease-in-out ${
                        currentPath === link.id
                          ? "w-3/4"
                          : "w-0 group-hover:w-3/4"
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
                      ? "text-gray-300 hover:bg-blue-400/20"
                      : "text-gray-700 hover:bg-blue-500/20"
                  } transition-colors duration-300 relative overflow-hidden group`}
                  aria-label="Toggle menu"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                  {isOpen ? (
                    <X
                      size={20}
                      className={`relative z-10 ${
                        currentTheme === "dark"
                          ? "group-hover:text-blue-400"
                          : "group-hover:text-blue-600"
                      } transition-colors duration-300`}
                    />
                  ) : (
                    <Menu
                      size={20}
                      className={`relative z-10 ${
                        currentTheme === "dark"
                          ? "group-hover:text-blue-400"
                          : "group-hover:text-blue-600"
                      } transition-colors duration-300`}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* MOBILE TOGGLE */}
            <div className="flex items-center md:hidden">
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <button
                  onClick={toggleMenu}
                  className={`p-1.5 sm:p-2 rounded-md ${
                    currentTheme === "dark"
                      ? "text-gray-300 hover:bg-blue-400/20"
                      : "text-gray-700 hover:bg-blue-500/20"
                  } transition-colors duration-300 relative overflow-hidden group`}
                  aria-label="Toggle menu"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                  {isOpen ? (
                    <X
                      size={20}
                      className={`relative z-10 ${
                        currentTheme === "dark"
                          ? "group-hover:text-blue-400"
                          : "group-hover:text-blue-600"
                      } transition-colors duration-300 sm:w-6 sm:h-6`}
                    />
                  ) : (
                    <Menu
                      size={20}
                      className={`relative z-10 ${
                        currentTheme === "dark"
                          ? "group-hover:text-blue-400"
                          : "group-hover:text-blue-600"
                      } transition-colors duration-300 sm:w-6 sm:h-6`}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${
          isOpen ? "visible" : "invisible"
        }`}
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        />

        <div
          className={`absolute top-0 right-0 w-full min-[400px]:w-4/5 sm:w-3/4 md:w-2/3 h-[100dvh] ${
            currentTheme === "dark" ? "bg-slate-900" : "bg-white"
          } shadow-xl shadow-blue-900/20 flex flex-col transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-2.5 sm:px-5 sm:py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div
              className={`text-base sm:text-lg font-bold ${
                currentTheme === "dark" ? "text-white" : "text-slate-800"
              } truncate pr-2`}
            >
              <span className="text-blue-500">SYED AZADAR</span>
              <span className="text-slate-400 mx-1.5">|</span>
              <span>MR</span>
            </div>
            <button
              onClick={closeMenu}
              className={`p-2 rounded-md ${
                currentTheme === "dark"
                  ? "text-gray-300 hover:bg-blue-400/20"
                  : "text-gray-700 hover:bg-blue-500/20"
              } transition-colors duration-300 flex-shrink-0`}
              aria-label="Close menu"
            >
              <X
                size={24}
                className={`${
                  currentTheme === "dark" ? "text-blue-400" : "text-blue-600"
                }`}
              />
            </button>
          </div>

          <div
            className="overflow-y-auto px-4 py-6 sm:px-6 sm:py-10"
            style={{ maxHeight: "calc(100dvh - 64px)" }}
          >
            <div className="flex flex-col space-y-3 sm:space-y-4">
              {/* Portfolio Switcher Button - Mobile */}
              <Link
                to="/"
                onClick={closeMenu}
                className={`text-base sm:text-lg font-semibold transition-all duration-300 relative overflow-hidden group flex items-center justify-center py-4 sm:py-5 px-4 rounded-xl ${
                  currentTheme === "dark"
                    ? "bg-gradient-to-r from-blue-500/15 to-green-500/15 text-blue-400 hover:from-blue-500/25 hover:to-green-500/25 border border-blue-400/30"
                    : "bg-gradient-to-r from-blue-50 to-green-50 text-blue-600 hover:from-blue-100 hover:to-green-100 border border-blue-200"
                } animate-fade-slide-in`}
                style={{ animationDelay: "50ms" }}
              >
                <span className="flex items-center gap-2 relative z-10">
                  <span className="text-xl">💻</span>
                  <span>Developer Portfolio</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              </Link>

              {navLinks.map((link, index) => (
                <Link
                  key={link.id}
                  to={link.href}
                  onClick={closeMenu}
                  className={`text-lg sm:text-xl font-medium transition-all duration-300 relative group flex items-center py-4 sm:py-6 px-5 rounded-xl hover:bg-blue-500/5 ${
                    currentPath === link.id
                      ? currentTheme === "dark"
                        ? "text-blue-400 bg-blue-500/10"
                        : "text-blue-500 bg-blue-500/10"
                      : currentTheme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-slate-900"
                  } animate-fade-slide-in`}
                  style={{
                    animationDelay: `${index * 50 + 150}ms`,
                  }}
                >
                  {link.title}
                  <span
                    className={`absolute bottom-4 left-5 h-0.5 bg-gradient-to-r from-blue-500 to-green-400 transition-all duration-300 ease-in-out ${
                      currentPath === link.id
                        ? "w-[calc(100%-2.5rem)]"
                        : "w-0 group-hover:w-[calc(100%-2.5rem)]"
                    }`}
                  ></span>
                </Link>
              ))}

              {/* ADMIN LOGIN/LOGOUT - MOBILE - COMMENTED OUT */}
              {/* <div className="pt-5 sm:pt-7 mt-4 sm:mt-5 border-t border-gray-200 dark:border-gray-700">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className={`w-full text-lg sm:text-xl font-medium transition-all duration-300 relative group flex items-center py-5 sm:py-6 px-5 rounded-xl hover:bg-blue-500/5 ${
                      currentTheme === "dark"
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-slate-900"
                    } animate-fade-slide-in`}
                    style={{
                      animationDelay: `${navLinks.length * 50 + 150}ms`,
                    }}
                  >
                    <LogOut
                      size={22}
                      className="mr-4 sm:mr-5 sm:w-7 sm:h-7 flex-shrink-0"
                    />
                    Logout
                    <span className="absolute bottom-4 left-5 h-0.5 bg-gradient-to-r from-blue-500 to-green-400 transition-all duration-300 ease-in-out w-0 group-hover:w-[calc(100%-2.5rem)]"></span>
                  </button>
                ) : (
                  <Link
                    to="/admin-login"
                    onClick={closeMenu}
                    className={`text-lg sm:text-xl font-medium transition-all duration-300 relative group flex items-center py-5 sm:py-6 px-5 rounded-xl hover:bg-blue-500/5 ${
                      currentPath === "/admin-login"
                        ? currentTheme === "dark"
                          ? "text-blue-400 bg-blue-500/10"
                          : "text-blue-500 bg-blue-500/10"
                        : currentTheme === "dark"
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-slate-900"
                    } animate-fade-slide-in`}
                    style={{
                      animationDelay: `${navLinks.length * 50 + 150}ms`,
                    }}
                  >
                    <LogIn
                      size={22}
                      className="mr-4 sm:mr-5 sm:w-7 sm:h-7 flex-shrink-0"
                    />
                    Admin Login
                    <span
                      className={`absolute bottom-4 left-5 h-0.5 bg-gradient-to-r from-blue-500 to-green-400 transition-all duration-300 ease-in-out ${
                        currentPath === "/admin-login"
                          ? "w-[calc(100%-2.5rem)]"
                          : "w-0 group-hover:w-[calc(100%-2.5rem)]"
                      }`}
                    ></span>
                  </Link>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MRNavbar;