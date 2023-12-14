import { RadioGroup } from "@headlessui/react";
import { useState, useEffect } from "react";
import Card from "../Card";
import { orderBy } from "lodash";
import { ArrowLongUpIcon, ArrowLongDownIcon } from "@heroicons/react/24/solid";

//  компонент для отображения списка месяцев и фильтрации по выбранному месяцу
const months = [
  { name: "Январь", id: 0 },
  { name: "Февраль", id: 1 },
  { name: "Март", id: 2 },
  { name: "Апрель", id: 3 },
  { name: "Май", id: 4 },
  { name: "Июнь", id: 5 },
  { name: "Июль", id: 6 },
  { name: "Август", id: 7 },
  { name: "Сентябрь", id: 8 },
  { name: "Октябрь", id: 9 },
  { name: "Ноябрь", id: 10 },
  { name: "Декабрь", id: 11 },
];

const FilteredMonths = () => {
  //для хранения выбранного месяца и статуса фильтрации
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (selectedMonth) {
      fetch(
        `https://642ee23f2b883abc64198889.mockapi.io/purchases?month=${selectedMonth}`,
      )
        .then((response) => response.json())
        .then((data) => setItems(data))
        .catch((error) => console.log(error));
    } else {
      setItems([]);
    }
  }, [selectedMonth]);

  const sortAscending = () => {
    const sorted = orderBy(items, [(item) => new Date(item.date)]);
    setItems(sorted);
  };

  const sortDescending = () => {
    const sorted = orderBy(items, [(item) => new Date(item.date)], ["desc"]);
    setItems(sorted);
  };

  return (
    <div className="w-full px-4 py-16">
      {/* компонент для отображения списка месяцев */}
      <RadioGroup value={selectedMonth} onChange={setSelectedMonth}>
        <RadioGroup.Label className="sr-only">Выбрать месяц</RadioGroup.Label>
        <div className="max-w-xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-auto justify-center items-center">
          {/* отображаем каждый месяц*/}
          {months.map((month) => (
            <RadioGroup.Option
              key={month.id}
              value={month.name}
              className={({ active, checked }) =>
                `${
                  active
                    ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                    : ""
                }
              					 ${
                           checked
                             ? "bg-indigo-700 bg-opacity-75 text-white"
                             : "bg-white"
                         }
                						relative flex mb-5 cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex w-full items-center justify-center">
                    <div className="flex items-center">
                      <div className="text-lg font-source-sans-pro">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium ${
                            checked ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {month.name}
                        </RadioGroup.Label>
                      </div>
                    </div>
                    {checked && (
                      <div className="shrink-0 text-white">
                        <CheckIcon className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <div className="flex justify-center gap-2 mb-4">
        <button
          className="px-4 flex py-2 font-medium text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none"
          onClick={sortAscending}
        >
          Сортировать по дате <ArrowLongUpIcon className="w-6 h-6" />
        </button>
        <button
          className="px-4 flex py-2 font-medium text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none"
          onClick={sortDescending}
        >
          Сортировать по дате <ArrowLongDownIcon className="w-6 h-6" />
        </button>
      </div>
      {selectedMonth && (
        <div className="mt-8">
          <h2 className="text-xl text-center text-indigo-600 font-bold">
            Вы выбрали: "{selectedMonth}"
          </h2>
          {items
            .filter((item) => {
              const selectedMonthId = months.find(
                (m) => m.name === selectedMonth,
              ).id;
              const currentMonthId = new Date(item.date).getMonth();
              return currentMonthId === selectedMonthId;
            })
            .map((item) => (
              <Card item={item} key={item.id} />
            ))}
          {items.filter((item) => {
            const selectedMonthId = months.find(
              (m) => m.name === selectedMonth,
            ).id;
            const currentMonthId = new Date(item.date).getMonth();
            return currentMonthId === selectedMonthId;
          }).length === 0 && (
            <div className="text-center mt-8 text-gray-500">
              В выбранном месяце не было трат.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default FilteredMonths;
