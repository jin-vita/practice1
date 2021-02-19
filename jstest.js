// 변수
var a = 0 // var를 사용하기 보다
let b = 0 // let 사용을 추천

// 상수
const c = 0

// 함수
function fun(a, b) {
    // 기타 다른 코드들
    return 0
}

// 클래스
class Rectangle {
    // 생성자 함수
    constructor (width, length) {
        // 객체변수 만들기
        this.width = width
        this.length = length
    }

    // 함수(또는 클래스 안에 있으므로 메소드라고도 부름)
    getArea() {
        return this.width * this.length
    }
}

// 클래스 상속
class Square extends Rectangle {
    constructor(length) {
        // 부모 클래스의 생성자 함수 호출
        super(length, length)
    }
}

// 콜백 함수를 사용하는 함수
function callbackFunc(a, b, callback) {
    // 콜백 함수 이전에 수행할 여러 함수
    let err = null
    if (a - b == 0) {
        err = new Error('에러 테스트 메시지')
    }
    callback(err, a, b) // 콜백 함수 호출
}

// 콜백 함수 사용하기
// callbackFunc(13, 10, (err, x, y) => {
//     if (err) {
//         // 에러를 처리함
//         console.error(err)
//         // 에러를 처리하고 함수를 종료함
//         return
//     }
//     console.log(`결과값 : ${x + y}`)
// })

// 동기 방식과 비동기 방식
// 동기 방식은 위에서 아래로 순차적으로 실행되며
// 위에 있는 코드가 모두 실행을 마쳐야 아래에 있는 코드가 실행됨
function syncTest() {
    console.log('동기 방식 함수 호출')
}

// 비동기 방식은 코드의 실행 순서가 위에서 아래로 실행되지 않음
// 아래에 있는 코드가 위에 있는 코드보다 먼저 실행될 수 있음
function asyncTest() {
    // setTimeout 함수는 콜백 함수 실행을 일정 시간 뒤로 미루게 해줌, 시간 단위는 ms(0.001초 또는 1/1000초)
    setTimeout(() => {
        console.log('비동기 방식 함수 호출')
    }, 2000)
}

// 동기/비동기 테스트 함수 호출
// console.log('함수 호출 시작')
// syncTest()
// asyncTest()
// console.log('함수 호출 끝')
/**
 * 아래는 함수 실행 결과
 * 
 * 함수 호출 시작
 * 동기 방식 함수 호출
 * 함수 호출 끝
 * -- 2초 뒤에 아래 문장 출력 --
 * 비동기 방식 함수 호출
 */

// Promise
function promiseTest(a, b) {
    // 바로 Promise 객체를 만들어서 반환하는 함수를 만듦
    // 실제로 함수가 할 내용은 Promise 객체를 만들 때 작성하는 콜백 함수 안에서 수행
    return new Promise((res, rej) => {
        // 만약 함수 실행 중 에러가 발생하는 상황이라면
        if (a - b == 0) {
            // 에러를 rej 함수의 매개변수로 넣는다.
            rej(new Error('에러 테스트 메세지'))
        }
        // 함수가 정상 실행됐다면 res 함수의 매개변수에 값을 전달한다.
        res(a + b)
    })
}


// Promise 사용 방법 1
function promiseUse1() {
    promiseTest(11, 10).then((result) => {
        // 수행 성공 시 실행할 코드
        console.log(result)
    }).catch((err) => {
        // 에러 발생 시 실행할 코드
        console.error(err)
    })
}
// 실행 결과를 보고 싶다면 바로 아래줄의 코드를 주석처리 해제
//promiseUse1()

// Promise 사용 방법 2
// Promise를 사용하는 함수의 맨 앞에 async 키워드를 붙인다.
async function promiseUse2() {
    // 에러 처리를 위해 try/catch문을 사용한다.
    try {
        // Promise 객체를 반환하는 함수 앞에 await 키워드를 붙인다.
        const result = await promiseTest(11, 10)
        console.log(result)
    } catch (err) {
        console.error(err)
    }
}
// 실행 결과를 보고 싶다면 바로 아래줄의 코드를 주석처리 해제
//promiseUse2()

let aa = '1'
function promiseSync(aa) {
    return new Promise((res) => {
        res(console.log('동기 방식 함수 호출'+ aa))
    })
}

function promiseAsync() {
    return new Promise((res) => {
        setTimeout(() => {
            res(console.log('비동기 방식 함수 호출'))
        }, 2000)
    })
}

async function promiseEx() {
    try {
        await promiseAsync()
        await promiseSync()
    } catch (err) {
        console.error(err)        
    }
}

promiseEx()