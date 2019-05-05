const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
    { id: 4, name: 'User 4' },
    { id: 5, name: 'User 5' },
    { id: 6, name: 'User 6' },
    { id: 7, name: 'User 7' },
    { id: 8, name: 'User 8' },
    { id: 9, name: 'User 9' },
    { id: 10, name: 'User 10' }
];

const products = [
    { id: 1, userId: 2, name: 'Product 1' },
    { id: 2, userId: 3, name: 'Product 2' },
    { id: 3, userId: 3, name: 'Product 3' },
    { id: 4, userId: 5, name: 'Product 4' },
    { id: 5, userId: 6, name: 'Product 5' },
    { id: 6, userId: 4, name: 'Product 6' },
    { id: 7, userId: 6, name: 'Product 7' },
    { id: 8, userId: 7, name: 'Product 8' },
    { id: 9, userId: 5, name: 'Product 9' },
    { id: 10, userId: 10, name: 'Product 10' },
    { id: 11, userId: 7, name: 'Product 11' },
    { id: 12, userId: 5, name: 'Product 12' },
    { id: 13, userId: 9, name: 'Product 13' },
    { id: 14, userId: 3, name: 'Product 14' },
    { id: 15, userId: 7, name: 'Product 15' },
    { id: 16, userId: 10, name: 'Product 16' },
    { id: 17, userId: 2, name: 'Product 17' },
    { id: 18, userId: 6, name: 'Product 18' },
    { id: 18, userId: 6, name: 'Product 19' },
    { id: 20, userId: 1, name: 'Product 20' }
];

/* Question:
	1. Hiển thị danh sách product kèm theo thông tin user.
	eg: let productUsers = [
		{ id: 1, userId: { { id: 2, name: 'User 2' } }, name: 'Product 1' }
	]
	2. Hiển thị danh sách sản phẩm theo từng user.
	{
		id: 6
		name: 'User 6',
		products: [
			{ id: 5, userId: 6, name: 'Product 5' },
			{ id: 7, userId: 6, name: 'Product 7' }
		]
	}
*/

/* Answer */

// Ex1
/* - Create a temporary array without affecting the internal object value when changing the value 
   - The purpose is to retain the product array for exercise 2 behind
*/
let products_temp = products.map(product => {
    return Object.assign({}, product);
});

// Using map() and find() function to export the result of Ex1
const result_ex1 = products_temp.map(product => {
    product.userId = users.find(user => user.id === product.userId);
    return product;
});

// Write the result to console
console.log("/*-----Ex 1-----*/")
for (let product of result_ex1) {
    console.log(JSON.stringify(product) + "\n");
}

console.log("\n");

// Ex2
// Using map() and filter() function to export the result of Ex2
const users_temp = users.map(user => {
    user.products = products.filter(product => {
        return product.userId === user.id;
    });
    return user;
});

// Write the result to console
console.log("/*-----Ex 2-----*/")
for (let user of users) {
    console.log(JSON.stringify(user) + "\n");
}

// Code lại bài 2, xin Duy