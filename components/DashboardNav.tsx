import Link from 'next/link'
import { SignOutButton } from './SignOutButton'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { ModeToggle } from './ModeToggle'
import { MobileNav } from './MobileNav'

const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/habits", label: "Habits" },
    { href: "/check-in", label: "Check-in" },
    { href: "/analytics", label: "Analytics" },
    { href: "/reflect", label: "Reflect" },
]

const DashboardNav = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

  return (
    <header className="bg-background/80 border-b sticky top-0 z-50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/dashboard" className="text-xl font-bold">
              Snorbit
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium hover:text-foreground/80 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
           
            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">
                {session?.user.name}
              </span>
              <SignOutButton />
              <ModeToggle />
            </div>

            {/* Mobile Right Side */}
            <div className="flex md:hidden items-center gap-2">
              <ModeToggle />
              <MobileNav 
                navLinks={navLinks} 
                userName={session?.user.name || "User"} 
              />
            </div>
          </div>
        </div>
      </header>
  )
}

export default DashboardNav