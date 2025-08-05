"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

import { Menu, X, Home, MapPin, Tag, Gift } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { user, logout, loading } = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled down for background effect
      setIsScrolled(currentScrollY > 10);

      // Handle navbar hide/show - only after scrolling past 500px
      if (currentScrollY > 500) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down - hide navbar immediately
          setIsNavbarVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          // Scrolling up - show navbar immediately
          setIsNavbarVisible(true);
        }
      } else {
        // Always show navbar when within 500px from top
        setIsNavbarVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/activity", label: "Activities", icon: MapPin },
    { href: "/category", label: "Categories", icon: Tag },
    { href: "/promo", label: "Promos", icon: Gift },
  ];

  const isActive = (href) => pathname === href;

  // Cart Hover Card

  // Mobile Menu
  const MobileMenu = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu Panel */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-0 right-0 z-40 bg-white shadow-2xl lg:hidden overflow-y-auto"
            style={{ top: "4rem", height: "calc(100vh - 4rem)" }}
          >
            <div className="flex flex-col h-full">
              <div className="flex-1 px-6 py-4 bg-white">
                <div className="space-y-4">
                  {/* Main Navigation */}
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
                          isActive(item.href)
                            ? "text-blue-700 bg-blue-50 border border-blue-200"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isNavbarVisible ? 0 : -100 }}
      transition={{
        type: "spring",
        stiffness: 1000,
        damping: 50,
        mass: 0.1,
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-50 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="relative transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/assets/Parama-Logo-1.png"
                  alt="Kelana Logo"
                  className="object-contain w-20 h-20 lg:w-28 lg:h-28"
                />
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative z-50 lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.div
              initial={false}
              animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={{
                  open: {
                    scale: 1.2,
                  },
                  closed: {
                    scale: 1,
                  },
                }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600" />
                )}
              </motion.div>
            </motion.div>
          </Button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-base font-medium transition-all duration-500 rounded-xl ${
                  isActive(item.href)
                    ? "text-blue-700"
                    : "text-gray-700 hover:text-blue-600"
                }`}
                style={{ overflow: "visible" }}
              >
                <span>{item.label}</span>
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-1/2 -translate-x-1/2 bottom-1 h-[3px] w-6 rounded-full"
                  animate={
                    isActive(item.href)
                      ? { scaleX: 1, opacity: 1 }
                      : { scaleX: 0, opacity: 0 }
                  }
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ background: "#2563eb", originX: 0.5 }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu />
    </motion.nav>
  );
};

export default Navbar;
