// https://react-svgr.com/playground
import * as React from "react";
import { SVGProps } from "react";

export const DeleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={30}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M7.8 23.75c0 1.375 1.171 2.5 2.601 2.5h10.401c1.43 0 2.6-1.125 2.6-2.5v-15H7.801v15Zm3.2-8.9 1.832-1.762 2.77 2.65 2.756-2.65 1.833 1.762-2.756 2.65 2.756 2.65-1.833 1.763-2.756-2.65-2.757 2.65-1.833-1.763 2.756-2.65L11 14.85ZM20.151 5l-1.3-1.25h-6.5L11.051 5H6.5v2.5h18.202V5h-4.55Z"
    />
  </svg>
);
