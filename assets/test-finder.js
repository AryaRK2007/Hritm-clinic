document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('symptomSelector');
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

  selector.addEventListener('change', (e) => {
    const selectedKey = e.target.value;

    if (selectedKey && testDatabase[selectedKey]) {
      const data = testDatabase[selectedKey];
      resultTitle.textContent = data.title;
      resultDesc.textContent = data.desc;
      resultBox.style.display = 'block';
    } else {
      resultBox.style.display = 'none';
    }
  });
});