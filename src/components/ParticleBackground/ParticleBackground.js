// src/components/ParticleBackground/ParticleBackground.js
import React from 'react';
import Particles from 'react-tsparticles';

const ParticleBackground = () => {
  const particlesInit = (main) => {
    console.log(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#000000",
          },
        },
        particles: {
          number: {
            value: 5, // Just a few to keep it simple
          },
          shape: {
            type: "line",
          },
          size: {
            value: 50, // Long lines
          },
          stroke: {
            width: 5, // Thick lines
            color: "white", // Solid white color
          },
          move: {
            enable: true,
            speed: 1,
            direction: "random",
            random: true,
            out_mode: "destroy",
            straight: false,
          },
          opacity: {
            value: 1, // Fully opaque
          },
        },
      }}
    />
  );
};

export default ParticleBackground;