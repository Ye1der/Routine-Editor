import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { contextGlobal } from "../../Context/Context";
import { BiSearchAlt } from "react-icons/bi";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { GiMeal } from "react-icons/gi";
import { getFood } from "../../firebase/firebase";

export function Food() {
  const { searchFood } = useContext(contextGlobal);
  const [alimentos, setAlimentos] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const data = await getFood(searchFood, page);
      setAlimentos(data);
    }

    fetchData();
  }, [searchFood, page]);

  if (searchFood == "") {
    return (
      <div className="h-full w-full flex justify-center">
        <motion.div
          className="flex flex-col items-center mt-[13%]"
          initial={{ y: 200, scale: 0 }}
          animate={{ y: 0, scale: 1 }}
        >
          <h1 className="text-white text-opacity-30 font-bold text-2xl">
            {" "}
            ¡Busca alimentos!{" "}
          </h1>
          <h1>
            <BiSearchAlt className="text-[100px] text-white font-bold text-opacity-30 mt-4" />
          </h1>
        </motion.div>
      </div>
    );
  }

  function paginacion(operator) {
    operator == "suma" && alimentos.length > 0 && setPage(page + 1);
    operator == "resta" && page > 0 && setPage(page - 1);
  }

  return (
    <main className="flex flex-col items-center w-full h-full">
      <div className="flex flex-wrap justify-center w-full max-h-[92%] overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-grayGym scrollbar-thumb-rounded-full">
        {alimentos.length > 0 &&
          alimentos.map((alimento, index) => {
            return (
              <motion.div
                className="relative text-white bg-grayGym rounded-2xl pb-4 w-52 m-4"
                key={index}
                initial={{ y: -500 }}
                animate={{ y: 0 }}
              >
                <h1 className="absolute right-2 bottom-1 text-white text-opacity-20 font-bold">
                  {" "}
                  100 g{" "}
                </h1>
                <h1 className="font-bold text-2xl ml-3 mt-3 text-yellow-600">
                  {" "}
                  {alimento.nombre}{" "}
                </h1>

                <div className="text-xl ml-3 mt-2 text-white text-opacity-60 font-bold">
                  <h2>Calorias: {alimento.calorias} kcal</h2>
                  <h2>Proteina: {alimento.proteinas} g </h2>
                  <h2>Grasas: {alimento.grasas} g </h2>
                  <h2>Carbos: {alimento.carbohidratos} g</h2>
                </div>
              </motion.div>
            );
          })}

        {alimentos.length == 0 && (
          <motion.div
            className="flex flex-col items-center mt-[13%] absolute"
            initial={{ y: 200, scale: 0 }}
            animate={{ y: 0, scale: 1 }}
          >
            <h1>
              <GiMeal className="text-[120px] text-white font-bold text-opacity-30" />
            </h1>
            <h1 className="text-white text-opacity-30 font-bold text-3xl">
              ...
            </h1>
          </motion.div>
        )}
      </div>

      <motion.div
        className="absolute bottom-0 w-full my-2 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <button
          onClick={() => {
            paginacion("resta");
          }}
        >
          {" "}
          <BsFillArrowRightCircleFill className="text-2xl mx-3 -scale-x-100 text-[#303030] hover:text-yellow-600 transition-all duration-300" />{" "}
        </button>
        <h1 className="text-xl font-bold text-yellow-500 mx-3 cursor-default">
          {" "}
          {page + 1}{" "}
        </h1>
        <button
          onClick={() => {
            paginacion("suma");
          }}
        >
          {" "}
          <BsFillArrowRightCircleFill className="text-2xl mx-3 text-[#303030] hover:text-yellow-600 transition-all duration-300" />{" "}
        </button>
      </motion.div>
    </main>
  );
}
