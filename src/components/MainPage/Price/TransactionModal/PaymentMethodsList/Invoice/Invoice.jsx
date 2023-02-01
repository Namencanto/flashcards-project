import classes from "../../PaymentMethods.module.scss";
import classNames from "classnames/bind";

function Invoice({ invoiceErrorMessage }) {
  const cx = classNames.bind(classes);

  return (
    <>
      <h3>Data for invoice</h3>
      <div className={classNames(cx("payment-methods-card-input-invoice-box"))}>
        <div className="input-default">
          <input type="text" id="vat-number" placeholder=" " maxlength="100" />
          <label htmlFor="vat-number">VAT Number</label>
        </div>
        <div style={{ marginLeft: "1rem" }} className="input-default">
          <input type="text" id="company" placeholder=" " />
          <label htmlFor="company">Company</label>
        </div>
      </div>
      <div className={classNames(cx("payment-methods-card-input-invoice-box"))}>
        <div className="input-default">
          <input type="text" id="first-name" placeholder=" " />
          <label htmlFor="first-name">First Name</label>
        </div>
        <div style={{ marginLeft: "1rem" }} className="input-default">
          <input type="text" id="last-name" placeholder=" " />
          <label htmlFor="last-name">Last Name</label>
        </div>
      </div>
      <div className={classNames(cx("payment-methods-card-input-invoice-box"))}>
        <div className="input-default">
          <input style={{}} type="text" id="zip-code" placeholder=" " />
          <label
            style={window.innerWidth < 300 ? { left: "1rem" } : null}
            htmlFor="zip-code"
          >
            Zip Code
          </label>
        </div>
        <div style={{ marginLeft: "1rem" }} className="input-default">
          <input type="text" id="address" placeholder=" " />
          <label
            style={window.innerWidth < 300 ? { left: "1rem" } : null}
            htmlFor="address"
          >
            Address
          </label>
        </div>
        <div style={{ marginLeft: "1rem" }} className="input-default">
          <input type="text" id="country" placeholder=" " />
          <label
            style={window.innerWidth < 300 ? { left: "1rem" } : null}
            htmlFor="country"
          >
            Country
          </label>
        </div>
      </div>
      <p style={{ color: "red" }}>{invoiceErrorMessage}</p>
    </>
  );
}

export default Invoice;
