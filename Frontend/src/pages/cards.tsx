import { Carousel } from "@mantine/carousel";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Content from "../elements/content/Content";
import { CardState } from "../store/slices/cardSlice";
import { AppDispatch, RootState } from "../store/store";
import getCardsThunk from "../store/thunks/cardThunk";
import getSpendingThunk from "../store/thunks/spendingThunks";
import styles from "../styles/cards.module.scss";
import { SpendingReportDto } from "../types/User/Spending/spending";

const Cards = () => {
  const dispatch: AppDispatch = useDispatch();
  const [error, setError] = useState("");
  const cards = useSelector<RootState, CardState[]>((state) => state.cards);
  const spendings = useSelector<RootState, SpendingReportDto[]>(
    (state) => state.spending
  );
  const [orderBy, setOrderBy] = useState("date");
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [beginDate, setBeginDate] = useState<string>(
    moment().subtract("days", 7).format("MM-DD-YYYY")
  );

  const colors = [
    "bg-violet-800 text-violet-100",
    "bg-violet-600 text-violet-200",
    "bg-violet-500 text-violet-100",
    "bg-violet-200 text-violet-600",
    "bg-violet-100 text-violet-800",
  ];

  const errorHandle = (err: string) => {
    setError(err);
  };

  useEffect(() => {
    dispatch(getCardsThunk({ setError }));
  }, []);

  useEffect(() => {
    console.log(cards, "cards");
  }, [cards]);

  const getCardNumber = (el: string) => [
    el.substring(0, 4),
    el.substring(4, 8),
    el.substring(8, 12),
    el.substring(12, 16),
  ];

  const handleCardChange = (index: number) => {
    setSelectedCardIndex(index);
  };

  useEffect(() => {
    const card = cards[selectedCardIndex];
    if (card && card?.id) {
      dispatch(
        getSpendingThunk({
          cardId: card.id,
          setError,
          orderBy,
          beginDate,
        })
      );
    }
  }, [selectedCardIndex, orderBy, beginDate, cards]);

  return (
    <div className={`${styles.login_wrapper} flex w-full `}>
      <Content>
        <div className="mt-10 flex w-full flex-col items-center ">
          <div>
            {cards.length > 0 ? (
              <div className="bg h-52 w-96  ">
                <Carousel
                  sx={{ maxWidth: 440 }}
                  mx="auto"
                  withIndicators
                  height={200}
                  slideGap="md"
                  onSlideChange={(index) => handleCardChange(index)}
                  styles={{
                    indicator: {
                      width: 12,
                      height: 4,
                      transition: "width 250ms ease",
                      backgroundColor: "white",
                      "&[data-active]": {
                        width: 40,
                      },
                    },
                  }}
                >
                  {cards.map((el, index) => (
                    <Carousel.Slide key={el.id}>
                      <div
                        className={`h-full rounded-xl border border-opacity-95 px-4 ${colors[index]}  bg-gradient-to-r  from-violet-800
                      to-violet-500`}
                      >
                        <div className="mx-4 flex h-full flex-col justify-evenly">
                          <div className="flex flex-col">
                            <div>
                              <span>
                                <span className="pr-2 text-xl font-bold">
                                  {el.balance}
                                </span>
                                <span className="text-sm">{el.currency}</span>
                              </span>
                            </div>
                          </div>
                          <div className="flex w-full justify-between">
                            <span className="mx-auto text-center text-xl font-bold">
                              {getCardNumber(el.cardNumber).map((it) => (
                                <span key={it} className="px-1 tracking-wide">
                                  {it}
                                </span>
                              ))}
                            </span>
                          </div>
                          <span className="text-lg font-bold">{el.name}</span>
                        </div>
                      </div>
                    </Carousel.Slide>
                  ))}
                </Carousel>
              </div>
            ) : (
              <span className="text-lg font-bold text-violet-600">
                You didn&apos;t add any card yet
              </span>
            )}
          </div>
          <div className="w-full">
            <div className="w-full">
              {spendings.length === 0 ? (
                <h3>There is no spendings there</h3>
              ) : (
                <section className="w-full bg-violet-50 py-1 xl:mx-auto xl:w-8/12">
                  <div className="mx-auto mb-12 mt-24 w-full px-4 xl:mb-0 ">
                    <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg ">
                      <div className="mb-0 rounded-t border-0 px-4 py-3">
                        <div className="flex flex-wrap items-center">
                          <div className="relative w-full max-w-full flex-1 flex-grow px-4">
                            <h3 className="text-blueGray-700 text-base font-semibold">
                              Your spendings
                            </h3>
                          </div>
                          <div className="relative w-full max-w-full flex-1 flex-grow px-4 text-right">
                            <button
                              className="mr-1 mb-1 rounded bg-indigo-500 px-3 py-1 text-xs font-bold uppercase text-white outline-none transition-all duration-150 ease-linear focus:outline-none active:bg-indigo-600"
                              type="button"
                            >
                              See all
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="block w-full overflow-x-auto">
                        <table className="w-full border-collapse items-center bg-transparent ">
                          <thead>
                            <tr>
                              <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                                Spending name
                              </th>
                              <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                                Cost
                              </th>
                              <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                                Shop
                              </th>
                              <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                                Spending date
                              </th>
                              <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                                See list of shop positions
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {spendings.map((spending) => (
                              <tr>
                                <th className="text-blueGray-700 whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-left align-middle text-xs ">
                                  {spending.name}
                                </th>
                                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs ">
                                  {spending.coast}
                                </td>
                                <td className="align-center whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-xs">
                                  {spending.shop.shopName}
                                </td>
                                <td className="align-center whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-xs">
                                  {spending.date}
                                </td>
                                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                                  <i className="fas fa-arrow-up mr-4 text-emerald-500" />
                                  {spending.shopItems.length > 0 &&
                                    "See positions"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
};

export default Cards;
