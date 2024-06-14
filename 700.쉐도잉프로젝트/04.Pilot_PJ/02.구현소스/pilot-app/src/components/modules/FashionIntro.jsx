import React from "react";

// CSS 불러오기
import "../../css/fashionIntro.scss";

function FashionIntro(props) {
  return (
    <div id="men" className="fs-page">
      <ul className="pgc">
        <li
          className="imgc"
        >
          <img src="./images/men02.png" alt="공유다!" />
        </li>
        <li className="txtc">
          <h2>
            <a
              href="#"
            >
              MEN'S <br />
              ESSENTIALS
            </a>
          </h2>
        </li>
      </ul>
    </div>
  );
}

export default FashionIntro;
