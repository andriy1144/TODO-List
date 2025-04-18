function startCircleAnimation(){
  const circle = document.querySelector('.progress-ring__circle');
  const radius = circle.r.baseVal.value; // 16
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = 0;

  function setProgress(percent) {
    const offset = circumference * percent / 100;
    circle.style.strokeDashoffset = offset;
  }

  let timeLeft = 5;
  const totalTime = timeLeft;
  const timerEl = document.getElementById('timer');

  const animationInterval = setInterval(() => {
    const elapsed = totalTime - timeLeft;
    const percent = (elapsed / totalTime) * 100;
    setProgress(percent);
  }, 100);

  const countdownInterval = setInterval(() => {
    timerEl.textContent = timeLeft;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      clearInterval(animationInterval);
      timerEl.textContent = "0";
      setProgress(100);
    }
  }, 1000);
}