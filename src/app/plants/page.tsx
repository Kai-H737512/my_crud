import { stackServerApp } from '@/stack';
import React from 'react'
import { SignUp } from '@stackframe/stack';

async function Plants() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  
  return (
    <>
    {user ? (
      <h1>Plants</h1>
    ) : (
      <div className="flex justify-center mt-20 items-center">
        <SignUp/>
      </div>
    )}
    </>
  )
}

export default Plants