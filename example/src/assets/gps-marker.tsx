import React from 'react';
import { SvgXml } from 'react-native-svg';

const GpsLocation = () => {
  const svgMarkup = `
<svg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 477.112 477.112' style='enable-background:new 0 0 477.112 477.112;' xml:space='preserve'>
<linearGradient id='SVGID_1_' gradientUnits='userSpaceOnUse' x1='-28.319' y1='557.986' x2='-28.319' y2='618.787' gradientTransform='matrix(8 0 0 -8 465.108 4941)'>
 <stop  offset='0' style='stop-color:#006DF0'/>
<stop  offset='1' style='stop-color:#00E7F0'/>
</linearGradient>
<path style='fill:url(#SVGID_1_);' d='M238.556,0c-92.74,0.106-167.894,75.26-168,168c0,90.056,155.064,292.32,161.664,300.88
l6.336,8.232l6.336-8.232c6.6-8.56,161.664-210.824,161.664-300.88C406.45,75.26,331.296,0.106,238.556,0z M238.556,450.728
c-29.528-39.528-152-207.896-152-282.728c0-83.947,68.053-152,152-152s152,68.053,152,152
C390.556,242.816,268.084,411.2,238.556,450.728z'/>
<linearGradient id='SVGID_2_' gradientUnits='userSpaceOnUse' x1='-28.319' y1='558.035' x2='-28.319' y2='618.838' gradientTransform='matrix(8 0 0 -8 465.108 4941)'>
<stop  offset='0' style='stop-color:#006DF0'/>
<stop  offset='1' style='stop-color:#00E7F0'/>
</linearGradient>
<path style='fill:url(#SVGID_2_);' d='M238.556,112c-30.928,0-56,25.072-56,56s25.072,56,56,56s56-25.072,56-56
C294.521,137.087,269.469,112.035,238.556,112z M238.556,208c-22.091,0-40-17.909-40-40s17.909-40,40-40s40,17.909,40,40
C278.53,190.08,260.636,207.974,238.556,208z'/>
</svg>`;

  return <SvgXml xml={svgMarkup} width={100} height={100} />;
};

export default GpsLocation;
