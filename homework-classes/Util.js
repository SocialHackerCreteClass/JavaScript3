'use strict';

{
  class Util {
    /**
     * Creates an element, optionally setting its attributes, and appends
     * the element to a parent.
     * @param {string} name The tag name of the element to create.
     * @param {HTMLElement} parent The parent element.
     * @param {Object} options An object with attribute names and values.
     */
    static createAndAppend(name, parent, options = {}) {
      const elem = document.createElement(name);
      parent.appendChild(elem);
      Object.entries(options).forEach(([key, value]) => {
        if (key === 'text') {
          elem.innerHTML = value;
        } else {
          elem.setAttribute(key, value);
        }
      });
      return elem;
    }

    static formatDate(date) {
      const newDate = new Date(date);
      let hours = newDate.getHours();
      let amPm;
      let minutes = newDate.getMinutes().toString();
      let seconds = newDate.getSeconds().toString();

      if (minutes < 10) {
        minutes = `0${hours}`;
      }
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      if (newDate.getHours() > 12) {
        hours = hours - 12;
        amPm = 'PM'
      } else {
        amPm = 'AM'
      }
      return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}, ${hours}:${minutes}:${seconds} ${amPm}`;
    }
  }

  window.Util = Util;
}
