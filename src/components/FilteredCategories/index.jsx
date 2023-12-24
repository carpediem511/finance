import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import Card from "../Card";
import { ArrowLongUpIcon, ArrowLongDownIcon } from "@heroicons/react/24/solid";

const categories = [
  {
    name: "Здоровье",
    id: 0,
  },
  {
    name: "Накопления",
    id: 1,
  },
  {
    name: "Образование",
    id: 2,
  },
  {
    name: "Продукты",
    id: 3,
  },
  {
    name: "Путешествия",
    id: 4,
  },
  {
    name: "Развлечения",
    id: 5,
  },
];

function FilteredCategories() {
  const [selectedCategory, setSelectedCategory] = useState(null); // Состояние для выбранной категории
  const [items, setItems] = useState([]); // Состояние для отфильтрованных элементов в выбранной категории
  const [sortOrder, setSortOrder] = useState(null); // Состояние для порядка сортировки

  useEffect(() => {
    // Эффект для загрузки данных при изменении выбранной категории
    if (selectedCategory) {
      fetch(
        `https://642ee23f2b883abc64198889.mockapi.io/purchases?category=${selectedCategory}`,
      )
        .then((response) => response.json())
        .then((data) => setItems(data))
        .catch((error) => console.log(error));
    } else {
      setItems([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (sortOrder) {
      setItems((prevItems) => {
        // Создаем копию массива элементов для безопасной сортировки
        const sortedItems = [...prevItems].sort((a, b) => {
          // Если порядок сортировки 'ascending', сортируем по возрастанию даты
          if (sortOrder === "ascending") {
            return new Date(a.date) - new Date(b.date);
          } else if (sortOrder === "descending") {
            return new Date(b.date) - new Date(a.date);
          }
          return 0; // Возвращаем 0, если порядок не указан или некорректен
        });
        return sortedItems;
      });
    }
  }, [sortOrder]);

  const sortAscending = () => {
    // Функция для установки порядка сортировки в возрастающем порядке
    setSortOrder("ascending");
  };

  const sortDescending = () => {
    // Функция для установки порядка сортировки в убывающем порядке
    setSortOrder("descending");
  };

  return (
    <>
      <Tab.Group>
        <Tab.List className="flex w-full md:w-1/3 mt-5 md:mt-10 justify-evenly flex-wrap mx-auto mb-5 border-b-2">
          {categories.map((category) => (
            <Tab
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={({ selected }) =>
                selected ? "bg-indigo-700 bg-opacity-75 text-white" : "bg-white"
              }
            >
              <div className="text-lg font-source-sans-pro py-2 px-2 focus:bg-slate-200">
                {category.name}
              </div>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {categories.map((category) => (
            <Tab.Panel key={category.id} className="mt-8 px-2">
              {selectedCategory === category.name && (
                <div>
                  <h2 className="text-xl text-center text-indigo-600 font-bold">
                    Вы выбрали: "{selectedCategory}"
                  </h2>
                  <div className="w-full md:w-1/3 mx-auto"></div>
                  <div className="mt-4 p-2 w-full md:w-1/3 mx-auto bg-white rounded-md font-source-sans-pro">
                    <div className="flex justify-between border-b-2 py-3 px-4 font-semibold">
                      <div className="text-red-600 text-xl font-bold">
                        Итого:
                      </div>
                      <div className="text-red-600 text-xl font-bold">
                        {items.reduce((total, item) => total + item.price, 0)}{" "}
                        руб.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      <div className="flex justify-center gap-2 mb-4">
        <button
          className="px-4 flex py-2 font-medium text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none"
          onClick={sortAscending}
        >
          Сортировать с начала года <ArrowLongUpIcon className="w-6 h-6" />
        </button>
        <button
          className="px-4 flex py-2 font-medium text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none"
          onClick={sortDescending}
        >
          Сортировать с конца года <ArrowLongDownIcon className="w-6 h-6" />
        </button>
      </div>
      {items.map((item) => (
        <Card item={item} key={item.id} />
      ))}
    </>
  );
}

export default FilteredCategories;
