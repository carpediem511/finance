function ButtonAdd({ title, AddPurchaseFunction, type }) {
  return (
    <button
      onClick={(event) => AddPurchaseFunction(event)}
      type={type}
      className="w-1/4  md:my-10 shadow-md px-2 py-2 justify-center flex mx-auto duration-300 cursor-pointer text-lg font-medium border border-sky-700 rounded-lg text-slate-50 bg-emerald-500 hover:bg-emerald-600"
    >
      {title}
    </button>
  );
}

export default ButtonAdd;
