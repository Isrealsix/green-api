import { useState, type FormEvent } from 'react';
import { defaultApiUrl } from '@api';
import { Spinner } from '@components/common';
import { ChatLogo } from '@components/icons';
import { TEXTS } from '@constants';
import { useLogin } from '@hooks';

const texts = TEXTS.login;

export function Login() {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const { submit, loading, error } = useLogin();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    submit({ idInstance, apiTokenInstance, apiUrl });
  }

  return (
    <div className="login">
      <form className="login-card" onSubmit={handleSubmit}>
        <ChatLogo size={64} />
        <h1>{texts.title}</h1>
        <p className="login-subtitle">{texts.subtitle}</p>

        <label className="field">
          <span>{texts.idInstanceLabel}</span>
          <input
            inputMode="numeric"
            autoFocus
            placeholder={texts.idInstancePlaceholder}
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
          />
        </label>

        <label className="field">
          <span>{texts.apiTokenLabel}</span>
          <input
            type="password"
            autoComplete="off"
            placeholder={texts.apiTokenPlaceholder}
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
          />
        </label>

        <label className="field">
          <span>{texts.apiUrlLabel}</span>
          <input
            placeholder={defaultApiUrl(idInstance)}
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button className="button-primary" disabled={loading} aria-busy={loading}>
          {loading && <Spinner />}
          {loading ? texts.submitting : texts.submit}
        </button>
      </form>
    </div>
  );
}
