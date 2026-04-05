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

const FORM_CONFIG: Record<
  FormType,
  {
    formId: string;
    buildPayload: (data: Record<string, unknown>) => Record<string, unknown>;
  }
> = {
  hero: {
    formId: 'xlgojzjw',
    buildPayload: (data) => ({
      _subject: 'New Home Page Signup',
      form_source: 'homepage_hero',
      email: data.email,
    }),
  },
  waitlist: {
    formId: 'mgopkzkr',
    buildPayload: (data) => ({
      _subject: 'New Waitlist Signup',
      form_source: 'waitlist',
      email: data.email,
      creatorType: data.creatorType || 'existing',
      igHandle: data.igHandle || 'Not provided',
    }),
  },
  contact: {
    formId: 'mkoprzre',
    buildPayload: (data) => ({
      _subject: 'New Contact Inquiry',
      form_source: 'contact',
      name: data.name,
      email: data.email,
      message: data.message,
    }),
  },
  demo: {
    formId: 'mgopkzkr',
    buildPayload: (data) => ({
      _subject: 'New Demo Walkthrough Request',
      form_source: 'demo',
      fullName: data.fullName,
      email: data.email,
      platform: data.platform,
      niche: data.niche,
      message: data.message,
    }),
  },
};

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

const parseResponse = async (response: Response) =>
  (await response.json().catch(() => null)) as FormResponse | Record<string, unknown> | null;

const submitViaApi = async (formType: FormType, data: Record<string, unknown>) => {
  const response = await fetch('/api/forms', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({formType, data}),
  });

  const result = (await parseResponse(response)) as FormResponse | null;
  const errorResult = isFailure(result) ? result : null;

  if (!response.ok || !result || errorResult) {
    throw new FormSubmissionError(
      errorResult?.error || result || FALLBACK_ERROR_MESSAGE,
      errorResult?.fieldErrors,
    );
  }
};

const submitDirectToFormspree = async (formType: FormType, data: Record<string, unknown>) => {
  const config = FORM_CONFIG[formType];
  const response = await fetch(`https://formspree.io/f/${config.formId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config.buildPayload(data)),
  });

  const result = await parseResponse(response);

  if (!response.ok) {
    throw new FormSubmissionError(result || FALLBACK_ERROR_MESSAGE);
  }
};

export async function submitForm(formType: FormType, data: Record<string, unknown>) {
  try {
    await submitViaApi(formType, data);
  } catch (error) {
    if (error instanceof FormSubmissionError && error.fieldErrors) {
      throw error;
    }

    await submitDirectToFormspree(formType, data);
  }
}

export const getFormErrorMessage = (error: unknown) =>
  normalizeErrorMessage(error) || FALLBACK_ERROR_MESSAGE;
