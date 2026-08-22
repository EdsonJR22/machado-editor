import assert from "node:assert/strict";
import test from "node:test";

test("renders the portfolio homepage", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();

  assert.match(html, /<title>Machado — Video Editor<\/title>/i);
  assert.match(html, /<h1>Stories,<span>cut with<br\/>intent\.<\/span><\/h1>/i);
  assert.match(html, /id=["']work["']/i);
  assert.match(html, /id=["']contact["']/i);
});
