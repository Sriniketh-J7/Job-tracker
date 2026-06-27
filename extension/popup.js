// popup.js — Job Tracker Extension

// ── Theme ─────────────────────────────────────────────────────────────────────
const root = document.documentElement;
let isDark = localStorage.getItem("jt_ext_dark") !== "0";

function applyTheme() {
  if (isDark) {
    root.style.setProperty("--bg", "#0D1117");
    root.style.setProperty("--card", "#161B22");
    root.style.setProperty("--border", "#30363D");
    root.style.setProperty("--text", "#E6EDF3");
    root.style.setProperty("--muted", "#8B949E");
    root.style.setProperty("--input-bg", "#0D1117");
    document.getElementById("themeBtn").textContent = "☀️";
  } else {
    root.style.setProperty("--bg", "#F8F9FA");
    root.style.setProperty("--card", "#FFFFFF");
    root.style.setProperty("--border", "#E2E8F0");
    root.style.setProperty("--text", "#0F172A");
    root.style.setProperty("--muted", "#64748B");
    root.style.setProperty("--input-bg", "#F8FAFC");
    document.getElementById("themeBtn").textContent = "🌙";
  }
}

document.getElementById("themeBtn").addEventListener("click", () => {
  isDark = !isDark;
  localStorage.setItem("jt_ext_dark", isDark ? "1" : "0");
  applyTheme();
});

applyTheme();

// ── Populate resume dropdown ──────────────────────────────────────────────────
const resumeSelect = document.getElementById("resume");
RESUME_VERSIONS.forEach(r => {
  const opt = document.createElement("option");
  opt.value = r;
  opt.textContent = r;
  resumeSelect.appendChild(opt);
});

// ── Auto-fill today's date ────────────────────────────────────────────────────
const today = new Date().toLocaleDateString("en-CA");
document.getElementById("date").value = today;

// ── Auto-scrape from active tab ───────────────────────────────────────────────
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];
  if (!tab?.id) return;

  // Set link from tab URL
  document.getElementById("link").value = tab.url || "";

  // Ask content script for scraped job details
  chrome.tabs.sendMessage(tab.id, { type: "GET_JOB_DETAILS" }, (res) => {
    if (chrome.runtime.lastError) return; // not a job page, no content script response
    if (!res) return;
    if (res.company)   document.getElementById("company").value  = res.company;
    if (res.jobTitle)  document.getElementById("jobTitle").value = res.jobTitle;
    if (res.location)  document.getElementById("location").value = res.location;
    if (res.url)       document.getElementById("link").value     = res.url;
  });
});

// ── Toast helper ──────────────────────────────────────────────────────────────
function showToast(msg, type = "success") {
  const el = document.getElementById("toast");
  el.className = `toast ${type}`;
  el.textContent = msg;
  setTimeout(() => { el.className = "toast"; }, 3500);
}

// ── Save to Supabase ──────────────────────────────────────────────────────────
document.getElementById("confirmBtn").addEventListener("click", async () => {
  const btn = document.getElementById("confirmBtn");

  const company   = document.getElementById("company").value.trim();
  const jobTitle  = document.getElementById("jobTitle").value.trim();
  const date      = document.getElementById("date").value;
  const location  = document.getElementById("location").value.trim();
  const link      = document.getElementById("link").value.trim();
  const resume    = document.getElementById("resume").value;
  const status    = document.getElementById("status").value;
  const notes     = document.getElementById("notes").value.trim();

  if (!company || !jobTitle) {
    showToast("Company and Job Title are required", "error");
    return;
  }

  btn.disabled = true;
  btn.textContent = "Saving...";

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/applications`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({ company, job_title: jobTitle, date, location, link, resume_name: resume, status, notes }),
    });

    if (res.ok || res.status === 201) {
      btn.textContent = "✅ Confirm & Save";
      btn.disabled = false;
      showToast("✅ Application logged!");
      // Clear fields after save
      setTimeout(() => {
        document.getElementById("company").value  = "";
        document.getElementById("jobTitle").value = "";
        document.getElementById("location").value = "";
        document.getElementById("notes").value    = "";
      }, 1500);
    } else {
      const err = await res.text();
      throw new Error(err);
    }
  } catch (e) {
    showToast("❌ Failed to save. Check your config.js keys.", "error");
    console.error(e);
    btn.textContent = "✅ Confirm & Save";
    btn.disabled = false;
  }
});
