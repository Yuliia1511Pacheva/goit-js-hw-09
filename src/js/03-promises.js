import Notiflix, { Notify } from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() =>{

      if (shouldResolve) {
    resolve({position, delay})
  } else {
    reject ({position, delay})
  }
    }, delay)
  })
}

function onSubmit(evt) {
  evt.preventDefault();
  let { delay: { value: delay }, step: { value: step }, amount: { value: amount } } = evt.currentTarget.elements;
  
  delay = Number(delay);
  step = Number(step);
  amount = Number(amount);

  for (let i = 1; i <= amount; i += 1){
    createPromise(i, delay).then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
    })
    .catch(({ position, delay }) => {
   Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay += step;
  }
}