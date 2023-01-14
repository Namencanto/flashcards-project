import classes from "./TransactionModal.module.scss";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faX } from "@fortawesome/free-solid-svg-icons";

import { useRef, useEffect } from "react";
import MembershipType from "./MembershipType";
import PaymentMethods from "./PaymentMethods";

import Logo from "../../../../images/logo-purple.svg";
function TransactionModal(props) {
  const cx = classNames.bind(classes);
  const modalRef = useRef();
  const contentModalRef = useRef();

  useEffect(() => {
    if (props.modalIsVisible === true) {
      setTimeout(() => {
        modalRef.current.style.opacity = 0.8;

        contentModalRef.current.style.opacity = 1;
        contentModalRef.current.style.transform = `translateY(${0}rem) perspective(${75}rem) rotateX(${0}deg)`;
      });
    }
  }, [props.modalIsVisible]);

  const exitModalAnimation = () => {
    modalRef.current.style.opacity = 0;

    contentModalRef.current.style.opacity = 0;
    contentModalRef.current.style.transform = `translateY(${-2}rem) perspective(${75}rem) rotateX(${10}deg)`;

    setTimeout(() => {
      props.hide();
    }, 200);
  };

  return (
    <>
      <div
        onClick={exitModalAnimation}
        className={classNames(cx("modal"))}
        ref={modalRef}
      ></div>

      <div className={classNames(cx("modal-container"))}>
        <div ref={contentModalRef} className={classNames(cx("modal-content"))}>
          <FontAwesomeIcon
            onClick={exitModalAnimation}
            className={classNames(cx("modal-content-icon"))}
            icon={faX}
          />
          <div className={classNames(cx("modal-content-main"))}>
            <h1>Payment</h1>

            <p style={{ color: "#777" }}>
              Complete your {props.membership.premiumType} membership
            </p>
            <div className={classNames(cx("modal-content-main-items"))}>
              <MembershipType membership={props.membership} />
              <PaymentMethods membership={props.membership} />
            </div>
          </div>
          {/* <footer>
            <img src={Logo} alt="logo" />
          </footer> */}
        </div>
      </div>
    </>
  );
}

export default TransactionModal;
