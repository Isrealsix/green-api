import { useState } from 'react';
import { defaultApiUrl, getStateInstance } from '@api';
import { TEXTS } from '@constants';
import type { Credentials, LoginFields } from '@models';
import { useAuthStore } from '@store';

const errors = TEXTS.loginErrors;

export function useLogin() {
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(fields: LoginFields) {
    const creds: Credentials = {
      idInstance: fields.idInstance.trim(),
      apiTokenInstance: fields.apiTokenInstance.trim(),
      apiUrl: fields.apiUrl.trim() || defaultApiUrl(fields.idInstance),
    };

    if (!/^\d+$/.test(creds.idInstance)) {
      setError(errors.invalidIdInstance);
      return;
    }
    if (!creds.apiTokenInstance) {
      setError(errors.missingApiToken);
      return;
    }

    setError('');
    setLoading(true);
    try {
      const { stateInstance } = await getStateInstance(creds);
      if (stateInstance === 'authorized') {
        login(creds);
      } else {
        setError(errors.instanceStates[stateInstance] ?? errors.unknownState(stateInstance));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(errors.connectionFailed(message));
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading, error };
}
