import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background:
            "radial-gradient(55% 70% at 12% 12%, rgba(108,110,233,0.55), transparent 65%)," +
            "radial-gradient(50% 65% at 92% 22%, rgba(72,205,193,0.4), transparent 65%)," +
            "radial-gradient(60% 60% at 55% 110%, rgba(233,99,170,0.42), transparent 70%)," +
            "#05070E",
          color: "#EDF1FB",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 28,
              border: "4px solid rgba(141,143,255,0.9)",
              background: "rgba(141,143,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 56,
              fontWeight: 700,
            }}
          >
            v
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3 }}>
              vitrum
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 40,
            fontWeight: 600,
            letterSpacing: -1,
            color: "rgba(237,241,251,0.92)",
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 26,
            maxWidth: 760,
            lineHeight: 1.45,
            color: "rgba(166,176,212,0.95)",
          }}
        >
          {siteConfig.description}
        </div>
      </div>
    ),
    size,
  );
}
