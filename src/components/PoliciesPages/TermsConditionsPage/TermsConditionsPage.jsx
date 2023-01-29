import classes from "../PoliciesPages.module.scss";
import classNames from "classnames/bind";
import PoliciesPages from "../PoliciesPages";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faSquare } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
function TermsConditionsPage() {
  const cx = classNames.bind(classes);

  return (
    <PoliciesPages title={"Terms Conditions"}>
      <section className={classNames(cx("policies-textbox"))}>
        <h3>Limitations Of Liability</h3>
        <p>
          Techcards also automatically collects and receives certain information
          from your computer or mobile device, including the activities you
          perform on our Website, the Platforms, and the Applications, the type
          of hardware and software you are using (for example, your operating
          system or browser), and information obtained from cookies. For
          example, each time you visit the Website or otherwise use the
          Services, we automatically collect your IP address, browser and device
          type, access times, the web page from which you came, the regions from
          which you navigate the web page, and the web page(s) you access (as
          applicable).
        </p>
        <p>
          When you first register for a Techcards account, and when you use the
          Services, we collect some <Link>Personal Information</Link> about you
          such as:
        </p>
        <ul>
          <li>
            <FontAwesomeIcon icon={faSquare} />
            <p>
              The geographic area where you use your computer and mobile devices
              should be the same with the one on the receipt
            </p>
          </li>
          <li>
            <FontAwesomeIcon icon={faSquare} />
            <p>
              Your full name, username, and email address and other contact
              details must be provided using the dedicated form
            </p>
          </li>
          <li>
            <FontAwesomeIcon icon={faSquare} />
            <p>
              A unique Techcards user ID (an alphanumeric string) which is
              assigned to you upon registration and session
            </p>
          </li>
          <li>
            <FontAwesomeIcon icon={faSquare} />
            <p>
              Other optional information as part of your account profile are not
              required and you should not mention them
            </p>
          </li>
          <li>
            <FontAwesomeIcon icon={faSquare} />
            <p>
              Your IP Address and, when applicable, timestamp related to your
              consent and confirmation of consent are mandatory
            </p>
          </li>
          <li>
            <FontAwesomeIcon icon={faSquare} />
            <p>
              Other information submitted by you or your organizational
              representatives via various methods is not taken into
              consideration
            </p>
          </li>
        </ul>
      </section>
      <section className={classNames(cx("policies-textbox"))}>
        <h3>Terms And Conditions</h3>
        <p>
          Under no circumstances shall Techcards be liable for any direct,
          indirect, special, incidental or consequential damages, including, but
          not limited to, loss of data or profit, arising out of the use, or the
          inability to use, the materials on this site, even if Techcards or an
          authorized representative has been advised of the possibility of such
          damages. If your use of materials from this site results in the need
          for servicing, repair or correction of equipment or data, you assume
          any costs thereof should only be provided by the user of the
          application.
        </p>
      </section>
      <section className={classNames(cx("policies-textbox"))}>
        <h3>License Types & Template Usage</h3>
        <p>
          All our templates inherit the GNU general public license from HTML.
          All .PSD & CSS files are packaged separately and are not licensed
          under the GPL 2.0. Instead, these files inherit Techcards Personal Use
          License. These files are given to all Clients on a personal use basis.
          You may not offer them, <Link to="/home">modified or unmodified</Link>
          , for redistribution or resale of any kind. You can’t use one of our
          themes on a HTML domain. More on HTML Vs CSS, you can read here. You
          can use our templates do develop sites for your clients and also for a
          limited amount of personal projects.
        </p>
        <p>
          Services help our customers promote their products and services,
          marketing and advertising; engaging audiences; scheduling and
          publishing messages; and analyze the results are always measured
          better with a dedicated analytics tool.
        </p>
      </section>
      <section className={classNames(cx("policies-textbox"))}>
        <h3>Designer Membership And How It Applies</h3>
        <p>
          By using any of the Services, or submitting or collecting any Personal
          Information via the Services, you consent to the collection, transfer,
          storage disclosure, and use of your Personal Information in the manner
          set out in this Privacy Policy. If you do not consent to the use of
          your Personal Information in these ways, please stop using the
          Services if you don't whish to customize the template for your online
          project.
        </p>
      </section>
      <section className={classNames(cx("policies-textbox"))}>
        <h3>Assets Used In The Live Preview Content</h3>
        <p>
          Techcards Landing Page uses tracking technology on the landing page,
          in the Applications, and in the Platforms, including mobile
          application identifiers and a unique Hootsuite user ID to help us
          recognize you across different Services, to monitor usage and web
          traffic routing for the Services, and to customize and improve the
          Services. By visiting Techcards or using the Services you agree to the
          use of cookies in your browser and HTML-based emails. Cookies are
          small text files placed on your device when you visit a{" "}
          <Link to="/home">web site</Link> in order to track use of the site and
          to improve your user experience.
        </p>
      </section>
    </PoliciesPages>
  );
}

export default TermsConditionsPage;
