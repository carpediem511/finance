import Header from "components/Header";
import "./styles.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import RecentPurchases from "components/RecentPurchases";
import ExpensesForm from "components/Form";
import FilteredMonths from "components/FilteredMonths";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FilteredCategories from "components/FilteredCategories";
import { sortBy } from "lodash";

function App() {
	const [purchases, setPurchases] = useState([
		{
			id: uuidv4(),
			date: new Date(2023, 4, 10),
			category: "Здоровье",
			image: "icon-helth.png",
			price: 11678,
		},
		{
			id: uuidv4(),
			date: new Date(2023, 5, 22),
			category: "Накопления",
			image: "icon-finance.png",
			price: 15100,
		},
		{
			id: uuidv4(),
			date: new Date(2023, 6, 3),
			category: "Образование",
			image: "icon-education.png",
			price: 29600,
		},
		{
			id: uuidv4(),
			date: new Date(2023, 7, 1),
			category: "Продукты",
			image: "icon-groceries.png",
			price: 23456,
		},
		{
			id: uuidv4(),
			date: new Date(2023, 9, 15),
			category: "Путешествия",
			image: "icon-travel.png",
			price: 120000,
		},
		{
			id: uuidv4(),
			date: new Date(2023, 10, 10),
			category: "Развлечения",
			image: "icon-entertainment.png",
			price: 3700,
		},
	]);

	const addNewSpending = (purchase) => {
		setPurchases([...purchases, purchase]);
	};

	const sortedPurchases = sortBy([...purchases], ["date"]);

	return (
		<>
			<BrowserRouter>
				<Header />

				<Routes>
					<Route
						path="/"
						element={
							<div className="flex flex-col md:flex-row mt-10 md:pl-28">
								<h1 className="font-['Caveat'] w-full md:w-1/2 pt-10 text-4xl md:text-8xl text-indigo-700 justify-center md:pl-28">
									Деньги работают на Вас вместе с нами!
								</h1>
								<img
									src="./images/hero.png"
									className="w-full md:w-1/2 mt-5 md:mt-0"
									alt=""
								/>
							</div>
						}
					/>

					<Route
						path="/recentExpenses"
						element={
							<div className="flex flex-col md:justify-evenly md:px-5 md:mt-20">
								<ExpensesForm addNewSpending={addNewSpending} />

								<div className="w-full max-w-xl mx-auto bg-indigo-200 rounded-xl px-4 my-10 pb-8 overflow-auto shadow-md">
									<h2 className="text-center font-Caveat text-4xl pt-8 pb-8">
										Последние операции:
									</h2>
									{sortedPurchases.map((purchase) => (
										<RecentPurchases
											purchase={purchase}
											purchases={purchases}
											key={purchase.id}
										/>
									))}
								</div>
							</div>
						}
					/>

					<Route path="/expensesByMonth" element={<FilteredMonths />} />
					<Route
						path="/expensesByCategories"
						element={<FilteredCategories />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
