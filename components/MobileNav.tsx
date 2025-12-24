"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { SignOutButton } from "./SignOutButton"

type NavLink = {
  href: string
  label: string
}

export function MobileNav({ navLinks, userName }: { navLinks: NavLink[], userName: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-accent rounded-md transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="fixed top-16 right-0 w-64 bg-background border-l border-b shadow-lg z-50 rounded-bl-lg">
            <nav className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* User Info */}
              <div className="pt-4 mt-4 border-t space-y-3">
                <p className="px-4 text-sm text-muted-foreground">
                  {userName}
                </p>
                <SignOutButton />
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  )
}