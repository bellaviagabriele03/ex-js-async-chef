// In questo esercizio, utilizzerai async / await per creare la funzione 
// getChefBirthday(id).Questa funzione accetta un id di una ricetta e deve:
// Recuperare la ricetta da https://dummyjson.com/recipes/{id}
// Estrarre la proprietà userId dalla ricetta
// Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
// Restituire la data di nascita dello chef
// Note del docente
// Scrivi la funzione getChefBirthday(id), che deve:
// Essere asincrona(async).
// Utilizzare await per chiamare le API.
// Restituire una Promise con la data di nascita dello chef.
// Gestire gli errori con try/catch


//funzione di supporto per prendere l'oggetto dal mio resolve della promise
async function fetchTransform(url) {
    const response = await fetch(url)
    const obj = await response.json();
    return obj
}






async function getChefBirthday(id) {


    let recipe;

    try {
        recipe = await fetchTransform(`https://dummyjson.com/recipe/${id}`)
    } catch (error) {
        throw new Error(`non riesco a trovare la ricetta !`)
    }

    if (recipe.message) {
        throw new Error(recipe.message)
    }


    let user;

    try {
        user = await fetchTransform(`https://dummyjson.com/users/${recipe.userId}`)
    } catch (error) {
        throw new Error("non riesco a trovare l'utente !")
    }

    if (user.message) {
        throw new Error(`Id dell'utente non trovato !`)
    }

    return user.birthDate
}




(async () => {


    try {
        const chefBirthDay = await getChefBirthday(1)
        console.log("data di nascita dello chef:", chefBirthDay)
    } catch (error) {
        console.error(error);

    }

    console.log("funziono anche fin qui !");
})()



