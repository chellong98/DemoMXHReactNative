const required = value => (value ? undefined : "Required");
const maxLength = max => value => (value && value.length > max ? `Must be ${max} characters or less` : undefined);
const maxLength15 = maxLength(15);
const minLength = min => value => (value && value.length < min ? `Must be ${min} characters or more` : undefined);
const minLength8 = minLength(8);
const minLength2 = minLength(2);
const email = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Invalid email address" : undefined;
const alphaNumeric = value => (value && /[^a-zA-Z0-9 ]/i.test(value) ? "Only alphanumeric characters" : undefined);
export default {
    // SERVER_API: "http://192.168.2.14:8080/APIUsers/",
    SERVER_API: "http://125.212.227.42:9000/DevWeb/APIUsers/",
    // SERVER_NAME: "http://192.168.2.14:8080/APIUsers/", 
    API_URL: "https://facebook.github.io/react-native/movies.json",
    check : {
      required: required,
      maxLength15: maxLength15,
      minLength8: minLength8,
      minLength2: minLength2,
      email: email,
      alphaNumeric : alphaNumeric
    },
    ListTodo : [
        {
          
          name: "Book Flight to London",
          time: "",
          status: 1,
        },
        {
          
          name: "Work on Skill Share Class",
          time: "", 
          status: 1,
        },
        {
          name: "Make Haircut Appt",
          time: "",
          status: 1,
        },
        {
          
          name: "Plan Date Night",
          time: "",
          status: 1,
        },
        {
          
          name: "Pay Rent",
          time: "",
          status: 0,
        },
        {
          
          name: "Call Mom",
          time: "",
          status: 0,
        },
      ]
}
 