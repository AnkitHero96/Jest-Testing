import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";

function Draggable() {
  const [width, setWidth] = useState<number | null>(171); // Initial width
  const [rightWidth, setRightWidth] = useState<number | null>(171);
  const array = new Array(12).fill(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, isLeft: boolean = false): void => {
    console.log("current", event.movementX);
    const startX: number = event.clientX;
    const startWidth: number | null = isLeft ? width : rightWidth;

    const handleMouseDrag = (event: MouseEvent): void => {
      let newWidth: number = startWidth ? startWidth + event.clientX - startX : 0;
      if (!isLeft) {
        newWidth = startWidth ? startWidth - event.clientX + startX : 0;
      }
      console.log("newWidth", newWidth);  // Debugging log
      if (newWidth <= 140) {
        if (!isLeft) {
          setRightWidth(140);
        } else {
          setWidth(140);
        }
      } else if (newWidth >= 325) {
        if (!isLeft) {
          setRightWidth(325);
        } else {
          setWidth(325);
        }
      } else {
        if (!isLeft) {
          setRightWidth(newWidth);
        } else {
          setWidth(newWidth);
        }
      }
    };

    const handleMouseUp = (): void => {
      document.removeEventListener("mousemove", handleMouseDrag);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseDrag);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div>
      <Navbar />
      <div className="w-calc ml-[6px] h-[78vh] border-[2px] border-[white] rounded-[15px] mt-[3.5rem] mb-2 flex flex-row p-[12px] justify-between">
        <div
          className="w-[25%] h-[100%] bg-green-200 rounded-[15px] shadow-md shadow-black relative"
          style={{ width: `${width}px` }}
        >
          <ArrowCircleRightRoundedIcon
            className="absolute right-0 top-[46%] cursor-pointer"
            onMouseDown={(e: any) => handleMouseDown(e, true)}
            data-testid='right-arrow'
          />
        </div>
        <div className="w-[100%] h-[100%] bg-green-200 rounded-[15px] shadow-md shadow-black relative ml-3 mr-3 flex flex-wrap flex-row justify-center items-center gap-[3px]">
          {array.map((item, index) => (
            <div className="w-[40px] h-[40px] rounded-[7px] bg-[red] shadow-md shadow-black " key={index}>{item}</div>
          ))}
        </div>
        <div
          className="w-[25%] h-[100%] bg-green-200 rounded-[15px] shadow-md shadow-black relative"
          style={{ width: `${rightWidth}px` }}
          data-testid='right-width'
        >
          <ArrowCircleLeftRoundedIcon
            className="absolute left-0 top-[46%] cursor-pointer"
            onMouseDown={(e: any) => handleMouseDown(e, false)}
            data-testid='left-arrow'
          />
        </div>
      </div>
    </div>
  );
}

export default Draggable;
