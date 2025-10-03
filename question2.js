// async function retrievingProduct(url){
    // Utility function to fetch and parse JSON
async function retrievingProduct(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error fetching ${url}`);
  return await response.json();
}

async function getAvailableProducts() {
  try {
    // 1. Define endpoints (example endpoints from DummyJSON)
    const endpoints = ["https://dummyjson.com/products"];

    // 2. Fetch products from all endpoints in parallel
    const allResponses = await Promise.all(endpoints.map(fetchJSON));

    // 3. Extract product arrays (DummyJSON puts them under `products`)
    const allProducts = allResponses.flatMap(res => res.products);

    // 4. Filter available products
    const availableProducts = allProducts.filter(p => p.availabilityStatus === true);

    // 5. Calculate total price
    const totalPrice = availableProducts.reduce((sum, p) => sum + p.price, 0);

    // 6. Return final structured object
    return {
      availableProducts,
      totalPrice
    };
  } catch (error) {
    console.error("Error retrieving products:", error);
  }
}

// Run the function
getAvailableProducts().then(result => console.log(result));

