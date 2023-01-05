//Napisz jak najprostszy kod który spowoduje błąd stack overflow
(function errorFunc() {
    errorFunc()
})()