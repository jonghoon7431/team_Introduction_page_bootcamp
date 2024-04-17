let meters = document.querySelectorAll('meter');
console.log(meters);

function setColor(meter, value) {
  if(value >= 0 && value <= 25)
    meter.style.setProperty('--progress-color', 'red');
  else if(value <= 70)
    meter.style.setProperty('--progress-color', 'rgb(247, 196, 30)');
  else
    meter.style.setProperty('--progress-color', 'green');
}

meters.forEach(meter => setColor(meter, meter.value))