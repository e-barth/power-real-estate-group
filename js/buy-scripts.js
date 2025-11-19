function addCalculatorIDs(attempt = 0) {  
  if (attempt > 30) return;
  const mortgage = document.querySelector('.md-calculator.mortgage');
  const affordability = document.querySelector('.md-calculator.affordability');

  if (!mortgage && !affordability) {
    return setTimeout(() => addCalculatorIDs(attempt + 1), 150);
  }

  if (mortgage && !mortgage.id) {
    mortgage.id = "mortgage-calculator";
  }

  if (affordability && !affordability.id) {
    affordability.id = "affordability-calculator";
  }
}
addCalculatorIDs();