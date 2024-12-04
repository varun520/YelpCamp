// function catchAsync(fn){
//     return function(req, res, next){
//         fn(req, res, next).catch(e => next(e))
//     }
// }

// module.exports = catchAsync;

module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(e => next(e))
    }
}
