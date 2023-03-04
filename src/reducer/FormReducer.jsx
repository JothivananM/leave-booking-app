export default function FormReducer(state, action) {
  const resetState = {
    name: "",
    username: "",
    email: "",
    phone: ""
  };
  switch (action.type) {
    case "CHANGE INPUT":
      return {
        ...state,
        [action.field]: action.payload
      };

      case "UPDATE INPUT":
      return {
        ...state,
        [action.field]: action.payload
      };

      case 'reset':
        return resetState;

    default:
      console.log(resetState);
      return resetState;
  }
}
