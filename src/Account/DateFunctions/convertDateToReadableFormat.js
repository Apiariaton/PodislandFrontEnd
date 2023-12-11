export default function convertDateToReadableFormat(dateString,dateOptions={
    day:'numeric',
    year: 'numeric',
    month: 'long',
})
{
    let dateObject = new Date(dateString);
    return dateObject.toLocaleDateString('en-UK',dateOptions); 
};