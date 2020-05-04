export default scores => {
  const flattenedScores = [].concat.apply([], scores);

  return flattenedScores.reduce((results, score) => {
    const url = score.url;

    // If we already calculated this url we skip it and return current array
    if (results.some(r => r.url === url)) {
      return results;
    }

    const urlResults = flattenedScores.filter(s => s.url === url);
    let totalAccesibility = 0;
    let totalBestPractices = 0;
    let totalPerformance = 0;
    let totalProgressiveWebApp = 0;
    let totalSeo = 0;

    urlResults.forEach(urlResult => {
      totalAccesibility += urlResult.scores.accessibility;
      totalBestPractices += urlResult.scores.bestPractices;
      totalPerformance += urlResult.scores.performance;
      totalProgressiveWebApp += urlResult.scores.progressiveWebApp;
      totalSeo += urlResult.scores.seo;
    });

    results.push({
      ...score,
      scores: {
        accessibility: Math.ceil(totalAccesibility / urlResults.length),
        bestPractices: Math.ceil(totalBestPractices / urlResults.length),
        performance: Math.ceil(totalPerformance / urlResults.length),
        progressiveWebApp: Math.ceil(
          totalProgressiveWebApp / urlResults.length
        ),
        seo: Math.ceil(totalSeo / urlResults.length)
      }
    });

    return results;
  }, []);
};
