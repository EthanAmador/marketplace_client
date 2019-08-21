const BASE_URL = 'http://localhost:8080';
/*
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max));
*/

async function callApi(endpoint, options = {}) {

  options.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

const Api = {
  product:{
      getProducts(pageIndex,pageSize,name){
          return callApi(`/products/${pageIndex}/${pageSize}`)
      },
      getProductById(id){
        return callApi(`/products/${id}`); 
      },
      saveProduct(product){
        return callApi("/products",{
          method: 'POST',
          body: JSON.stringify(product),
        })
      },
      modifProduct(id,product){
        return callApi(`/products/${id}`,{
          method: 'PUT',
          body: JSON.stringify(product),
        })
      }

      
  },
  category:{
    getCategory(){
      return callApi("/category"); 
    }
  }
  /*
  badges: {
    list() {
      return callApi('/badges');
    },
    create(badge) {
      return callApi(`/badges`, {
        method: 'POST',
        body: JSON.stringify(badge),
      });
    },
    read(badgeId) {
      return callApi(`/badges/${badgeId}`);
    },
    update(badgeId, updates) {
      return callApi(`/badges/${badgeId}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    },
    // Lo hubiera llamado `delete`, pero `delete` es un keyword en JavaScript asi que no es buena idea :P
    remove(badgeId) {
      return callApi(`/badges/${badgeId}`, {
        method: 'DELETE',
      });
    },
  },*/
};

export default Api;