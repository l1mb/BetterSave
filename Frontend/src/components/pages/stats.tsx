import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyResponsivePie from "../../elements/pieDiag/pie";
import { AppDispatch, RootState } from "../../store/store";
import getCardsThunk from "../../store/thunks/cardThunk";
import getSpendingThunk from "../../store/thunks/spendingThunks";
import { SpendingReportDto } from "../../types/User/Spending/spending";
import { SpendingShopItemCategory } from "../../types/User/Spending/SpendingShopItemCategory";

function Stats() {
  const spendings = useSelector<RootState, SpendingReportDto[]>((state) => state.spending);

  const dispatch: AppDispatch = useDispatch();
  const { cards, spending } = useSelector<RootState, RootState>((state) => state);

  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  const [data, setData] = useState<Array<{ id: string; label: string; value: number; color: string }>>([]);
  const colors = [
    "hsl(200, 70%, 50%)",
    "hsl(21, 70%, 50%)",
    "hsl(103, 70%, 50%)",
    "hsl(320, 70%, 50%)",
    "hsl(320, 70%, 50%)",
    "hsl(240, 70%, 50%)",
    "hsl(200, 70%, 50%)",
  ];

  useEffect(() => {
    dispatch(
      getCardsThunk({
        setError: () => {
          console.log();
        },
      })
    );
  }, []);

  useEffect(() => {
    const card = cards.cards[selectedCardIndex];
    if (card && card?.id) {
      dispatch(
        getSpendingThunk({
          cardId: card.id,
          beginDate: "1990-01-01",
        })
      );
    }
  }, [selectedCardIndex, cards]);

  function getRandom(list: string[]) {
    return list[Math.floor(Math.random() * list.length)];
  }

  // const spendingData = _.mapValues(_.groupBy(spendings, ))

  const generateData = () => {
    if (spendings.length === 0) {
      return;
    }
    const t = spendings.map((item) => [...item.shopItems])[0];
    const result: Array<{ categoryName: string; price: number }> = [];
    const t2 = t?.reduce(
      (res: { [key: string]: { categoryName: string; price: number } }, value: SpendingShopItemCategory) => {
        // console.log(res, value);
        if (!res[value.categoryName]) {
          res[value.categoryName] = {
            categoryName: value.categoryName,
            price: 0,
          };
          result.push(res[value.categoryName]);
        }
        res[value.categoryName].price += value.price;

        return res;
      },
      {}
    );

    const w = result.map((n) => ({
      id: n.categoryName,
      label: n.categoryName,
      value: n.price,
      color: getRandom(colors),
    }));
    setData(w);
  };
  useEffect(() => {
    generateData();
  }, [spendings]);

  const handleCardClick = (index: number) => {
    setSelectedCardIndex(index);
  };

  return (
    <div className="h-screen w-full">
      <div className="h-full w-full">
        <div className="mx-auto my-auto h-1/2 w-1/2">
          <div className="flex justify-between gap-10">
            <div />
            <span>
              {spendings.length === 0 ? (
                <div className="mt-16">
                  <h2>Вы пока не добавили никаких данных о своих тратах</h2>
                  <Link to="/cards">Вы можете добавить их здесь</Link>
                </div>
              ) : (
                <div className="flex h-[600px] w-[600px]">
                  <MyResponsivePie data={data} />
                </div>
              )}
            </span>
            <div className="mt-20 max-h-80 w-52 overflow-x-auto rounded border-2 p-6">
              {cards.cards.map((card, index) => (
                <button
                  type="button"
                  onClick={() => handleCardClick(index)}
                  key={card.id}
                  className="flex w-full  flex-col rounded border-b-2 bg-white p-2 pb-2 transition hover:cursor-pointer hover:bg-slate-50
                "
                >
                  <span className="text-lg font-bold">{card.name}</span>
                  <span>
                    {card.balance} {card.currency}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
