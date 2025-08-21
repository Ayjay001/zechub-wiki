"use client";
import DonationBtn from "@/components/UI/DonationBtn";
import { navigations } from "@/constants/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import DropdownMobile from "../DropdownMobile/DropdownMobile";
import SearchBar from "../SearchBar";
import Logo from "../UI/Logo";
import { Sheet, SheetContent, SheetTrigger } from "../UI/Sheet";
import SocialIcons from "../UI/SocialIcons";

import { ChevronDown, Menu, Moon, Search, Sun } from "lucide-react";
import { Button } from "../UI/button";

const liStyle = `hover:bg-yellow-300 dark:hover:bg-yellow-500 rounded-sm dark:text-slate-300 hover:text-slate-900 dark:hover:text-white`;

const Dropdown = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-center gap-1 text-nav-foreground hover:text-nav-hover transition-colors duration-200 cursor-pointer py-2">
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 z-50 bg-slate-100 text-slate-700 dark:bg-slate-900 shadow-lg min-w-[200px] py-0 mt-0 ">
          {children}
        </div>
      )}
    </div>
  );
};

const NavLinks = ({
  classes,
  closeMenu,
}: {
  classes: string;
  closeMenu: () => void;
}) => {
  const handleLinkClick = () => {
    closeMenu();
  };

  const [openIndex, setOpenIndex] = useState<null | number>(null);

  return (
    <div className={`flex items-center ${classes}`}>
      {/* Navigation links with responsive behavior */}
      <div className="hidden lg:flex items-center space-x-10">
        {/* Show first 4 links normally on desktop */}
        {navigations.slice(0, 4).map((item, i) =>
          item.links ? (
            <Dropdown label={item.name} key={item.name + i}>
              {item.links.map((link, i) => (
                <div
                  key={link.path + i}
                  className={`hover:bg-nav-hover-bg py-2 px-3 transition-colors duration-200     ${liStyle}`}
                >
                  <Link
                    href={link.path}
                    onClick={handleLinkClick}
                    className="flex items-center gap-2 text-sm w-full text-nav-foreground hover:text-nav-hover"
                  >
                    {link.subName}
                  </Link>
                </div>
              ))}
            </Dropdown>
          ) : (
            <Link
              key={item.name + i}
              href={item.path}
              onClick={handleLinkClick}
              className={`text-nav-foreground hover:text-nav-hover transition-colors duration-200 whitespace-nowrap`}
            >
              {item.name}
            </Link>
          )
        )}

        {/* Overflow nav in a More dropdown for desktop */}
        {navigations.length > 4 && (
          <Dropdown label="More">
            {navigations.slice(4).map((item, i) => (
              <div
                key={item.name + i}
                className={`hover:bg-nav-hover-bg py-2 px-3 transition-colors duration-200 ${liStyle}`}
              >
                <Link
                  href={String(item.path)}
                  onClick={handleLinkClick}
                  className={`w-full text-nav-foreground `}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </Dropdown>
        )}
      </div>

      {/* Medium screens - show fewer links */}
      <div className="hidden md:flex lg:hidden items-center space-x-12">
        {navigations.slice(0, 3).map((item, i) => (
          <Dropdown label={item.name} key={item.name + i}>
            {item.links?.map((link, i) => (
              <div
                key={link.path + i}
                className={`hover:bg-nav-hover-bg py-2 px-3 transition-colors duration-200 ${liStyle}`}
              >
                <Link
                  href={link.path}
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 text-sm w-full text-nav-foreground hover:text-nav-hover"
                >
                  {link.subName}
                </Link>
              </div>
            ))}
          </Dropdown>
        ))}

        {navigations.length > 2 && (
          <Dropdown label="More">
            <div onMouseLeave={() => setOpenIndex(null)}>
              {navigations.slice(3).map((item, i) => {
                const isOpen = openIndex === i; // check if current item is open

                return (
                  <div
                    key={item.name + i}
                    className="hover:bg-nav-hover-bg py-2 px-3 transition-colors duration-200"
                  >
                    {item.links ? (
                      <>
                        <div
                          className="flex items-center gap-1 text-nav-foreground hover:text-nav-hover transition-colors duration-200 cursor-pointer py-2"
                          onClick={() => setOpenIndex(isOpen ? null : i)}
                        >
                          {item.name}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                        {isOpen &&
                          item.links.map((link, j) => (
                            <div
                              key={link.path + j}
                              className={`hover:bg-nav-hover-bg py-2 px-3 transition-colors duration-200 ${liStyle}`}
                            >
                              <Link
                                href={link.path}
                                onClick={handleLinkClick}
                                className="flex items-center gap-2 text-sm w-full"
                              >
                                {link.subName}
                              </Link>
                            </div>
                          ))}
                      </>
                    ) : (
                      <Link
                        href={String(item.path)}
                        onClick={handleLinkClick}
                        className="w-full text-nav-foreground hover:text-nav-hover"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </Dropdown>
        )}
      </div>

      {/* CTA buttons - responsive */}
      <div className="hidden md:flex items-center space-x-8 ml-6">
        <Link
          href="/dashboard"
          onClick={handleLinkClick}
          className="text-cta-primary hover:bg-cta-primary hover:text-white transition-colors duration-200"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

const MobileNavLinks = ({ closeMenu }: { closeMenu: () => void }) => {
  const handleLinkClick = () => closeMenu();
  return (
    <div className="flex flex-col space-y-1 font-normal">
      {navigations.map((item, i) =>
        item.links ? (
          <DropdownMobile label={item.name} key={item.name + i}>
            {item.links.map((link, i) => {
              return (
                <Link
                  key={link.path + i}
                  href={link.path}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-nav-foreground hover:bg-nav-hover-bg transition-colors duration-200 text-sm ${liStyle} text-slate-700`}
                >
                  {link.subName}
                </Link>
              );
            })}
          </DropdownMobile>
        ) : (
          <Link
            key={item.name + i}
            href={item.path}
            onClick={handleLinkClick}
            className={`px-3 py-2 rounded-md text-nav-foreground hover:bg-nav-hover-bg transition-colors duration-200 ${liStyle} dark:text-white`}
          >
            {item.name}
          </Link>
        )
      )}

      {/* Mobile CTA buttons */}
      <div className="flex flex-col">
        <div className="flex flex-col space-y-3 my-8 border-t border-slate-400 dark:border-slate-50 "></div>
        <Link
          href="/dao"
          onClick={handleLinkClick}
          className={`hover:text-white transition-colors duration-200 p-2 w-full justify-start ${liStyle}`}
        >
          DAO
        </Link>

        <Link
          href="/dashboard"
          onClick={handleLinkClick}
          className={`hover:text-white transition-colors duration-200 p-2 w-full justify-start ${liStyle}`}
        >
          Dashboard
        </Link>
      </div>
      <div className="py-12">
        <DonationBtn />
      </div>
    </div>
  );
};

const MobileNav = ({ closeMenu }: { closeMenu: () => void }) => {
  return (
    <div className="flex flex-col h-[90%] ">
      <div className="flex-1">
        <MobileNavLinks closeMenu={closeMenu} />
      </div>

      <SocialIcons newTab={true} />
    </div>
  );
};

const Navigation = () => {
  const [dark, setDark] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(prefersDark.matches);

    const listener = (e: MediaQueryListEvent) => setDark(e.matches);
    prefersDark.addEventListener("change", listener);

    return () => prefersDark.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const html: HTMLElement = document.querySelector("html")!;
    const body: HTMLBodyElement = document.querySelector("body")!;
    if (dark) {
      html.classList.add("dark");
      body.classList.add(
        "bg-slate-900",
        "text-white",
        "transition",
        "duration-500"
      );
    } else {
      html.classList.remove("dark");
      body.classList.remove(
        "bg-slate-900",
        "text-white",
        "transition",
        "duration-500"
      );
    }
  }, [dark]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-300 dark:border-slate-600 backdrop-blur supports-[backdrop-filter]:bg-nav-background/95">
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
          {/* Logo */}
          <Link href="/" className="shrink-0 hover:cursor-pointer">
            <Logo />
          </Link>

          {/* Desktop & Tablet Nav */}
          <nav className="hidden md:flex flex-1 justify-center max-w-4xl mx-8">
            <NavLinks
              classes="w-full justify-start"
              closeMenu={() => setIsOpen(false)}
            />
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-2 md:space-x-3 shrink-0">
            {/* Search */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpenSearch(true)}
              className="p-2 hover:bg-nav-hover-bg"
            >
              <Search className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <SearchBar openSearch={openSearch} setOpenSearch={setOpenSearch} />

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDark(!dark)}
              className="p-2 hover:bg-nav-hover-bg"
            >
              {dark ? (
                <Sun className="h-4 w-4 md:h-5 md:w-5" />
              ) : (
                <Moon className="h-4 w-4 md:h-5 md:w-5" />
              )}
            </Button>

            {/* Desktop donation button */}
            <div className="hidden lg:flex">
              <DonationBtn />
            </div>

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="md:hidden" asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-nav-hover-bg"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="bg-nav-background border-nav-border min-h-screen w-[300px] sm:w-[350px] bg-slate-50 dark:bg-slate-900"
              >
                <MobileNav closeMenu={() => setIsOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
