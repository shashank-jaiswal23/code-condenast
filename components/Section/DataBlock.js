import { useEffect, useState, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";

import Matter from "matter-js";
import { SlideUp } from "components/Animation";

const Engine = Matter.Engine;
const Events = Matter.Events;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const Composite = Matter.Composite;
const MouseConstraint = Matter.MouseConstraint;

const Data = ({ data }) => {
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [matterEngine, setMatterEngine] = useState(null);
  const [matterRenderer, setMatterRenderer] = useState(null);
  const [options, setOptions] = useState({
    height: null,
    width: null,
  });

  const [inViewRef, inView] = useInView({
    /* Optional options */
    threshold: 0,
  });

  const ref = useRef(null);

  const setRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef]
  );

  const updateSizingForReact = () => {
    setOptions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  useEffect(() => {
    updateSizingForReact();
  }, []);

  useEffect(() => {
    const loadEngine = () => {
      updateSizingForReact();

      const engine = Engine.create();
      const render = Render.create({
        element: ref.current,
        engine: engine,
        options: {
          width: options.width,
          height: options.height,
          wireframes: false,
          background: "black",
        },
      });

      // Fake requesT!
      let bodies = document.querySelectorAll(".ballin");

      let ceiling;
      let wallLeft;
      let wallRight;
      let ground;
      let ballA, ballB, ballC, ballD, ballE;

      // add walls
      let wallopts = {
        isStatic: true,
        restitution: 0.2,
        friction: 0.3,
        render: {
          fillStyle: "#000",
        },
      };
      let groundopts = {
        isStatic: true,
        restitution: 0,
        friction: 0.3,
        render: {
          fillStyle: "#000",
        },
      };

      const createWorld = () => {
        const isMobile = window.innerWidth < 760;
        const isTiny = window.innerWidth < 600;

        let ballSize = isTiny
          ? window.innerWidth / 5
          : window.innerWidth / 8.66;

        World.add(engine.world, [
          (ground = Bodies.rectangle(
            window.innerWidth / 2,
            window.innerHeight + 5,
            window.innerWidth + 200,
            16,
            groundopts
          )),
          // walls
          (ceiling = Bodies.rectangle(
            window.innerWidth / 2,
            0,
            window.innerWidth + 200,
            16,
            wallopts
          )), // top
          (wallRight = Bodies.rectangle(
            window.innerWidth + 5,
            window.innerHeight / 2,
            16,
            window.innerHeight,
            wallopts
          )), // right
          (wallLeft = Bodies.rectangle(
            0,
            window.innerHeight / 2,
            16,
            window.innerHeight,
            wallopts
          )), // left
          (ballA = Bodies.circle(
            isMobile ? 20 : 210,
            isMobile ? 20 : 70,
            ballSize,
            {
              restitution: 0.1,
              friction: 0.1,
              render: {
                fillStyle: "#CACCCE",
              },
            }
          )),
          (ballB = Bodies.circle(
            isMobile ? 50 : 110,
            isMobile ? 80 : 70,
            ballSize,
            {
              restitution: 0.1,
              friction: 0.1,
              render: {
                fillStyle: "#9C9EA0",
              },
            }
          )),
          (ballC = Bodies.circle(
            isMobile ? 50 : 310,
            isMobile ? 110 : 70,
            ballSize,
            {
              restitution: 0.1,
              friction: 0.1,
              render: {
                fillStyle: "#CACCCE",
              },
            }
          )),
          (ballD = Bodies.circle(
            isMobile ? 50 : 810,
            isMobile ? 140 : 70,
            ballSize,
            {
              restitution: 0.1,
              friction: 0.1,
              render: {
                fillStyle: "#CACCCE",
              },
            }
          )),
          (ballE = Bodies.circle(
            isMobile ? 50 : 910,
            isMobile ? 200 : 70,
            ballSize,
            {
              restitution: 0.1,
              friction: 0.1,
              render: {
                fillStyle: "#636E70",
              },
            }
          )),
        ]);
      };

      const destoryWorld = () => {
        const allBodies = Matter.Composite.allBodies(engine.world);

        engine.world.bodies = [];
        createWorld();
      };

      // add mouse control
      var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: false,
            },
          },
        });

      mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
      mouse.element.removeEventListener("scroll", mouse.scroll);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

      World.add(engine.world, mouseConstraint);
      Engine.run(engine);

      Events.on(engine, "afterUpdate", (e) => {
        // console.log(e, "E after update!!");

        let index = 0;
        engine.world.bodies.forEach((body) => {
          if (body.label === "Circle Body") {
            if (bodies[index]) {
              const bodyDom = bodies[index];

              bodyDom.style.transform =
                "translate( " +
                (body.position.x - bodyDom.offsetWidth / 2) +
                "px, " +
                (body.position.y - bodyDom.offsetHeight / 2) +
                "px )";
              bodyDom.style.transform += "rotate( " + body.angle + "rad )";
            }

            index++;
          }
        });
      });

      const refreshWorld = () => {
        Render.stop(render);

        destoryWorld();

        updateSizingForReact();

        const w = window.innerWidth;
        const h = window.innerHeight;

        render.context.canvas.width = w;
        render.context.canvas.height = h;
        render.options.height = h;
        render.options.width = w;

        Render.run(render);
      };

      refreshWorld();
      setMatterEngine(engine);
      setMatterRenderer(render);

      window.addEventListener("resize", refreshWorld);
    };

    if (hasLoadedOnce) {
      setTimeout(loadEngine, 600);
    }
  }, [hasLoadedOnce]);

  useEffect(() => {
    if (inView) {
      setHasLoadedOnce(true);

      if (matterRenderer) {
        Render.stop(matterRenderer);
        Render.run(matterRenderer);
      }
    } else {
      if (matterRenderer) {
        Render.stop(matterRenderer);
      }
    }
  }, [inView]);

  return (
    <SlideUp>
      <section
        style={{
          width: options.width,
          height: options.height,
        }}
        ref={setRefs}
        className="data psr"
      >
        {data &&
          data.map((d, i) => {
            const text = d.split(" : ");

            return (
              <div key={i} data-id={i} className="ballin x xw xac xjc tac">
                <div>
                  {text[0] && <h1>{text[0]}</h1>}
                  {text[1] && <p>{text[1]}</p>}
                </div>
              </div>
            );
          })}
      </section>

      <style jsx>{`
        h1,
        p {
          margin-bottom: 0;
        }
        .ballin {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 4;
          height: 23vw;
          width: 23vw;
          padding: 4vw;
          border-radius: 100%;
          overflow: hidden;
          pointer-events: none;
          color: black;
        }

        .ballin:last-of-type {
          color: white;
        }

        @media (max-width: 760px) {
          .ballin {
            width: 40vw;
          }
        }
      `}</style>
    </SlideUp>
  );
};

export default Data;
