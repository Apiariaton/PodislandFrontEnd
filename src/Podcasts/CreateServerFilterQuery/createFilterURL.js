export default function produceFilterURL(userIsAuthenticated,searchValues)
{    
const {podcastName,artistName,minMaxEpisodes,genreList} = searchValues;

if (userIsAuthenticated == null)
{
    return null;
}

let filterURL = import.meta.env.VITE_NODE_BE_URL + "/podcasts/filter";

//Remove whitespaces from search data
const parameterObject =
{
    podcastName : podcastName ? podcastName.trim().replaceAll(" ","%20") : null,
    artistName : artistName ? artistName.trim().replaceAll(" ","%20") : null,
    minMaxEpisodes : minMaxEpisodes,
    // Remove the white spaces from genre  
    genreParameters : genreList.reduce((acc,genre,index) =>{ acc[`${"genre" + (index + 1)}`] = genre.trim().replaceAll(" ","%20").replaceAll("&","%26"); 
    return acc;},{}),
};

// console.log("GENREPARAMETERS",parameterObject.genreParameters);
// console.log("GENREPARAMETERS CHECK CONDITION",Object.values(parameterObject["genreParameters"]).filter(value => value != null).length);
// console.log("parameterObject",parameterObject);


//Turn parameterObject into a parameter string
for (const key in parameterObject)
{
    switch(key)
    {
        case "podcastName":
            if (parameterObject["podcastName"] != null)
            {
                if (!filterURL.includes("?"))
                {
                    filterURL += ("?collectionName="  + parameterObject["podcastName"]);     
                }
                else
                {
                    filterURL += ("&collectionName="  + parameterObject["podcastName"]);    
                }
            }
            break;
        case "artistName":
            if (parameterObject["artistName"] != null)
            {
                if (!filterURL.includes("?"))
                {
                    filterURL += ("?artistName="  + parameterObject["artistName"]); 
                }
                else
                {
                    filterURL += ("&artistName="  + parameterObject["artistName"]); 
                }
            }
            break;
        case "minMaxEpisodes":
            if (parameterObject["minMaxEpisodes"] != "")
            {
                if (!filterURL.includes("?"))
                {
                    filterURL += ("?minNumberOfEpisodes="  + parameterObject["minMaxEpisodes"]["min"]); 
                    filterURL += ("&maxNumberOfEpisodes="  + parameterObject["minMaxEpisodes"]["max"]); 
                }
                else
                {
                    filterURL += ("&minNumberOfEpisodes="  + parameterObject["minMaxEpisodes"]["min"]); 
                    filterURL += ("&maxNumberOfEpisodes="  + parameterObject["minMaxEpisodes"]["max"]);
                }
            }
            break;
        case "genreParameters":
            if (Object.values(parameterObject["genreParameters"]).filter(value => value != null).length != 0)
            {
                if (!filterURL.includes("?"))
                {
                    filterURL += ("?genre1="  + parameterObject["genreParameters"]["genre1"]); 
                    filterURL += ("&genre2="  + parameterObject["genreParameters"]["genre2"]); 
                    filterURL += ("&genre3="  + parameterObject["genreParameters"]["genre3"]); 
                }
                else
                {
                    filterURL += ("&genre1="  + parameterObject["genreParameters"]["genre1"]); 
                    filterURL += ("&genre2="  + parameterObject["genreParameters"]["genre2"]); 
                    filterURL += ("&genre3="  + parameterObject["genreParameters"]["genre3"]); 
                }
            } 
            break; 
    }
};

return filterURL;
};