// Short redirect for UTM links built by utm.html.
// vercel.json rewrites /r/:slug here as ?s=:slug.
// slug = company[.pagecode[.role]], dot-joined, built client-side in utm.html.

const PAGES = { home: "/", dws: "/dispute-workspace", control: "/360-control" };

export default function handler(req, res) {
  const slug = String(req.query.s || "");
  const [company, pagecode, role] = slug.split(".");
  if (!/^[a-z0-9-]+$/.test(company || "")) return res.status(400).end();

  const path = PAGES[pagecode] || "/";
  const params = new URLSearchParams();
  params.set("utm_source", company);
  params.set("utm_medium", "referral");
  params.set("utm_campaign", "jobsearch");
  if (role) params.set("utm_content", role);

  res.writeHead(302, { Location: `${path}?${params.toString()}` });
  res.end();
}
