export  const  options = {
    params: {language: 'en-US'},
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
    }
}