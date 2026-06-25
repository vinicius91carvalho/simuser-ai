#!/usr/bin/env bash
# Invalidate CloudFront cache after a deployment.
#
# Usage: bash scripts/invalidate-cache.sh <stage>
#   stage: the SST stage name (e.g. staging, production)
#
# Requires:
#   - AWS CLI configured with credentials that have CloudFront permissions
#   - SST outputs available at .sst/outputs.json (written by `sst deploy`)
#
# Environment variables:
#   AWS_REGION — AWS region (default: us-east-1)

set -euo pipefail

STAGE="${1:-staging}"
AWS_REGION="${AWS_REGION:-us-east-1}"
SST_OUTPUTS_FILE=".sst/outputs.json"

echo "==> Invalidating CloudFront cache for stage: ${STAGE}"

# Determine the domain alias for this stage
if [ "${STAGE}" = "production" ]; then
  DOMAIN="simuser.ai"
else
  DOMAIN="${STAGE}.simuser.ai"
fi

# Try to get distribution ID from SST outputs first
DISTRIBUTION_ID="${DISTRIBUTION_ID:-}"

if [ -z "${DISTRIBUTION_ID}" ] && [ -f "${SST_OUTPUTS_FILE}" ]; then
  echo "    Reading SST outputs from ${SST_OUTPUTS_FILE}"
  DISTRIBUTION_ID=$(
    node -e "
      const outputs = JSON.parse(require('fs').readFileSync('${SST_OUTPUTS_FILE}', 'utf8'));
      const key = Object.keys(outputs).find(k =>
        k.toLowerCase().includes('distribution') ||
        k.toLowerCase().includes('cloudfrontid')
      );
      if (key) process.stdout.write(outputs[key]);
    " 2>/dev/null || true
  )
fi

# Fall back to discovering via AWS CLI using the stage domain alias
if [ -z "${DISTRIBUTION_ID}" ]; then
  echo "    Discovering CloudFront distribution for ${DOMAIN} via AWS CLI..."
  DISTRIBUTION_ID=$(
    aws cloudfront list-distributions \
      --query "DistributionList.Items[?Aliases.Items && contains(Aliases.Items, '${DOMAIN}')].Id | [0]" \
      --output text \
      --region "${AWS_REGION}" 2>/dev/null || true
  )
  # aws cli returns "None" when JMESPath finds nothing
  if [ "${DISTRIBUTION_ID}" = "None" ]; then
    DISTRIBUTION_ID=""
  fi
fi

if [ -z "${DISTRIBUTION_ID}" ]; then
  echo "ERROR: Could not determine CloudFront distribution ID for stage '${STAGE}'."
  echo "       Set it manually: DISTRIBUTION_ID=EXAMPLEID bash scripts/invalidate-cache.sh"
  exit 1
fi

echo "    Distribution ID: ${DISTRIBUTION_ID}"
echo "    Creating invalidation for /*..."

INVALIDATION_ID=$(
  aws cloudfront create-invalidation \
    --distribution-id "${DISTRIBUTION_ID}" \
    --paths "/*" \
    --query "Invalidation.Id" \
    --output text \
    --region "${AWS_REGION}"
)

echo "    Invalidation created: ${INVALIDATION_ID}"
echo "    Waiting for invalidation to complete (this may take 60-120 seconds)..."

aws cloudfront wait invalidation-completed \
  --distribution-id "${DISTRIBUTION_ID}" \
  --id "${INVALIDATION_ID}" \
  --region "${AWS_REGION}"

echo "==> Cache invalidation complete."
