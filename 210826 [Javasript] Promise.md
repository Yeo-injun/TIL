# [Javascript] Promise 객체  
## 2021.08.26 (목)

이것은 실행되기로 약속!(Promise)되어 있다!

- promise객체는 Javascript의 콜백함수의 가독성을 높이기 위해 추가된 기술(?)로 생각된다.
- javascript의 콜백함수로 인해 시간이 많이 걸리는 작업을 뒤로 미뤄두어 HTML 페이지 로딩에 문제가 없도록 만들었지만 되려 그 기능때문에 javascript의 소스코드가 더 복잡해졌다.
- 이를 해결하기 위해 소스코드의 위치에 상관없이 제일 마지막에 실행될 코드를 객체로 만들어서 따로 관리하는 것이 바로 promise객체의 핵심으로 보인다.
- promise객체는 javascript 소스코드가 한번 다 호출되고, 나중에 상태에 따라 실행될 함수를 모아둔 객체이다.
- 이를 더 쉽게 이해하기 위해서는 javascript 동작구조를 이해해야 한다.
- javascript는 객체와 변수를 저장해두는 힙(Heap)이라는 메모리 공간과 실행시켜야 하는 함수들을 순서대로 담아놓은 콜 스택(Call Stack), 그리고 시간소요가 많이 되어 소스코드상에 작성된 순서대로 호출하면 프로그램 작동에 문제를 발생시킬 수 있는 함수들을 한 곳에서 모아서 모인 순서대로 호출하는 큐(Que) 공간으로 구성되어 있다.
- promise객체는 소스코드에서 나중에 호출될 함수를 따로 모아두어 소스코드내의 함수가 모두 호출되면 그 결과값(상태)에 따라 각기 다른 함수를 실행시키는 객체이다.

그러니까 promise는 상태에 따라 호출이 약속(!)된 함수를 가지고 있는 객체라고 볼 수 있는 것이다!!!

```
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

```

Reference : https://ko.javascript.info/promise-basics