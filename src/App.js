import React, { useState } from "react";
import "./App.scss";
import Slider from "./components/Slider";
import Switch from "./components/Switch";

import { ReactComponent as SVGCheck } from "./icon-check.svg";
import { ReactComponent as SVGPattern } from "./pattern-circles.svg";
import { renderToStaticMarkup } from "react-dom/server";

function App() {
  const svgString = encodeURIComponent(renderToStaticMarkup(<SVGPattern />));

  const [pageViews, setPageViews] = useState(100);
  const [isYearly, setIsYearly] = useState(false);

  const getPrice = (views) => {
    if (views < 50) return 8;
    if (views < 100) return 16;
    if (views < 500) return 24;
    return 36;
  };

  return (
    <div className="bg-container">
      <svg
        className="patterns-content"
        xmlns="http://www.w3.org/2000/svg"
        width="1440"
        height="449"
      >
        <path
          fill="#F1F5FE"
          fillRule="evenodd"
          d="M0 0h1440v449H191.5C85.737 449 0 363.263 0 257.5V0z"
        />
      </svg>
      <header
        className="marketing-copy"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8, ${svgString}')`,
        }}
      >
        <h2 className="marketing-copy__h2">Simple, traffic-based pricing</h2>
        <p className="marketing-copy__p">
          Sign-up for our 30 day trial. No credit card required.
        </p>
      </header>
      <div className="pricing-component">
        <h3 className="pricing-component__h3">
          <span className="pricing-component__h3--highlight">{pageViews}K</span>{" "}
          Pageviews
        </h3>
        <div className="pricing-component__slider-container">
          <Slider
            min={10}
            max={1000}
            onChange={setPageViews}
            defaultValue={pageViews}
          />
        </div>
        <div className="pricing-component__pricing">
          <span className="pricing-component__pricing--price">
            ${getPrice(pageViews)}.00
          </span>{" "}
          / month
        </div>
        <div className="pricing-component__switch">
          <span className="pricing-component__switch--label">
            Monthly Billing
          </span>
          <Switch checked={isYearly} onChange={setIsYearly} />
          <span className="pricing-component__switch--label">
            Yearly Billing
          </span>
          <span className="pricing-component__switch--discount">
            -25%
            <span className="pricing-component__switch--discount-word">
              {" "}
              discount
            </span>
          </span>
        </div>

        <div className="pricing-component__container">
          <ul className="pricing-component__list">
            <li>
              <SVGCheck style={{ marginRight: 10 }} />
              Unlimited websites
            </li>
            <li>
              <SVGCheck style={{ marginRight: 10 }} />
              100% data ownership
            </li>
            <li>
              <SVGCheck style={{ marginRight: 10 }} />
              Email reports
            </li>
          </ul>
          <button className="pricing-component__button">Start my trial</button>
        </div>
      </div>
    </div>
  );
}

export default App;
