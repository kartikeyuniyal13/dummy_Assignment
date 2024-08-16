export const getProducts = async () => {
    const url = 'https://real-time-amazon-data.p.rapidapi.com/products-by-category?category_id=2478868012&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key':process.env.NEXT_PUBLIC_RAPID_API_KEY,
		'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
	}
};
try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
} catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
}
};