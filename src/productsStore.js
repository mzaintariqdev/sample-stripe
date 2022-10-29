///coffee=price_1LyK6xB4EarYkjZK2UMDKfgI
//sunglasses=price_1LyK8DB4EarYkjZKHJswtgKD
///camera=price_1LyK8hB4EarYkjZKelv76JBZ

const productsArray = [
  { id: "price_1LyK6xB4EarYkjZK2UMDKfgI", title: "Coffee", price: 4.49 },
  { id: "price_1LyK8DB4EarYkjZKHJswtgKD", title: "Sunglasses", price: 9.99 },
  { id: "price_1LyK8hB4EarYkjZKelv76JBZ", title: "Camera", price: 39.99 },
];

function getProductData(id) {
  let productData = productsArray.find((product) => product.id === id);
  if (productData === undefined) {
    console.log("product does not exist");
    return undefined;
  }
  return productData;
}

export { productsArray, getProductData };
