import{ checker} from '../src/client/js/check'
// import "babel-polyfill"; aw est5dme de 34an t t7le el REFERENCE ERROR aw el @babel/plugin-transform-Runtime wt7ote f el .babelrc file
import "babel-polyfill"
// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the places input functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the places input ", () => {
           // Define the input for the function, if any, in the form of variables/array
           // Define the expected output, if any, in the form of variables/array
           // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
           // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
           expect(checker).toBeDefined();
})});