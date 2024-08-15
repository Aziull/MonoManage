import React from 'react';
import Svg, { Circle, Rect, Path, SvgProps } from 'react-native-svg';

const IncomeCircle = ({ backgroundColor, ...props }: { backgroundColor?: string } & SvgProps) => (
  <Svg
    viewBox="0 0 192 192"
    width={props.width || 100}
    height={props.height || 100}
    {...props}
  >
    <Circle fill={backgroundColor || "#4caf50"} cx="96" cy="96" r="96" />
    <Rect
      x="53.83"
      y="57.08"
      width="85"
      height="84.5"
      rx="16"
      ry="16"
      fill="none"
      stroke="#fff"
      strokeMiterlimit={10}
      strokeWidth={8}
    />
    <Rect
      x="92.34"
      y="73.28"
      width="8"
      height="42.33"
      rx="4"
      ry="4"
      fill="#fff"
    />
    <Path
      d="m74.59,94.28h0c1.18-1.1,3.03-1.03,4.13.15l15.47,16.65c1.16,1.24,3.12,1.24,4.28,0l15.48-16.65c1.1-1.18,2.95-1.25,4.13-.15h0c1.18,1.1,1.25,2.95.15,4.13l-19.76,21.24c-1.16,1.24-3.12,1.24-4.28,0l-19.75-21.24c-1.1-1.18-1.03-3.03.15-4.13Z"
      fill="#fff"
    />
  </Svg>
);

export default IncomeCircle;
