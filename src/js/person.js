export default class {
  constructor(name, age) {
    this._name = name
    this._age = age
  }
  get name() {
    return this._name
  }
  get age() {
    return this._age
  }
  introduce() {
    console.log(`My name is ${this._name}. I am ${this._age} years old`)
  }
}
