export const SYSTEM_INSTRUCTION = `Create accurate, original job-listing content for TheJobInfo from the supplied data.
Use only stated facts for job details; never invent eligibility, salary, benefits, dates, technologies, openings, or hiring rounds. Rewrite rather than copy source sentences. Include every supplied skill tag and every additional skill explicitly named in the source; do not infer tools or requirements. Leave unknown facts empty. Keep employer facts separate from clearly labelled general preparation guidance. Use concise, neutral Indian English. Do not promise outcomes or imply affiliation with the employer. Return only valid JSON matching the schema.`;

export const USER_TEMPLATE = `JOB FACTS
Company: {{company}} | Role: {{title}} | Location: {{location}} | Work mode: {{workMode}}
Level: {{level}} | Experience: {{experience}} | Salary: {{salary}} | Posted: {{postedAt}}
Explicit skills from job data (include every one): {{skills}}
Full source description (use all relevant requirements; do not ignore later sections):
"""
{{description}}
"""

Return exactly these JSON keys. Keep every item specific to this role:
{
  "seoTitle": "role, company and location; max 60 characters",
  "metaDescription": "factual; max 155 characters",
  "summary": "25-120 words: role, stated context, requirements and practical details",
  "whatYouWillDo": ["3-6 concise duties rewritten from the source; [] only when no duties are stated"],
  "skillsRequired": ["all explicit skill tags plus all additional skills explicitly required in the source; deduplicated"],
  "eligibility": {"education":"","experience":"","batch":"","other":""},
  "selectionProcess": ["stated hiring steps only; [] if absent"],
  "whoShouldApply": "1-2 concise sentences derived from stated role requirements",
  "benefits": ["stated benefits only; [] if absent"],
  "applySteps": ["brief generic steps for using the supplied application link"],
  "prepGuide": {
    "overview": "briefly label as general preparation guidance",
    "topicsToRevise": ["at least 2 role-relevant topics; use explicit skills first"],
    "commonQuestions": ["role-relevant practice question topics"],
    "expectedRounds": ["source-confirmed rounds only; [] if absent"],
    "projectIdeas": ["for fresher/internship only; otherwise []"],
    "commonMistakes": ["role-relevant general advice"],
    "plan30Days": ["short, practical general preparation steps"]
  },
  "faqs": [{"question":"...","answer":"concise and answered only by source facts"}]
}
Return up to 6 distinct FAQs based only on facts provided. Do not add a special note or any extra keys. Do not pad with missing-information disclaimers.`;

export function buildAiUserPrompt(facts = {}, validationError = "") {
  const content = { ...facts };
  const description = String(content.description_text || content.description || "").trim() || "No description provided.";
  const minimumExperience = content.experience_years_min;
  const maximumExperience = content.experience_years_max;
  const experience = minimumExperience != null && maximumExperience != null
    ? `${minimumExperience}-${maximumExperience} years`
    : minimumExperience != null
      ? `At least ${minimumExperience} years`
      : maximumExperience != null
        ? `Up to ${maximumExperience} years`
        : String(content.experience || "").trim() || "Not stated";
  let prompt = USER_TEMPLATE
    .replace(/\{\{company\}\}/g, String(content.company || "").trim() || "Unknown company")
    .replace(/\{\{title\}\}/g, String(content.title || "").trim() || "Role")
    .replace(/\{\{location\}\}/g, String(content.location || "").trim() || "Not stated")
    .replace(/\{\{workMode\}\}/g, String(content.work_mode || content.workMode || "").trim() || "Not stated")
    .replace(/\{\{level\}\}/g, String(content.level || "").trim() || "Not stated")
    .replace(/\{\{experience\}\}/g, experience)
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
    benefits: { type: "ARRAY", items: { type: "STRING" } },
    applySteps: { type: "ARRAY", items: { type: "STRING" } },
    prepGuide: {
      type: "OBJECT",
      properties: {
        overview: { type: "STRING" },
        topicsToRevise: { type: "ARRAY", items: { type: "STRING" } },
        commonQuestions: { type: "ARRAY", items: { type: "STRING" } },
        expectedRounds: { type: "ARRAY", items: { type: "STRING" } },
        projectIdeas: { type: "ARRAY", items: { type: "STRING" } },
        commonMistakes: { type: "ARRAY", items: { type: "STRING" } },
        plan30Days: { type: "ARRAY", items: { type: "STRING" } }
      },
      required: ["overview", "topicsToRevise", "commonQuestions", "expectedRounds", "projectIdeas", "commonMistakes", "plan30Days"]
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
    "benefits",
    "applySteps",
    "prepGuide",
    "faqs"
  ]
};
