import React from 'react'
import { CiViewTimeline } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { AiFillThunderbolt } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import { IoChevronDownOutline } from "react-icons/io5";
import TaskManager from './TaskManager';
const LandingPage = () => {
    return (
        <div className='max-w-screen-2xl lg:px-20 md:px-10 sm:px-5 px-2 py-5'>
            <h2 className='font-bold md:text-4xl text-3xl pb-8'>Bee Projects</h2>
            <div className='border-b border-b-gray-300 flex items-center justify-between flex-wrap'>
                <div className='flex items-center gap-2'>
                    <div className='md:border-b-2 border-b-0 border-b-black pb-2 w-36 text-2xl font-semibold flex items-center justify-center gap-1' >
                        <span className='font-extrabold'>< CiViewTimeline /></span>
                        <span >Timeline</span>
                    </div>
                    <span className='text-gray text-xl'>
                        <FaPlus />
                    </span>
                </div>
                <div className='flex items-center pb-2 gap-2 text-gray-500 b-2'>
                    <button>
                        Filter
                    </button>
                    <button>Sort</button>
                    <button><AiFillThunderbolt/></button>
                    <button><IoSearch/></button>
                    <button><AiOutlineArrowsAlt/></button>
                    <button><SlOptions/></button>
                    <button className='flex items-center bg-blue-700 text-white gap-2 rounded-md py-1 px-2'>
                        <span>New</span>
                        <span><IoChevronDownOutline/></span>
                    </button>
                </div>
            </div>
            <div className='flex flex-row items-center gap-2'>
                <h2 className='md:text-3xl text-2xl font-bold my-4'>Campaign List</h2>
                <span className='text-gray-500 text-xl'><SlOptions/></span>
            </div>
            <TaskManager/>
        </div>
    )
}

export default LandingPage
