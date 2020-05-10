export function handleErrors({ message }){
 const statusCode = message.slice(-3);
 const text = message.slice(0,14)
 console.info('Something went wrong 😕')
 console.log(`${statusCode}: ${text}`);
 alert(`${statusCode}: ${text}`)
}
