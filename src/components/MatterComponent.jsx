import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import MatterAttractors from 'matter-attractors';
import MatterWrap from 'matter-wrap';

const MatterComponent = () => {
  const scene = useRef(null);
  const [engineState, setEngineState] = useState(null);

  useEffect(() => {
    const canvas = scene.current;

    const dimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    Matter.use(MatterAttractors);
    Matter.use(MatterWrap);

    // Module aliases
    const {
      Engine,
      Events,
      Runner,
      Render,
      World,
      Body,
      Mouse,
      Common,
      Bodies,
    } = Matter;

    // Create engine
    const engine = Engine.create();
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;
    engine.world.gravity.scale = 0.1;

    // Create renderer
    const render = Render.create({
      element: canvas,
      engine: engine,
      options: {
        showVelocity: false,
        width: dimensions.width,
        height: dimensions.height,
        wireframes: false,
        background: 'transparent',
      },
    });

    // Create runner
    const runner = Runner.create();

    // Create demo scene
    const world = engine.world;
    world.gravity.scale = 0;

    // Create a body with an attractor
    const attractiveBody = Bodies.circle(
      render.options.width / 2,
      render.options.height / 2,
      Math.max(dimensions.width / 25, dimensions.height / 25) / 2,
      {
        render: {
          fillStyle: '#000',
          strokeStyle: '#000',
          lineWidth: 0,
        },
        isStatic: true,
        plugin: {
          attractors: [
            (bodyA, bodyB) => {
              return {
                x: (bodyA.position.x - bodyB.position.x) * 1e-6,
                y: (bodyA.position.y - bodyB.position.y) * 1e-6,
              };
            },
          ],
        },
      }
    );

    World.add(world, attractiveBody);

    // Add some bodies to be attracted
    for (let i = 0; i < 60; i += 1) {
      const x = Common.random(0, render.options.width);
      const y = Common.random(0, render.options.height);
      const s = Common.random() > 0.6 ? Common.random(10, 80) : Common.random(4, 60);
      const polygonNumber = Common.random(3, 6);

      const body = Bodies.polygon(x, y, polygonNumber, s, {
        mass: s / 20,
        friction: 0,
        frictionAir: 0.02,
        angle: Math.round(Math.random() * 360),
        render: {
          fillStyle: '#222222',
          strokeStyle: '#000000',
          lineWidth: 2,
        },
      });

      World.add(world, body);

      const r = Common.random(0, 1);
      let circle = Bodies.circle(x, y, Common.random(2, 8), {
        mass: 0.1,
        friction: 0,
        frictionAir: 0.01,
        render: {
          fillStyle: r > 0.3 ? '#27292d' : '#444444',
          strokeStyle: '#000000',
          lineWidth: 2,
        },
      });

      World.add(world, circle);

      circle = Bodies.circle(x, y, Common.random(2, 20), {
        mass: 6,
        friction: 0,
        frictionAir: 0,
        render: {
          fillStyle: r > 0.3 ? '#334443' : '#222222',
          strokeStyle: '#111111',
          lineWidth: 4,
        },
      });

      World.add(world, circle);

      circle = Bodies.circle(x, y, Common.random(2, 30), {
        mass: 0.2,
        friction: 0.6,
        frictionAir: 0.8,
        render: {
          fillStyle: '#191919',
          strokeStyle: '#111111',
          lineWidth: 3,
        },
      });

      World.add(world, circle);
    }

    // Add mouse control
    const mouse = Mouse.create(render.canvas);

    Events.on(engine, 'afterUpdate', () => {
      if (!mouse.position.x) return;

      // Smoothly move the attractor body towards the mouse
      Body.translate(attractiveBody, {
        x: (mouse.position.x - attractiveBody.position.x) * 0.12,
        y: (mouse.position.y - attractiveBody.position.y) * 0.12,
      });
    });

    // Run the engine and renderer
    Runner.run(runner, engine);
    Render.run(render);

    // Save engine state for window resize handling
    setEngineState({ engine, runner, render });

    // Clean up on component unmount
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (engineState) {
        const { render } = engineState;
        const dimensions = {
          width: window.innerWidth,
          height: window.innerHeight,
        };

        render.canvas.width = dimensions.width;
        render.canvas.height = dimensions.height;
        render.options.width = dimensions.width;
        render.options.height = dimensions.height;
      }
    };

    window.addEventListener('resize', debounce(handleResize, 250));
    return () => {
      window.removeEventListener('resize', debounce(handleResize, 250));
    };
  }, [engineState]);

  // Debounce function to limit resize event calls
  const debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  return <div ref={scene} />;
};

export default MatterComponent;
