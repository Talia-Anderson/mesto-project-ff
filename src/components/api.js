
return fetch('https://nomoreparties.co/v1/wff-cohort-10/cards', {
   headers: {
     authorization: 'b0363792-c5e5-45fc-92f6-19570476fd4f'
   }
 })
   .then(res => res.json())
   .then((result) => {
     console.log(result);
   }); 