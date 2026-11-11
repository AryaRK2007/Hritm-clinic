document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('appointment-form');
  const summary = document.getElementById('appointment-summary');

  if (!(form instanceof HTMLFormElement) || !(summary instanceof HTMLElement)) return;

  form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);
    const lines = [
      `Visit notes for ${formData.get('name')}`,
      `Topic: ${formData.get('visitType')}`,
      `Preferred date: ${formData.get('preferredDate') || 'No preference selected'}`,
      `Preferred time: ${formData.get('preferredTime') || 'No preference selected'}`
    ];
    const notes = formData.get('notes');

    if (typeof notes === 'string' && notes.trim()) {
      lines.push(`Notes: ${notes.trim()}`);
    }

    summary.textContent = `${lines.join('\n')}\n\nThis summary has not been sent. Please contact Hri-thm Clinic directly to confirm appointment availability.`;
    summary.style.display = 'block';
  });
});