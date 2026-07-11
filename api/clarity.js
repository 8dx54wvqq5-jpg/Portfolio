// First-party proxy for Microsoft Clarity so ad blockers don't drop it.
// vercel.json rewrites /api/clarity/<sub>/<path> here as ?sub=&path=.
// Forwards to https://<sub>.clarity.ms/<path>; JS responses get
// clarity.ms URLs rewritten back to this proxy so the tag script's
// internal upload calls also stay first-party.

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  const { sub, path = "", ...rest } = req.query;
  if (!/^[a-z0-9-]+$/.test(sub || "")) return res.status(400).end();

  const qs = new URLSearchParams(rest).toString();
  const target = `https://${sub}.clarity.ms/${path}${qs ? "?" + qs : ""}`;

  const chunks = [];
  for await (const c of req) chunks.push(c);
  const body = Buffer.concat(chunks);

  // Pass through all headers (incl. x-forwarded-for with the real client IP,
  // so Clarity doesn't classify every visitor as one datacenter bot) except
  // hop-by-hop ones and host/length, which fetch must set itself.
  const headers = { ...req.headers };
  for (const h of ["host", "connection", "content-length", "transfer-encoding", "accept-encoding"]) {
    delete headers[h];
  }

  const upstream = await fetch(target, {
    method: req.method,
    headers,
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
