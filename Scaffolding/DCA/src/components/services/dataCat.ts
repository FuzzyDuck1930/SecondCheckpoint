export const getDatCat = async() => {
    try {
        const dataCat = await fetch('https://cataas.com/cat').then(res => res.json());
        console.log(dataCat.results);
        return dataCat.results;

    } catch (error) {  
        console.log(error);
    }
}

export const getDatFact = async() => {
    try {
        const dataFact = await fetch('https://catfact.ninja/fact').then(res => res.json());
        console.log(dataFact.results);
        return dataFact.results;
        
    } catch (error) {  
        console.log(error);
    }
}