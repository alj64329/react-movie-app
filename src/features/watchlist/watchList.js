import { Query } from "appwrite";
import { ID, tableDB } from "../../lib/appwrite";
import { useLogger } from "react-use";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID

export async function addWatchList(userId, movie){
    try{
        const find = await findMovie(movie.id)
        if(find.rows.length>0){
            console.log("The movie already in the table")
            return
        }

    const res = await tableDB.createRow({
        databaseId:`${DATABASE_ID}`,
        tableId: `${TABLE_ID}`,
        rowId : ID.unique(),
        data: {
            userId:userId.$id,
            title:movie.title,
            posterPath: movie.poster_path,
            movieId: movie.id
        }
        })
    
        console.log(`Successfully add:${res}`)
    }catch(err){
        console.log(err)
    }
}

export const listWatchList = async(user)=>{
    try{
        const res = await tableDB.listRows({
            databaseId:DATABASE_ID,
            tableId:TABLE_ID,
            queries:[
                Query.equal('userId',`${user.$id}`)
            ]
        })
        console.log(res.rows)
        return res.rows
    }catch(err){
        console.log(err)
        return []
    }
}

export async function removeWatchList(rowId){
    let result =""
    const promise = tableDB.deleteRow({
        databaseId:`${DATABASE_ID}`,
        tableId:`${TABLE_ID}`,
        rowId:`${rowId}`
    })

    promise.then((res)=>{
        console.log(res)
        result ="List removed"
    },(err)=>{
        console.log(err)
        result="Error occurs"
    })

    return result
}

export const findMovie = async (movieId)=>{
    try{
        const res = await tableDB.listRows({
        databaseId:DATABASE_ID,
        tableId:TABLE_ID,
        queries:[
            Query.equal('movieId',movieId)
        ]
        })
        console.log(res)
        return res
    }catch(err){
        console.log(err)
        return 0
    }
}

export const isInWatchList= (movie, watchList)=>{
    // console.log(movie)
    // console.log(watchList)
    // const find = watchList.find((item)=>item.movieId===movie.id)
    // console.log(find)

    // if(find){
    //     console.log('returning true')
    //     return true
    // }
    // return false
    return watchList.some(item=> item.movieId === movie.id)
}


//liked or watched need to be reviewed
export const isWatched= async (isLiked, rowId)=>{
    
    const promise = tableDB.updateRow(
        '<DATABASE_ID>',
        '<TABLE_ID>',
        `${rowId}`,
        { isWatched: true,
            liked:isLiked,
         }
    );

    promise.then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
}