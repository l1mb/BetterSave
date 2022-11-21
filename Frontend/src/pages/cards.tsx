import { Carousel } from "@mantine/carousel";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardState } from "../store/slices/cardSlice";
import { AppDispatch, RootState } from "../store/store";
import getCardsThunk from "../store/thunks/cardThunk";
import styles from "../styles/cards.module.scss";

const Cards = () => {
  const dispatch: AppDispatch = useDispatch();
  const [error, setError] = useState("");
  const cards = useSelector<RootState, CardState[]>((state) => state.cards);

  const errorHandle = (err: string) => {
    setError(err);
  };

  useEffect(() => {
    dispatch(getCardsThunk({ setError }));
  }, []);

  return (
    <div className={`${styles.login_wrapper} flex w-full `}>
      {cards.length > 0 ? (
        <Carousel sx={{ maxWidth: 320 }} mx="auto" withIndicators height={200}>
          {cards.map((el) => (
            <Carousel.Slide key={el.id}>{el.cardNumber}</Carousel.Slide>
          ))}
        </Carousel>
      ) : (
        "No cards"
      )}
    </div>
  );
};

export default Cards;
