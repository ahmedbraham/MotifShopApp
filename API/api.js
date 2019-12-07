  
  import axios from 'axios';

  
  
  
  // Récupération du détail d'un film
export function getProductsListFromApi () {
  return fetch('http://preprodshop.motifdesign.ae/wp-json/api/products?per_page=16&page=5')
    .then((response) =>    response.json())
    .catch((error) => console.error(error));
}




  
  // Récupération du détail d'un film
  export function getProductsListFromApiWithPagination (page) {
    return fetch('http://preprodshop.motifdesign.ae/wp-json/api/products?per_page=8&page=' + page)
      .then((response) =>    response.json())
      .catch((error) => console.error(error));
  }
  
  

 
 
export function signIn (userName , password) {
  return fetch('http://preprodshop.motifdesign.ae/wp-json/jwt-auth/v1/token', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "username": userName,
    "password": password
  }),
}) .then((response) => response.json())
.catch((error) => console.error(error));  

}


 
export function register (username , email ,password)  {
  return fetch('http://preprodshop.motifdesign.ae/wp-json/api/register', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "username":username,
    "email":email,
    "password":password,
    "name":"" 
   
    
  }),
}) .then((response) => response.json())
.catch((error) => console.error(error));

}







export function testCart (id , qte) {
  return fetch('http://preprodshop.motifdesign.ae/wp-json/cocart/v1/add-item', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({   
    "product_id": id,
    "quantity": qte   
  }),  
}) .then((response) => response.json())
.catch((error) => console.error(error));

}

   




export function clearCart () {
  return fetch('http://preprodshop.motifdesign.ae/wp-json/api/delete_cart', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }  
}) .then((response) => response.json())
.catch((error) => console.error(error));

}

 


export function getAllCategories () {
  return fetch('http://preprodshop.motifdesign.ae/wp-json/api/categories', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }  
}) .then((response) => response.json())
.catch((error) => console.error(error));

}





export function getCart () {
  return fetch('http://preprodshop.motifdesign.ae/wp-json/cocart/v1/get-cart', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }  
}) .then((response) => response.json())
.catch((error) => console.error(error));

}
