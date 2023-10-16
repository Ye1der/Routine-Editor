export async function Peticiones(food, page){
  const data = await fetch(`https://food-api-7g6u.onrender.com/main?food=${food}&page=${page}`)
  const dataJson = await data.json()
  return dataJson
}