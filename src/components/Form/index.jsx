import ButtonAdd from "components/Buttons/ButtonAdd";
import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import Error from "components/Error";
import ru from "date-fns/locale/ru";

const categories = [
	{ value: "health", label: "Здоровье", image: "icon-helth.png" },
	{ value: "finance", label: "Накопления", image: "icon-finance.png" },
	{ value: "education", label: "Образование", image: "icon-education.png" },
	{ value: "products", label: "Продукты", image: "icon-groceries.png" },
	{ value: "travel", label: "Путешествия", image: "icon-travel.png" },
	{
		value: "entertainment",
		label: "Развлечения",
		image: "icon-entertainment.png",
	},
];

const ExpensesForm = ({ addNewSpending }) => {
	const [enterAmount, setEnterAmount] = useState("");
	const [chooseCategory, setChooseCategory] = useState(categories[0]);
	const [startDate, setStartDate] = useState();
	let [isOpen, setIsOpen] = useState(false);

	const AddPurchaseFunction = (event) => {
		event.preventDefault();

		// проверка на обязательное заполнение всех полей
		if (chooseCategory && startDate && enterAmount) {
			const purchase = {
				category: chooseCategory.label,
				price: enterAmount,
				date: startDate,
				id: uuidv4(),
				image: chooseCategory.image,
			};

			addNewSpending(purchase);
			setChooseCategory(categories[0]);
			setEnterAmount("");
			setStartDate(null);
			setIsOpen(false);
		} else {
			setIsOpen(true);
			return;
		}
	};

	return (
		<>
			<form onSubmit={AddPurchaseFunction} className="w-full px-4 my-1 mx-auto">
				<div className="my-8 flex flex-col gap-y-4">
					<h2 className="text-4xl pt-4 pb-8 text-center font-['Caveat']">
						Добавить новую покупку
					</h2>

					<div className="px-4 flex flex-col md:flex-row gap-x-4 justify-around">
						<div className="flex flex-col text-lg font-medium w-full md:w-1/3">
							<label className="font-semibold text-center text-indigo-600">
								Выбрать категорию
							</label>
							<Select
								options={categories}
								value={chooseCategory}
								onChange={(category) => setChooseCategory(category)}
								className="mt-3 mx-auto py-3 w-2/3 md:w-full focus:border-2 rounded-md"
							/>
						</div>
						<div className="flex flex-col text-lg font-medium w-full md:w-1/3">
							<label className="font-semibold mt-4 mb-1 text-center text-indigo-600">
								Выбрать месяц покупки
							</label>
							<DatePicker
								selected={startDate}
								onChange={(date) => setStartDate(date)}
								locale={ru}
								dateFormat="dd.MM.yyyy"
								isClearable
								placeholderText="	Пока здесь пусто"
								className="border flex mx-auto mt-1 border-solid rounded-md outline-none border-gray-300 px-2 py-2 focus:border-2 focus:border-sky-500"
							/>
						</div>

						<div className="mb-1 flex flex-col text-lg font-medium w-full md:w-1/3">
							<label className="font-semibold mb-1 mt-4 text-center text-indigo-600">
								Ввести потраченную сумму
							</label>
							<input
								name="enterAmount"
								value={enterAmount}
								onChange={(event) => {
									const value = event.target.value;
									// ограничение ввода только цифрами
									const pattern = /^[0-9]{1,9}$/;
									if (pattern.test(value)) {
										setEnterAmount(value);
									}
								}}
								type="text"
								className="border pl-2 mt-1 border-solid rounded-md outline-none border-gray-300 mx-auto py-2 focus:border-2 focus:border-sky-500"
							/>
						</div>
					</div>
					<ButtonAdd
						title="Добавить"
						type="submit"
						AddPurchaseFunction={AddPurchaseFunction}
					/>
					<Error isOpen={isOpen} setIsOpen={setIsOpen} />
				</div>
			</form>
		</>
	);
};

export default ExpensesForm;
