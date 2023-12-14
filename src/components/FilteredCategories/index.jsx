import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import Card from "../Card";

function FilteredCategories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
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

      {items.map((item) => (
        <Card item={item} key={item.id} />
      ))}
    </>
  );
}

export default FilteredCategories;
