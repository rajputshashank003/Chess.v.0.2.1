import React, { useEffect, useState } from 'react';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(TextPlugin);

const LandingPageProgress = () => {
    const [num, setNum] = useState(0);
    const [visible, setVisible] = useState(true);

    // useGSAP(() => {
    //     const tl = gsap.timeline();
    //     tl.to({}, {
    //         delay : 1.5,
    //         duration: 2.8,
    //         onUpdate: function () {
    //             const progress = Math.round(this.progress() * 100);
    //             setNum(progress);
    //         },
    //     })
    //     .to(".chess_board_model_par", {
    //         opacity : 0,
    //         width : window.innerWidth + 200,
    //         x : -100,
    //         scale : 0.95
    //     })
    //     .to(".chess_title_9", {
    //         opacity : 0,
    //         x : -100,
    //     })
    //     .to(".play_text_name , .play_button_online", {
    //         opacity : 0,
    //         x : 100,
    //     })
    //     .to(".progress-line", {
    //         width : 0,
    //         duration : 0.8
    //     }, "Abc")
    //     .to(".under_progress_line", {
    //         width : 0,
    //         duration : 1.1
    //     },"Abc")
    //     .to(".landing_page_progress", {
    //         opacity: 0,
    //         y: 100,
    //         onComplete: () => setVisible(false),
    //     }, "chess_board")
    //     .to(".chess_board_model_par", {
    //         opacity : 1,
    //         x : 0,
    //         width : window.innerWidth,
    //         scale : 1,
    //         duration : 1.5
    //     }, "chess_board")
    //     .to(".chess_title_9", {
    //         opacity : 1,
    //         x : 0,
    //         duration : 1
    //     })
    //     .to(".play_text_name , .play_button_online", {
    //         opacity : 1,
    //         x : 0,
    //         stagger : 0.5,
    //         duration : 1
    //     })
    //     ;

    // }, []);

    return (
        <div className={`${!visible && "hidden"} h-screen landing_page_progress w-screen z-[999999] bg-slate-950 absolute flex justify-center items-center`}>
            <div className="relative w-full flex justify-center items-center">
                <div 
                    className="progress-line absolute z-[9999] w-1/2 h-[2.8px] bg-slate-400"
                    style={{
                        width: `${(num * 0.75)}%`, 
                        transformOrigin: "center",
                        transform: `scaleX(${num !== 0 ? 1 : 0})`,
                    }}
                />
                <div 
                    className="under_progress_line absolute z-[999] w-1/2 h-[2.8px] bg-slate-800"
                    style={{
                        width: `${75}%`, 
                        transformOrigin: "center",
                        transform: `scaleX(${num !== 0 ? 1 : 0})`,
                    }}
                />
            </div>
        </div>
    );
};

export default LandingPageProgress;
