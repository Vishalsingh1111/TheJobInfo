export const SYSTEM_INSTRUCTION = `You are a careful career-content editor for TheJobInfo, an independent job information website in India. Your readers are freshers and professionals deciding whether to apply.

You receive structured data about ONE job listing scraped from a company career page. Write helpful, original, plain-English content for that listing.

STRICT RULES
1. Use ONLY facts present in the provided data. Never invent salary, dates, batch year, degree, number of openings, selection rounds, benefits, tech stack or company claims.
2. If a fact is missing, leave that field empty (empty array or null). Never write "not available", "not disclosed", "not specified" or similar filler.
3. Do not copy sentences from the source description. Rewrite in your own words. Remove internal codes such as requisition or job IDs, recruiter names, and marketing slogans.
4. Separate FACTS from GUIDANCE. Content about this job must come from the data. General preparation advice is allowed, but it must be clearly general (for example: "For backend roles like this, candidates usually revise..."), never presented as the employer's actual process, and never claim insider knowledge, interviews with staff, or guaranteed outcomes.
5. Never promise a job, never ask the reader to pay anyone, and never imply that TheJobInfo is the employer or a recruiter.
6. Neutral, professional tone. No hype, no emojis, no clickbait, no all-caps. Indian English spelling is fine. Short sentences.
7. Output valid JSON only, exactly matching the schema. No markdown, no extra keys.
`;

export const USER_TEMPLATE = `JOB DATA
Company: {{company}}
Title: {{title}}
Location: {{location}}
Work mode: {{workMode}}
Job level: {{level}}  (fresher, experienced or internship)
Experience stated: {{experience}}
Salary stated: {{salary}}
Skills tags: {{skills}}
Posted: {{postedAt}}
Source description (may be long, noisy or partly marketing):
"""
{{description}}
"""

Return JSON with these keys:
{
  "seoTitle": "max 60 characters, role + company + location",
  "metaDescription": "max 155 characters, plain and factual",
  "summary": "110-180 words. What the role is, what the team or company does (only if stated), who it suits, and what the reader should check before applying.",
  "whatYouWillDo": ["4-8 short bullets rewritten from the description. Empty array if the description is too thin."],
  "skillsRequired": ["only skills mentioned in the data"],
  "eligibility": { "education": "", "experience": "", "batch": "", "other": "" },
  "selectionProcess": ["only if the data states rounds, otherwise empty array"],
  "whoShouldApply": "2-3 sentences describing the kind of candidate this fits, derived from the requirements.",
  "specialNote": "1-2 sentences of genuinely useful context from the data (for example hybrid policy, team focus, level of seniority). Empty string if there is nothing real to say.",
  "prepGuide": {
    "overview": "2-3 sentences on how to prepare for a role like this. Label as general guidance.",
    "topicsToRevise": ["6-10 topics relevant to the skills and level"],
    "commonQuestions": ["5-8 question types candidates commonly face for this kind of role, phrased as topics or sample questions"],
    "projectIdeas": ["2-3 ideas, only for fresher or internship level, otherwise empty array"],
    "commonMistakes": ["3-5 mistakes candidates commonly make for this kind of role"]
  },
  "faqs": [
    { "question": "Question text", "answer": "15-70 word answer grounded in the source facts." }
  ]
}
`;

export function buildAiUserPrompt(facts = {}, validationError = "") {
  const content = { ...facts };
  const description = String(content.description_text || content.description || "").trim() || "No description provided.";
  let prompt = USER_TEMPLATE
    .replace(/\{\{company\}\}/g, String(content.company || "").trim() || "Unknown company")
    .replace(/\{\{title\}\}/g, String(content.title || "").trim() || "Role")
    .replace(/\{\{location\}\}/g, String(content.location || "").trim() || "Not stated")
    .replace(/\{\{workMode\}\}/g, String(content.work_mode || content.workMode || "").trim() || "Not stated")
    .replace(/\{\{level\}\}/g, String(content.level || "").trim() || "Not stated")
    .replace(/\{\{experience\}\}/g, String(content.experience_years_min ?? content.experience ?? "").trim() || "Not stated")
    .replace(/\{\{salary\}\}/g, String(content.salary_text || content.salary || "").trim() || "Not stated")
    .replace(/\{\{skills\}\}/g, Array.isArray(content.skills) ? content.skills.join(", ") : String(content.skills || "").trim() || "Not stated")
    .replace(/\{\{postedAt\}\}/g, String(content.posted_at || content.postedAt || "").trim() || "Not stated")
    .replace(/\{\{description\}\}/g, description);

  if (validationError) {
    prompt += `\n\nValidation feedback to fix: ${validationError}`;
  }

  return prompt;
}

export const JOB_CONTENT_SCHEMA = {
  type: "OBJECT",
  properties: {
    seoTitle: { type: "STRING" },
    metaDescription: { type: "STRING" },
    summary: { type: "STRING" },
    whatYouWillDo: { type: "ARRAY", items: { type: "STRING" } },
    skillsRequired: { type: "ARRAY", items: { type: "STRING" } },
    eligibility: {
      type: "OBJECT",
      properties: {
        education: { type: "STRING" },
        experience: { type: "STRING" },
        batch: { type: "STRING" },
        other: { type: "STRING" }
      },
      required: ["education", "experience", "batch", "other"]
    },
    selectionProcess: { type: "ARRAY", items: { type: "STRING" } },
    whoShouldApply: { type: "STRING" },
    specialNote: { type: "STRING" },
    prepGuide: {
      type: "OBJECT",
      properties: {
        overview: { type: "STRING" },
        topicsToRevise: { type: "ARRAY", items: { type: "STRING" } },
        commonQuestions: { type: "ARRAY", items: { type: "STRING" } },
        projectIdeas: { type: "ARRAY", items: { type: "STRING" } },
        commonMistakes: { type: "ARRAY", items: { type: "STRING" } }
      },
      required: ["overview", "topicsToRevise", "commonQuestions", "projectIdeas", "commonMistakes"]
    },
    faqs: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          question: { type: "STRING" },
          answer: { type: "STRING" }
        },
        required: ["question", "answer"]
      }
    }
  },
  required: [
    "seoTitle",
    "metaDescription",
    "summary",
    "whatYouWillDo",
    "skillsRequired",
    "eligibility",
    "selectionProcess",
    "whoShouldApply",
    "specialNote",
    "prepGuide",
    "faqs"
  ]
};
