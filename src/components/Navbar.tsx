import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Sprout, HomeIcon, LogIn, LogOut } from 'lucide-react'
import ModeToggle from '@/components/ModeToggler'
import { stackServerApp } from '@/stack'
import { getUserDetails } from '@/actions/user.action'
import { UserButton } from '@stackframe/stack'

async function Navbar () {

  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  const userProfile = await getUserDetails(user?.id);
  

  return (
    <nav className="sticky top-0 w-full border-b bg-bakcground/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center h-16 justify-between">

          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold font-mono tracking-wider"
            >
              🌱 Plantventory
            </Link>
          </div>

          {/* Navigation Components */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/plants">
                <Sprout className="w-4 h-4" />
                <span className="hidden lg:inline">Plants</span>
              </Link>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                <span className="hidden lg:inline">Home</span>
              </Link>
            </Button>             
            <ModeToggle/>

            {/* Sign In/Sign Out Button */}
            {user ? (
              <>
                {/* Sign out button */}
                <Button variant="outline" className="flex items-center gap-2" asChild>
                  <Link href={app.signOut}>
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:inline">Sign Out</span>
                  </Link>
                </Button>

                <UserButton />
              </>
            ) : (
              <>
                {/* Sign in button */}
                <Button variant="ghost" className="flex items-center gap-2" asChild>
                  <Link href={app.signIn}>
                    <LogIn className="w-4 h-4" />
                    <span className="hidden lg:inline">Sign In</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar