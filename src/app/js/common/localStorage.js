'use strict';

var STORAGE_KEY = 'todos-vuejs';

export default store = {
  fetch() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  },
  save = todos => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
}
