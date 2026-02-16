const matchAlgorithm = (resumeText, jobDescription) => {
    if (!resumeText || !jobDescription) return { score: 0, matchedKeywords: [], missingKeywords: [] };

    // 1. Clean Text (lowercase, remove special chars)
    const clean = (text) =>
        text
            .toLowerCase()
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, ' ')
            .trim();

    const rText = clean(resumeText);
    const jText = clean(jobDescription);

    // 2. Remove Stop Words (Basic list)
    const stopWords = new Set([
        'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'of', 'it', 'this', 'that',
        'i', 'you', 'he', 'she', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'her', 'our', 'their',
        'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might', 'must',
        'resume', 'cv', 'experience', 'skills', 'education', 'summary', 'profile', 'contact', 'year', 'years', 'date', 'from', 'subject', 'page',
        'requirements', 'description', 'looking', 'needed', 'candidate'
    ]);

    const getKeywords = (text) => {
        return text.split(' ').filter((word) => word.length > 2 && !stopWords.has(word));
    };

    const rKeywordsArr = getKeywords(rText);
    const jKeywordsArr = getKeywords(jText);

    const rKeywords = new Set(rKeywordsArr);
    const jKeywords = new Set(jKeywordsArr);

    // 3. Compare Keywords
    const matched = [];
    const missing = [];

    jKeywords.forEach((word) => {
        if (rKeywords.has(word)) {
            matched.push(word);
        } else {
            missing.push(word);
        }
    });

    // Calculate Percentage
    const totalKeywords = jKeywords.size;
    if (totalKeywords === 0) return { score: 0, matchedKeywords: [], missingKeywords: [] };

    const score = Math.round((matched.length / totalKeywords) * 100);

    return {
        score,
        matchedKeywords: matched.slice(0, 15), // Limit to top 15 for UI
        missingKeywords: missing.slice(0, 15)
    };
};

module.exports = matchAlgorithm;
