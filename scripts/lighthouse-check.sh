#!/usr/bin/env bash
# Check PageSpeed Insights scores for key pages using the Google PageSpeed Insights API.
#
# Usage: bash scripts/lighthouse-check.sh <base-url>
#   base-url: e.g. https://staging.simuser.ai or https://simuser.ai
#
# Environment variables:
#   PAGESPEED_API_KEY — Google PageSpeed Insights API key (optional; omit to use rate-limited anonymous access)
#   MIN_SCORE         — Minimum acceptable score (default: 90). Set to 100 to require perfect scores.
#
# Exit codes:
#   0 — All pages meet the minimum score requirement
#   1 — One or more pages scored below the minimum

set -euo pipefail

BASE_URL="${1:-https://simuser.ai}"
MIN_SCORE="${MIN_SCORE:-90}"
API_KEY="${PAGESPEED_API_KEY:-}"

CATEGORIES="performance,accessibility,best-practices,seo"
STRATEGIES=("desktop" "mobile")

# Key pages to test (locale-prefixed)
PAGES=(
  "/en/"
  "/en/product/"
  "/en/pricing/"
  "/en/security/"
  "/en/about/"
)

OVERALL_EXIT=0

# Build API URL
build_api_url() {
  local url="$1"
  local strategy="$2"
  local api_url="https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
  api_url+="?url=$(python3 -c "import urllib.parse; print(urllib.parse.quote('${url}', safe=''))")"
  api_url+="&strategy=${strategy}"
  for cat in $(echo "$CATEGORIES" | tr ',' ' '); do
    api_url+="&category=${cat}"
  done
  if [ -n "${API_KEY}" ]; then
    api_url+="&key=${API_KEY}"
  fi
  echo "$api_url"
}

# Run PageSpeed for a single URL + strategy
check_page() {
  local page="$1"
  local strategy="$2"
  local full_url="${BASE_URL}${page}"

  echo ""
  echo "  Checking: ${full_url} [${strategy}]"

  local api_url
  api_url=$(build_api_url "${full_url}" "${strategy}")

  local response
  response=$(curl -sf --max-time 60 "${api_url}" 2>/dev/null) || {
    echo "  ERROR: API request failed for ${full_url} (${strategy})"
    OVERALL_EXIT=1
    return
  }

  # Parse scores using node (available in CI)
  node -e "
    const data = JSON.parse($(echo "${response}" | node -e "
      const chunks = [];
      process.stdin.on('data', c => chunks.push(c));
      process.stdin.on('end', () => {
        const json = JSON.stringify(chunks.join(''));
        process.stdout.write(json);
      });
    "));

    const cats = data.lighthouseResult && data.lighthouseResult.categories;
    if (!cats) {
      console.log('  ERROR: No lighthouse result in API response');
      process.exit(1);
    }

    const rows = [
      ['Performance',    cats.performance   && Math.round(cats.performance.score   * 100)],
      ['Accessibility',  cats.accessibility && Math.round(cats.accessibility.score * 100)],
      ['Best Practices', cats['best-practices'] && Math.round(cats['best-practices'].score * 100)],
      ['SEO',            cats.seo           && Math.round(cats.seo.score           * 100)],
    ];

    const minScore = parseInt('${MIN_SCORE}', 10);
    let failed = false;

    for (const [name, score] of rows) {
      const mark = score === null ? '?' : score >= minScore ? 'PASS' : 'FAIL';
      const color = score >= minScore ? '\x1b[32m' : '\x1b[31m';
      const reset = '\x1b[0m';
      if (score < minScore) failed = true;
      console.log('    ' + color + mark + reset + ' ' + name.padEnd(16) + (score !== null ? score : 'N/A'));
    }

    process.exit(failed ? 1 : 0);
  " || OVERALL_EXIT=1
}

echo "======================================================"
echo " PageSpeed Insights Check"
echo " Base URL : ${BASE_URL}"
echo " Min score: ${MIN_SCORE}"
echo "======================================================"

for strategy in "${STRATEGIES[@]}"; do
  echo ""
  echo "Strategy: ${strategy^^}"
  echo "------------------------------------------------------"
  for page in "${PAGES[@]}"; do
    check_page "${page}" "${strategy}"
  done
done

echo ""
echo "======================================================"
if [ "${OVERALL_EXIT}" -eq 0 ]; then
  echo " RESULT: All pages passed (score >= ${MIN_SCORE})"
else
  echo " RESULT: One or more pages FAILED (score < ${MIN_SCORE})"
fi
echo "======================================================"

exit "${OVERALL_EXIT}"
