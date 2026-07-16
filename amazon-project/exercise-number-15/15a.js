import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {isSatSun} from './15b.js';



// calculate 1 month after today and display it 
const today = dayjs();
const Today1 = today.add(1,'month');
const one=Today1.format('MMMM DD');

document.querySelector('.div1').innerHTML = `${one}`;

// dayjs has a .subtract(..) method 
const Today2 = today.subtract(1,'month');
const two = Today2.format('MMMM DD');

document.querySelector('.div1').innerHTML = `${two}`;

// get a date from Dayjs and display it in this format : '<Day of week'>
const three = Today1.format('dddd DD');
document.querySelector('.div1').innerHTML = `${three}`;

// create a function isWeekend(date) that takes a DayJS object , and returns whether the date is 'saturday' or 'sunday' 



console.log(isWeekend(dayjs('2026-07-11')));
 


