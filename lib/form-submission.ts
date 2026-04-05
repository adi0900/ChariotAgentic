export type FormType = 'hero' | 'waitlist' | 'contact' | 'demo';

type SubmissionEnvelope = {
  formType?: unknown;
  data?: unknown;
};

type SubmissionBody =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: string;
      fieldErrors?: Record<string, string>;
    };

export type SubmissionResult = {
  status: number;
  body: SubmissionBody;
};

type FormConfig = {
  envKey: string;
  defaultFormId: string;
  subject: string;
  source: string;
};

const FORM_CONFIG: Record<FormType, FormConfig> = {
  hero: {
    envKey: 'FORMSPREE_FORM_HERO',
    defaultFormId: 'xlgojzjw',
    subject: 'New Home Page Signup',
    source: 'homepage_hero',
  },
  waitlist: {
    envKey: 'FORMSPREE_FORM_WAITLIST',
    defaultFormId: 'mgopkzkr',
    subject: 'New Waitlist Signup',
    source: 'waitlist',
  },
  contact: {
    envKey: 'FORMSPREE_FORM_CONTACT',
    defaultFormId: 'mkoprzre',
    subject: 'New Contact Inquiry',
    source: 'contact',
  },
  demo: {
    envKey: 'FORMSPREE_FORM_DEMO',
    defaultFormId: 'mgopkzkr',
    subject: 'New Demo Walkthrough Request',
    source: 'demo',
  },
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FALLBACK_UPSTREAM_ERROR = 'Unable to submit your request right now. Please try again in a moment.';

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const normalizeString = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const extractMessage = (value: unknown): string | null => {
  const asString = normalizeString(value);
  if (asString) return asString;

  if (Array.isArray(value)) {
    const messages = value.map(extractMessage).filter(Boolean);
    return messages.length > 0 ? messages.join(', ') : null;
  }

  if (isObject(value)) {
    return extractMessage(value.error) || extractMessage(value.message) || extractMessage(value.errors);
  }

  return null;
};

const getErrorMessage = (body: unknown, fallback: string) => {
  return extractMessage(body) || fallback;
};

const validateSubmission = (formType: FormType, data: Record<string, unknown>) => {
  const fieldErrors: Record<string, string> = {};
  const email = normalizeString(data.email);

  if (!email) {
    fieldErrors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(email)) {
    fieldErrors.email = 'Enter a valid email address.';
  }

  if (formType === 'contact') {
    if (!normalizeString(data.name)) fieldErrors.name = 'Name is required.';
    if (!normalizeString(data.message)) fieldErrors.message = 'Message is required.';
  }

  if (formType === 'demo') {
    if (!normalizeString(data.fullName)) fieldErrors.fullName = 'Name is required.';
    if (!normalizeString(data.message)) fieldErrors.message = 'Tell us what you want from the demo.';
  }

  if (formType === 'waitlist') {
    const creatorType = normalizeString(data.creatorType);
    if (creatorType && creatorType !== 'new' && creatorType !== 'existing') {
      fieldErrors.creatorType = 'Choose a valid creator type.';
    }
  }

  return fieldErrors;
};

const buildPayload = (formType: FormType, data: Record<string, unknown>) => {
  const config = FORM_CONFIG[formType];
  const email = normalizeString(data.email);

  if (formType === 'hero') {
    return {
      _subject: config.subject,
      form_source: config.source,
      email,
    };
  }

  if (formType === 'waitlist') {
    return {
      _subject: config.subject,
      form_source: config.source,
      email,
      creatorType: normalizeString(data.creatorType) || 'existing',
      igHandle: normalizeString(data.igHandle) || 'Not provided',
    };
  }

  if (formType === 'contact') {
    return {
      _subject: config.subject,
      form_source: config.source,
      name: normalizeString(data.name),
      email,
      message: normalizeString(data.message),
    };
  }

  return {
    _subject: config.subject,
    form_source: config.source,
    fullName: normalizeString(data.fullName),
    email,
    platform: normalizeString(data.platform),
    niche: normalizeString(data.niche),
    message: normalizeString(data.message),
  };
};

export async function submitFormRequest(
  envelope: SubmissionEnvelope,
  fetchImpl: typeof fetch = fetch,
): Promise<SubmissionResult> {
  const formType = normalizeString(envelope.formType) as FormType;

  if (!(formType in FORM_CONFIG)) {
    return {
      status: 400,
      body: {
        ok: false,
        error: 'Unknown form type.',
      },
    };
  }

  if (!isObject(envelope.data)) {
    return {
      status: 400,
      body: {
        ok: false,
        error: 'Invalid form payload.',
      },
    };
  }

  const fieldErrors = validateSubmission(formType, envelope.data);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 400,
      body: {
        ok: false,
        error: 'Please correct the highlighted fields and try again.',
        fieldErrors,
      },
    };
  }

  const config = FORM_CONFIG[formType];
  const formId = normalizeString(process.env[config.envKey]) || config.defaultFormId;

  if (!formId) {
    return {
      status: 500,
      body: {
        ok: false,
        error: 'Form target is not configured on the server.',
      },
    };
  }

  try {
    const response = await fetchImpl(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildPayload(formType, envelope.data)),
    });

    const responseBody = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        status: response.status >= 500 ? 502 : 400,
        body: {
          ok: false,
          error: getErrorMessage(
            responseBody,
            FALLBACK_UPSTREAM_ERROR,
          ),
        },
      };
    }

    return {
      status: 200,
      body: {
        ok: true,
      },
    };
  } catch (error) {
    console.error('Form submission failed:', error);
    return {
      status: 502,
      body: {
        ok: false,
        error: 'Unable to reach the submission service right now. Please try again shortly.',
      },
    };
  }
}
