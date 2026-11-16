document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('symptomSelector');
  const chipsContainer = document.getElementById('finderQuickChips');
  const resultBox = document.getElementById('finderResult');
  const resultTitle = document.getElementById('resultTitle');
  const resultDesc = document.getElementById('resultDesc');

  if (!selector) return;

  const testDatabase = {
    palpitations: {
      title: "Possible tests: Holter Monitoring & 2D Echo",
      desc: "Ambulatory ECG (Holter) monitoring tracks heart rhythms over an extended period to catch intermittent palpitations, combined with 2D Echocardiography to evaluate cardiac structural health."
    },
    breathless: {
      title: "Possible tests: 2D Echocardiography & Exercise Stress Test (TMT)",
      desc: "Echocardiography checks chamber dimensions and valve function, while a Treadmill Stress Test assesses how your heart handles physical exertion under controlled conditions."
    },
    hypertension: {
      title: "Possible evaluation: Preventive Risk Profile & Myocardial Strain Imaging",
      desc: "Comprehensive blood pressure risk tracking combined with 12-lead ECG and 2D Echo (with Global Longitudinal Strain) to evaluate early signs of cardiac involvement."
    },
    family: {
      title: "Possible next step: Preventive Cardiology Assessment",
      desc: "A structured cardiovascular risk evaluation analyzing family history, lipid parameters, metabolic health, and baseline non-invasive cardiac imaging."
    },
    chemo: {
      title: "Possible evaluation: Advanced Strain Echo (Cardio-Oncology)",
      desc: "Advanced Myocardial Strain Imaging (GLS) helps detect subtle changes in cardiac function during or after potentially cardiotoxic medical treatments."
    }
  };

  const renderResult = (selectedKey) => {
    if (selectedKey && testDatabase[selectedKey]) {
      const data = testDatabase[selectedKey];
      resultTitle.textContent = data.title;
      resultDesc.textContent = data.desc;
      resultBox.style.display = 'block';
      resultBox.classList.add('is-visible');
    } else {
      resultBox.classList.remove('is-visible');
      resultBox.style.display = 'none';
    }

    if (chipsContainer) {
      chipsContainer.querySelectorAll('.finder-chip').forEach(btn => {
        const isSelected = btn.getAttribute('data-value') === selectedKey;
        btn.classList.toggle('is-active', isSelected);
        btn.setAttribute('aria-pressed', String(isSelected));
      });
    }
  };

  if (chipsContainer) {
    Array.from(selector.options).forEach(option => {
      if (!option.value) return;
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'finder-chip';
      chip.setAttribute('data-value', option.value);
      chip.setAttribute('aria-pressed', 'false');
      chip.textContent = option.textContent;
      chip.addEventListener('click', () => {
        const nextVal = selector.value === option.value ? '' : option.value;
        selector.value = nextVal;
        renderResult(nextVal);
      });
      chipsContainer.appendChild(chip);
    });
  }

  selector.addEventListener('change', (e) => {
    renderResult(e.target.value);
  });
});