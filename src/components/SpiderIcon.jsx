import * as React from "react";

function SpiderIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props}>
      <g transform="scale(0.5,0.5) translate(-90,-90)">
        <title>{"Layer 1"}</title>
        <ellipse ry={60} rx={90} cy={275} cx={403} stroke="#000" />
        <path
          strokeWidth={10}
          stroke="#000"
          fill="none"
          d="M445 243l66-55M505.451 189.403l57.098 64.194M443 286l66-55M503.451 232.403l57.098 64.194M436 326l66-55M496.451 272.403l57.098 64.194M253 227l66-55M313.451 173.403l57.098 64.194M251 270l66-55M311.451 216.403l57.098 64.194M244 310l66-55M304.451 256.403l57.098 64.194"
        />
        <ellipse
          ry={10.5}
          rx={17}
          cy={287.5}
          cx={370}
          strokeWidth={10}
          stroke="#000"
          fill="#fff"
        />
        <ellipse
          ry={10.5}
          rx={17}
          cy={287.5}
          cx={371}
          strokeWidth={10}
          stroke="#000"
          fill="#fff"
        />
        <ellipse
          ry={10.5}
          rx={17}
          cy={287.5}
          cx={381}
          strokeWidth={10}
          stroke="#000"
          fill="rgb(101, 121, 155)"
        />
        <ellipse
          ry={10.5}
          rx={17}
          cy={287.5}
          cx={432}
          strokeWidth={10}
          stroke="#000"
          fill="rgb(101, 121, 155)"
        />
        <path
          d="M366 306c30 12 61 6 61 6l16-7"
          strokeWidth={10}
          stroke="#000"
          fill="rgb(255, 0, 0)"
        />
      </g>
    </svg>
  );
}

export default SpiderIcon;
