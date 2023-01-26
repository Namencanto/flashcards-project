import classes from "../PoliciesPages.module.scss";
import classNames from "classnames/bind";
import PoliciesPages from "../PoliciesPages";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faSquare } from "@fortawesome/free-solid-svg-icons";

import HowItWorksImage from "../../../images/how-it-works.png";
import HowItWorksSmallImage from "../../../images/how-it-works-small.png";

import { Link } from "react-router-dom";

function HowItWorksPage() {
  const cx = classNames.bind(classes);

  return (
    <PoliciesPages title={"How It Works"}>
      <figure className={classNames(cx("policies-imgbox"))}>
        <img src={HowItWorksImage} alt="how it works illustration" />
      </figure>
      <section className={classNames(cx("policies-textbox"))}>
        <h3>Business Analysis And Reporting Tools</h3>
        <p>
          Tivo also automatically collects and receives certain information from
          your computer or mobile device, including the activities you perform
          on our Website, the Platforms, and the Applications, the type of
          hardware and software you are using (for example, your operating
          system or browser), and information obtained from cookies. For
          example, each time you visit the Website or otherwise use the
          Services, we automatically collect your IP address, browser and device
          type, access times, the web page from which you came, the regions from
          which you navigate the web page, and the web page(s) you access (as
          applicable).
        </p>
        <p>
          When you first register for a Tivo account, and when you use the
          Services, we collect some <Link>Personal Information</Link> about you
          such as:
        </p>

        <div className={classNames(cx("policies-listbox"))}>
          <ul>
            <li>
              <FontAwesomeIcon icon={faSquare} />
              <p>
                The geographic area where you use your computer and mobile
                devices should be the same with the one on the receipt
              </p>
            </li>
            <li>
              <FontAwesomeIcon icon={faSquare} />
              <p>
                Your full name, username, and email address and other contact
                details should be provided in the contact forms
              </p>
            </li>
            <li>
              <FontAwesomeIcon icon={faSquare} />
              <p>
                A unique Tivo user ID (an alphanumeric string) which is assigned
                to you upon registration should always be at front
              </p>
            </li>
            <li>
              <FontAwesomeIcon icon={faSquare} />
              <p>Every system is backuped regularly and it will not fail</p>
            </li>
            <li>
              <FontAwesomeIcon icon={faSquare} />
              <p>
                Your IP Address and, when applicable, timestamp related to your
                consent and confirmation of consent but please make sure it does
              </p>
            </li>
            <li>
              <FontAwesomeIcon icon={faSquare} />
              <p>
                Other information submitted by you or your organizational
                representatives via various methods and practiced techniques
              </p>
            </li>
          </ul>
          <ul>
            <li>
              <FontAwesomeIcon icon={faSquare} />
              <p>
                Your billing address and any necessary other information to
                complete any financial transaction, and when making purchases
                through the Services, we may also collect your credit card or
                PayPal information or any other sensitive data that you consider
              </p>
            </li>
            <li>
              <FontAwesomeIcon icon={faSquare} />
              <p>
                User generated content (such as messages, posts, comments,
                pages, profiles, images, feeds or communications exchanged on
                the Supported Platforms that can be used)
              </p>
            </li>
            <li>
              <FontAwesomeIcon icon={faSquare} />
              <p>Images or other files that you may publish via our Services</p>
            </li>
            <li>
              <FontAwesomeIcon icon={faSquare} />
              <p>
                Information (such as messages, posts, comments, pages, profiles,
                images) we may receive relating to communications you send us,
                such as queries or comments concerning
              </p>
            </li>
          </ul>
        </div>
      </section>

      <div className={classNames(cx("policies-divider"))}>
        <section
          style={{ marginBottom: "0" }}
          className={classNames(cx("policies-textbox"))}
        >
          <h3>Improving Product Strategy</h3>
          <p>
            Tivo also automatically collects and receives certain information
            from your computer or mobile device, including the activities you
            perform on our Website, the Platforms, and the Applications, the
            type of hardware and software you are using (for example, your
            operating system or browser), and information obtained from cookies.
          </p>
          <p>
            For example, each time you visit the Website or otherwise use the
            Services, we automatically collect your IP address, browser and
            device type, access times, the web page.
          </p>
          <p>
            The best way to promoted digital products is to provide potential
            users with free versions that can be tested throughout the product's
            life.
          </p>
        </section>
        <figure>
          <img
            src={HowItWorksSmallImage}
            alt="how it works small illustration"
          />
        </figure>
      </div>

      <section
        className={classNames(
          cx("policies-textbox", "policies-textbox-offwhite")
        )}
      >
        <p>
          Tivo is a HTML landing page template tool. By its nature, Services
          enable our customers to promote their products and services integrate
          with hundreds of business applications that they already use, all in
          one place. Services help our customers promote their products and
          services, marketing and advertising; engaging audiences; scheduling
          and publishing messages; and analyze the results.
        </p>
      </section>

      <section className={classNames(cx("policies-textbox"))}>
        <h3>Project Evaluation And Predictions</h3>
        <p>
          By using any of the Services, or submitting or collecting any Personal
          Information via the Services, you consent to the collection, transfer,
          storage disclosure, and use of your Personal Information in the manner
          set out in this Privacy Policy. If you do not consent to the use of
          your Personal Information in these ways, please stop using the
          Services. Information in the manner set out in this Privacy Policy. If
          you do not consent to the use of your Personal Information in these
          ways, please stop using the Services.
        </p>
      </section>
    </PoliciesPages>
  );
}

export default HowItWorksPage;
