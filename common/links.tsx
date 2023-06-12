export const icons: ISvgIcons = {
  arrow: {
    right: (props) => (
      <svg width='7' height='10' xmlns='http://www.w3.org/2000/svg' {...props}>
        <path
          d='M1 1l4 4-4 4'
          stroke='#7C5DFA'
          stroke-width='2'
          fill='none'
          fill-rule='evenodd'
        />
      </svg>
    ),
    left: (props) => (
      <svg width='7' height='10' xmlns='http://www.w3.org/2000/svg' {...props}>
        <path
          d='M6.342.886L2.114 5.114l4.228 4.228'
          stroke='#9277FF'
          stroke-width='2'
          fill='none'
          fill-rule='evenodd'
        />
      </svg>
    ),
    down: (props) => (
      <svg width='11' height='7' xmlns='http://www.w3.org/2000/svg' {...props}>
        <path
          d='M1 1l4.228 4.228L9.456 1'
          stroke='#7C5DFA'
          stroke-width='2'
          fill='none'
          fill-rule='evenodd'
        />
      </svg>
    ),
  },
  actions: {
    add: (props) => (
      <svg width='11' height='11' xmlns='http://www.w3.org/2000/svg' {...props}>
        <path
          d='M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z'
          fill='#7C5DFA'
          fill-rule='nonzero'
        />
      </svg>
    ),
    delete: (props) => (
      <svg width='13' height='16' xmlns='http://www.w3.org/2000/svg' {...props}>
        <path
          d='M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z'
          fill='#888EB0'
          fill-rule='nonzero'
        />
      </svg>
    ),
    check: (props) => (
      <svg width='10' height='8' xmlns='http://www.w3.org/2000/svg' {...props}>
        <path
          d='M1.5 4.5l2.124 2.124L8.97 1.28'
          stroke='#FFF'
          stroke-width='2'
          fill='none'
          fill-rule='evenodd'
        />
      </svg>
    ),
  },
  logo: (props) => (
    <svg xmlns='http://www.w3.org/2000/svg' width='28' height='26' {...props}>
      <path
        fill='#FFF'
        fill-rule='evenodd'
        d='M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z'
      />
    </svg>
  ),
  calendar: (props) => (
    <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M14 2h-.667V.667A.667.667 0 0012.667 0H12a.667.667 0 00-.667.667V2H4.667V.667A.667.667 0 004 0h-.667a.667.667 0 00-.666.667V2H2C.897 2 0 2.897 0 4v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm.667 12c0 .367-.3.667-.667.667H2A.668.668 0 011.333 14V6.693h13.334V14z'
        fill='#7E88C3'
        fill-rule='nonzero'
        opacity='.5'
      />
    </svg>
  ),
};
