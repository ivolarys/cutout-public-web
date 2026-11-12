// Waitlist forms. The endpoint comes from PUBLIC_WAITLIST_ENDPOINT (see .env.example) and receives
// a JSON body {"email": "..."}; any 2xx answer counts as signed up.

const ENDPOINT = (import.meta.env.PUBLIC_WAITLIST_ENDPOINT ?? '').trim();

for (const form of document.querySelectorAll<HTMLFormElement>('form[data-waitlist]')) {
  const input = form.querySelector<HTMLInputElement>('input[type="email"]')!;
  const button = form.querySelector<HTMLButtonElement>('button')!;
  const note = form.querySelector<HTMLElement>('[data-note]')!;
  const idle = note.textContent ?? '';

  const say = (state: 'idle' | 'error' | 'ok', text: string) => {
    note.dataset.state = state;
    note.textContent = text;
  };

  input.addEventListener('input', () => {
    if (note.dataset.state === 'error') say('idle', idle);
    input.removeAttribute('aria-invalid');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (!email || !input.checkValidity()) {
      input.setAttribute('aria-invalid', 'true');
      say('error', 'That does not look like an e-mail address. Check it and try again.');
      input.focus();
      return;
    }
    if (!ENDPOINT) {
      say('error', 'Sign-up is not switched on yet. Nothing was sent.');
      return;
    }
    button.disabled = true;
    const label = button.textContent;
    button.textContent = 'Sending';
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      say('ok', `You are on the list. We will write to ${email} when there is a build to try.`);
    } catch {
      say('error', 'That did not go through. Check your connection and try again.');
    } finally {
      button.disabled = false;
      button.textContent = label;
    }
  });
}
