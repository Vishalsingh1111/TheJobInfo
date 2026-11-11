// export const SYSTEM_INSTRUCTION = `Create accurate, original job-listing content for TheJobInfo from the supplied data.
// Use only stated facts for job details; never invent eligibility, salary, benefits, dates, technologies, openings, or hiring rounds. Rewrite rather than copy source sentences. Include every supplied skill tag and every additional skill explicitly named in the source; do not infer tools or requirements. Leave unknown facts empty. Keep employer facts separate from clearly labelled general preparation guidance. Use concise, neutral Indian English. Do not promise outcomes or imply affiliation with the employer. Return only valid JSON matching the schema.`;

// export const USER_TEMPLATE = `JOB FACTS
// Company: {{company}} | Role: {{title}} | Location: {{location}} | Work mode: {{workMode}}
// Level: {{level}} | Experience: {{experience}} | Salary: {{salary}} | Posted: {{postedAt}}
// Explicit skills from job data (include every one): {{skills}}
// Full source description (use all relevant requirements; do not ignore later sections):
// """
// {{description}}
// """

// Return exactly these JSON keys. Keep every item specific to this role:
// {
//   "seoTitle": "role, company and location; max 60 characters",
//   "metaDescription": "factual; max 155 characters",
//   "summary": "25-120 words: role, stated context, requirements and practical details",
//   "whatYouWillDo": ["3-6 concise duties rewritten from the source; [] only when no duties are stated"],
//   "skillsRequired": ["all explicit skill tags plus all additional skills explicitly required in the source; deduplicated"],
//   "eligibility": {"education":"","experience":"","batch":"","other":""},
//   "selectionProcess": ["stated hiring steps only; [] if absent"],
//   "whoShouldApply": "1-2 concise sentences derived from stated role requirements",
//   "benefits": ["stated benefits only; [] if absent"],
//   "applySteps": ["brief generic steps for using the supplied application link"],
//   "prepGuide": {
//     "overview": "briefly label as general preparation guidance",
//     "topicsToRevise": ["at least 2 role-relevant topics; use explicit skills first"],
//     "commonQuestions": ["role-relevant practice question topics"],
//     "expectedRounds": ["source-confirmed rounds only; [] if absent"],
//     "projectIdeas": ["for fresher/internship only; otherwise []"],
//     "commonMistakes": ["role-relevant general advice"],
//     "plan30Days": ["short, practical general preparation steps"]
//   },
//   "faqs": [{"question":"...","answer":"concise and answered only by source facts"}]
// }
// Return up to 6 distinct FAQs based only on facts provided. Do not add a special note or any extra keys. Do not pad with missing-information disclaimers.`;

// export function buildAiUserPrompt(facts = {}, validationError = "") {
//   const content = { ...facts };
//   const description = String(content.description_text || content.description || "").trim() || "No description provided.";
//   const minimumExperience = content.experience_years_min;
//   const maximumExperience = content.experience_years_max;
//   const experience = minimumExperience != null && maximumExperience != null
//     ? `${minimumExperience}-${maximumExperience} years`
//     : minimumExperience != null
//       ? `At least ${minimumExperience} years`
//       : maximumExperience != null
//         ? `Up to ${maximumExperience} years`
//         : String(content.experience || "").trim() || "Not stated";
//   let prompt = USER_TEMPLATE
//     .replace(/\{\{company\}\}/g, String(content.company || "").trim() || "Unknown company")
//     .replace(/\{\{title\}\}/g, String(content.title || "").trim() || "Role")
//     .replace(/\{\{location\}\}/g, String(content.location || "").trim() || "Not stated")
//     .replace(/\{\{workMode\}\}/g, String(content.work_mode || content.workMode || "").trim() || "Not stated")
//     .replace(/\{\{level\}\}/g, String(content.level || "").trim() || "Not stated")
//     .replace(/\{\{experience\}\}/g, experience)
//     .replace(/\{\{salary\}\}/g, String(content.salary_text || content.salary || "").trim() || "Not stated")
//     .replace(/\{\{skills\}\}/g, Array.isArray(content.skills) ? content.skills.join(", ") : String(content.skills || "").trim() || "Not stated")
//     .replace(/\{\{postedAt\}\}/g, String(content.posted_at || content.postedAt || "").trim() || "Not stated")
//     .replace(/\{\{description\}\}/g, description);

//   if (validationError) {
//     prompt += `\n\nValidation feedback to fix: ${validationError}`;
//   }

//   return prompt;
// }

// export const JOB_CONTENT_SCHEMA = {
//   type: "OBJECT",
//   properties: {
//     seoTitle: { type: "STRING" },
//     metaDescription: { type: "STRING" },
//     summary: { type: "STRING" },
//     whatYouWillDo: { type: "ARRAY", items: { type: "STRING" } },
//     skillsRequired: { type: "ARRAY", items: { type: "STRING" } },
//     eligibility: {
//       type: "OBJECT",
//       properties: {
//         education: { type: "STRING" },
//         experience: { type: "STRING" },
//         batch: { type: "STRING" },
//         other: { type: "STRING" }
//       },
//       required: ["education", "experience", "batch", "other"]
//     },
//     selectionProcess: { type: "ARRAY", items: { type: "STRING" } },
//     whoShouldApply: { type: "STRING" },
//     benefits: { type: "ARRAY", items: { type: "STRING" } },
//     applySteps: { type: "ARRAY", items: { type: "STRING" } },
//     prepGuide: {
//       type: "OBJECT",
//       properties: {
//         overview: { type: "STRING" },
//         topicsToRevise: { type: "ARRAY", items: { type: "STRING" } },
//         commonQuestions: { type: "ARRAY", items: { type: "STRING" } },
//         expectedRounds: { type: "ARRAY", items: { type: "STRING" } },
//         projectIdeas: { type: "ARRAY", items: { type: "STRING" } },
//         commonMistakes: { type: "ARRAY", items: { type: "STRING" } },
//         plan30Days: { type: "ARRAY", items: { type: "STRING" } }
//       },
//       required: ["overview", "topicsToRevise", "commonQuestions", "expectedRounds", "projectIdeas", "commonMistakes", "plan30Days"]
//     },
//     faqs: {
//       type: "ARRAY",
//       items: {
//         type: "OBJECT",
//         properties: {
//           question: { type: "STRING" },
//           answer: { type: "STRING" }
//         },
//         required: ["question", "answer"]
//       }
//     }
//   },
//   required: [
//     "seoTitle",
//     "metaDescription",
//     "summary",
//     "whatYouWillDo",
//     "skillsRequired",
//     "eligibility",
//     "selectionProcess",
//     "whoShouldApply",
//     "benefits",
//     "applySteps",
//     "prepGuide",
//     "faqs"
//   ]
// };


export const SYSTEM_INSTRUCTION = `You write original, useful job-page content for TheJobInfo, an independent job information site for candidates in India. Write like a careful career editor, not like the posting.
Rules:
1. Job facts come only from the data given. Never invent salary, benefits, dates, tools, openings, eligibility or hiring rounds. Leave unknown facts empty ("" or []). Never write "not stated", "not available" or similar filler.
2. Rewrite in your own words. Do not copy sentences. Ignore recruiter text, job IDs, slogans and legal text.
3. Be specific. Every sentence must use this role, its skills, its level or its company context. Avoid filler such as "great opportunity", "fast-paced" or "dynamic team".
4. Include every supplied skill tag and any other skill the source explicitly requires. Do not infer tools.
5. Preparation advice is general guidance for this kind of role. Never present it as the employer's process.
6. Plain, neutral Indian English, short sentences, no emojis, no promises about hiring, no claim of affiliation with the employer.
Return only valid JSON that matches the schema.`;

export const USER_TEMPLATE = `JOB
{{facts}}
SOURCE
"""
{{description}}
"""
Return exactly these JSON keys:
{
 "seoTitle": "role, company, city; max 60 characters",
 "metaDescription": "factual, max 150 characters",
 "summary": "80-115 words: what the person will do, what the team or company does (only if stated), key requirements, who it suits",
 "whatYouWillDo": ["4-6 duties, 8-18 words each, rewritten from the source"],
 "skillsRequired": ["all supplied skill tags plus other skills explicitly required; deduplicated"],
 "eligibility": {"education":"","experience":"","batch":"","other":""},
 "selectionProcess": ["stated hiring steps only; [] if absent"],
 "whoShouldApply": "1-2 sentences on the kind of candidate this fits",
 "benefits": ["stated benefits only; [] if absent"],
 "applySteps": ["3 short steps for using the application link"],
 "prepGuide": {
  "overview": "1-2 sentences, labelled as general preparation guidance",
  "topicsToRevise": ["5-6 topics, explicit skills first"],
  "commonQuestions": ["4 practice questions or question areas for this role"],
  "expectedRounds": ["rounds stated in the source only; [] if absent"],
  "projectIdeas": ["2 ideas for fresher or internship roles; otherwise []"],
  "commonMistakes": ["3 role-relevant mistakes, max 20 words each"],
  "plan30Days": ["4 short weekly preparation steps"]
 },
 "faqs": [{"question":"","answer":""}]
}
Field rules: fill eligibility.experience from the Experience given; fill education and batch only if the source states them. FAQs are optional: add 3-4 only when the source supports specific questions about requirements, skills to focus on, suitability for the level or work mode, each answer 25-50 words using source facts. If the source cannot support good FAQs, return "faqs": []. Never ask "what is the role" or "where is it". No extra keys.`;

const MAX_SOURCE_CHARS = 2800;
const BOILERPLATE_LINE = /equal opportunity|equal employment|without regard to|reasonable accommodation|pay transparency|privacy notice|privacy policy|e-verify|background check|drug test/i;
const SECTION_START = /(responsibilit|what you.ll do|what you will do|requirements|qualifications|what we.re looking|minimum qualifications|skills)/i;

export function cleanDescription(raw) {
  let text = String(raw || "")
    .replace(/<br\s*\/?>|<\/p>|<\/li>|<\/h\d>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/\b(?:P|R|JR|REQ)[-\s]{0,2}\d{3,}\b/g, "");

  text = text
    .split(/\n+/)
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .filter((line) => line && !BOILERPLATE_LINE.test(line))
    .join("\n");

  if (text.length <= MAX_SOURCE_CHARS) return text;

  const headLength = 900;
  const sectionIndex = text.slice(headLength).search(SECTION_START);
  if (sectionIndex === -1) return text.slice(0, MAX_SOURCE_CHARS);

  const start = headLength + sectionIndex;
  return `${text.slice(0, headLength)}\n...\n${text.slice(start, start + (MAX_SOURCE_CHARS - headLength))}`;
}

function formatExperience(content) {
  const minimum = content.experience_years_min;
  const maximum = content.experience_years_max;
  if (minimum != null && maximum != null) return `${minimum}-${maximum} years`;
  if (minimum != null) return `At least ${minimum} years`;
  if (maximum != null) return `Up to ${maximum} years`;
  return String(content.experience || "").trim();
}

function buildFacts(content) {
  const skills = (Array.isArray(content.skills)
    ? content.skills
    : String(content.skills || "").split(","))
    .map((skill) => String(skill).trim())
    .filter(Boolean);
  const uniqueSkills = [...new Set(skills)].slice(0, 20);

  const pairs = [
    ["Company", String(content.company || "").trim()],
    ["Role", String(content.title || "").trim()],
    ["Level", String(content.level || "").trim()],
    ["Location", String(content.location || "").trim()],
    ["Work mode", String(content.work_mode || content.workMode || "").trim()],
    ["Experience", formatExperience(content)],
    ["Salary", String(content.salary_text || content.salary || "").trim()],
    ["Skills (include every one)", uniqueSkills.join(", ")]
  ];

  return pairs.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`).join("\n");
}

export function buildAiUserPrompt(facts = {}, validationError = "") {
  const content = { ...facts };
  const description = cleanDescription(content.description_text || content.description) || "No description provided.";

  let prompt = USER_TEMPLATE
    .replace("{{facts}}", () => buildFacts(content))
    .replace("{{description}}", () => description);

  if (validationError) {
    prompt += `\n\nFix these problems and return corrected JSON: ${validationError}`;
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
    "prepGuide"
  ]
};