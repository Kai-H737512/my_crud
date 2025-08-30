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
              className="flex items-center gap-2 text-xl font-bold text-primary font-mono tracking-wider"
            >
              <Sprout className="w-5 h-5" />
              Plantventory
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

            {/* Sign In Button */}
            {user ? (
              <>
              {/* sign out button */}
                <div className="ml-auto">
                  <Button variant="ghost" className="flex items-center gap-2" asChild>
                    <Link href={app.signOut}>
                    <LogIn  className="w-4 h-4" />
                      <span className="hidden lg:inline">Sign Out</span>
                    </Link>
                  </Button> 
                </div>

                <UserButton showUserInfo={true}/>
              </>) : (
              <>
                {/* sign in button */}
                <div className="ml-auto">
                  <Button variant="ghost" className="flex items-center gap-2" asChild>
                    <Link href={app.signIn}>
                    <LogIn  className="w-4 h-4" />
                      <span className="hidden lg:inline">Sign In</span>
                    </Link>
                  </Button> 
                </div>
              </>)}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar