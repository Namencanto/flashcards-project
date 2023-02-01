import classes from "../PoliciesPages.module.scss";
import classNames from "classnames/bind";
import PoliciesPages from "../PoliciesPages";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faSquare } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useRef } from "react";

import { inputValidation } from "../../../hooks/useInputValidation";
const cx = classNames.bind(classes);

function PrivacyPolicyPage() {
  const cx = classNames.bind(classes);

  const [inputEmailIsValid, setInputEmailIsValid] = useState(true);
  const [inputPasswordIsValid, setInputPasswordIsValid] = useState(true);

  const [inputEmailErrorMessage, setInputEmailErrorMessage] = useState("");
  const [inputPasswordErrorMessage, setInputPasswordErrorMessage] =
    useState("");
  const [inputCheckboxIsValid, setInputCheckboxIsValid] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [serverMessage, setServerMessage] = useState("");
  const [serverMessageClass, setServerMessageClass] = useState("");
  const [serverLoading, setServerLoading] = useState(false);

  const inputCheckboxRef = useRef();

  const inputCheckboxValidation = () => {
    setInputCheckboxIsValid(inputCheckboxRef.current.checked);
  };

  const sendUserDataHandler = async (e) => {
    e.preventDefault();
    if (inputEmailIsValid && inputPasswordIsValid) {
      try {
        setServerLoading(true);
        const res = await axios.post("/auth/send-user-info", {
          userEmail: email,
          userPassword: password,
        });

        if ((res.status = 200)) {
          setServerMessage(res.data);
          setServerMessageClass("server-accepted-large");
        }
      } catch (err) {
        setServerLoading(false);
        setServerMessageClass("server-denied-large");
        setServerMessage(err.response.data);
      }
      setServerLoading(false);
    } else {
      inputCheckboxValidation();
      inputValidation(
        "password",
        password,
        setInputPasswordIsValid,
        setInputPasswordErrorMessage
      );
      inputValidation(
        "email",
        email,
        setInputEmailIsValid,
        setInputEmailErrorMessage
      );
    }
  };
  return (
    <PoliciesPages title={"Privacy Policy"}>
      <section className={classNames(cx("policies-textbox"))}>
        <h3>Private Data We Receive And Collect</h3>
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
          applicable). There is more to this section and we want to keep you
          informed about it.
        </p>
        <p>
          When you first register for a Techcards account, and when you use the
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
                A unique Techcards user ID (an alphanumeric string) which is
                assigned to you upon registration should always be at front
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

      <section className={classNames(cx("policies-textbox"))}>
        <h3>How We Use Techcards Landing Page Data</h3>
        <p>
          Techcards Landing Page Template uses visitors' data for the following
          general purposes and for other specific ones that are important:
        </p>
        <ol>
          <li>
            To identify you when you login to your account so we can start or
            user security process for the entire session and duration
          </li>
          <li>
            To enable us to operate the Services and provide them to you without
            fear of losing precious confidential information of your users
          </li>
          <li>
            To verify your transactions and for purchase confirmation, billing,
            security, and authentication (including security tokens for
            communication with installed). Always take security measures like
            not saving passwords in your browser or writing them down
          </li>
          <li>
            To analyze the Website or the other Services and information about
            our visitors and users, including research into our user
            demographics and user behaviour in order to improve our content and
            Services
          </li>
          <li>
            To contact you about your account and provide customer service
            support, including responding to your comments and questions
          </li>
          <li>
            To share aggregate (non-identifiable) statistics about users of the
            Services to prospective advertisers and partners
          </li>
          <li>
            To keep you informed about the Services, features, surveys,
            newsletters, offers, surveys, newsletters, offers, contests and
            events we think you may find useful or which you have requested from
            us
          </li>
          <li>
            To sell or market Techcards Landing Page products and services to
            you or in other parts of the world where legislation is less
            restrictive
          </li>
          <li>
            To better understand your needs and the needs of users in the
            aggregate, diagnose problems, analyze trends, improve the features
            and usability of the Services, and better understand and market to
            our customers and users
          </li>
          <li>
            To keep the Services safe and secure for everyone using the app from
            administrators to regular users with limited rights
          </li>
          <li>
            We also use non-identifiable information gathered for statistical
            purposes to keep track of the number of visits to the Services with
            a view to introducing improvements and improving usability of the
            Services. We may share this type of statistical data so that our
            partners also understand how often people use the Services, so that
            they, too, may provide you with an optimal experience.
          </li>
        </ol>
      </section>

      <section className={classNames(cx("policies-textbox"))}>
        <h3>Customer Content We Process For Customers</h3>
        <p>
          Techcards is a HTML landing page template tool. By its nature,
          Services enable our customers to promote their products and services
          integrate with hundreds of business applications that they already
          use, all in one place. Customer security is our primary focus in this
          document.
        </p>
        <p>
          Services help our customers promote their products and services,
          marketing and advertising; engaging audiences; scheduling and
          publishing messages; and analyze the results and improve the security
          levels in all areas of the application.
        </p>
      </section>
      <section className={classNames(cx("policies-textbox"))}>
        <h3>Consent Of Using Techcards Landing Page</h3>
        <p>
          By using any of the Services, or submitting or collecting any Personal
          Information via the Services, you consent to the collection, transfer,
          storage disclosure, and use of your Personal Information in the manner
          set out in this Privacy Policy. If you do not consent to the use of
          your Personal Information in these ways, please stop using the
          Services should be safe and easy to guarantee a great user experience.
        </p>
      </section>

      <div className={classNames(cx("policies-divider"))}>
        <section className={classNames(cx("policies-textbox"))}>
          <h3>Inquire What Data We Have</h3>
          <p>
            Techcards Landing Page uses tracking technology on the landing page,
            in the Applications, and in the Platforms, including mobile
            application identifiers and a unique Techcards user ID to help us.
            Recognize you across different Services, to monitor usage and web
            traffic routing for the Services, and to customize and improve the
            Services.
          </p>
          <p>
            By visiting Techcards or using the Services you agree to the use of
            cookies in your browser and HTML-based emails. You visit a website,
            by using any of the Services, or submitting or collecting any
            Personal Information via the Services, you consent and use of your{" "}
            <Link to="/home">Personal Information</Link>
          </p>
        </section>
        <section className={classNames(cx("policies-user-data"))}>
          <div className={classNames(cx("policies-user-data-description"))}>
            <h3>Get your data</h3>
            <p>We will send you all your data stored on our servers</p>
          </div>
          <form onSubmit={sendUserDataHandler}>
            <div className="input-default">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                  inputValidation(
                    "email",
                    e.target.value,
                    setInputEmailIsValid,
                    setInputEmailErrorMessage
                  );
                }}
                placeholder=" "
                value={email}
                id="email"
                name="email"
                type="text"
              />
              <label htmlFor="email">E-mail</label>
            </div>
            <p style={{ color: "red" }}>{inputEmailErrorMessage}</p>
            <div className="input-default">
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                  inputValidation(
                    "password",
                    e.target.value,
                    setInputPasswordIsValid,
                    setInputPasswordErrorMessage
                  );
                }}
                placeholder=" "
                value={password}
                id="password"
                name="password"
                type="text"
              />
              <label htmlFor="password">Password</label>
            </div>
            <p style={{ color: "red" }}>{inputPasswordErrorMessage}</p>
            <div className="checkbox-default">
              <input
                onClick={inputCheckboxValidation}
                ref={inputCheckboxRef}
                type="checkbox"
              />
              <p>
                I've read and agree to Techcards's written
                <Link to="privacy-policy"> Privacy Policy </Link> and
                <Link to="terms-conditions"> Terms Conditions </Link>.
              </p>
            </div>
            {inputCheckboxIsValid || (
              <p style={{ color: "red" }}>
                Check this box, if you want to continue.
              </p>
            )}
            <button disabled={serverLoading} className="btn-solid-large">
              Submit
            </button>
            <p
              style={{ marginTop: "1rem" }}
              className={classNames(cx(serverMessageClass))}
            >
              {serverMessage}
            </p>
          </form>
        </section>
      </div>
    </PoliciesPages>
  );
}

export default PrivacyPolicyPage;
