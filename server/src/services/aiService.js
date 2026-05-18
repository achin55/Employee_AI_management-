import { callOpenAICompatibleAPI } from '../config/openrouter.js';

export const generatePromotionRecommendation = async (employee) => {
  const prompt = `
You are an expert HR analyst. Based on the following employee performance data, provide a promotion recommendation:

Employee Name: ${employee.name}
Department: ${employee.department}
Position: ${employee.position}
Performance Score: ${employee.performanceScore}/100
Years of Experience: ${employee.experience}
Skills: ${employee.skills.join(', ')}
Ratings:
- Teamwork: ${employee.ratings?.teamwork || 0}/5
- Communication: ${employee.ratings?.communication || 0}/5
- Problem Solving: ${employee.ratings?.problemSolving || 0}/5
- Leadership: ${employee.ratings?.leadership || 0}/5
- Technical Skills: ${employee.ratings?.technical || 0}/5

Based on this data, provide:
1. Whether the employee is ready for promotion (Yes/No)
2. Recommended next position (if applicable)
3. Key strengths
4. Areas for improvement
5. Timeline for promotion eligibility

Provide your response in a clear, structured format.`;

  return await callOpenAICompatibleAPI(prompt);
};

export const generateEmployeeRanking = async (employees) => {
  const employeesSummary = employees
    .map(
      (emp) =>
        `${emp.name} (${emp.department}): Score ${emp.performanceScore}, Experience ${emp.experience}yrs`
    )
    .join('\n');

  const prompt = `
You are an expert HR analyst. Rank the following employees based on overall performance and potential:

${employeesSummary}

Provide:
1. Top 3 performers (with reasons)
2. Rising stars (high potential)
3. Employees needing support
4. Overall team performance assessment

Format the response clearly with sections for each category.`;

  return await callOpenAICompatibleAPI(prompt);
};

export const generateTrainingSuggestions = async (employee) => {
  const prompt = `
You are a professional development expert. Based on the following employee profile, suggest targeted training:

Employee Name: ${employee.name}
Department: ${employee.department}
Current Skills: ${employee.skills.join(', ')}
Performance Score: ${employee.performanceScore}/100
Experience Level: ${employee.experience} years
Weak Areas:
- Communication: ${employee.ratings?.communication || 0}/5
- Problem Solving: ${employee.ratings?.problemSolving || 0}/5
- Leadership: ${employee.ratings?.leadership || 0}/5

Provide specific, actionable training recommendations including:
1. Technical skills to develop
2. Soft skills training
3. Certification recommendations
4. Expected timeline for improvement
5. Resources and courses (if you can suggest real courses)

Format the response in a structured way.`;

  return await callOpenAICompatibleAPI(prompt);
};

export const generateAIFeedback = async (employee) => {
  const prompt = `
You are an expert performance coach. Provide comprehensive, constructive feedback for:

Employee Name: ${employee.name}
Position: ${employee.position}
Department: ${employee.department}
Performance Score: ${employee.performanceScore}/100
Experience: ${employee.experience} years
Skills: ${employee.skills.join(', ')}

Ratings:
- Teamwork: ${employee.ratings?.teamwork || 0}/5
- Communication: ${employee.ratings?.communication || 0}/5
- Problem Solving: ${employee.ratings?.problemSolving || 0}/5
- Leadership: ${employee.ratings?.leadership || 0}/5
- Technical: ${employee.ratings?.technical || 0}/5

Provide:
1. Overall performance assessment
2. Specific strengths to leverage
3. Areas for immediate improvement
4. Long-term career development suggestions
5. Motivational guidance
6. Action items for next 30-90 days

Keep the tone professional, encouraging, and constructive.`;

  return await callOpenAICompatibleAPI(prompt);
};

export const generateComprehensiveAnalysis = async (employee) => {
  const prompt = `
You are a senior HR consultant. Provide a comprehensive analysis for:

Employee: ${employee.name}
Role: ${employee.position} in ${employee.department}
Tenure: ${employee.experience} years
Current Performance: ${employee.performanceScore}/100

Skills: ${employee.skills.join(', ')}
Strengths (Ratings): Team: ${employee.ratings?.teamwork}/5, Comm: ${employee.ratings?.communication}/5, Problem-solving: ${employee.ratings?.problemSolving}/5, Leadership: ${employee.ratings?.leadership}/5, Tech: ${employee.ratings?.technical}/5

Provide a complete analysis covering:
1. Performance Summary
2. Strengths & Competitive Advantages
3. Development Areas
4. Recommended Career Path
5. Growth Opportunities
6. Retention Strategies
7. Overall Recommendation

Format as a professional report.`;

  return await callOpenAICompatibleAPI(prompt);
};
