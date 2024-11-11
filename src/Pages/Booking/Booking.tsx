import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import styles from "./Booking.module.css";
import { postDataType, responseType } from "../../Types/types";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FieldsetSelect,
  FieldsetString,
} from "../../Components/Fieldset/Fieldset";
import FieldsetNumber from "../../Components/Fieldset/Fieldset";

type BookingProps = {
  setApiResponse: React.Dispatch<React.SetStateAction<responseType>>;
};

const Booking: React.FC<BookingProps> = ({ setApiResponse }) => {
  const todaysDate: Date = new Date();
  const formattedDate: string = todaysDate.toISOString().slice(0, 10);

  const [bookingDate, setBookingDate] = useState<string>(formattedDate);
  const [bookingTime, setBookingTime] = useState<string>("20:00");
  const [bookingBowlers, setBookingBowlers] = useState<number>(1);
  const [bookingLanes, setBookingLanes] = useState<number>(1);
  const [bookingShoes, setBookingShoes] = useState<number[]>([]);

  // JSON to use in fetch body
  const [postData, setPostData] = useState<postDataType>();

  useEffect(() => {
    setBookingShoes((prevShoes) => {
      if (prevShoes.length === bookingBowlers) return prevShoes;

      return prevShoes.length < bookingBowlers
        ? [
            ...prevShoes,
            ...new Array(bookingBowlers - prevShoes.length).fill(0),
          ]
        : prevShoes.slice(0, bookingBowlers);
    });
  }, [bookingBowlers]);

  // Post to API
  useEffect(() => {
    const postDataToApi = async () => {
      const API_URL: string =
        "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com";
      const API_KEY: string = "738c6b9d-24cf-47c3-b688-f4f4c5747662";
      try {
        const response: Response = await toast.promise(
          fetch(API_URL, {
            method: "POST",
            headers: {
              "x-api-key": API_KEY,
            },
            body: JSON.stringify(postData),
          }),
          {
            pending: "Booking in progress",
            success: "Booking confirmed",
            error: "Can not connect to API",
          },
          { hideProgressBar: true }
        );
        setApiResponse(await response.json());
      } catch (error) {
        console.log("Failed to post data:", error);
      }
    };
    if (postData) {
      postDataToApi();
    }
  }, [postData]);

  const handleShoeSize = (optionIndex: number, optionValue: number) => {
    const updated = bookingShoes.map((value, index) => {
      return index === optionIndex ? optionValue : value;
    });
    setBookingShoes(updated);
  };
  console.log(bookingShoes);
  const handleSubmit = () => {
    if (bookingLanes > 0 && bookingBowlers > 0 && !bookingShoes.includes(0)) {
      const postInfo: postDataType = {
        when: `${bookingDate}T${bookingTime}`,
        lanes: bookingLanes,
        people: bookingBowlers,
        shoes: bookingShoes,
      };
      setPostData(postInfo);
    } else {
      if (bookingShoes.includes(0)) {
        const zeroCount: number = bookingShoes.filter(
          (shoe) => shoe === 0
        ).length;
        toast.error(
          `${zeroCount} ${
            zeroCount === 1 ? "person is" : "people are"
          } missing a shoe size.`
        );
      }
    }
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0, filter: ["blur(4px)", "blur(0)"] }}
      className={styles.bookingWrapper}
    >
      <Header title="BOOKING" />

      <SectionTitle title="WHEN, WHAT & WHO" />
      <div className={styles.dateTimeWrapper}>
        <FieldsetString
          title="date"
          date={formattedDate}
          value={bookingDate}
          setValue={setBookingDate}
        />
        <FieldsetString
          title="time"
          value={bookingTime}
          setValue={setBookingTime}
        />
      </div>
      <FieldsetNumber
        title="Number of bowlers"
        value={bookingBowlers}
        setValue={setBookingBowlers}
      />
      <FieldsetNumber
        title="Number of lanes"
        value={bookingLanes}
        setValue={setBookingLanes}
      />

      {validateNumbers(bookingBowlers, bookingLanes) && (
        <>
          <SectionTitle title="SHOES" />
          {bookingBowlers &&
            Array.from({ length: bookingBowlers }, (_, index) => (
              <FieldsetSelect
                key={`Shoe-${index}`}
                index={index}
                changeSize={handleShoeSize}
              />
            ))}
          <motion.button
            whileTap={{ scale: 0.97, boxShadow: "inset 2px 2px 6px #333" }}
            className={styles.submitButton}
            onClick={handleSubmit}
          >
            book lanes
          </motion.button>
        </>
      )}
      {!validateNumbers(bookingBowlers, bookingLanes) && (
        <>
          {bookingLanes > 0 && bookingBowlers > 0 && (
            <div className={styles.error}>
              {bookingLanes / bookingBowlers < 0.25
                ? "Max 4 people per lane"
                : "Max 1 lane per person"}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

const validateNumbers = (bowlers: number, lanes: number) => {
  if (!bowlers && !lanes) {
    return false;
  }
  return lanes <= bowlers && lanes / bowlers >= 0.25;
};

export default Booking;
