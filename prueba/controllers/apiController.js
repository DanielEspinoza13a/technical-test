const axios = require('axios').default

module.exports.people = async (req, res) =>{

    const {sortBy} = req.query

    let url_people = 'https://swapi.dev/api/people/'
    let emptyArray = []

    try{

        while(url_people) {

            const people = await axios.default.get(url_people)

            const data = people.data.results

            emptyArray.push(...data)
            url_people = people.data.next

        }

        emptyArray.sort((a,b) => {
            if (a[sortBy] > b[sortBy]) {
                return 1;
            }
            if (a[sortBy] < b[sortBy]) {
                return -1;
            }
            return 0;
        })

        return res.status(200).json(emptyArray)

    }catch (error) {
            
        return res.status(500).send({ message: `${error}` })
    }

}

module.exports.planets = async (req, res) => {

    try{

        let url_planets = 'https://swapi.dev/api/planets/'
        let emptyArray = []


        while(url_planets){
            const planets = await axios.default.get(url_planets)
            const data = planets.data.results

        
            const newArray = await Promise.all(data.map(async(element) => {
                element.residents = await Promise.all(element.residents.map(async(i) => {
                    const population = await axios.default.get(i)
                    return population.data.name
                
                }))
                return element
            }))
        emptyArray.push(...newArray)
        url_planets = planets.data.next
        }
               
        return res.json(emptyArray)


    }catch (error) {
            
        return res.status(500).send({ message: `${error}` })
    }

}