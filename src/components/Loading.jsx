import React from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react"
import { useSocket } from '../hooks/useSocket';

const Loading = ({setLoading}) => {
  const socket = useSocket();

  useGSAP(() =>{
    const gtl = gsap.timeline();
    gtl.from(".hr_line", {
      delay : 0.5,
      height : "0px",
      stagger : 0.1,
      ease: "power2.out",
      duration : 1,
    })
    .from(".progress_digit", {
      opacity : 0,
      stagger : 0.1,
    })
    .to(".progress_digit", {
      opacity : 0.3,
      stagger: {
        each: 0.1,
        from: "end",
      }
    })
    .to(".progress_digit_2", {
      rotate : 90,
      opacity : 1
    })
    .to(".progress_digit_2", {
      rotate : 0,
      opacity : 0.4
    })
    .to(".progress_digit", {
      opacity : 1,
      stagger : 0.1,
    })
    .to(".progress_digit_1", {
      opacity: 0,
      duration: 0.1,
      yoyo: true,
      repeat: 4,
    })
    .to(".progress_digit_3", {
      opacity: 0,
      duration: 0.1,
      yoyo: true,
      repeat: 4,
    })
    .to(".progress_digit_1, .progress_digit_3", {
      opacity: 1,
      duration: 0.1,
    })
    .to(".progress_digit_2", {
      duration: 1.5, 
      yoyo: true,
      ease: "power2.inOut",
      onUpdate: function () {
        let progress = Math.round(this.progress() * 9);
        document.querySelector(".progress_digit_2").textContent = progress;
      },
    })
    .to(".progress_digit_3", {
      duration: .5, 
      yoyo: true,
      ease: "power2.inOut",
      onUpdate: function () {
        let progress = Math.round(this.progress() * 9);
        document.querySelector(".progress_digit_3").textContent = progress;
      },
      onComplete : () => {
        document.querySelector(".progress_digit_2").textContent = 0;
        document.querySelector(".progress_digit_3").textContent = 0;
        document.querySelector(".progress_digit_1").textContent = 1;
      }
    })
    .to(".progress_digit", {
      opacity : 0.5,
      stagger : 0.1,
    })
    .to(".box_", {
      opacity : 0,
      height : 0,
      stagger : 0.09,
      ease: "power1.out"
    })
    .to(".loading_main", {
      opacity : 0,
      height : 0,
      ease : "power2.inOut",
      onComplete: () => setLoading(false)
    })
    ;
  });

  return (
    <div className='loading_main relative overflow-hidden transition-all duration-200 h-screen text-zinc-900 w-screen text-[5rem] sm:text-[12rem] md:text-[15rem]'>
    <div 
      style={{ fontFamily: "'LabsAmiga', sans-serif" }} 
      className='grid grid-cols-9 '>
      <div className='relative bg-[#FF7120] box_ h-screen col-span-3'>
        <div className='absolute ml-8 sm:ml-16 md:ml-28 hr_line border-l h-full border-black text-black' />
        <div className='absolute ml-4 progress_digit_1 sm:ml-8 md:ml-12 progress_digit  bottom-8 sm:-bottom-10  left-1/2 -translate-x-1/2'>
          0
        </div>
      </div>
      <div className='  relative bg-[#FF7120] box_ h-screen col-span-2'>
        <div className='absolute hr_line border-l h-full border-black text-black' />
        <div className='absolute progress_digit_2 progress_digit bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2 '>
          0
        </div>
      </div>
      <div className='  relative bg-[#FF7120] box_ h-screen col-span-2'>
        <div className='absolute hr_line border-l h-full border-black text-black' />
        <div className='absolute progress_digit_3 progress_digit bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2'>
          0
        </div>
      </div>
      <div className=' relative bg-[#FF7120] box_ h-screen col-span-2'>
        <div className='absolute hr_line border-l h-full border-black text-black' />
        <div className='absolute hr_line right-0 border-l h-full border-black text-black' />
        <div className='absolute bottom-0 left-1/2 -translate-x-1/2 '>
          
        </div>
      </div>
    </div>
    </div>
  )
}

export default Loading