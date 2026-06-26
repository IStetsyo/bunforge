export const Logo = () => (
  <svg
    width="256"
    height="256"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M128 20
       C110 50 150 50 128 90
       C165 70 170 120 128 120
       C86 120 90 75 120 60
       C105 55 110 35 128 20Z"
      fill="#ff7a18"
    />

    <ellipse
      cx="128"
      cy="170"
      rx="70"
      ry="60"
      fill="var(--color-base-content)"
    />

    <ellipse
      cx="90"
      cy="110"
      rx="22"
      ry="50"
      fill="var(--color-base-content)"
    />
    <ellipse
      cx="166"
      cy="110"
      rx="22"
      ry="50"
      fill="var(--color-base-content)"
    />

    <circle cx="105" cy="170" r="8" fill="var(--color-base-100)" />
    <circle cx="151" cy="170" r="8" fill="var(--color-base-100)" />

    <circle cx="128" cy="188" r="6" fill="var(--color-base-100)" />
  </svg>
);
