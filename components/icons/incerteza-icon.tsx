"use client"

import type { SVGProps } from "react"

export function IncertezaIcon(props: SVGProps<SVGSVGElement>) {

  // Gerar IDs únicos para evitar conflitos
  const uniqueId = Math.random().toString(36).substr(2, 9);
  
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      id={`es8utdDGJKo1_${uniqueId}`}
      viewBox="0 0 310 273" 
      shapeRendering="geometricPrecision" 
      textRendering="geometricPrecision"
      {...props}
    >
      <style>
        {`
          @keyframes float-main-${uniqueId} {
            0% { transform: translateY(-10px); }
            16.67% { transform: translateY(0px); }
            33.33% { transform: translateY(-10px); }
            50% { transform: translateY(0px); }
            66.67% { transform: translateY(-10px); }
            83.33% { transform: translateY(0px); }
            100% { transform: translateY(-10px); }
          }
          
          @keyframes pulse-scale-${uniqueId} {
            0% { transform: scale(1); opacity: 0.588; }
            28.33% { transform: scale(0.886); opacity: 0.32; }
            58.33% { transform: scale(0.886); opacity: 0.32; }
            71.67% { transform: scale(1); opacity: 0.588; }
            100% { transform: scale(1); opacity: 0.588; }
          }
          
          @keyframes float-secondary-${uniqueId} {
            0% { transform: translateY(0px); }
            28.33% { transform: translateY(-10px); }
            58.33% { transform: translateY(-10px); }
            71.67% { transform: translateY(0px); }
            100% { transform: translateY(0px); }
          }
          
          #es8utdDGJKo6_${uniqueId} {
            animation: float-main-${uniqueId} 6s ease-in-out infinite;
            transform-origin: center;
          }
          
          #es8utdDGJKo27_${uniqueId} {
            animation: pulse-scale-${uniqueId} 6s ease-in-out infinite;
            transform-origin: 239.680153px 172.198997px;
          }
          
          #es8utdDGJKo29_${uniqueId} {
            animation: float-secondary-${uniqueId} 6s ease-in-out infinite;
            transform-origin: center;
          }
        `}
      </style>
      
      <defs>
        <linearGradient id={`es8utdDGJKo5-fill_${uniqueId}`} x1="48.8038" y1="-6.81818" x2="107.656" y2="140.67" spreadMethod="pad" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 0)">
          <stop id={`es8utdDGJKo5-fill-0_${uniqueId}`} offset="0%" stopColor="rgb(255,255,255)"/>
          <stop id={`es8utdDGJKo5-fill-1_${uniqueId}`} offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <linearGradient id={`es8utdDGJKo18-fill_${uniqueId}`} x1="-9.47704" y1="-30.6394" x2="59.7686" y2="96.8721" spreadMethod="pad" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 0)">
          <stop id={`es8utdDGJKo18-fill-0_${uniqueId}`} offset="0%" stopColor="rgb(255,255,255)"/>
          <stop id={`es8utdDGJKo18-fill-1_${uniqueId}`} offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <linearGradient id={`es8utdDGJKo21-fill_${uniqueId}`} x1="-4.00302" y1="-12.9418" x2="25.2458" y2="40.918" spreadMethod="pad" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 0)">
          <stop id={`es8utdDGJKo21-fill-0_${uniqueId}`} offset="0%" stopColor="rgb(255,255,255)"/>
          <stop id={`es8utdDGJKo21-fill-1_${uniqueId}`} offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <linearGradient id={`es8utdDGJKo22-stroke_${uniqueId}`} x1="46.0956" y1="73.575" x2="1.55431" y2="14.3499" spreadMethod="pad" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 0)">
          <stop id={`es8utdDGJKo22-stroke-0_${uniqueId}`} offset="0%" stopColor="rgb(255,255,255)"/>
          <stop id={`es8utdDGJKo22-stroke-1_${uniqueId}`} offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <linearGradient id={`es8utdDGJKo24-fill_${uniqueId}`} x1="-8.762" y1="-28.3276" x2="55.2591" y2="89.5631" spreadMethod="pad" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 0)">
          <stop id={`es8utdDGJKo24-fill-0_${uniqueId}`} offset="0%" stopColor="rgb(255,255,255)"/>
          <stop id={`es8utdDGJKo24-fill-1_${uniqueId}`} offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <linearGradient id={`es8utdDGJKo25-stroke_${uniqueId}`} x1="100.896" y1="161.044" x2="3.40214" y2="31.4097" spreadMethod="pad" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 0)">
          <stop id={`es8utdDGJKo25-stroke-0_${uniqueId}`} offset="0%" stopColor="rgb(255,255,255)"/>
          <stop id={`es8utdDGJKo25-stroke-1_${uniqueId}`} offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <linearGradient id={`es8utdDGJKo28-fill_${uniqueId}`} x1="253.06" y1="129.995" x2="239.594" y2="200.865" spreadMethod="pad" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 0)">
          <stop id={`es8utdDGJKo28-fill-0_${uniqueId}`} offset="0%" stopColor="rgb(239,217,102)"/>
          <stop id={`es8utdDGJKo28-fill-1_${uniqueId}`} offset="100%" stopColor="rgba(239,217,102,0)"/>
        </linearGradient>
        <linearGradient id={`es8utdDGJKo31-fill_${uniqueId}`} x1="253.388" y1="111.458" x2="242.135" y2="189.006" spreadMethod="pad" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 0)">
          <stop id={`es8utdDGJKo31-fill-0_${uniqueId}`} offset="0%" stopColor="rgb(239,217,102)"/>
          <stop id={`es8utdDGJKo31-fill-1_${uniqueId}`} offset="100%" stopColor="rgba(239,217,102,0)"/>
        </linearGradient>
        <linearGradient id={`es8utdDGJKo32-stroke_${uniqueId}`} x1="229.399" y1="199.921" x2="208.986" y2="152.703" spreadMethod="pad" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 0)">
          <stop id={`es8utdDGJKo32-stroke-0_${uniqueId}`} offset="0%" stopColor="rgb(239,217,102)"/>
          <stop id={`es8utdDGJKo32-stroke-1_${uniqueId}`} offset="100%" stopColor="rgba(239,217,102,0)"/>
        </linearGradient>
      </defs>
      
      <rect id={`es8utdDGJKo2_${uniqueId}`} display="none" width="310" height="271.499949" rx="0" ry="0" transform="matrix(1 0 0 1 0 0.000001)" fill="rgb(0,0,0)" stroke="none" strokeWidth="0"/>
      
      <rect id={`es8utdDGJKo3_${uniqueId}`} width="143" height="143" rx="13" ry="13" transform="matrix(0.866025 -0.5 0.866025 0.5 5.732049 199.999975)" opacity="0.1" fill="none" stroke="rgb(255,255,255)" strokeWidth="2" strokeDasharray="6,6"/>
      
      <g id={`es8utdDGJKo4_${uniqueId}`}>
        <rect id={`es8utdDGJKo5_${uniqueId}`} width="150" height="150" rx="14" ry="14" transform="matrix(0.866025 -0.5 0.866025 0.5 0 155)" fill={`url(#es8utdDGJKo5-fill_${uniqueId})`} fillOpacity="0.1" stroke="none" strokeWidth="1"/>
      </g>
      
      <g id={`es8utdDGJKo6_${uniqueId}`} transform="matrix(1 0 0 1 0 -9.319755)">
        <path id={`es8utdDGJKo7_${uniqueId}`} d="M163.243,69.9624C165.646,74.1245,165.646,78.6233,163.243,80.0107C160.84,81.398,156.944,79.1487,154.541,74.9865C152.138,70.8244,152.138,66.3256,154.541,64.9383C156.944,63.5509,160.84,65.8003,163.243,69.9624" clipRule="evenodd" fill="rgb(255,255,255)" fillRule="evenodd" stroke="none" strokeWidth="1"/>
        <path id={`es8utdDGJKo8_${uniqueId}`} d="M163.243,69.9624C165.646,74.1245,165.646,78.6233,163.243,80.0107C160.84,81.398,156.944,79.1487,154.541,74.9865C152.138,70.8244,152.138,66.3256,154.541,64.9383C156.944,63.5509,160.84,65.8003,163.243,69.9624" fill="none" stroke="rgb(255,255,255)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path id={`es8utdDGJKo9_${uniqueId}`} d="M143.2,45.7068C146.9,52.1156,146.9,59.0428,143.2,61.1791C139.5,63.3154,133.501,59.8518,129.8,53.443C126.1,47.0341,126.1,40.107,129.8,37.9707C133.501,35.8344,139.5,39.298,143.2,45.7068" clipRule="evenodd" fill="rgb(255,255,255)" fillRule="evenodd" stroke="none" strokeWidth="1"/>
        <path id={`es8utdDGJKo10_${uniqueId}`} d="M143.2,45.7068C146.9,52.1156,146.9,59.0428,143.2,61.1791C139.5,63.3154,133.501,59.8518,129.8,53.443C126.1,47.0341,126.1,40.107,129.8,37.9707C133.501,35.8344,139.5,39.298,143.2,45.7068" fill="none" stroke="rgb(255,255,255)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path id={`es8utdDGJKo11_${uniqueId}`} d="M118.457,44.1055C120.86,48.2676,120.86,52.7663,118.457,54.1537C116.054,55.5411,112.158,53.2917,109.755,49.1296C107.352,44.9675,107.352,40.4687,109.755,39.0813C112.158,37.6939,116.054,39.9433,118.457,44.1055" clipRule="evenodd" fill="rgb(255,255,255)" fillRule="evenodd" stroke="none" strokeWidth="1"/>
        <path id={`es8utdDGJKo12_${uniqueId}`} d="M118.457,44.1055C120.86,48.2676,120.86,52.7663,118.457,54.1537C116.054,55.5411,112.158,53.2917,109.755,49.1296C107.352,44.9675,107.352,40.4687,109.755,39.0813C112.158,37.6939,116.054,39.9433,118.457,44.1055" fill="none" stroke="rgb(255,255,255)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path id={`es8utdDGJKo13_${uniqueId}`} d="M169.959,107.122L169.959,103.273C169.959,98.4226,166.555,92.5274,162.354,90.1022L159.918,88.6956" opacity="0.5" fill="none" stroke="rgb(255,255,255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path id={`es8utdDGJKo14_${uniqueId}`} d="M103.041,68.4881L103.041,64.6387C103.041,59.7883,106.445,57.8232,110.645,60.2484L113.082,61.6551" opacity="0.5" fill="none" stroke="rgb(255,255,255)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path id={`es8utdDGJKo15_${uniqueId}`} d="M152.74,97.1812L152.74,91.5582C152.74,84.7691,147.973,76.5136,142.094,73.1191L130.904,66.6583C125.024,63.2638,120.258,66.0156,120.258,72.8047L120.258,78.4278" opacity="0.5" clipRule="evenodd" fill="rgb(255,255,255)" fillRule="evenodd" stroke="none" strokeWidth="1"/>
      </g>
      
      <g id={`es8utdDGJKo16_${uniqueId}`} transform="matrix(1 0 0 1 0 0.000001)">
        <g id={`es8utdDGJKo17_${uniqueId}`}>
          <circle id={`es8utdDGJKo18_${uniqueId}`} r="40.4738" transform="matrix(0.866025 0.5 -0.866025 0.5 130.104 147.467)" fill={`url(#es8utdDGJKo18-fill_${uniqueId})`} fillOpacity="0.3" stroke="none" strokeWidth="1"/>
        </g>
        <g id={`es8utdDGJKo19_${uniqueId}`}>
          <g id={`es8utdDGJKo20_${uniqueId}`}>
            <circle id={`es8utdDGJKo21_${uniqueId}`} r="17.0958" transform="matrix(0.866025 0.5 -0.866025 0.5 130.104 138.468)" fill={`url(#es8utdDGJKo21-fill_${uniqueId})`} fillOpacity="0.5" stroke="none" strokeWidth="1"/>
            <circle id={`es8utdDGJKo22_${uniqueId}`} r="17.0958" transform="matrix(0.866025 0.5 -0.866025 0.5 130.104 138.468)" fill="none" stroke={`url(#es8utdDGJKo22-stroke_${uniqueId})`} strokeWidth="2" strokeOpacity="0.7" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <g id={`es8utdDGJKo23_${uniqueId}`}>
            <circle id={`es8utdDGJKo24_${uniqueId}`} r="37.4201" transform="matrix(0.866025 0.5 -0.866025 0.5 130.104 141.42)" fill={`url(#es8utdDGJKo24-fill_${uniqueId})`} fillOpacity="0.3" stroke="none" strokeWidth="1"/>
            <circle id={`es8utdDGJKo25_${uniqueId}`} r="37.4201" transform="matrix(0.866025 0.5 -0.866025 0.5 130.104 141.42)" fill="none" stroke={`url(#es8utdDGJKo25-stroke_${uniqueId})`} strokeWidth="2" strokeOpacity="0.7" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </g>
      </g>
      
      <g id={`es8utdDGJKo26_${uniqueId}`}>
        <g id={`es8utdDGJKo27_${uniqueId}`} opacity="0.587982" transform="matrix(0.995107 0 0 0.995107 1.172738 0.842558)">
          <path id={`es8utdDGJKo28_${uniqueId}`} d="M263.316,186.49C249.583,194.419,226.42,195.873,209.43,189.664C198.676,179.855,201.195,166.481,214.928,158.553L225.716,152.324C228.171,150.907,231.87,150.486,235.073,151.263L256.382,156.421C261.181,157.582,264.998,159.785,267.009,162.556L275.943,174.859C277.286,176.71,276.56,178.844,274.104,180.261L263.316,186.49L263.316,186.49Z" clipRule="evenodd" fill={`url(#es8utdDGJKo28-fill_${uniqueId})`} fillOpacity="0.44" fillRule="evenodd" stroke="none" strokeWidth="1"/>
        </g>
        <g id={`es8utdDGJKo29_${uniqueId}`} transform="matrix(1 0 0 1 0 -0.429211)">
          <g id={`es8utdDGJKo30_${uniqueId}`}>
            <path id={`es8utdDGJKo31_${uniqueId}`} d="M263.724,168.397C249.883,176.388,226.538,177.854,209.413,171.596C198.574,161.71,201.113,148.231,214.955,140.24L225.827,133.963C228.302,132.534,232.03,132.109,235.258,132.893L256.735,138.091C261.573,139.261,265.419,141.482,267.446,144.275L276.45,156.675C277.804,158.54,277.072,160.691,274.597,162.12L263.724,168.397L263.724,168.397Z" clipRule="evenodd" fill={`url(#es8utdDGJKo31-fill_${uniqueId})`} fillOpacity="0.5" fillRule="evenodd" stroke="none" strokeWidth="1"/>
            <path id={`es8utdDGJKo32_${uniqueId}`} d="M263.724,168.397C249.883,176.388,226.538,177.854,209.413,171.596C198.574,161.71,201.113,148.231,214.955,140.24L225.827,133.963C228.302,132.534,232.03,132.109,235.258,132.893L256.735,138.091C261.573,139.261,265.419,141.482,267.446,144.275L276.45,156.675C277.804,158.54,277.072,160.691,274.597,162.12L263.724,168.397L263.724,168.397Z" clipRule="evenodd" fill="none" fillRule="evenodd" stroke={`url(#es8utdDGJKo32-stroke_${uniqueId})`} strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <path id={`es8utdDGJKo33_${uniqueId}`} d="M252.466,158.178L229.606,158.178L229.606,150.258" fill="none" stroke="rgb(239,217,102)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </g>
    </svg>
  );
}
