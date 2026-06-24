import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Elara Silver',
  description: 'Understand how Elara Silver collects, uses, and protects your personal information when you shop with us.',
};

const sections = [
  {
    title: '1. Introduction',
    content: `Elara Silver ("we", "our", "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website elarasilver.com and place orders with us. Please read this policy carefully. If you disagree with its terms, please discontinue use of our website immediately. We reserve the right to make changes to this policy at any time, and we encourage you to review it periodically.`,
  },
  {
    title: '2. Information We Collect',
    content: `We collect personal information that you voluntarily provide when registering an account, placing an order, subscribing to our newsletter, or contacting our support team. This includes: full name, email address, phone number, shipping and billing address, payment information (processed securely through third-party gateways — we do not store raw card data), order history and preferences, and any communications you send us. We also automatically collect certain technical data including IP address, browser type, device identifiers, pages visited, and session duration through cookies and analytics tools.`,
  },
  {
    title: '3. How We Use Your Information',
    content: `The information we collect is used to: process and fulfil your orders; send order confirmations, shipping updates, and delivery notifications; provide personalised product recommendations based on your browsing and purchase history; send promotional emails and newsletters if you have opted in; respond to customer service inquiries; prevent fraudulent transactions and ensure payment security; improve our website's performance, design, and user experience; and comply with applicable laws and regulations.`,
  },
  {
    title: '4. Cookies & Tracking Technologies',
    content: `Our website uses cookies — small text files stored on your device — to enhance your browsing experience. Cookies help us remember your preferences, maintain your session, track cart contents, and analyse traffic patterns. We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period). You can control cookie settings through your browser's preferences. Note that disabling cookies may affect the functionality of certain features on our website.`,
  },
  {
    title: '5. Sharing of Your Information',
    content: `We do not sell, trade, or rent your personal information to third parties for marketing purposes. We may share your data with: trusted service providers who assist in operating our website and fulfilling orders (e.g., payment processors, courier companies, email service providers) under strict confidentiality agreements; analytics providers such as Google Analytics in anonymised, aggregated form; legal authorities when required by applicable law, court order, or government regulation; and business successors in the event of a merger, acquisition, or sale of assets, where the acquiring party agrees to honour this privacy policy.`,
  },
  {
    title: '6. Data Security',
    content: `We implement a variety of industry-standard security measures to maintain the safety of your personal information. These include SSL encryption for all data transmitted through our website, secure payment processing via PCI-DSS compliant third-party gateways, access controls limiting staff who can view customer data, and regular security audits and vulnerability assessments. While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: '7. Data Retention',
    content: `We retain your personal information for as long as your account is active or as needed to provide you with our services. We may retain certain information for longer periods where required by law, for legitimate business purposes such as fraud prevention, or to resolve disputes. Order records are typically retained for a minimum of 7 years in accordance with Indian financial record-keeping regulations. You may request deletion of your account and associated data at any time, subject to legal retention requirements.`,
  },
  {
    title: '8. Your Rights',
    content: `Subject to applicable law, you have the right to: access the personal information we hold about you; request correction of inaccurate or incomplete information; request deletion of your personal information (right to erasure); object to or restrict the processing of your data in certain circumstances; withdraw consent to marketing communications at any time by clicking "unsubscribe" in any email or contacting us directly; and receive a copy of your data in a portable, machine-readable format. To exercise any of these rights, please contact us at privacy@elarasilver.com.`,
  },
  {
    title: '9. Third-Party Websites & Links',
    content: `Our website may contain links to third-party websites, social media platforms, or partner services for your convenience and information. Please be aware that we are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of every website you visit. The inclusion of any link does not imply endorsement by Elara Silver of the linked site or its operators.`,
  },
  {
    title: '10. Children\'s Privacy',
    content: `Our website and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that a child under 18 has provided us with personal information without parental consent, we will take steps to delete such information promptly. If you are a parent or guardian and believe your child has provided us with personal data, please contact us at privacy@elarasilver.com.`,
  },
  {
    title: '11. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will notify you by updating the "Last Updated" date at the top of this page and, where appropriate, by sending you an email notification. We encourage you to review this policy periodically to stay informed about how we are protecting your information.`,
  },
  {
    title: '12. Contact Us',
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Data Privacy Officer at privacy@elarasilver.com, or in writing to: Elara Silver — Data Privacy, Colaba Causeway, Block A, Mumbai, MH 400001, India. We will respond to all privacy-related inquiries within 30 business days.`,
  },
];

const principles = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    label: 'Data Security',
    desc: 'SSL encryption on all transactions',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg>
    ),
    label: 'No Data Selling',
    desc: 'We never sell your information',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    label: 'Your Rights',
    desc: 'Access, correct, or delete your data',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Opt-Out Anytime',
    desc: 'Unsubscribe from emails at any time',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white text-black min-h-screen pt-28 pb-24">
      {/* Header */}
      <section className="relative px-6 md:px-12 max-w-4xl mx-auto text-center space-y-5 pb-16">
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="h-[1px] w-10 bg-black/20" />
          <span className="text-[10px] font-semibold tracking-[0.45em] text-[#0B5E64] uppercase">Legal</span>
          <div className="h-[1px] w-10 bg-black/20" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase leading-tight">
          Privacy<br />Policy
        </h1>
        <p className="text-black/45 font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Your privacy matters to us. Here's exactly how we collect, use, and protect your personal information.
        </p>
        <p className="text-[11px] text-black/30 font-light tracking-widest uppercase">
          Last Updated: June 2025
        </p>
      </section>

      {/* Privacy Principles */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {principles.map((p, i) => (
            <div
              key={i}
              className="border border-black/8 p-6 text-center group hover:border-[#0B5E64] hover:bg-[#0B5E64]/4 transition-all duration-500 space-y-3"
            >
              <div className="w-10 h-10 mx-auto flex items-center justify-center text-[#0B5E64] bg-[#0B5E64]/10 group-hover:bg-[#0B5E64] group-hover:text-white transition-all duration-500">
                {p.icon}
              </div>
              <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-black group-hover:text-[#0B5E64] transition-colors duration-300">
                {p.label}
              </div>
              <div className="text-[10px] text-black/40 font-light leading-relaxed">
                {p.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent mb-16" />
      </div>

      {/* Sections */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 space-y-12">
        {sections.map((section, i) => (
          <div
            key={i}
            className="group border-l-2 border-transparent hover:border-[#0B5E64] pl-6 transition-all duration-500"
          >
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-black mb-3 group-hover:text-[#0B5E64] transition-colors duration-300">
              {section.title}
            </h2>
            <p className="text-black/60 font-light leading-relaxed text-sm md:text-base">
              {section.content}
            </p>
          </div>
        ))}
      </section>

      {/* Footer CTA */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 mt-20">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent mb-12" />
        <div className="bg-[#0B5E64]/5 border border-[#0B5E64]/15 p-8 md:p-12 text-center space-y-4">
          <span className="text-[10px] font-semibold tracking-[0.4em] text-[#0B5E64] uppercase block">Your Data, Your Rights</span>
          <h3 className="text-xl font-bold tracking-wider uppercase text-black">Questions about your privacy?</h3>
          <p className="text-black/50 text-sm font-light max-w-sm mx-auto">
            Reach out to our Data Privacy Officer and we'll respond within 30 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <a
              href="mailto:privacy@elarasilver.com"
              className="inline-block px-8 py-3 bg-[#0B5E64] text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-black transition-colors duration-300"
            >
              Email Privacy Team
            </a>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 border border-black text-black text-xs font-bold tracking-[0.25em] uppercase hover:bg-black hover:text-white transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
