function addHomeValueCalculatorID(attempt = 0) {
  const target = document.querySelector('.md-evaluation-banner.layout1');
  const MAX_ATTEMPTS = 30;
  if (target) {
    target.id = "home-value-calculator";
    return;
  }
  if (attempt < MAX_ATTEMPTS) {
    setTimeout(() => addHomeValueCalculatorID(attempt + 1), 150);
  }
}
addHomeValueCalculatorID();