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

export class FormSubmissionError extends Error {
  fieldErrors?: Record<string, string>;

  constructor(message: string, fieldErrors?: Record<string, string>) {
    super(message);
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
      errorResult?.error || 'Unable to submit your request right now. Please try again shortly.',
      errorResult?.fieldErrors,
    );
  }
}

export const getFormErrorMessage = (error: unknown) =>
  error instanceof Error
    ? error.message
    : 'Unable to submit your request right now. Please try again shortly.';
