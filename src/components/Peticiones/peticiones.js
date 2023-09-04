export async function Peticiones(food, page){
  const data = await fetch(`http://localhost:3000/main?food=${food}&page=${page}`)
  const dataJson = await data.json()
  return dataJson
}