import Person from './js/person'
import './css/global'
import './css/style.scss'
const person = new Person('Mike', 33)
console.log('name', person.name)
console.log('age', person.age)
person.introduce()
const img2 = new Image()
img2.src = require('@/image/clone.png')
document.querySelector('.mleft').append(img2)
const arr1 = [1, 2, 3, 4, 5]
const arr2 = [...arr1, 6]
console.log(arr2)
const obj1 = {
  a: 1,
  b: 2,
  c: 3
}

const obj2 = {
  // eslint-disable-next-line
  ...obj1,
  d: 4
}
console.log(obj2)
