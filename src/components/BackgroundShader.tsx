import React from 'react';

export default function BackgroundShader() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="shader-veil absolute inset-0"></div>
      <div className="shader-orb shader-orb-a absolute"></div>
      <div className="shader-orb shader-orb-b absolute"></div>
      <div className="shader-orb shader-orb-c absolute"></div>
      <div className="shader-beam absolute"></div>
    </div>
  );
}
