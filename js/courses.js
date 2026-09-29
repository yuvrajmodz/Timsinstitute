/* ============================================================
   TIMS INSTITUTE — Course Data & Courses Page Logic
   ============================================================ */

'use strict';

const COURSES = [
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    category: 'marketing',
    shortDesc: 'Master SEO, Social Media Marketing, Content Strategy, Google & Meta Ads, and full-funnel digital campaigns.',
    duration: '6 Months',
    fee: '₹30,000',
    feeNote: 'complete course',
    installment: 'EMI Available',
    icon: 'digital',
    color: 'icon-coral',
    syllabus: [
      'Introduction to Digital Marketing',
      'Website & Landing Page Strategy',
      'Search Engine Optimization (SEO)',
      'Google Search Console & Analytics',
      'Social Media Marketing (SMM)',
      'Meta Ads (Facebook & Instagram)',
      'Google Ads & YouTube Campaigns',
      'Email & WhatsApp Marketing',
      'Affiliate & Influencer Marketing',
      'Canva & Creative Designing',
      'Live Client Projects',
      'Career & Freelancing Masterclass'
    ]
  },
  {
    id: 'graphic-designing',
    name: 'Graphic Designing',
    category: 'design',
    shortDesc: 'Learn Adobe Photoshop, Illustrator, CorelDRAW and Canva to create brand identities, social media creatives and print layouts.',
    duration: '3 Months',
    fee: '₹10,000',
    feeNote: 'complete course',
    installment: 'EMI Available',
    icon: 'design',
    color: 'icon-purple',
    syllabus: [
      'Design Fundamentals & Color Theory',
      'Adobe Photoshop (Basic to Pro)',
      'Adobe Illustrator (Vector Art)',
      'CorelDRAW Essentials',
      'Canva Pro Masterclass',
      'Logo & Brand Identity Design',
      'Social Media Post Design',
      'Print & Packaging Layouts',
      'Portfolio & Freelance Guide'
    ]
  },
  {
    id: 'web-designing',
    name: 'Web Designing',
    category: 'tech',
    shortDesc: 'Build clean, high-converting responsive websites using modern HTML5, CSS3, JavaScript, Bootstrap and WordPress.',
    duration: '4 Months',
    fee: '₹13,000',
    feeNote: 'complete course',
    installment: 'EMI Available',
    icon: 'web',
    color: 'icon-teal',
    syllabus: [
      'Wordpress Complete Course',
      'Complete Laravel & Software',
      'Database Creation',
      'Static Websites',
      'Ecommerce Websites',
      'Website Live & Deployment',
      'Domain, Hosting',
      'Elementary & Plugins'
    ]
  },
  {
    id: 'google-meta-ads',
    name: 'Google Ads / Meta Ads',
    category: 'marketing',
    shortDesc: 'Run high-ROI paid ad campaigns on Google Search, YouTube, Facebook and Instagram with advanced targeting and tracking.',
    duration: '1 Month',
    fee: '₹10,000',
    feeNote: 'intensive batch',
    installment: null,
    icon: 'ads',
    color: 'icon-amber',
    syllabus: [
      'Google Ads Account & Structure',
      'Search & Intent Keyword Bidding',
      'Display & YouTube Video Ads',
      'Conversion Tracking & GA4 Integration',
      'Meta Business Manager Setup',
      'Facebook & Instagram Lead Ads',
      'Audience Targeting & Retargeting',
      'Ad Creatives & Copy Optimization',
      'Budget Management & Scaling'
    ]
  },
  {
    id: 'ecommerce-marketing',
    name: 'Ecommerce Marketing',
    category: 'marketing',
    shortDesc: 'Launch and scale products on Amazon, Flipkart, Meesho, and build high-converting direct-to-consumer online stores.',
    duration: '1 Month',
    fee: '₹10,000',
    feeNote: 'intensive batch',
    installment: null,
    icon: 'ecommerce',
    color: 'icon-green',
    syllabus: [
      'Ecommerce Ecosystem Overview',
      'Amazon Seller Central Onboarding',
      'Flipkart & Meesho Seller Setup',
      'Product Listing & SEO Optimization',
      'A+ Content & High-Converting Images',
      'Marketplace Sponsored Ads',
      'Inventory, Order & Return Logistics',
      'D2C Brand Strategy & Shopify Basics',
      'Payment Gateways & Customer Support'
    ]
  },
  {
    id: 'accounting-excel',
    name: 'Accounting / Excel Adv.',
    category: 'finance',
    shortDesc: 'Master computerized accounting in Tally Prime with GST along with advanced data analytics, formulas and automation in MS Excel.',
    duration: '4 Months',
    fee: '₹10,000',
    feeNote: 'complete course',
    installment: 'EMI Available',
    icon: 'tally',
    color: 'icon-navy',
    syllabus: [
      'Accounting Principles & Concepts',
      'Tally Prime Installation & Company Setup',
      'Voucher Entries & Ledger Management',
      'GST Invoicing, RCM & E-way Bill',
      'TDS & Banking Reconciliation in Tally',
      'Balance Sheet, P&L and Financial Reports',
      'Advanced Excel (VLOOKUP, XLOOKUP, INDEX-MATCH)',
      'Pivot Tables, Slicers & Dynamic Dashboards',
      'Data Validation, Conditional Formatting & Macros'
    ]
  },
  {
    id: 'rscit-basic',
    name: 'RSCIT / Basic',
    category: 'tech',
    shortDesc: 'Foundational computer literacy, MS Office proficiency, internet services, and complete preparation for the government RSCIT certification.',
    duration: '3 Months',
    fee: '₹4,000',
    feeNote: 'complete course',
    installment: null,
    icon: 'computer',
    color: 'icon-teal',
    syllabus: [
      'Computer Hardware & Windows OS',
      'MS Word: Typing, Formatting & Letters',
      'MS Excel: Worksheets & Essential Formulas',
      'MS PowerPoint: Slide Decks & Presentations',
      'Internet, Email & Digital Security',
      'Rajasthan Government E-Governance Portals',
      'Online Forms, Banking & DigiLocker',
      'RSCIT Exam Mock Tests & Question Bank'
    ]
  },
  {
    id: 'spoken-english',
    name: 'Spoken English',
    category: 'language',
    shortDesc: 'Build strong English speaking fluency, correct grammar, vocabulary, and confident communication for interviews and workplace success.',
    duration: '3 Months',
    fee: '₹10,000',
    feeNote: 'complete course',
    installment: 'EMI Available',
    icon: 'english',
    color: 'icon-coral',
    syllabus: [
      'English Grammar Fundamentals & Tenses',
      'Daily Usage Vocabulary & Phrases',
      'Pronunciation & Neutral Accent Drills',
      'Conversational Fluency Practice',
      'Overcoming Hesitation & Stage Fear',
      'Group Discussions & Public Speaking',
      'Job Interview Preparation & Mock Sessions',
      'Professional Email & Telephone Etiquette'
    ]
  }
];

// ─── SVG Icon Map ───────────────────────────────────────────
const ICONS = {
  digital: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  design: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  web: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
  ads: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H9a1 1 0 0 0-1 1v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3V3a1 1 0 0 0-1-1z"/><path d="M9 22v-7h6v7M8 7h.01M12 7h.01M16 7h.01"/></svg>`,
  ecommerce: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`,
  tally: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8h2m2 0h2m2 0h2M7 12h10"/></svg>`,
  computer: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  english: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
};

// ─── Build Course Card HTML ─────────────────────────────────
function buildCourseCard(course, stagger = 0) {
  const syllabusHTML = course.syllabus.slice(0, 5).map(s =>
    `<span class="syllabus-tag">${s}</span>`
  ).join('');

  const installmentHTML = course.installment
    ? `<div class="installment-badge">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        ${course.installment}
      </div>`
    : '';

  return `
    <article class="course-card reveal stagger-${stagger}" data-category="${course.category}">
      <div class="course-icon-wrap ${course.color}">
        ${ICONS[course.icon] || ICONS.digital}
      </div>
      <h3 class="course-name">${course.name}</h3>
      <p class="course-desc">${course.shortDesc}</p>
      <div class="course-meta">
        <span class="course-meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          ${course.duration}
        </span>
        ${installmentHTML}
      </div>
      <div class="course-fee">
        <span class="course-fee-amount">${course.fee}</span>
        <span class="course-fee-period">${course.feeNote}</span>
      </div>
      <div class="course-syllabus-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        Topics Covered
      </div>
      <div class="course-syllabus-list" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px;">
        ${syllabusHTML}
        ${course.syllabus.length > 5 ? `<span class="syllabus-tag">+${course.syllabus.length - 5} more</span>` : ''}
      </div>
      <div class="course-card-footer">
        <a href="contact.html?course=${encodeURIComponent(course.name)}" class="btn btn-primary btn-sm">Enquire Now</a>
        <a href="courses.html#${course.id}" class="btn btn-secondary btn-sm">View Details</a>
      </div>
    </article>
  `;
}

// ─── Render Courses Grid ────────────────────────────────────
function renderCoursesGrid(containerId, limit = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const toRender = limit ? COURSES.slice(0, limit) : COURSES;
  container.innerHTML = toRender.map((c, i) => buildCourseCard(c, (i % 8) + 1)).join('');
}

// Make accessible globally
window.COURSES = COURSES;
window.renderCoursesGrid = renderCoursesGrid;

// ─── Init on Load ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderCoursesGrid('courses-grid-home', 3);
  renderCoursesGrid('courses-grid-all');
});
