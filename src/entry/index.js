// es2018 support object spread/rest
const obj1 = {
  name: 'dragon',
  rarity: 'lengendary',
  tell() {
    console.log(this.name + ' ' + this.rarity)
  }
}
const obj2 = {
  ...obj1,
  type: 'troop'
}
console.log(obj2)
obj1.tell()
import Person from '../js/person'
const per = new Person('wx', 100)
per.introduce()
// import Axios from 'axios'
// async function getData() {
//   const resp = await Axios.get('/data/cards.json')
//   return resp.data
// }
// getData().then(resp => {
//   console.log(resp)
// })
