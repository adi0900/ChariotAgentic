const FORM_CONFIG = {
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

const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);
const normalizeString = (value) => (typeof value === 'string' ? value.trim() : '');

const extractMessage = (value) => {
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

const validateSubmission = (formType, data) => {
  const fieldErrors = {};
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

const buildPayload = (formType, data) => {
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

const parseBody = (body) => {
  if (typeof body !== 'string') return body || {};
  if (!body.trim()) return {};
  return JSON.parse(body);
};

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(405).json({
      ok: false,
      error: 'Method not allowed.',
    });
    return;
  }

  try {
    const envelope = parseBody(req.body);
    const formType = normalizeString(envelope?.formType);

    if (!(formType in FORM_CONFIG)) {
      res.status(400).json({
        ok: false,
        error: 'Unknown form type.',
      });
      return;
    }

    if (!isObject(envelope?.data)) {
      res.status(400).json({
        ok: false,
        error: 'Invalid form payload.',
      });
      return;
    }

    const fieldErrors = validateSubmission(formType, envelope.data);
    if (Object.keys(fieldErrors).length > 0) {
      res.status(400).json({
        ok: false,
        error: 'Please correct the highlighted fields and try again.',
        fieldErrors,
      });
      return;
    }

    const config = FORM_CONFIG[formType];
    const formId = normalizeString(process.env[config.envKey]) || config.defaultFormId;

    if (!formId) {
      res.status(500).json({
        ok: false,
        error: 'Form target is not configured on the server.',
      });
      return;
    }

    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildPayload(formType, envelope.data)),
    });

    const responseBody = await response.json().catch(() => null);

    if (!response.ok) {
      res.status(response.status >= 500 ? 502 : 400).json({
        ok: false,
        error: extractMessage(responseBody) || FALLBACK_UPSTREAM_ERROR,
      });
      return;
    }

    res.status(200).json({ok: true});
  } catch (error) {
    console.error('Forms API failed:', error);
    res.status(500).json({
      ok: false,
      error: 'Unable to submit your request right now. Please try again shortly.',
    });
  }
}
