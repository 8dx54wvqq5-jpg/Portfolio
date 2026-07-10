// First-party proxy for Microsoft Clarity so ad blockers don't drop it.
// /api/clarity/<sub>/<path> -> https://<sub>.clarity.ms/<path>
// JS responses get clarity.ms URLs rewritten back to this proxy so the
// tag script's internal upload calls also stay first-party.

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  const parts = req.query.path || [];
  const sub = parts[0];
  if (!/^[a-z0-9-]+$/.test(sub || "")) return res.status(400).end();

  const qs = req.url.includes("?") ? "?" + req.url.split("?")[1] : "";
  const target = `https://${sub}.clarity.ms/${parts.slice(1).join("/")}${qs}`;

  const chunks = [];
  for await (const c of req) chunks.push(c);
  const body = Buffer.concat(chunks);

  const upstream = await fetch(target, {
    method: req.method,
    headers: {
      "content-type": req.headers["content-type"] || "",
      "user-agent": req.headers["user-agent"] || "",
      referer: req.headers.referer || "",
    },
    body: ["GET", "HEAD"].includes(req.method) ? undefined : body,
  });

  const type = upstream.headers.get("content-type") || "";
  res.status(upstream.status);
  res.setHeader("content-type", type);
  res.setHeader("cache-control", upstream.headers.get("cache-control") || "no-store");

  if (type.includes("javascript")) {
    const text = await upstream.text();
    res.send(
      text.replace(
        /https:\/\/([a-z0-9-]+)\.clarity\.ms/g,
        `https://${req.headers.host}/api/clarity/$1`
      )
    );
  } else {
    res.send(Buffer.from(await upstream.arrayBuffer()));
  }
}
