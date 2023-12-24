import { RadioGroup } from "@headlessui/react";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#4FD1C5",
  "#38A169",
  "#E53E3E",
  "#6B46C1",
  "#FFC43D",
  "#805AD5",
];

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

const FilteredMonths = ({ purchases }) => {
  // Состояния для хранения выбранного месяца, отфильтрованных данных, общих расходов и данных для диаграммы
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [items, setItems] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [chartData, setChartData] = useState([]);

  // Эффект для фильтрации данных по выбранному месяцу
  useEffect(() => {
    if (selectedMonth) {
      fetch(`https://642ee23f2b883abc64198889.mockapi.io/purchases`)
        .then((response) => response.json())
        .then((data) => {
          const filteredData = data.filter(
            (item) =>
              new Date(item.date).getMonth() ===
              months.find((m) => m.name === selectedMonth).id,
          );
          setItems(filteredData);

          const monthlyGroupedByCategory = {};
          filteredData.forEach((purchase) => {
            if (monthlyGroupedByCategory[purchase.category]) {
              monthlyGroupedByCategory[purchase.category] += purchase.price;
            } else {
              monthlyGroupedByCategory[purchase.category] = purchase.price;
            }
          });

          const dataForPieChart = Object.keys(monthlyGroupedByCategory).map(
            (category) => ({
              name: category,
              value: monthlyGroupedByCategory[category],
              legendLabel: `${category} - ${monthlyGroupedByCategory[category]} руб.`,
            }),
          );

          const sumForSelectedMonth = Object.values(
            monthlyGroupedByCategory,
          ).reduce((acc, value) => acc + value, 0);
          setTotalExpenses(sumForSelectedMonth);

          setChartData(dataForPieChart);
        })
        .catch((error) => console.log(error));
    } else {
      setItems([]);
      setChartData([]); // Очищаем данные диаграммы, если месяц не выбран
    }
  }, [selectedMonth]);

  const groupedByCategory = {};
  purchases.forEach((purchase) => {
    if (groupedByCategory[purchase.category]) {
      groupedByCategory[purchase.category] += purchase.price;
    } else {
      groupedByCategory[purchase.category] = purchase.price;
    }
  });

  const dataForPieChart = Object.keys(groupedByCategory).map((category) => ({
    name: category,
    value: groupedByCategory[category],
    legendLabel: `${category} - ${groupedByCategory[category]} руб.`,
  }));

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
                    ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-300"
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

      {selectedMonth && items.length > 0 && (
        <>
          <h2 className="text-xl text-center text-indigo-600 font-bold mt-10">
            Ваши траты за "{selectedMonth.toLowerCase()}": {totalExpenses} руб.
          </h2>
          <div className="flex flex-row justify-center items-center">
            <PieChart width={400} height={400}>
              <Pie
                data={chartData}
                cx={200}
                cy={200}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                align="left"
              >
                {dataForPieChart.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                formatter={(value, entry) => entry.payload.legendLabel}
                align="right"
                verticalAlign="middle"
                layout="vertical"
                wrapperStyle={{
                  top: 100,
                  right: -180,
                  backgroundColor: "#F3F4F6",
                  border: "1px solid #d5d5d5",
                  borderRadius: 3,
                  lineHeight: "40px",
                  padding: "10px",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
            </PieChart>
          </div>
        </>
      )}

      {selectedMonth && items.length === 0 && (
        <h2 className="text-xl text-center text-gray-500 font-bold">
          В выбранном месяце не было трат.
        </h2>
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
