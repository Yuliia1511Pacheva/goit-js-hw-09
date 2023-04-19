import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
const input = document.querySelector('#datetime-picker');

btnStart.addEventListener('click', onStartClick);

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.info('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function onStartClick() {
  const targetDate = new Date(input.value);
 
  const timerId = setInterval(() => {
    const timeLeft = convertMs(targetDate - Date.now());
    days.textContent = timeLeft.days.toString().padStart(2, '0');
    hours.textContent = timeLeft.hours.toString().padStart(2, '0');
    minutes.textContent = timeLeft.minutes.toString().padStart(2, '0');
    seconds.textContent = timeLeft.seconds.toString().padStart(2, '0');

    if ((targetDate - Date.now()) <= 0) {
      clearInterval(timerId);
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
