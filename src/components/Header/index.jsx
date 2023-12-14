import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className=" px-2 flex flex-col md:flex-row justify-around py-6 bg-indigo-700">
        <Link
          to="/"
          className="text-xl text-indigo-50 font-bold hover:text-amber-500 my-2 md:my-0"
        >
          Главная страница
        </Link>
        <Link
          to="/recentExpenses"
          className="text-xl text-indigo-50 font-bold hover:text-amber-500 my-2 md:my-0"
        >
          Последние операции/добавить новую покупку
        </Link>
        <Link
          to="/expensesByMonth"
          className="text-xl text-indigo-50 font-bold hover:text-amber-500 my-2 md:my-0"
        >
          Расходы по месяцам
        </Link>
        <Link
          to="/expensesByCategories"
          className="text-xl text-indigo-50 font-bold hover:text-amber-500 my-2 md:my-0"
        >
          Расходы по категориям
        </Link>
      </div>
    </>
  );
};

export default Header;
