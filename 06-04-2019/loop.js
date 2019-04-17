/* Link: 
	https://completejavascript.com/javascript-foreach-la-cai-quai-gi/
*/
var names = [1, 2, 3, 4];
var student = {
	name: 'a',
	age: 17
};
for (var i = 0; i < names.length; i++) {
	console.log(names[i]);
}
// for in array
console.log("Loop in array");
for (var item of names) {
	console.log(item);
}
// for in object
for (var key in student) {
	console.log("key: " + key + " value: " + student[key]);
}