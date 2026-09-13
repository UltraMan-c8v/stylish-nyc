/**
 * ============================================================================
 * NOT LEGAL ADVICE. Have a lawyer review both documents before publishing.
 * ============================================================================
 *
 * These are written specifically against what this site actually does today:
 * no forms of any kind, a theme preference in local storage, no analytics, no
 * cookies, no payments. Booking is by telephone only. If any of that changes,
 * and adding online booking would change it, these have to change too.
 *
 * Search for PLACEHOLDER. The legal entity name, effective date, cancellation
 * window, and the hosting and email providers all need real values.
 */

export type LegalDoc = {
  slug: string
  title: string
  description: string
  updated: string
  intro: string[]
  sections: { heading: string; body: string[] }[]
}

/** PLACEHOLDER. Use the registered entity name, e.g. "Stylish NYC LLC". */
const ENTITY = 'Stylish NYC'

/** PLACEHOLDER. Set to the date you actually publish. */
const UPDATED = 'Not yet published'

/**
 * PLACEHOLDER. Replace with the real cancellation window.
 *
 * The prices page used to carry a fuller policy, including a line about taking
 * a card from new clients. That came down because the salon does not currently
 * hold cards, and a stated policy that is not enforced is worse than none. This
 * clause stays: asking for notice is reasonable regardless, and it never
 * claimed a card was on file.
 */
const CANCELLATION_WINDOW = '24 hours'

export const terms: LegalDoc = {
  slug: 'terms',
  title: 'Terms of service',
  description:
    'The terms that apply when you use the Stylish NYC website and when you book an appointment with us by phone.',
  updated: UPDATED,
  intro: [
    `These terms apply when you use this website and when you book an appointment with us. They are between you and ${ENTITY}, a hair salon in New York, New York.`,
    'If you do not agree with them, please do not use the site or book with us.',
  ],
  sections: [
    {
      heading: 'How booking works',
      body: [
        'Appointments are made by telephone. This website does not take bookings and carries no form: it is here to show you the work, the services and the prices.',
        'A time is yours once we have agreed it on the call. We may decline a booking, or suggest a different service to the one asked for, if we think it is the wrong fit for your hair.',
      ],
    },
    {
      heading: 'Cancellations and missed appointments',
      body: [
        `Once an appointment is confirmed, please give us at least ${CANCELLATION_WINDOW} notice if you need to change or cancel it. Late cancellations and missed appointments may be charged.`,
        'If we have to move your appointment, we will tell you as early as we can and offer the next available time.',
      ],
    },
    {
      heading: 'Prices',
      body: [
        'Prices on this site are starting prices in US dollars and are the position on the day of publication. They are not a quote.',
        'Colour and any longer service is quoted at consultation, because the final figure depends on your hair rather than on the name of the service. We will tell you the price before we start, and we will tell you again if anything during the appointment changes it.',
      ],
    },
    {
      heading: 'Your hair, allergies and skin tests',
      body: [
        'Tell us about any allergy, scalp condition, medication, recent chemical service or home colour before we begin. It affects what is safe to do and what result is achievable.',
        'Colour services may require a skin allergy test before your appointment. If we ask for one and it is not done in time, we may not be able to carry out the service.',
        'We will be straight with you about what is realistically achievable on your hair. Photographs of other people are a reference, not a promise.',
      ],
    },
    {
      heading: 'Using this site',
      body: [
        'You may use this site to read about the salon and to find our contact details. Please do not attempt to disrupt it, access parts of it that are not public, or use automated systems to scrape or overload it.',
      ],
    },
    {
      heading: 'Content and photography',
      body: [
        'The text, layout, photography and marks on this site belong to us or are used with permission, and may not be copied or reused without our written agreement.',
        'Some imagery on this site is illustrative rather than a photograph of a specific client or a guaranteed result.',
      ],
    },
    {
      heading: 'Links to other sites',
      body: [
        'Where we link to another site, such as our Instagram profile, we are not responsible for its content or its handling of your information.',
      ],
    },
    {
      heading: 'Liability',
      body: [
        'We provide this website as it is. We do not promise that it will always be available or free of errors.',
        'Nothing in these terms limits any liability that cannot be limited by law, including liability for personal injury caused by negligence. Beyond that, our liability arising from your use of the website is limited to the extent the law allows.',
      ],
    },
    {
      heading: 'Governing law',
      body: [
        'These terms are governed by the laws of the State of New York, and the courts of New York County will handle any dispute arising from them.',
      ],
    },
    {
      heading: 'Changes',
      body: [
        'We may update these terms. The date at the top of this page shows when they last changed, and the version published here is the one that applies.',
      ],
    },
  ],
}

export const privacy: LegalDoc = {
  slug: 'privacy',
  title: 'Privacy policy',
  description:
    'What Stylish NYC does and does not collect when you use this website, and what we do with the details you give us when you book by phone.',
  updated: UPDATED,
  intro: [
    `This explains what ${ENTITY} does with information collected through this website.`,
    'The short version: this website collects almost nothing. There is no form on it, no account to create and nothing to submit. What we hold about you comes from the phone call when you book.',
  ],
  sections: [
    {
      heading: 'What the website collects',
      body: [
        'Almost nothing. There is no contact form, no newsletter signup, no account and no payment on this site, so there is nothing for you to submit to us through it.',
        'The site stores one preference in your browser, which is whether you chose the light or dark version of the page. It stays on your device, we cannot read it, and it is not used to identify or track you.',
        'Our hosting provider keeps standard server logs, which typically include IP address, browser type and the pages requested. These are used to keep the site running and secure.',
      ],
    },
    {
      heading: 'What we collect when you book',
      body: [
        'When you call to book we take your name and a contact number, and we note the service you are booked in for.',
        'For colour work we also keep a record of what was used on your hair, because starting the next appointment without that history is how colour goes wrong.',
        'Please do not send us medical records, financial details or identification documents by email. We do not need them.',
      ],
    },
    {
      heading: 'What we do not do',
      body: [
        'There are no advertising cookies, no analytics trackers and no social media pixels on this site.',
        'We do not sell or rent your information, and we do not share it for anyone else to use for their own marketing.',
        'We do not take payment through this site, so no card details ever reach it.',
        'We contact you about an appointment you have booked, and nothing else unless you ask us to.',
      ],
    },
    {
      heading: 'Who else sees it',
      body: [
        'Only the people who need it to run the salon.',
        'The website is served by PLACEHOLDER, our hosting provider, and our email runs through PLACEHOLDER. Replace both with the real providers before publishing, and check each one is named accurately.',
        'We will disclose information if the law requires it, or to establish or defend a legal claim.',
      ],
    },
    {
      heading: 'How long we keep it',
      body: [
        'Enquiries that do not turn into an appointment are not kept.',
        'Client records are kept for as long as you are a client and for a reasonable period afterwards, so that colour history is available if you return, and so we can meet our tax and legal obligations.',
      ],
    },
    {
      heading: 'Your choices',
      body: [
        'You can ask us for a copy of what we hold about you, ask us to correct it if it is wrong, or ask us to delete it. Write to us using the contact details below and we will respond within a reasonable time.',
        'Deleting your record may mean we lose the colour history that makes your next appointment easier, so we will confirm before we act on it.',
        'Depending on where you live, you may have additional rights under state or national privacy law. Ask us and we will honour anything that applies to you.',
      ],
    },
    {
      heading: 'Security',
      body: [
        'The site is served over an encrypted connection, and access to appointment information is limited to the people who need it.',
        'No system is perfect. If something goes wrong that affects your information, we will tell you and the relevant authorities where the law requires it.',
      ],
    },
    {
      heading: 'Children',
      body: [
        'This site is not directed at children, and it collects nothing from anyone who visits it. A parent or guardian should make the booking for a child.',
      ],
    },
    {
      heading: 'Changes',
      body: [
        'If we change how we handle information, we will update this page and change the date at the top.',
      ],
    },
  ],
}

export const legalDocs = { terms, privacy } as const
