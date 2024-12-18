import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';
import React from 'react';

function LandingPageFeatures() {
    return (
        <div className="h-fit overflow-hidden w-full rounded-2xl ml-4 mr-4">
            <div className="text-2xl font-bold text-white px-8 py-2 mb-2 w-fit rounded-2xl bg-slate-900">
                Features
            </div>
            <div className="relative h-[10rem] p-2 overflow-scroll no-scrollbar w-full rounded-2xl bg-slate-900 p-4">
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: "-100%" }}
                    transition={{ ease: "linear", repeat: Infinity, duration: 30 }}
                    className="absolute top-0 left-0 bottom-0 right-0 flex gap-16 max-sm:gap-8 justify-center items-center"
                >
                    <div className="h-full flex-shrink-0 max-sm:h-full p-6 max-sm:p-4 rounded-xl w-60 max-sm:w-40 flex flex-col justify-center items-center border border-slate-500 shadow-2xl shadow-slate-400">
                        <DotLottieReact
                            src="https://lottie.host/469e61ba-2f32-4d79-829f-ea5d12d3cd45/Vl8Iry2EZA.lottie"
                            loop
                            autoplay
                        />
                        <span className="text-2xl max-sm:text-sm text-slate-400 mt-2">
                            Video Call
                        </span>
                    </div>
                    <div className="h-full flex-shrink-0 max-sm:h-full p-6 max-sm:p-4 rounded-xl w-60 max-sm:w-40 flex flex-col justify-center items-center border border-slate-500 shadow-2xl shadow-slate-400">
                        <DotLottieReact
                            src="/CallingAnimation.lottie"
                            loop
                            autoplay
                        />
                        <span className="text-2xl max-sm:text-sm text-slate-400 mt-2">
                            Audio Calling
                        </span>
                    </div>
                    <div className="h-full flex-shrink-0 max-sm:h-full p-6 max-sm:p-4 rounded-xl w-60 max-sm:w-40 flex flex-col justify-center items-center border border-slate-500 shadow-2xl shadow-slate-400">
                        <DotLottieReact
                            src="https://lottie.host/71271370-923f-4673-8062-19ae3ff710f6/4NG1BmChqc.lottie"
                            loop
                            autoplay
                        />
                        <span className="text-2xl max-sm:text-sm text-slate-400 mt-2">
                            Chatting
                        </span>
                    </div>
                    <div className="h-full flex-shrink-0 max-sm:h-full p-6 max-sm:p-4 rounded-xl w-60 max-sm:w-40 flex flex-col justify-center items-center border border-slate-500 shadow-2xl shadow-slate-400">
                        <DotLottieReact
                            src="https://lottie.host/d9b1124c-83eb-453b-9c7c-222f2ab91ba8/F5Mr10chps.lottie" 
                            loop
                            autoplay
                        />
                        <span className="text-2xl max-sm:text-sm text-slate-400 mt-2">
                            AI Suggestions
                        </span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default LandingPageFeatures;
