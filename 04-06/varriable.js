/* Link: 
	https://stackoverflow.com/questions/3978492/fastest-way-to-duplicate-an-array-in-javascript-slice-vs-for-loop
*/
// Hạn chế sử dụng format code ctrl + shift + f, khi nào dùng thì bôi đen đoạn cần code rồi format
var name = 'home';
var age = 27;
var isFemale = false;

// Object 
var student1 = {
	name: 'test',
	age: 45
};
var student2 = {
	address: 'street',
	age: 40
};
var student3 = Object.assign(student1, student2);
console.log(student1 === student3);
console.log(student2 === student3);

// Array
// Bài toán: thay đổi tmp[0] trong mảng temp mà không ảnh hưởng đến mảng listStudents
var listStudents = ['nam', 'nu'];
var tmp = Object.assign([], listStudents);
var tmp2 = listStudents.slice(0);
var tmp3 = Object.assign({}, listStudents);
var tmp4 = [...listStudents];
tmp[0] = 'khoi';
tmp2[0] = 'dat';
tmp3["0"] = 'bien';
tmp4[0] = 'quynh';
console.log(tmp);
console.log(listStudents);
console.log(tmp2);
console.log(tmp3);
console.log(tmp4);
// String trong javascript là cấp phát tham trị
// Nếu dùng cách JSON parse thì tốn bộ nhớ khi xuất hiện mảng lớn
// Cách khác dùng Object.assign({target}, {source});
// Cách khác nhanh hơn [...listStudents] -> cũng giống Object assign nhưng nhanh hơn

const PORT = 3000;
// PORT = 3001; -> error
const PORTS = [2000, 3000];
PORTS[0] = 2001; // -> run oke, nhưng đã thay đổi thì không nên khai báo const

// check phần tử có trong mảng hay không
// => dùng includes
console.log(1 !== 0);