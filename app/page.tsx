'use client'
import axios from "axios";
import { useRef, useEffect, useState } from "react";


function HomePage() {

  
  
    return <>
        <div className="container">
          <div className="grid grid-cols-6 gap-4">
            <div className=' col-span-6 py-10'>
              <div className='text-center text-3xl text-cyan-800 font-bold'>Danh sách thành viên </div>
            </div>
            <div className=' col-span-6 py-10'>
              <div className='text-center text-2xl text-cyan-800 font-bold'>Danh sách thành viên </div>
            </div>
          </div>

        </div>
      </>
}


export default HomePage;