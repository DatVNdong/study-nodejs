let grade = 8;
if (grade <= 4) {
	console.log('Trung binh');
} else if (grade <= 8) {
	console.log('Kha');
} else if (grade <= 10) {
	console.log('Gioi');
}

let isTB = grade <= 4;
let isKha = grade <= 8;
let isGioi = grade <= 10;
switch (true) {
	case isTB:
		console.log('Trung binh');
		break;
	case isKha:
		console.log('Kha');
		break;
	case isGioi:
		console.log('Gioi');
		break;
	default:
		console.log('Error');
		break;
}
