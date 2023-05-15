/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Close from "images/icons/close.png";
import getCardsThunk, { updateCardThunk, deleteCardThunk } from "@/store/thunks/cardThunk";
import getSpendingThunk, { deleteSpendingThunk } from "@/store/thunks/spendingThunks";
import SliderWrapper from "@/elements/slider/slider";
import { Settings } from "react-slick";
import CreateCardModal from "../../modals/createCardModal";
import Content from "../../../elements/content/Content";
import { CardState } from "../../../store/slices/cardSlice";
import { AppDispatch, RootState } from "../../../store/store";
import styles from "./cards.module.scss";
import "./overrides.scss";
import { SpendingReportDto } from "../../../types/User/Spending/spending";
import CreateSpendingModal from "../../modals/createSpendingModal";

function Cards() {
  const dispatch: AppDispatch = useDispatch();
  const [error, setError] = useState("");
  const { cards } = useSelector<RootState, CardState>((state) => state.cards);

  const [isOpened, setIsOpened] = useState<"spending" | "card" | false>(false);

  const spendings = useSelector<RootState, SpendingReportDto[]>((state) => state.spending);
  const [orderBy, setOrderBy] = useState("date");
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [beginDate, setBeginDate] = useState<string>(moment().subtract("days", 7).format("MM-DD-YYYY"));

  const [editableIndex, setEditable] = useState(-1);
  const [newBalance, setNewBalance] = useState(0);

  const handleStartEdit = () => {В
    setNewBalance(cards[selectedCardIndex].balance);
    setEditable(selectedCardIndex);
  };

  const cancelEdit = () => {
    setNewBalance(0);
    setEditable(-1);
  };

  const handleFinishEdit = async () => {
    await dispatch(
      updateCardThunk({
        setError,
        value: { id: cards[selectedCardIndex].id, balance: newBalance },
      })
    );

    dispatch(getCardsThunk({ setError }));
    cancelEdit();
  };

  const handleDelete = async () => {
    await dispatch(
      deleteCardThunk({
        setError,
        value: { id: cards[selectedCardIndex].id },
      })
    );

    dispatch(getCardsThunk({ setError }));
    setSelectedCardIndex((prev) => prev - 1);
  };

  const handleSpendingDelete = async (id: string) => {
    await dispatch(deleteSpendingThunk(id));
  };

  console.log(spendings);

  const colors = [
    "bg-indigo-800 text-indigo-100",
    "bg-indigo-600 text-indigo-200",
    "bg-indigo-500 text-indigo-100",
    "bg-indigo-200 text-indigo-600",
    "bg-indigo-100 text-indigo-800",
  ];

  const errorHandle = (err: string) => {
    setError(err);
  };

  useEffect(() => {
    dispatch(getCardsThunk({ setError }));
  }, []);

  // useEffect(() => {}, [cards]);

  const handleCardChange = (index: number) => {
    cancelEdit();
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

  const [spendingModalState, setSpendingModalState] = useState<{
    mode: "create" | "update";
    editableModel: Partial<SpendingReportDto>;
  }>({
    mode: "create",
    editableModel: {},
  });

  const handleUpdateSpending = (spending: SpendingReportDto) => {
    setIsOpened("spending");
    setSpendingModalState({ mode: "update", editableModel: spending });
    console.log(spending);
  };

  const handleCreateTransaction = () => {
    setIsOpened("spending");
    setSpendingModalState({ mode: "create", editableModel: {} });
  };

  useEffect(() => {
    console.log(selectedCardIndex);
  }, [selectedCardIndex]);

  const sliderSettings: Settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div className={`${styles.login_wrapper} flex w-full `}>
      <Content>
        <>
          <div className="mt-10 flex w-full flex-col items-center ">
            <div>
              {cards.length > 0 ? (
                <div className={`${styles.cards} w-96`}>
                  <SliderWrapper
                    settings={sliderSettings}
                    // sx={{ maxWidth: 440 }}
                    // mx="auto"
                    // withIndicators
                    // height={200}
                    // slideGap="md"
                    // onSlideChange={(index) => handleCardChange(index)}
                    // styles={{
                    //   indicator: {
                    //     width: 12,
                    //     height: 4,
                    //     transition: "width 250ms ease",
                    //     backgroundColor: "white",
                    //     "&[data-active]": {
                    //       width: 40,
                    //     },
                    //   },
                    // }}
                  >
                    {cards.map((el, index) => (
                      <div
                        className={`relative h-48 rounded-xl border border-opacity-95 px-4 ${colors[index]}  bg-gradient-to-r
                      from-indigo-800 to-indigo-500`}
                      >
                        <div
                          className="absolute top-1 right-1 flex h-7 w-7 items-center justify-center rounded-full transition-all hover:bg-indigo-400"
                          onClick={() => handleDelete()}
                        >
                          <div className="relative flex items-center">
                            <img src={Close} width={14} height={14} alt="close" />
                          </div>
                        </div>
                        <div className="mx-4 flex h-full flex-col justify-evenly ">
                          <div className="flex flex-col">
                            <div>
                              <span>
                                {editableIndex !== index ? (
                                  <>
                                    <span className="pr-2 text-xl font-bold">{el.balance}</span>
                                    <span className="text-sm">{el.currency}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleStartEdit()}
                                      className={`bg-transparent px-2 opacity-40 transition-all hover:opacity-80 ${styles.edit_button}`}
                                    >
                                      Edit
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <input
                                      type="number"
                                      className="w-28 rounded-lg border border-indigo-50 bg-indigo-600 px-2 py-1 outline-none"
                                      value={newBalance}
                                      onInput={(val) => {
                                        const v = val.currentTarget.value;
                                        if (v.length < 6) {
                                          setNewBalance(Number(v));
                                        }
                                      }}
                                    />
                                    <button
                                      type="button"
                                      className={`bg-transparent px-2 opacity-40 transition-all hover:opacity-80 ${styles.edit_button}`}
                                      onClick={() => handleFinishEdit()}
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      className={`bg-transparent px-2 opacity-40 transition-all hover:opacity-80 ${styles.edit_button}`}
                                      onClick={() => cancelEdit()}
                                    >
                                      Cancel
                                    </button>
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="flex w-full justify-between">
                            <span className="mx-auto text-center text-xl font-bold">
                              <span className="px-1 tracking-wide">{el.cardNumber.substring(0, 4)}</span>
                              <span className="px-1 tracking-wide">XXXX</span>
                              <span className="px-1 tracking-wide">XXXX</span>
                              <span className="px-1 tracking-wide">{el.cardNumber.substring(12, 16)}</span>
                            </span>
                          </div>
                          <span className="text-lg font-bold">{el.name}</span>
                        </div>
                      </div>
                    ))}
                  </SliderWrapper>
                </div>
              ) : (
                <span className="text-lg font-bold text-indigo-600">You haven&apos;t added any cards yet</span>
              )}
              <div className="mt-2 flex w-full justify-between gap-3">
                <button
                  type="button"
                  className="pн-2 rounded-md border border-indigo-700 bg-indigo-50 px-2 py-2 transition-all hover:bg-indigo-800 hover:text-indigo-50"
                  onClick={() => setIsOpened("card")}
                >
                  Add new card
                </button>
                {cards.length > 0 && (
                  <button
                    type="button"
                    className="pн-2 flex-grow rounded-md border border-indigo-700 bg-indigo-700 px-2 py-2 text-indigo-50 transition-all hover:bg-indigo-800 hover:text-indigo-50"
                    onClick={handleCreateTransaction}
                  >
                    I want to add my transactions
                  </button>
                )}
              </div>
            </div>
            <div className="w-full">
              <div className="mt-6 flex w-full justify-center">
                {!spendings || spendings.length === 0 || cards.length === 0 ? (
                  <h3 className="text-xl font-bold">There is no spendings there</h3>
                ) : (
                  <section className="w-full bg-indigo-50 py-1 xl:mx-auto xl:w-8/12">
                    <div className="mx-auto mb-12 mt-24 w-full px-4 xl:mb-0 ">
                      <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg ">
                        <div className="mb-0 rounded-t border-0 px-4 py-3">
                          <div className="flex flex-wrap items-center">
                            <div className="relative w-full max-w-full flex-1 flex-grow px-4">
                              <h3 className="text-blueGray-700 text-base font-semibold">Your spendings</h3>
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

                        <div className="block max-h-[400px] w-full overflow-y-auto">
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
                                  Actions
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {spendings.map((spending) => (
                                <tr>
                                  <th className="text-blueGray-700 whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-left align-middle text-xs ">
                                    <span>{spending.name}</span>
                                  </th>
                                  <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs ">
                                    {spending.coast}
                                  </td>
                                  <td className="align-center whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-xs">
                                    {spending.shop.shopName}
                                  </td>
                                  <td className="align-center whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-xs">
                                    {moment(spending.date).format("L")}
                                  </td>
                                  <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                                    <div className="flex gap-2">
                                      <button
                                        type="button"
                                        className="rounded bg-red-400 px-3 py-2 text-indigo-50 transition-all hover:bg-red-500  "
                                        onClick={() => {
                                          handleSpendingDelete(spending.id as string);
                                        }}
                                      >
                                        Delete
                                      </button>
                                    </div>
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
          {isOpened === "card" && (
            <CreateCardModal
              setIsOpen={(e: boolean) => {
                setIsOpened(false);
              }}
            />
          )}
          {isOpened === "spending" && (
            <CreateSpendingModal
              setIsOpen={(e: boolean) => {
                setIsOpened(false);
              }}
              cardId={cards[selectedCardIndex].id}
            />
          )}
        </>
      </Content>
    </div>
  );
}

export default Cards;
