import { useEffect, useRef, useState } from "react";
import animateScrollTo from "animated-scroll-to";

import ListItem, { ListItemMobile } from "./ListItem";
import { SlideUp } from "components/Animation";

const ListHeaderItemMobile = ({ title, i, activeItem, setActiveItem }) => {
  const handleClick = () => {
    setActiveItem(i);
  };

  return (
    <div id={`${title}-${i}`} className={`active-${activeItem === i}`} onClick={handleClick}>
      <h3>
        <a href={`#$i`}>{title}</a>
      </h3>

      <style jsx>{`
        .active-false {
          opacity: 0.56;
        }

        .active-true h3 {
          transform: translateX(2rem);
        }

        div {
          padding: 1rem 0;
          cursor: default;
          transition: 0.3s ease-out opacity, 0.3s ease-out text-indent;
        }

        h3 {
          transition: 0.3s ease-out transform;
        }

        @media {
          .active-true h3 {
            transform: translateX(0rem);
          }
        }
      `}</style>
    </div>
  );
};

const ListHeaderItem = ({ title, i, activeItem, setActiveItem }) => {
  const handleMouseEnter = () => {
    setActiveItem(i);
  };

  return (
    <div
      className={`active-${activeItem === i}`}
      onMouseEnter={handleMouseEnter}
    >
      <h3>
        <button onFocus={handleMouseEnter}>{title}</button>
      </h3>

      <style jsx>{`
        .active-false {
          opacity: 0.56;
        }

        .active-true h3 {
          transform: translateX(2rem);
        }

        div {
          padding: 1rem 0;
          cursor: default;
          transition: 0.3s ease-out opacity, 0.3s ease-out text-indent;
        }

        h3 {
          transition: 0.3s ease-out transform;
        }

        @media {
          .active-true h3 {
            transform: translateX(0rem);
          }
        }
      `}</style>
    </div>
  );
};

const ListBlock = ({ listOfItems }) => {
  const [activeItem, setActiveItem] = useState(0);
  const [activeItemMobile, setActiveItemMobile] = useState(null);

  const ref = useRef(null);

  useEffect(() => {
    if (activeItemMobile && ref.current) {
      animateScrollTo(ref.current);
    }
  }, [activeItemMobile]);

  return (
    <section ref={ref} className="list-block psr bgc-b z2">
      <div className="list-content x xw">
        <header className="list-header desktop">
          {listOfItems &&
            listOfItems.map((item, i) => (
              <SlideUp key={i}>
                <div key={i}>
                  <ListHeaderItem
                    {...item.fields}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    i={i}
                  />
                  <ListItem {...item.fields} activeItem={activeItem} i={i} />
                </div>
              </SlideUp>
            ))}
        </header>

        <header className="list-header mobile">
          <div>
            {listOfItems &&
              listOfItems.map((item, i) => (
                <SlideUp key={i}>
                  <ListHeaderItemMobile
                    {...item.fields}
                    key={i}
                    activeItem={activeItemMobile}
                    setActiveItem={setActiveItemMobile}
                    i={i}
                  />
                </SlideUp>
              ))}
          </div>
        </header>

        <div className="content mobile">
          {listOfItems &&
            listOfItems.map((item, i) => (
              <ListItemMobile
                {...item.fields}
                key={i}
                activeItem={activeItemMobile}
                setActiveItem={setActiveItemMobile}
                i={i}
              />
            ))}
        </div>
      </div>
      <style jsx>{`
        .list-content {
          max-width: 1500px;
          margin: auto;
        }

        header {
          padding: 12rem 8rem;
          padding-right: 8rem;
        }

        .content.desktop {
          flex: 1;
          position: relative;
          padding: 12rem 0;
        }

        header.mobile,
        .content.mobile {
          display: none;
        }

        @media (max-width: 1200px) {
          header {
            padding: 12rem 4rem;
          }
        }

        @media (max-width: 1000px) {
          header {
            width: 100%;
            text-align: center;
            padding: 4rem 2rem;
            padding-bottom: 3rem;
          }

          header.desktop {
            display: none;
          }
          header.mobile,
          .content.mobile {
            display: block;
          }

          .content.desktop {
            display: none;
          }
        }

        @media (max-width: 700px) {
          header.mobile div {
            width: 100%;
          }
          header.mobile {
            min-height: 100vh;
            display: flex;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};

export default ListBlock;
