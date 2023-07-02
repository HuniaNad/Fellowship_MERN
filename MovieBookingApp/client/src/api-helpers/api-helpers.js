import axios from 'axios'

export const getAllMovies = async () => {
    try{
        const res = await axios.get('http://localhost:5000/movie')
        console.log(res)

        if(res.status === 404){
            return console.log("No Data")
        }

        const data = await res.data
        return data

    }catch(err){
        console.log(err)
    }
}