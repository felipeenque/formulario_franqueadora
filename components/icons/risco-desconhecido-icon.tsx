import type { SVGProps } from "react"

export function RiscoDesconhecidoIcon(props: SVGProps<SVGSVGElement>) {
  // Gerar IDs únicos para evitar conflitos
  const uniqueId = Math.random().toString(36).substr(2, 9);
  
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      id={`eD8yP3b4jUn1_${uniqueId}`}
      viewBox="0 0 267 290" 
      shapeRendering="geometricPrecision" 
      textRendering="geometricPrecision"
      {...props}
    >
      <style>
        {`
          @keyframes float-main-${uniqueId} {
            0% { transform: translateY(0px); }
            12.3% { transform: translateY(-10px); }
            24.6% { transform: translateY(0px); }
            37% { transform: translateY(-10px); }
            49.3% { transform: translateY(0px); }
            61.6% { transform: translateY(-10px); }
            73.9% { transform: translateY(0px); }
            86.3% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          
          @keyframes float-right-${uniqueId} {
            0% { transform: translateY(0px); opacity: 0; }
            2.5% { opacity: 0; }
            15.2% { transform: translateY(-7px); opacity: 1; }
            85% { transform: translateY(-7px); opacity: 1; }
            97.5% { opacity: 0; }
            100% { transform: translateY(0px); opacity: 0; }
          }
          
          @keyframes float-left-${uniqueId} {
            0% { transform: translateY(0px); opacity: 0; }
            2.5% { opacity: 0; }
            15.2% { transform: translateY(-6px); opacity: 0.1; }
            51.8% { transform: translateY(-12px); opacity: 0.1; }
            85% { transform: translateY(-12px); opacity: 0.1; }
            97.5% { opacity: 0; }
            100% { transform: translateY(0px); opacity: 0; }
          }
          
          #eD8yP3b4jUn30_${uniqueId} {
            animation: float-main-${uniqueId} 7.36s ease-in-out infinite;
            transform-origin: center;
          }
          
          #eD8yP3b4jUn15_${uniqueId} {
            animation: float-right-${uniqueId} 7.36s ease-in-out infinite;
            transform-origin: center;
          }
          
          #eD8yP3b4jUn22_${uniqueId} {
            animation: float-left-${uniqueId} 7.36s ease-in-out infinite;
            transform-origin: center;
          }
        `}
      </style>
      
      <defs>
        <linearGradient id={`eD8yP3b4jUn5-fill_${uniqueId}`} x1="48.8038" y1="-6.81818" x2="107.656" y2="140.67" spreadMethod="pad" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 0)">
          <stop id={`eD8yP3b4jUn5-fill-0_${uniqueId}`} offset="0%" stopColor="rgb(255,255,255)"/>
          <stop id={`eD8yP3b4jUn5-fill-1_${uniqueId}`} offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <linearGradient id={`eD8yP3b4jUn8-fill_${uniqueId}`} x1="-9.47704" y1="-30.6394" x2="59.7686" y2="96.8721" spreadMethod="pad" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 0)">
          <stop id={`eD8yP3b4jUn8-fill-0_${uniqueId}`} offset="0%" stopColor="rgb(255,255,255)"/>
          <stop id={`eD8yP3b4jUn8-fill-1_${uniqueId}`} offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <linearGradient id={`eD8yP3b4jUn10-fill_${uniqueId}`} x1="-4.00302" y1="-12.9418" x2="25.2458" y2="40.918" spreadMethod="pad" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 0)">
          <stop id={`eD8yP3b4jUn10-fill-0_${uniqueId}`} offset="0%" stopColor="rgb(255,255,255)"/>
          <stop id={`eD8yP3b4jUn10-fill-1_${uniqueId}`} offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <linearGradient id={`eD8yP3b4jUn11-stroke_${uniqueId}`} x1="46.0956" y1="73.575" x2="1.55431" y2="14.3499" spreadMethod="pad" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 0)">
          <stop id={`eD8yP3b4jUn11-stroke-0_${uniqueId}`} offset="0%" stopColor="rgb(255,255,255)"/>
          <stop id={`eD8yP3b4jUn11-stroke-1_${uniqueId}`} offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <linearGradient id={`eD8yP3b4jUn13-fill_${uniqueId}`} x1="-8.762" y1="-28.3276" x2="55.2591" y2="89.5631" spreadMethod="pad" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 0)">
          <stop id={`eD8yP3b4jUn13-fill-0_${uniqueId}`} offset="0%" stopColor="rgb(255,255,255)"/>
          <stop id={`eD8yP3b4jUn13-fill-1_${uniqueId}`} offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <linearGradient id={`eD8yP3b4jUn14-stroke_${uniqueId}`} x1="100.896" y1="161.044" x2="3.40214" y2="31.4097" spreadMethod="pad" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 0)">
          <stop id={`eD8yP3b4jUn14-stroke-0_${uniqueId}`} offset="0%" stopColor="rgb(255,255,255)"/>
          <stop id={`eD8yP3b4jUn14-stroke-1_${uniqueId}`} offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <linearGradient id={`eD8yP3b4jUn16-fill_${uniqueId}`} x1="218.5" y1="-10.0729" x2="163.739" y2="65.306" spreadMethod="pad" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 0)">
          <stop id={`eD8yP3b4jUn16-fill-0_${uniqueId}`} offset="0%" stopColor="rgb(239,217,102)"/>
          <stop id={`eD8yP3b4jUn16-fill-1_${uniqueId}`} offset="100%" stopColor="rgba(239,217,102,0)"/>
        </linearGradient>
        <linearGradient id={`eD8yP3b4jUn24-fill_${uniqueId}`} x1="56.2443" y1="4.52889" x2="97.6044" y2="76.1666" spreadMethod="pad" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 0)">
          <stop id={`eD8yP3b4jUn24-fill-0_${uniqueId}`} offset="0%" stopColor="rgb(239,217,102)"/>
          <stop id={`eD8yP3b4jUn24-fill-1_${uniqueId}`} offset="100%" stopColor="rgba(239,217,102,0)"/>
        </linearGradient>
      </defs>
      
      <rect id={`eD8yP3b4jUn2_${uniqueId}`} display="none" width="299.270073" height="279.562043" rx="0" ry="0" transform="matrix(0.937192 0 0 1.075714 -6.736759 -5.364401)" fill="rgb(0,0,0)" stroke="none" strokeWidth="0"/>
      
      <rect id={`eD8yP3b4jUn3_${uniqueId}`} width="143" height="143" rx="13" ry="13" transform="matrix(0.866025 -0.5 0.866025 0.5 12.732099 217.426975)" opacity="0.1" fill="none" stroke="rgb(255,255,255)" strokeWidth="2" strokeDasharray="6,6"/>
      
      <g id={`eD8yP3b4jUn4_${uniqueId}`}>
        <rect id={`eD8yP3b4jUn5_${uniqueId}`} width="150" height="150" rx="14" ry="14" transform="matrix(0.866025 -0.5 0.866025 0.5 7 172.427)" fill={`url(#eD8yP3b4jUn5-fill_${uniqueId})`} fillOpacity="0.1" stroke="none" strokeWidth="1"/>
      </g>
      
      <g id={`eD8yP3b4jUn6_${uniqueId}`} transform="matrix(1 0 0 1 0.000001 0)">
        <g id={`eD8yP3b4jUn7_${uniqueId}`}>
          <circle id={`eD8yP3b4jUn8_${uniqueId}`} r="40.4738" transform="matrix(0.866025 0.5 -0.866025 0.5 142.264 164.895)" fill={`url(#eD8yP3b4jUn8-fill_${uniqueId})`} fillOpacity="0.3" stroke="none" strokeWidth="1"/>
        </g>
        <g id={`eD8yP3b4jUn9_${uniqueId}`}>
          <circle id={`eD8yP3b4jUn10_${uniqueId}`} r="17.0958" transform="matrix(0.866025 0.5 -0.866025 0.5 142.264 155.895)" fill={`url(#eD8yP3b4jUn10-fill_${uniqueId})`} fillOpacity="0.5" stroke="none" strokeWidth="1"/>
          <circle id={`eD8yP3b4jUn11_${uniqueId}`} r="17.0958" transform="matrix(0.866025 0.5 -0.866025 0.5 142.264 155.895)" fill="none" stroke={`url(#eD8yP3b4jUn11-stroke_${uniqueId})`} strokeWidth="2" strokeOpacity="0.7" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <g id={`eD8yP3b4jUn12_${uniqueId}`}>
          <circle id={`eD8yP3b4jUn13_${uniqueId}`} r="37.4201" transform="matrix(0.866025 0.5 -0.866025 0.5 142.264 158.847)" fill={`url(#eD8yP3b4jUn13-fill_${uniqueId})`} fillOpacity="0.3" stroke="none" strokeWidth="1"/>
          <circle id={`eD8yP3b4jUn14_${uniqueId}`} r="37.4201" transform="matrix(0.866025 0.5 -0.866025 0.5 142.264 158.847)" fill="none" stroke={`url(#eD8yP3b4jUn14-stroke_${uniqueId})`} strokeWidth="2" strokeOpacity="0.7" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </g>
      
      <g id={`eD8yP3b4jUn15_${uniqueId}`} opacity="1" transform="matrix(1 0 0 1 0 -2.547137)">
        <path id={`eD8yP3b4jUn16_${uniqueId}`} d="M196.045,47.6881L154.486,38.2327L154.486,67.9153L260.032,128.852L260.032,69.083L219.573,71.57L196.045,47.6881Z" opacity="0.4" fill={`url(#eD8yP3b4jUn16-fill_${uniqueId})`} stroke="none" strokeWidth="1"/>
        <path id={`eD8yP3b4jUn17_${uniqueId}`} d="M154.578,38.5564L196.137,48.0119L219.665,71.8937L260.124,69.4067" fill="none" stroke="rgb(239,217,102)" strokeWidth="1" strokeDasharray="3,3"/>
        <ellipse id={`eD8yP3b4jUn18_${uniqueId}`} rx="1.97718" ry="1.96091" transform="matrix(0.866025 0.5 0 1 219.288 71.406)" fill="rgb(239,217,102)" stroke="none" strokeWidth="1"/>
        <ellipse id={`eD8yP3b4jUn19_${uniqueId}`} rx="2.21693" ry="2.21581" transform="matrix(0.866025 0.5 0 1 196.92 47.7515)" fill="rgb(239,217,102)" stroke="none" strokeWidth="1"/>
        <ellipse id={`eD8yP3b4jUn20_${uniqueId}`} rx="1.92654" ry="1.8173" transform="matrix(0.866025 0.5 0 1 154.668 38.2078)" fill="rgb(239,217,102)" stroke="none" strokeWidth="1"/>
        <ellipse id={`eD8yP3b4jUn21_${uniqueId}`} rx="1.84256" ry="1.92482" transform="matrix(0.866025 0.5 0 1 259.596 69.7709)" fill="rgb(239,217,102)" stroke="none" strokeWidth="1"/>
      </g>
      
      <g id={`eD8yP3b4jUn22_${uniqueId}`} opacity="0.1" transform="matrix(1 0 0 1 0 -4.36652)">
        <g id={`eD8yP3b4jUn23_${uniqueId}`} transform="matrix(1 0 0 1 0 0.000001)">
          <path id={`eD8yP3b4jUn24_${uniqueId}`} d="M67.6375,58.1423L109.859,31.701L109.859,70.5224L2.6293,132.432L2.62929,73.8649L43.7342,41.4977L67.6375,58.1423Z" opacity="0.55" fill={`url(#eD8yP3b4jUn24-fill_${uniqueId})`} stroke="none" strokeWidth="1"/>
          <path id={`eD8yP3b4jUn25_${uniqueId}`} d="M108.904,32.7321L67.545,58.1548L43.5869,41.4756L2.53675,74.1838" fill="none" stroke="rgb(239,217,102)" strokeWidth="1" strokeDasharray="3,3"/>
          <ellipse id={`eD8yP3b4jUn26_${uniqueId}`} rx="2.50506" ry="1.92147" transform="matrix(-0.866025 0.5 0 1 43.9927 41.1855)" fill="rgb(239,217,102)" stroke="none" strokeWidth="1"/>
          <ellipse id={`eD8yP3b4jUn27_${uniqueId}`} rx="2.83069" ry="2.17124" transform="matrix(-0.866025 0.5 0 1 67.0993 57.4093)" fill="rgb(239,217,102)" stroke="none" strokeWidth="1"/>
          <ellipse id={`eD8yP3b4jUn28_${uniqueId}`} rx="2.3216" ry="1.78075" transform="matrix(-0.866025 0.5 0 1 109.989 32.0973)" fill="rgb(239,217,102)" stroke="none" strokeWidth="1"/>
          <ellipse id={`eD8yP3b4jUn29_${uniqueId}`} rx="2.45896" ry="1.88611" transform="matrix(-0.866025 0.5 0 1 2.75915 74.2528)" fill="rgb(239,217,102)" stroke="none" strokeWidth="1"/>
        </g>
      </g>
      
      <g id={`eD8yP3b4jUn30_${uniqueId}`} transform="matrix(1 0 0 1 0 -0.847978)">
        <path id={`eD8yP3b4jUn31_${uniqueId}`} d="M136.7,54.1809C136.7,53.0764,135.921,51.7244,134.967,51.2499C122.143,44.8727,112.016,51.3637,112.016,66.4322C112.016,82.1732,123.067,101.315,136.7,109.186C149.749,116.72,160.434,111.195,161.324,96.9005C161.39,95.8368,160.608,94.487,159.651,93.9347L138.432,81.6835C137.475,81.1312,136.7,79.788,136.7,78.6835L136.7,54.1809Z" clipRule="evenodd" fill="rgb(255,255,255)" fillRule="evenodd" stroke="none" strokeWidth="1"/>
        <path id={`eD8yP3b4jUn32_${uniqueId}`} d="M169.525,86.3342C170.482,86.8865,171.264,86.4395,171.193,85.2971C170.35,71.7127,161.294,56.0271,149.951,48.5048C148.997,47.8721,148.219,48.3261,148.219,49.4307L148.219,72.033C148.219,73.1376,148.994,74.4807,149.951,75.033L169.525,86.3342Z" opacity="0.5" clipRule="evenodd" fill="rgb(255,255,255)" fillRule="evenodd" stroke="none" strokeWidth="1"/>
      </g>
    </svg>
  );
}
