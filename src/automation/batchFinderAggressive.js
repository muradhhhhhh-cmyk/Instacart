// src/automation/batchFinderAggressive.js

export function findBestBatchAggressive(batches, options = {}) {
  const {
    maxMiles = 8,   // ignore batches with more miles than this
    weightPay = 3,  // aggressive weighting on pay
    weightMiles = 1 // smaller weight for miles
  } = options;

  if (!batches || batches.length === 0) return null;

  // Score each batch aggressively
  const scored = batches.map(batch => {
    const payScore = batch.pay * weightPay;
    const mileScore = (maxMiles - batch.miles) * weightMiles;
    return {
      ...batch,
      score: payScore + mileScore
    };
  });

  // Pick the batch with the highest score
  const sorted = scored.sort((a, b) => b.score - a.score);

  return sorted[0];
}
