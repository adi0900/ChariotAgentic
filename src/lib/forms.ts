import type {FormType} from '../../lib/form-submission';

type FormSuccess = {
  ok: true;
};

type FormFailure = {
  ok: false;
  error: string;
  fieldErrors?: Record<string, string>;
};

type FormResponse = FormSuccess | FormFailure;

const isFailure = (result: FormResponse | null): result is FormFailure =>
  Boolean(result && !result.ok);

const FALLBACK_ERROR_MESSAGE = 'Unable to submit your request right now. Please try again shortly.';

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const normalizeErrorMessage = (value: unknown): string | null => {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  }

  if (value instanceof Error) {
    return normalizeErrorMessage(value.message);
  }

  if (Array.isArray(value)) {
    const messages = value.map(normalizeErrorMessage).filter(Boolean);
    return messages.length > 0 ? messages.join(', ') : null;
  }

  if (isObject(value)) {
    return (
      normalizeErrorMessage(value.error) ||
      normalizeErrorMessage(value.message) ||
      normalizeErrorMessage(value.errors) ||
      null
    );
  }

  return null;
};

export class FormSubmissionError extends Error {
  fieldErrors?: Record<string, string>;

  constructor(message: unknown, fieldErrors?: Record<string, string>) {
    super(normalizeErrorMessage(message) || FALLBACK_ERROR_MESSAGE);
    this.name = 'FormSubmissionError';
    this.fieldErrors = fieldErrors;
  }
}

export async function submitForm(formType: FormType, data: Record<string, unknown>) {
  const response = await fetch('/api/forms', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({formType, data}),
  });

  const result = (await response.json().catch(() => null)) as FormResponse | null;
  const errorResult = isFailure(result) ? result : null;

  if (!response.ok || !result || errorResult) {
    throw new FormSubmissionError(
      errorResult?.error || result || FALLBACK_ERROR_MESSAGE,
      errorResult?.fieldErrors,
    );
  }
}

export const getFormErrorMessage = (error: unknown) =>
  normalizeErrorMessage(error) || FALLBACK_ERROR_MESSAGE;
