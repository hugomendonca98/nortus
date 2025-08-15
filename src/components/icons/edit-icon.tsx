import * as React from 'react'

interface EditIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

const EditIcon = (props: EditIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_1026_1952)">
      <path
        d="M10.2574 2.59022C10.7542 2.05197 11.0026 1.78285 11.2665 1.62587C11.9034 1.24709 12.6877 1.23531 13.3352 1.5948C13.6035 1.74379 13.8595 2.00533 14.3716 2.52843C14.8837 3.05152 15.1397 3.31307 15.2855 3.58721C15.6375 4.24867 15.6259 5.04978 15.2551 5.70039C15.1015 5.97003 14.838 6.22377 14.3111 6.73125L8.04199 12.7695C7.04351 13.7312 6.54425 14.2121 5.92029 14.4557C5.29633 14.6995 4.61039 14.6815 3.23849 14.6457L3.05184 14.6408C2.63419 14.6299 2.42537 14.6244 2.30398 14.4866C2.18259 14.3489 2.19916 14.1361 2.23231 13.7107L2.25031 13.4797C2.34359 12.2823 2.39023 11.6836 2.62406 11.1454C2.85788 10.6072 3.26121 10.1703 4.06787 9.29625L10.2574 2.59022Z"
        stroke="#1876D2"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M9.54175 2.66675L14.2084 7.33341"
        stroke="#1876D2"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M10.2083 14.6667H15.5416"
        stroke="#1876D2"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1026_1952">
        <rect
          width="16"
          height="16"
          fill="white"
          transform="translate(0.875)"
        />
      </clipPath>
    </defs>
  </svg>
)
export { EditIcon }
