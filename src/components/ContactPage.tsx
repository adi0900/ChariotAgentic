import React, {useState} from 'react';
import {getFormErrorMessage, submitForm} from '../lib/forms';

const contactItems = [
  {label: 'Email', value: 'hello@chariotagentic.com'},
  {label: 'X', value: '@CAgentic'},
  {label: 'Response window', value: 'Within 24 hours'},
];

export default function ContactPage({onSuccess}: {onSuccess?: (msg?: string) => void}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setErrorMessage('');
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await submitForm('contact', formData);
      setFormData({name: '', email: '', message: ''});
      onSuccess?.("Your message has been sent successfully. We'll get back to you as soon as possible!");
    } catch (error) {
      console.error(error);
      setErrorMessage(getFormErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative flex w-full flex-1 items-start justify-center overflow-hidden px-4 py-6 text-white sm:px-6 sm:py-8 md:px-8 md:py-10 lg:min-h-0 lg:items-center">
      <div className="relative z-10 mx-auto flex w-full max-w-[22rem] flex-col gap-5 sm:max-w-[38rem] sm:gap-6 md:max-w-4xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs font-medium text-white/72 backdrop-blur-xl">
            Contact
          </div>
          <h1 className="text-[2.35rem] font-semibold tracking-[-0.07em] sm:text-[3.4rem] md:text-[4.3rem] text-white">
            Reach the CHARIOT team.
          </h1>
          <p className="mt-4 text-[0.98rem] leading-[1.7] text-white/70 sm:text-[1.05rem] md:text-lg">
            Questions about the product, launch access, partnerships, or creator workflows. Send a message and we will point you to the right next step.
          </p>
        </div>

        <div className="rounded-[1.6rem] border border-white/14 bg-white/8 p-4 shadow-[0_14px_38px_rgba(7,20,43,0.16)] backdrop-blur-xl sm:p-6">
          <div className="mb-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {contactItems.map((item) => (
              <div key={item.label} className="rounded-[1.2rem] border border-white/12 bg-white/8 p-4 sm:p-[1.125rem]">
                <div className="text-xs font-medium uppercase tracking-[0.08em] text-white/48">{item.label}</div>
                <div className="mt-2 text-sm font-medium text-white sm:text-base">{item.value}</div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 border-t border-white/12 pt-5 sm:pt-6"
          >
            {errorMessage ? (
              <p className="text-sm text-red-200" role="alert">
                {errorMessage}
              </p>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-white">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-white/54">Name</span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/40"
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-white">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-white/54">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/40"
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>
            <label className="flex flex-col gap-2 text-white">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-white/54">Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/40"
                placeholder="How can we help you?"
                required
              />
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="liquid-cta mt-2 inline-flex w-full items-center justify-center rounded-[1.1rem] border border-white/14 bg-[#111111] px-6 py-3 text-sm font-medium text-white shadow-[0_12px_40px_rgba(0,0,0,0.34)] sm:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <span className="relative z-10 text-white">{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
