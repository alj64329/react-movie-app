const thisYear = new Date().getFullYear()
export function slotMovie(genreIds, yearOne, yearTwo){
        const yearEnd = yearTwo?yearTwo:thisYear
        const randomYear = yearOne?Math.floor(Math.random()*(yearEnd - yearOne +1))+parseInt(yearOne):""
        const genresQuery = genreIds.length>0?genreIds.length===1?`with_genres=${genreIds}`:
        `with_genres${genreIds.join('%2C')}`:""

        let query = `discover/movie?include_adult=false&vote_average.gte=3&${genresQuery}&sort_by=popularity.desc`

        if(randomYear!==""){
            query += `&primary_release_year=${randomYear}`
        }

        return query
    }