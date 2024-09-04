import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {AnimatePresence,motion} from 'framer-motion';


  const variants = {
    initial: (direction: number)=> {
      return {
        opacity: 0,
        x: direction > 0 ? 100 : -100,
      }
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => {
      return {
        x:direction > 0 ? -100 : 100,
        opacity: 0,
        transition: {
          duration: 0.5,
        },
      }
    }
  };

  function Carousel() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [direction, setDirection] = useState<number>(0);
  
    const imageSrc: string[] = ["https://picsum.photos/id/237/200/300", "https://picsum.photos/200/300?grayscale", "https://picsum.photos/id/870/200/300?grayscale", 'https://picsum.photos/seed/picsum/200/300'];
  
    const goToPreviousSlide = () => {
      setDirection(-1);
      if (currentIndex === 0) {
        setCurrentIndex(imageSrc.length - 1);
        return;
      }
      setCurrentIndex(currentIndex - 1);
    };
  
    const goToNextSlide = () => {
      setDirection(1);
      if (currentIndex === imageSrc.length - 1) {
        setCurrentIndex(0);
        return;
      }
      setCurrentIndex(currentIndex + 1);
    };
  
    useEffect(() => {
      const timer = setTimeout(() => {
        goToNextSlide();
      }, 5000);
      return () => clearTimeout(timer);
    }, [currentIndex]);
  
    return (
      <div>
        <Navbar />
        <div className="h-[100vh] bg-[#221e1e] pt-[40px] flex flex-col justify-center items-center">
          <div className="w-[60vw] h-[50vh] border-2 border-[#fff] rounded-[8px] relative overflow-hidden aspect-[16/9]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                className="absolute top-0 left-0 w-full h-full object-cover object-center border-[#87f7f7] border-2 rounded-[8px] text-slate-100 text-center text-[20px]"
                key={currentIndex}
                variants={variants}
                animate='animate'
                initial='initial'
                exit='exit'
                custom={direction}
                src={imageSrc[currentIndex]}
                style={{ image:'fit' }}
                data-testid={`carousel-image-${currentIndex}`}
              />
            </AnimatePresence>
            <span
              className="absolute top-[50%] left-[16px] translate-y-[-50%]"
              onClick={goToPreviousSlide}
              data-testid="left-arrow"
            >
              <ArrowCircleLeftIcon className="text-white" />
            </span>
            <span
              className="absolute top-[50%] right-[16px] translate-y-[-50%]"
              onClick={goToNextSlide}
              data-testid="right-arrow"
            >
              <ArrowCircleRightIcon className="text-white" />
            </span>
          </div>
        </div>
      </div>
    );
  }
  

  

export default Carousel;
