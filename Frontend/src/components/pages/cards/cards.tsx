/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Close from "images/icons/close.png";
import getCardsThunk from "@/store/thunks/cardThunk";
import SliderWrapper from "@/elements/slider/slider";
import Slider, { Settings } from "react-slick";
import { AccountModel } from "@/types/models";
import getAccountsThunk, { deleteAccountThunk } from "@/store/thunks/account/accountThunk";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store/store";
import styles from "./cards.module.scss";
import "./overrides.scss";
import { SpendingReportDto } from "../../../types/User/Spending/spending";
import { IconButton } from "rsuite";
import CreateAccountModal from "../../modals/createAccountModal";
import UpdateAccountModal from "@/components/modals/updateAccountModal";
import { getCategories } from "@/store/thunks/category/categoryThunk";

function Accounts() {
  const dispatch: AppDispatch = useDispatch();
  const [error, setError] = useState("");
  const { accounts, category } = useSelector<RootState, RootState>((state) => state);

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const navigate = useNavigate();

  const [orderBy, setOrderBy] = useState("date");
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [beginDate, setBeginDate] = useState<string>(moment().subtract("days", 7).format("MM-DD-YYYY"));

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [editId, setEditable] = useState("");
  const [newBalance, setNewBalance] = useState(0);

  useEffect(() => {
    dispatch(getAccountsThunk());
    dispatch(getCategories());
  }, []);

  const handleStartEdit = (e: string) => {
    setIsEditOpen(true);
    setEditable(e);
  };

  const cancelEdit = () => {
    setNewBalance(0);
    setEditable(-1);
  };

  // const handleFinishEdit = async () => {
  //   await dispatch(
  //     updateCardThunk({
  //       setError,
  //       value: { id: cards[selectedCardIndex].id, balance: newBalance },
  //     })
  //   );

  //   dispatch(getCardsThunk({ setError }));
  //   cancelEdit();
  // };

  const handleDelete = async (el: AccountModel) => {
    await dispatch(deleteAccountThunk(el.id));
  };
  //   dispatch(getCardsThunk({ setError }));
  //   setSelectedCardIndex((prev) => prev - 1);
  // };

  const handleSpendingDelete = async (id: string) => {
    // await dispatch(deleteSpendingThunk(id));
  };

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

  // useEffect(() => {
  //   const card = cards[selectedCardIndex];
  //   if (card && card?.id) {
  //     dispatch(
  //       getSpendingThunk({
  //         cardId: card.id,
  //         setError,
  //         orderBy,
  //         beginDate,
  //       })
  //     );
  //   }
  // }, [selectedCardIndex, orderBy, beginDate, cards]);

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
  };

  const handleCreateTransaction = () => {
    // setIsOpened("spending");
    // setSpendingModalState({ mode: "create", editableModel: {} });
    navigate("/operations");
  };

  useEffect(() => {}, [selectedCardIndex]);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const handleAfterChange = (currentSlide: number) => {
    setActiveSlide(currentSlide);
  };

  const sliderSettings: Settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 20000,
    pauseOnHover: true,
    afterChange: handleAfterChange,
  };

  return (
    <div className={`${styles.login_wrapper} flex w-full `}>
      <div className="mt-2 flex w-full flex-col items-center md:mt-10 ">
        <div className="">
          {accounts.length > 0 ? (
            <div className=" mx-0 w-[22rem] pl-4 md:w-96 md:pl-0">
              <SliderWrapper settings={sliderSettings} ref={sliderRef}>
                {accounts.map((el, index) => (
                  <div
                    className={`relative h-48 rounded-xl border border-opacity-95 px-4 ${colors[index]}  mx-auto
                      bg-gradient-to-r from-indigo-800 to-indigo-500`}
                  >
                    <div
                      className="absolute top-1 right-1 flex h-7 w-7 items-center justify-center rounded-full transition-all hover:bg-indigo-400"
                      onClick={() => handleDelete(el)}
                    >
                      <div className="relative flex items-center">
                        <img src={Close} width={14} height={14} alt="close" />
                      </div>
                    </div>
                    <div className="mx-4 flex h-full flex-col justify-evenly ">
                      <div className="flex flex-col">
                        <div>
                          <span>
                            {!isEditOpen ? (
                              <>
                                <span className="pr-2 text-xl font-bold">{el.balance}</span>
                                <span className="text-sm">BYN</span>
                                <button
                                  type="button"
                                  onClick={() => handleStartEdit(el.id)}
                                  className={`bg-transparent px-2 opacity-40 transition-all hover:opacity-80 ${styles.edit_button}`}
                                >
                                  Изменить
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
                                  Сохранить
                                </button>
                                <button
                                  type="button"
                                  className={`bg-transparent px-2 opacity-40 transition-all hover:opacity-80 ${styles.edit_button}`}
                                  onClick={() => cancelEdit()}
                                >
                                  Отменить
                                </button>
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flex w-full justify-between">
                        <span className="mx-auto text-center text-xl font-bold">
                          <span className="px-1 tracking-wide">{el.name}</span>
                        </span>
                      </div>
                      <div className="flex justify-end">
                        <span className="flex text-lg font-bold">
                          <IconButton
                            icon={<span className={` material-symbols-outlined`}>{el.iconName}</span>}
                            circle
                            ripple={false}
                            appearance="primary"
                            color={el.iconColor}
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            size="xs"
                          />
                        </span>
                      </div>{" "}
                    </div>
                  </div>
                ))}
              </SliderWrapper>
            </div>
          ) : (
            <span className="text-lg font-bold text-indigo-600">Вы пока не добавили никаких счетов</span>
          )}
          <div className="mt-2 flex w-full justify-between gap-3">
            <button
              type="button"
              className="pн-2 rounded-md border border-indigo-700 bg-indigo-50 px-2 py-2 transition-all hover:bg-indigo-800 hover:text-indigo-50"
              onClick={() => setIsOpened("card")}
            >
              Добавить новый счет
            </button>
            {accounts.length > 0 && (
              <button
                type="button"
                className="pн-2 flex-grow rounded-md border border-indigo-700 bg-indigo-700 px-2 py-2 text-indigo-50 transition-all hover:bg-indigo-800 hover:text-indigo-50"
                onClick={handleCreateTransaction}
              >
                Я хочу добавить транзакции
              </button>
            )}
          </div>
        </div>
        <div className="w-full">
          <div className="mt-6 flex w-full justify-center">
            {!accounts[activeSlide] || accounts[activeSlide]?.operations?.length === 0 ? (
              <h3 className="text-xl font-bold">Трат пока нет</h3>
            ) : (
              <section className="w-full bg-indigo-50 py-1 xl:mx-auto xl:w-8/12">
                <div className="mx-auto mb-12 mt-24 w-full px-4 xl:mb-0 ">
                  <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg ">
                    <div className="mb-0 rounded-t border-0 px-4 py-3">
                      <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-1 flex-grow px-4">
                          <h3 className="text-blueGray-700 text-base font-semibold">Ваши траты</h3>
                        </div>
                        <div className="relative w-full max-w-full flex-1 flex-grow px-4 text-right">
                          <button
                            className="mr-1 mb-1 rounded bg-indigo-500 px-3 py-1 text-xs font-bold uppercase text-white outline-none transition-all duration-150 ease-linear focus:outline-none active:bg-indigo-600"
                            type="button"
                          >
                            Посмотреть все
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="block max-h-[400px] w-full overflow-y-auto">
                      <table className="w-full border-collapse items-center bg-transparent ">
                        <thead>
                          <tr>
                            <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                              Тип
                            </th>
                            <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                              Стоимость
                            </th>
                            <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                              Дата транзакции
                            </th>
                            <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                              Категория
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {accounts[activeSlide]?.operations?.map((operation) => (
                            <tr>
                              <th className="text-blueGray-700 whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-left align-middle text-xs ">
                                <span>{operation.type === "Expense" ? "Траты" : "Доходы"}</span>
                              </th>
                              <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs ">
                                {operation.value} BYN
                              </td>
                              <td className="align-center whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-xs">
                                {moment(operation.createdDate).format("L")}
                              </td>
                              <td className="gap-2 whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                                <IconButton
                                  icon={
                                    <span className={` material-symbols-outlined`}>
                                      {
                                        category
                                          .flatMap((x) => x.subcategories)
                                          .find((x) => x.id === operation.subCategoryId)?.icon
                                      }
                                    </span>
                                  }
                                  circle
                                  ripple={false}
                                  appearance="primary"
                                  color={
                                    category
                                      .flatMap((x) => x.subcategories)
                                      .find((x) => x.id === operation.subCategoryId)?.color
                                  }
                                  onClick={(e) => {
                                    e.preventDefault();
                                  }}
                                  size="xs"
                                />
                                <span className="pl-2">
                                  {
                                    category
                                      .flatMap((x) => x.subcategories)
                                      .find((x) => x.id === operation.subCategoryId)?.name
                                  }
                                </span>
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
      <CreateAccountModal
        setIsOpen={(e: boolean) => {
          setIsOpened(false);
        }}
        isOpen={isOpened}
      />

      <UpdateAccountModal isOpen={isEditOpen} setIsOpen={(e) => setIsEditOpen(e)} id={editId} />
      {/* {isOpened === "spending" && (
            <CreateSpendingModal
              setIsOpen={(e: boolean) => {
                setIsOpened(false);
              }}
              cardId={accounts[selectedCardIndex].id}
            />
          )} */}
    </div>
  );
}

export default Accounts;
