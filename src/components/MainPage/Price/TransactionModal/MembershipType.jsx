import classes from "./MembershipType.module.scss";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollar,
  faCheck,
  faCircleCheck,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";

import { premiumTypes } from "../Price";
function MembershipType({ membership }) {
  const cx = classNames.bind(classes);

  return (
    <section className={classNames(cx("membership-type"))}>
      <main>
        <div className={classNames(cx("membership-type-price"))}>
          {membership.premiumType === premiumTypes[0].premiumType ? (
            <h3>{membership.price !== 0 ? membership.price : "Free Trial"}</h3>
          ) : (
            <>
              <FontAwesomeIcon icon={faDollar} />
              <h3>
                {membership.price !== 0 ? membership.price : "Free Trial"}
              </h3>
              <p>USD</p>
            </>
          )}
        </div>

        <ul className={classNames(cx("membership-type-benefits"))}>
          {membership.premiumType === premiumTypes[2].premiumType ? (
            <li>
              <FontAwesomeIcon icon={faCheck} />
              <p>Premium courses</p>
            </li>
          ) : (
            ""
          )}
          {membership.premiumType === premiumTypes[2].premiumType ||
          membership.premiumType === premiumTypes[1].premiumType ? (
            <li>
              <FontAwesomeIcon icon={faCheck} />
              <p>Unlimited techcards</p>
            </li>
          ) : (
            ""
          )}

          <li>
            <FontAwesomeIcon icon={faCheck} />
            <p>Support</p>
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} />
            <p>Learning analytics</p>
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} />
            <p>Discounts</p>
          </li>
        </ul>

        <div className={classNames(cx("membership-type-other-info"))}>
          {membership.premiumType === premiumTypes[0].premiumType ? (
            ""
          ) : (
            <div
              className={classNames(cx("membership-type-other-info-element"))}
            >
              <FontAwesomeIcon icon={faCircleCheck} />
              <p>30-day money back guarantee</p>
            </div>
          )}

          <div className={classNames(cx("membership-type-other-info-element"))}>
            <FontAwesomeIcon icon={faBolt} />
            <p>Express delivery</p>
          </div>
          {membership.premiumType === premiumTypes[0].premiumType ? (
            <div className={classNames(cx("membership-type-other-info-trial"))}>
              <p>
                We guarantee that your account will not be debited, we need your
                payment card information to avoid abuse of our application
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </main>
    </section>
  );
}

export default MembershipType;
