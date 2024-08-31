import React from 'react';
import Svg, { Circle, Rect, Path, SvgProps } from 'react-native-svg';

const ExpenceCircle = ({ backgroundColor, ...props }: { backgroundColor?: string } & SvgProps) => (
  <Svg
    viewBox={"0 0 192 192"}
    width={100}
    height={100}
    {...props}
  >
    <Circle fill={backgroundColor || "#7e47ff"} cx="96" cy="96" r="96" />
    <Rect
      x="53.5"
      y="57.5"
      width="85"
      height="84.5"
      rx="16"
      ry="16"
      fill="none"
      stroke="#fff"
      strokeWidth={8}
    />
    <Rect
      x="92"
      y="78.67"
      width="8"
      height="42.33"
      rx="4"
      ry="4"
      fill="#fff"
      stroke="#fff"
      strokeWidth={0.25}
    />
    <Path
      d="m117.75,100.01h0c-1.18,1.1-3.03,1.03-4.13-.15l-15.47-16.65c-1.16-1.24-3.12-1.24-4.28,0l-15.48,16.65c-1.1,1.18-2.95,1.25-4.13.15h0c-1.18-1.1-1.25-2.95-.15-4.13l19.76-21.24c1.16-1.24,3.12-1.24,4.28,0l19.75,21.24c1.1,1.18,1.03,3.03-.15,4.13Z"
      fill="#fff"
      stroke="#fff"
      strokeWidth={0.25}
    />
  </Svg>
);

export default ExpenceCircle;