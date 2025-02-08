import { useNavigate } from "react-router-dom";
import { theme } from ".";
import BoxReveal from "./box-reveal";

const Timeline = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'LabsAmiga', sans-serif" }}  className="mt-36 max-sm:mt-2 h-full text-white flex max-md:px-5 md:w-[90%] lg:w-[65%] mx-auto  ">
      <div className="">
        <section className="m-5 ">
          <BoxReveal boxColor={theme}>
            <p className="text-5xl max-xl:text-4xl max-sm:text-3xl  mb-2">
              WE ARE ,
            </p>
          </BoxReveal>
          <BoxReveal boxColor={theme} delay={2}>
            <h1 className="text-7xl font-bold text-green-600 max-xl:text-6xl max-sm:text-5xl my-7">
              CHESSV
            </h1>
          </BoxReveal>
          <ol className="flex flex-col gap-2 justify-center">
            <li>
              <BoxReveal boxColor={theme}>
                <p className="text-5xl max-xl:text-4xl max-sm:text-3xl  mb-2">
                TAKE YOU CHESS GAME TO
                </p>
              </BoxReveal>

              <BoxReveal boxColor={theme}>
                <p className="text-4xl max-xl:text-2xl max-sm:text-xl  ">
                  NEXT LEVEL
                  </p>
              </BoxReveal>
            </li>
          </ol>
        </section>
        <section className="m-5 ">
          <BoxReveal boxColor={theme} delay={2}>
            <h1 className="text-7xl font-bold text-green-600 max-xl:text-6xl max-sm:text-5xl my-7">
              NOW ,
            </h1>
          </BoxReveal>
          <ol className="flex flex-col gap-2 justify-center">
            <li>
              <BoxReveal boxColor={theme}>
                <p className="text-5xl max-xl:text-4xl flex flex-row max-sm:text-3xl mb-2">
                Bet, Play And Win SOL! <img className='h-10 m-2 pb-1' src="/solanaLogoMark.svg"/>
                </p>
              </BoxReveal>
              <BoxReveal boxColor={theme}>
                <p  onClick={() => navigate("/game")}  className="text-4xl max-xl:text-2xl max-sm:text-xl  ">
                  PLAY <span className="cursor-pointer underline text-green-600">NOW</span>
                  </p>
              </BoxReveal>
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default Timeline;
