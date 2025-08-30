import { stackServerApp } from '@/stack';
import React from 'react'
import { SignUp } from '@stackframe/stack';
import InventoryTable from '@/components/InventoryTable';

async function Plants() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  
      return (
      <>
      {user ? (
        <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-full">
            <InventoryTable />
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-20 items-center">
          <SignUp/>
        </div>
      )}
      </>
    )
}

export default Plants