// Quy tắc đặt tên hàm: Verb + Noun
let student1 = {
	name: 'Nam',
	age: 23,
	address: ['Da Nang', 'Sai Gon']
};
function checkAuthentication(student) {
	// Nếu ko thay đổi thì dùng const
	const isValidName = typeof(student.name) !== 'string';
	const isValidAge = isNaN(parseInt(student.age));
	const isValidAddress = !Array.isArray(student.address);
	return isValidName || isValidAge || isValidAddress;
}
console.log("Student is " + (checkAuthentication(student1) ? "invalid" : "valid"));