import {useSelector} from 'react-redux';


export async function obtainUserEmail(obtainUserEmailURL)
{
        const currentAuthToken = useSelector(state=>state.auth.authToken);
        try {

                const userEmailRequest = await fetch(
                obtainUserEmailURL,
                {
                    method:"GET",
                    headers: {
                        "Authorization": "Bearer " + currentAuthToken
                    }
                });

                let userEmail = await userEmailRequest.json();
                return userEmail;
            }    
        catch (e)
        {
            console.log(e);
            return null;
        }
};
