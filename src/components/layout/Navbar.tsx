import { Link } from "react-router-dom";
import { Menu, X, Activity, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggle = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { 
      name: "Services", 
      dropdown: [
        { name: "Diabetes Classes", path: "/classes" },
        { name: "Insulin Pump Training", path: "/pump-training" },
        { name: "CGM Training & Reports", path: "/cgm" },
        { name: "For Providers", path: "/providers" },
      ]
    },
    { name: "Coverage", path: "/coverage" },
    { 
      name: "Recipes",
      dropdown: [
        { name: "Low-Carb Zucchini Noodles", path: "/recipes" },
        { name: "Mediterranean Salmon", path: "/recipes" },
        { name: "Chia Seed Pudding", path: "/recipes" },
        { name: "View All Recipes", path: "/recipes" },
      ]
    },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-[var(--color-brand-purple)]" />
              <span className="font-heading font-bold text-2xl text-[var(--color-brand-purple)] tracking-tight">
                Nutriall
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  {link.dropdown ? (
                    <button className="flex items-center text-gray-600 hover:text-[var(--color-brand-purple)] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      {link.name}
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </button>
                  ) : (
                    <Link
                      to={link.path!}
                      className="text-gray-600 hover:text-[var(--color-brand-purple)] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                  
                  {link.dropdown && (
                    <div className="absolute left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pt-2">
                       <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 overflow-hidden">
                         {link.dropdown.map((subLink, idx) => (
                           <Link
                             key={idx}
                             to={subLink.path}
                             className={`block px-4 py-2.5 text-sm text-gray-700 hover:bg-[var(--color-brand-purple-light)] hover:text-[var(--color-brand-purple)] transition-colors ${subLink.name === "View All Recipes" ? "border-t border-gray-100 font-medium" : ""}`}
                           >
                             {subLink.name}
                           </Link>
                         ))}
                       </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-[var(--color-brand-purple)] hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg overflow-y-auto max-h-[calc(100vh-80px)]">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                      className="w-full flex items-center justify-between text-gray-600 hover:text-[var(--color-brand-purple)] hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                    >
                      {link.name}
                      <ChevronDown className={`w-5 h-5 transition-transform ${openDropdown === link.name ? "rotate-180" : ""}`} />
                    </button>
                    {openDropdown === link.name && (
                      <div className="pl-6 space-y-1 mt-1">
                        {link.dropdown.map((subLink, idx) => (
                          <Link
                            key={idx}
                            to={subLink.path}
                            onClick={toggle}
                            className={`block px-3 py-2 rounded-md text-sm text-gray-500 hover:text-[var(--color-brand-purple)] hover:bg-[var(--color-brand-purple-light)] ${subLink.name === "View All Recipes" ? "font-medium" : ""}`}
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.path!}
                    onClick={toggle}
                    className="text-gray-600 hover:text-[var(--color-brand-purple)] hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
