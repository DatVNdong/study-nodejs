import { resolve } from "url";
import { rejects } from "assert";

/* Bất đồng bộ bên javascript 
    Callback là tiêm 1 hàm như một tham số của hàm khác
    Javascirpt không chạy multi thread giống java -> Nhưng node thì có rồi
    Bất đồng bộ trong javascript xảy ra khi có những tác vụ chiếm nhiều thời gian, input output
    Các tác vụ mà đụng đén ổ cứng thì writefile, readfile, write/read database thì luôn cần thời gian, nên đưa vào callstacks
    Từ khóa call stacks và event loop
    Từ khóa cluster và fork ubutntu
    Async await

    - Bài toán: khi có 2 user cùng truy cập vào 1 tài nguyên trên 1 thời điểm, conflict khi request cùng 1 lúc
    Hệ thống chạy trên cluster thì chạy trên chip con -> xảy ra trùng request
    Fork là chạy trên 1 core
    Cluster là run trên -i 1,2,3,4 core
    Có 2 cách giải quyết vấn đề:
        1. Ram lock sessionId: dùng redis set(sessionId, ) -> nếu redis chết thì mất hết session
        2. Db lock db
*/

function doTestOne() {
    return new Promise(function (resolve, rejects) {
        console.log('Start testing one');
        setTimeout(function () {
            if (!a) {
                return rejects('A is not define')
            }
            console.log('Done testing one');
            return resolve();
        }, 3000);
    });
}

function doTestTwo(callback) {
    console.log('Start testing two');
    setTimeout(function () {
        console.log('Done testing two');
        return callback();
    }, 3000);
}

function showTestingStatus() {
    console.log('Finish test');
}

// Sẽ chạy start -> finish -> done
// Việc chạy lồng callback thế này sẽ gây ra code xấu (callback hell) => ES6 có promise để giải quyết vấn đề 
doTestOne(function () {
    doTestTwo(function () {
        showTestingStatus();
    });
});

// Tìm hiểu thêm về promise .then .catch
// (Tìm hiểu lại) fs.writeFile sẽ chạy nhanh hơn khi dùng với cluster, còn fs.writeFileSync sẽ chạy nhanh hơn khi dùng với fork 