import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#d97757",
              display: "flex",
            }}
          />
          <span style={{ color: "#a3a099", fontSize: 24, letterSpacing: 4, textTransform: "uppercase" }}>
            {site.name} — Digital Builder
          </span>
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            color: "#f5f3ee",
            lineHeight: 1.1,
            display: "flex",
          }}
        >
          Cybersecurity × Technology × Creativity
        </div>

        <div style={{ display: "flex", color: "#6b6862", fontSize: 22 }}>{site.location}</div>
      </div>
    ),
    { ...size }
  );
}
