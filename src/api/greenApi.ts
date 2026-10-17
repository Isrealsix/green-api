import { DEFAULT_API_URL, GREEN_API_HOST } from '@constants';
import type {
  Credentials,
  MessageData,
  Notification,
  SendMessageResponse,
  StateInstanceResponse,
} from '@models';

export function defaultApiUrl(idInstance: string) {
  const digits = idInstance.replace(/\D/g, '');
  if (digits.length < 4) return DEFAULT_API_URL;
  return `https://${digits.slice(0, 4)}.${GREEN_API_HOST}`;
}

function methodUrl(creds: Credentials, method: string) {
  const host = creds.apiUrl.replace(/\/+$/, '');
  return `${host}/waInstance${creds.idInstance}/${method}/${creds.apiTokenInstance}`;
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  const body = await res.text();

  let data: unknown = null;
  try {
    data = body ? JSON.parse(body) : null;
  } catch {
    data = body;
  }

  if (!res.ok) {
    let message = res.statusText;
    if (typeof data === 'string' && data) message = data;
    if (data && typeof data === 'object' && 'message' in data) message = String(data.message);
    throw new Error(`HTTP ${res.status}: ${message}`);
  }

  return data as T;
}

export function getStateInstance(creds: Credentials) {
  return request<StateInstanceResponse>(methodUrl(creds, 'getStateInstance'));
}

export function sendMessage(creds: Credentials, chatId: string, message: string) {
  return request<SendMessageResponse>(methodUrl(creds, 'sendMessage'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId, message }),
  });
}

export function receiveNotification(creds: Credentials, timeout: number, signal?: AbortSignal) {
  const url = `${methodUrl(creds, 'receiveNotification')}?receiveTimeout=${timeout}`;
  return request<Notification | null>(url, { signal });
}

export function deleteNotification(creds: Credentials, receiptId: number, signal?: AbortSignal) {
  const url = `${methodUrl(creds, 'deleteNotification')}/${receiptId}`;
  return request<{ result: boolean }>(url, { method: 'DELETE', signal });
}

export function extractText(data?: MessageData) {
  switch (data?.typeMessage) {
    case 'textMessage':
      return data.textMessageData?.textMessage ?? null;
    case 'extendedTextMessage':
    case 'quotedMessage':
      return data.extendedTextMessageData?.text ?? null;
    default:
      return null;
  }
}
