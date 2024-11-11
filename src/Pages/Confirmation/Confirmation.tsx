import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { responseType } from "../../Types/types";
import styles from "../Booking/Booking.module.css";
import { motion } from "framer-motion";

type apiResposeProps = {
  apiResponse: responseType;
};
type FieldsetType = {
  title: string;
  text: string;
};
const Confirmation: React.FC<apiResposeProps> = ({ apiResponse }) => {
  const Fieldset: React.FC<FieldsetType> = ({ title, text }) => {
    return (
      <fieldset className={styles.fieldset}>
        <legend>{title}</legend>
        <div className={styles.dummyInput}>{text}</div>
      </fieldset>
    );
  };
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0, filter: ["blur(4px)", "blur(0)"] }}
      className={styles.bookingWrapper}
    >
      {apiResponse.when ? (
        <>
          <Header title="SEE YOU SOON" />
          <SectionTitle title="BOOKING DETAILS" />
          <Fieldset title="WHEN" text={formatDate(apiResponse.when)} />
          <Fieldset title="WHO" text={`${apiResponse.people}`} />
          <Fieldset title="LANES" text={`${apiResponse.lanes}`} />
          <Fieldset title="BOOKING NUMBER" text={`${apiResponse.id}`} />
          <div className={styles.totalPrice}>
            <div className={styles.totalPrice_title}>Total</div>
            <div>{apiResponse.price} SEK</div>
          </div>
          <Link to="/">
            <motion.button
              whileTap={{ scale: 0.97, boxShadow: "inset 0 0 10px #333" }}
              className={styles.submitButton}
            >
              Make a new booking
            </motion.button>
          </Link>
        </>
      ) : (
        <div className={styles.noBooking}>
          <div className={styles.error}>No bookings to show</div>
        </div>
      )}
    </motion.div>
  );
};
const formatDate = (date: string) => {
  const partialDate = date.split("T");
  return partialDate[0] + ", " + partialDate[1];
};
export default Confirmation;
