// Runs on every page - scrapes job info and sends to popup on request

function scrapeJobDetails() {
  const url = window.location.href;
  const title = document.title || "";

  // ── Company name detection ──────────────────────────────────────────────────
  let company = "";

  // Try meta tags first
  const ogSite = document.querySelector('meta[property="og:site_name"]');
  if (ogSite) company = ogSite.content;

  // Try common selectors used by Workday, Greenhouse, Lever, LinkedIn
  if (!company) {
    const selectors = [
      '[data-automation-id="company-name"]',        // Workday
      '.company-name', '.employer-name',             // generic
      '[class*="company"]',                          // fuzzy
      'h4.inline-block',                             // Greenhouse
      '.job-company-name',                           // Lever
      '.topcard__org-name-link',                     // LinkedIn
      '[data-testid="company-name"]',
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el?.innerText?.trim()) { company = el.innerText.trim(); break; }
    }
  }

  // Fallback: extract from domain
  if (!company) {
    try {
      const host = new URL(url).hostname.replace("www.", "");
      const parts = host.split(".");
      company = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    } catch (_) {}
  }

  // ── Job title detection ─────────────────────────────────────────────────────
  let jobTitle = "";

  const titleSelectors = [
    'h1[data-automation-id="jobPostingHeader"]',   // Workday
    '.posting-headline h2',                         // Lever
    '.app-title',                                   // Greenhouse
    'h1.jobs-unified-top-card__job-title',          // LinkedIn
    '[data-testid="jobsearch-JobInfoHeader-title"]',// Indeed
    'h1', 'h2',                                     // generic fallback
  ];

  for (const sel of titleSelectors) {
    const el = document.querySelector(sel);
    if (el?.innerText?.trim()) { jobTitle = el.innerText.trim(); break; }
  }

  // Clean up title if it has company name baked in (e.g. "SWE | Google")
  if (jobTitle.includes("|")) jobTitle = jobTitle.split("|")[0].trim();
  if (jobTitle.includes("–")) jobTitle = jobTitle.split("–")[0].trim();
  if (jobTitle.includes(" at ")) jobTitle = jobTitle.split(" at ")[0].trim();

  // ── Location detection ──────────────────────────────────────────────────────
  let location = "";
  const locSelectors = [
    '[data-automation-id="locations"]',
    '.location', '[class*="location"]',
    '.jobs-unified-top-card__bullet',
    '[data-testid="jobsearch-JobInfoHeader-companyLocation"]',
  ];
  for (const sel of locSelectors) {
    const el = document.querySelector(sel);
    if (el?.innerText?.trim()) { location = el.innerText.trim().split("\n")[0]; break; }
  }

  return { company, jobTitle, location, url };
}

// Listen for popup asking for job details
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === "GET_JOB_DETAILS") {
    sendResponse(scrapeJobDetails());
  }
  return true;
});
