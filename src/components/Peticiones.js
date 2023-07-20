// API Key: 782fe7189c1e4c129d5929acb231c1b5

// API Buscar codigo de alimento: 
// https://api.spoonacular.com/food/ingredients/autocomplete?query={Nombre del alimento}&number={Numero de alimentos que retorna}&metaInformation=true&apiKey=782fe7189c1e4c129d5929acb231c1b5

// API Buscar valor nutricional con el codigo del alimento: 
// https://api.spoonacular.com/food/ingredients/{Id del alimento}/information?amount=1

export async function peticiones(busqueda){
    const respuesta = await fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${busqueda}&number=15&metaInformation=true&apiKey=782fe7189c1e4c129d5929acb231c1b5`)
    return respuesta;
}

export async function macrosPeticion(codigo){
    const res = await fetch(`https://api.spoonacular.com/food/ingredients/${codigo}/information?amount=100&unit=grams&apiKey=782fe7189c1e4c129d5929acb231c1b5`)
    return res; 
} 