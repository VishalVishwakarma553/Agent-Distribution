import React from 'react'

const HomePage = () => {
  return (
    <div className='flex flex-col gap-4 justify-center items-center h-screen'>
        <div className='flex gap-1 flex-col text-center'>
        <h1 className='text-3xl font-bold text-zinc-600'>There are no any agent</h1>
        <p className='text-lg font-medium text-zinc-500'>Please add agent and upload file to distribute</p>
        </div>
        <button className='p-4 text-sm font-semibold bg-gray-500 hover:shadow-lg shadow-gray-600 hover:bg-gray-600 rounded-md duration-150 cursor-pointer'>Add Agent</button>
    </div>
  )
}

export default HomePage