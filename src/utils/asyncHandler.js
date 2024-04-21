const asyncHandler = (requestHandler) => 
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err)) // using next so that the next middleware can do its job
    }
export {asyncHandler}

// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => {() => {}}

// higher order function

// try catch method
// const asyncHandler = (fn) => async (req,res,next) => {
//     try{
//         await fn(req,res,next)
//     }
//     catch(err){
//         res.status(err.code || 500).json({
//             success:false,
//             message: err.message
//         })
//     }
// }