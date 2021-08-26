// Promise 객체는 상태에 따라 실행할 2가지 함수를 정의하여 호출할 수 있다.
// 단, 나중에 실행될 두가지 함수는 Promise객체를 생성할때 익명함수의 인자값으로 선언해주어야 한다.
// 선언된 함수명을 익명 함수내에서 구현해두면 추후 promise객체의 메소드들을 활용하여 상태에 맞게 해당 함수를 실행시킬 수 있다.
let yn = false;

let promise = new Promise(function(resolve, error) {
    if (yn) {
        resolve("Resolve함수는 State값이 fulfilled일때 실행");
    } else {
        error("Error함수는 State값이 rejected일때 실행");
    }

});

// 선언된 Promise객체를 사용하여 상태에 따라 다른 함수가 실행되게끔 조작하기 위해서는 .then() / .catch() / .finally() 메소드를 알고 있어야 한다.

// .then() 메소드는 Promise객체에 등록된 2가지 함수를 선택적으로 실행시킬 수 있다.
promise
    // .finally() 메소드는 State값에 상관없이 무조건 실행되는 함수를 인자로 넣어준다.
    // 해당 메소드의 함수는 인자값 할당을 하지 않고, 자동으로 다음 핸들러에 결과와 에러를 전달한다. 즉, .then() 이나 .catch()보다 위에 작성되어 있어도 해당 메소드들이 정상 실행된다!
    .finally(
        function alwaysRunningFunction() {
            console.log("========== 수미상관의 핵심 : .finally() [시작]");
        }
    )
    .then(
        // 첫번째 인자값 : State값이 Fulfilled일때 실행!
        function successHandlingFunction(result) {
            console.log(result);
            // Fulfilled일때 구현내용
        },
        // 두번째 인자값 : State값이 Rejected일때 실행!
        function errorHandlingFunction(error) {
            console.log(error);
            // Rejected일때 구현내용
        }
        )
    // catch() 메소드는 에러가 발생(State값이 Rejected)됐을때만 실행된다.
    // .then(null, errorHandlingFunction)로 구현한 것과 동일하다.
    .catch(
        function equalToErrorHandlingFunction(e){
            console.log(e);
            console.log(".catch() 메소드의 에러핸들링!");
        }
    )
    // .finally() 메소드는 State값에 상관없이 무조건 실행되는 함수를 인자로 넣어준다.
    // 해당 메소드의 함수는 인자값 할당을 하지 않고, 자동으로 다음 핸들러에 결과와 에러를 전달한다. 즉, .then() 이나 .catch()보다 위에 작성되어 있어도 해당 메소드들이 정상 실행된다!
    .finally(
        function alwaysRunningFunction() {
            console.log("========== 수미상관의 핵심 : .finally() [끝]");
        }
    )


// let promise = new Promise(function(resolve, reject) {
//     setTimeout(() => reject(new Error("에러 발생!")), 100);
//   });
  
//   // reject 함수는 .then의 두 번째 함수를 실행합니다.
//   promise.then(
//     result => console.log(result), // 실행되지 않음
//     error => console.log(error) // 1초 후 "Error: 에러 발생!"를 출력
//   );