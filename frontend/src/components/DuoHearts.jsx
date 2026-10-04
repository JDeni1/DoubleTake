/** Shared heart outline, the same one used in the favicon. */
const HEART_PATH =
  'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z'

/**
 * Positions a heart: moves it to (x, y), tilts it and sizes it.
 */
function heartTransform(x, y, angle, scale) {
  return `translate(${x} ${y}) rotate(${angle}) scale(${scale}) translate(-11.997 -10.289)`
}

/**
 * The DoubleTake illustration from the favicon: a pink duo and a purple duo,
 * each with two hearts above them. Decorative, so screen readers skip it.
 */
export default function DuoHearts({ framed = false, className = 'h-auto w-full max-w-[342px]' }) {
  return (
    <svg
      viewBox={framed ? '181 -282 1464 1464' : '290 130 1246 640'}
      className={className}
      aria-hidden="true"
    >
      {framed && <circle cx="913" cy="450" r="732" fill="#FCFAF4" />}
      <g fill="#FD6985">
        <ellipse cx="471" cy="422" rx="108" ry="104" />
        <ellipse cx="725" cy="421.5" rx="107" ry="103.5" />
        <path d="M309 723V628A94 94 0 0 1 403 534H483A94 94 0 0 1 577 628V723A25 25 0 0 1 552 748H334A25 25 0 0 1 309 723Z" />
        <path d="M595 723V627A94 94 0 0 1 689 533H763A94 94 0 0 1 857 627V723A25 25 0 0 1 832 748H620A25 25 0 0 1 595 723Z" />
        <path transform={heartTransform(574.3, 206, -15, 5.426)} d={HEART_PATH} />
        <path transform={heartTransform(468.6, 264.6, -24, 3.146)} d={HEART_PATH} />
      </g>
      <g fill="#896FCC">
        <ellipse cx="1108.5" cy="421" rx="108.5" ry="103" />
        <ellipse cx="1364.5" cy="421.5" rx="107.5" ry="104.5" />
        <path d="M977 720V627A94 94 0 0 1 1071 533H1140A94 94 0 0 1 1234 627V720A25 25 0 0 1 1209 745H1002A25 25 0 0 1 977 720Z" />
        <path d="M1252 721V627A94 94 0 0 1 1346 533H1423A94 94 0 0 1 1517 627V721A25 25 0 0 1 1492 746H1277A25 25 0 0 1 1252 721Z" />
        <path transform={heartTransform(1264.2, 200, 15, 5.558)} d={HEART_PATH} />
        <path transform={heartTransform(1355.3, 264.4, 24, 3.119)} d={HEART_PATH} />
      </g>
    </svg>
  )
}