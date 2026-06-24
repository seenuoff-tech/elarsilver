import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund & Return Policy | Elara Silver',
  description: 'Learn about Elara Silver\'s hassle-free 30-day refund and return policy for all sterling silver jewellery orders.',
};

const highlights = [
  { icon: '30', label: 'Day Return Window', desc: 'On all unworn, unaltered pieces' },
  { icon: '7', label: 'Day Refund Processing', desc: 'Back to your original payment method' },
  { icon: '0', label: 'Return Shipping Cost', desc: 'We bear all return courier charges' },
  { icon: '∞', label: 'Exchange Options', desc: 'Switch size, style, or collection' },
];

const sections = [
  {
    title: '1. Eligibility for Returns',
    content: `We accept returns within 30 days of the delivery date. To be eligible, items must be in their original, unworn condition with no signs of use, alteration, or damage. Items must be returned in their original Elara Silver packaging including the velvet pouch, jewellery box, authenticity certificate, and any accompanying accessories. Items that have been resized, engraved, custom-made, or purchased during final-sale promotions are not eligible for return.`,
  },
  {
    title: '2. Non-Returnable Items',
    content: `The following items are strictly non-returnable: bespoke or personalised orders (custom engravings, name-stamped pieces, made-to-measure sizing); items purchased during final sale or clearance events; items showing visible signs of wear, damage, or alteration; items without original packaging or certificate of authenticity; and gift cards. For hygiene reasons, earrings are only accepted for return if unused and in original sealed packaging.`,
  },
  {
    title: '3. How to Initiate a Return',
    content: `To initiate a return, please email returns@elarasilver.com with your order number, the item(s) you wish to return, and the reason for return. Our team will respond within 24 business hours with a prepaid return shipping label and packaging instructions. Please do not ship items back without prior authorisation, as unauthorised returns may not be processed. Once we receive and inspect the returned item, we will notify you of the approval or rejection of your refund.`,
  },
  {
    title: '4. Refund Processing',
    content: `Upon approval of your return, refunds will be processed to your original payment method within 7–10 business days. Credit/debit card refunds may take an additional 3–5 business days to reflect depending on your bank. UPI and digital wallet refunds are typically processed within 2–3 business days. Original shipping charges (if any) are non-refundable unless the return is due to a defective or incorrect item sent by Elara Silver.`,
  },
  {
    title: '5. Exchanges',
    content: `If you wish to exchange your item for a different size, style, or design from our collection, please indicate this when initiating your return. Exchanges are subject to product availability. If the exchanged item is of a higher value, you will be required to pay the price difference. If of a lower value, the difference will be refunded to your original payment method. Exchanges follow the same eligibility conditions as standard returns.`,
  },
  {
    title: '6. Damaged or Defective Items',
    content: `If you receive a damaged, defective, or incorrect item, please contact us at quality@elarasilver.com within 48 hours of delivery with photographs of the item and packaging. We will arrange an immediate replacement or full refund at no additional cost to you, including return shipping. Elara Silver takes quality control very seriously and each piece is inspected before dispatch; however, we acknowledge that issues may occasionally arise.`,
  },
  {
    title: '7. Ring Resizing',
    content: `Elara Silver offers one complimentary ring resizing within 60 days of purchase. Please note that resizing may affect certain designs with continuous patterns or stones set throughout the band. Our artisans will advise you if resizing is not recommended for a specific design. After the complimentary resize, additional resizing services are available at a nominal charge. Resized rings may not be eligible for return once altered.`,
  },
  {
    title: '8. International Orders',
    content: `For international orders, returns are accepted under the same eligibility criteria. However, the customer is responsible for return shipping costs and any applicable customs duties. We recommend using a trackable courier service, as Elara Silver is not responsible for items lost in transit during return shipping. International refunds may take additional processing time due to currency conversion and cross-border banking procedures.`,
  },
  {
    title: '9. Gift Returns',
    content: `If you received an Elara Silver piece as a gift and wish to return or exchange it, please contact us with the order details if available, or the gift receipt. We can offer store credit equal to the purchase price of the item. Original purchaser refunds will be directed back to the original payment method for standard returns.`,
  },
  {
    title: '10. Contact for Return Queries',
    content: `For all return and refund queries, please reach out to our Client Services team at returns@elarasilver.com or call +91 (22) 5557-9250 (Monday–Saturday, 10:00–19:00 IST). We aim to make every return experience as smooth and effortless as the original shopping experience.`,
  },
];

export default function RefundReturnPolicyPage() {
  return (
    <div className="bg-white text-black min-h-screen pt-28 pb-24">
      {/* Header */}
      <section className="relative px-6 md:px-12 max-w-4xl mx-auto text-center space-y-5 pb-16">
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="h-[1px] w-10 bg-black/20" />
          <span className="text-[10px] font-semibold tracking-[0.45em] text-[#0B5E64] uppercase">Client Policy</span>
          <div className="h-[1px] w-10 bg-black/20" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase leading-tight">
          Refund &amp;<br />Return Policy
        </h1>
        <p className="text-black/45 font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          We stand behind every piece we craft. If something isn't perfect, we'll make it right — no questions asked.
        </p>
        <p className="text-[11px] text-black/30 font-light tracking-widest uppercase">
          Last Updated: June 2025
        </p>
      </section>

      {/* Highlight Cards */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="bg-[#0B5E64]/5 border border-[#0B5E64]/10 p-6 text-center group hover:bg-[#0B5E64] transition-all duration-500"
            >
              <div className="text-3xl font-extrabold text-[#0B5E64] group-hover:text-white transition-colors duration-500 mb-1">
                {h.icon}
              </div>
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-black group-hover:text-white/90 transition-colors duration-500">
                {h.label}
              </div>
              <div className="text-[10px] text-black/40 group-hover:text-white/60 transition-colors duration-500 mt-1 font-light">
                {h.desc}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0B5E64]/5 border border-[#0B5E64]/15 p-8 space-y-3">
            <span className="text-[10px] font-semibold tracking-[0.4em] text-[#0B5E64] uppercase block">Start a Return</span>
            <h3 className="text-lg font-bold tracking-wider uppercase text-black">Ready to return?</h3>
            <p className="text-black/50 text-sm font-light">
              Email us with your order number and we'll handle the rest.
            </p>
            <a
              href="mailto:returns@elarasilver.com"
              className="inline-block mt-2 px-6 py-3 bg-[#0B5E64] text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-black transition-colors duration-300"
            >
              Email Returns Team
            </a>
          </div>
          <div className="bg-black/3 border border-black/8 p-8 space-y-3">
            <span className="text-[10px] font-semibold tracking-[0.4em] text-black/40 uppercase block">Have Questions?</span>
            <h3 className="text-lg font-bold tracking-wider uppercase text-black">Talk to us</h3>
            <p className="text-black/50 text-sm font-light">
              Our concierge team is available 6 days a week to assist you.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-2 px-6 py-3 border border-black text-black text-xs font-bold tracking-[0.25em] uppercase hover:bg-black hover:text-white transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
