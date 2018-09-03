export default function productList(state = 0, action) {
  switch(action.type) {
    case 'query':
      return state + 1;
    default :
      return state + 1;   
  }
}