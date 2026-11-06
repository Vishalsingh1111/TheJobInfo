import React from "react";
import { Link } from "react-router-dom";

const content = {
    all: {
        title: "How to prepare for a job",
        cards: [
            ["Tailor your resume", "Match your skills and experience to the role and keep your resume focused."],
            ["Review the basics", "Practise role-specific skills and revisit the tools listed by the employer."],
            ["Prepare examples", "Choose clear examples of projects, responsibilities, and outcomes."],
            ["Check the employer", "Confirm requirements and application details on the employer’s page."],
        ],
        faqs: [
            ["Who can apply for these jobs?", "Each listing has its own eligibility and experience requirements. Review them before applying."],
            ["Do I need to pay to apply?", "TheJobInfo does not charge candidates to browse listings. Apply through the employer’s official page and do not pay for a promised job."],
            ["How often are jobs added?", "Listings are updated as new opportunities become available. Check the employer’s page for current availability."],
        ],
        guide: "Read the full job search guide",
    },
    fresher: {
        title: "How to prepare as a fresher",
        cards: [
            ["Build two projects", "Pick one language and build two small projects you can explain end to end."],
            ["Revise the basics", "Arrays, strings, SQL and OOP concepts come up in most entry-level rounds."],
            ["Keep a one-page resume", "Link your projects, list skills honestly and keep it to one page."],
            ["Practise HR answers", "Prepare short answers for introductions, strengths and relocation."],
        ],
        faqs: [
            ["Who can apply for fresher jobs?", "Fresh graduates and entry-level candidates can apply when they meet the eligibility criteria in the listing."],
            ["Do I need to pay to apply?", "TheJobInfo does not charge candidates to browse listings. Apply through the employer’s official page and do not pay for a promised job."],
            ["How often are jobs added?", "Fresher listings are updated as opportunities become available. Check the employer’s page for current availability."],
        ],
        guide: "Read the full fresher guide",
    },
    experienced: {
        title: "How to prepare for experienced roles",
        cards: [
            ["Show your impact", "Choose projects that demonstrate the work you owned and the outcomes you delivered."],
            ["Refresh role skills", "Review the tools, systems and technical topics named in the job description."],
            ["Explain trade-offs", "Prepare to discuss decisions, constraints and what you would improve."],
            ["Update your resume", "Prioritize relevant experience and use clear, supportable results."],
        ],
        faqs: [
            ["Who can apply for experienced jobs?", "Candidates whose experience matches the role requirements can apply. Review the required skills and years of experience in the listing."],
            ["Do I need to pay to apply?", "TheJobInfo does not charge candidates to browse listings. Apply through the employer’s official page and do not pay for a promised job."],
            ["How often are jobs added?", "Experienced listings are updated as new opportunities become available. Check the employer’s page for current availability."],
        ],
        guide: "Read the full career guide",
    },
    internship: {
        title: "How to prepare for an internship",
        cards: [
            ["Check eligibility", "Review student status, graduation dates, duration and location requirements."],
            ["Show your projects", "Add coursework or projects and explain the part you personally completed."],
            ["Practise the basics", "Review the skills and topics mentioned in the internship description."],
            ["Prepare questions", "Ask about the schedule, supervision and work expected from interns."],
        ],
        faqs: [
            ["Who can apply for internships?", "Eligibility depends on the program. Check the listing for student status, graduation dates and other requirements."],
            ["Do I need to pay to apply?", "TheJobInfo does not charge candidates to browse listings. Apply through the employer’s official page and do not pay for a promised job."],
            ["How often are internships added?", "Internship listings are updated as programs open. Check the employer’s page for current availability and deadlines."],
        ],
        guide: "Read the full internship guide",
    },
};

export default function JobPrepFaq({ level = "all" }) {
    const page = content[level] || content.all;

    return (
        <div className="mt-8 space-y-3">
            <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-4" aria-labelledby="job-prep-heading">
                <h2 id="job-prep-heading" className="mb-3 text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">{page.title}</h2>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {page.cards.map(([title, description]) => (
                        <article key={title} className="min-h-[72px] rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-gray-800">
                            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{title}</h3>
                            <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-gray-300">{description}</p>
                        </article>
                    ))}
                </div>
                <Link to="/blogs" className="mt-3 inline-flex text-sm font-bold text-blue-700 hover:underline dark:text-blue-300">{page.guide}</Link>
            </section>

            <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-4" aria-labelledby="job-faq-heading">
                <h2 id="job-faq-heading" className="mb-2 text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">Frequently asked questions</h2>
                <div className="divide-y divide-slate-100 dark:divide-gray-800">
                    {page.faqs.map(([question, answer]) => (
                        <details key={question} className="group py-2.5">
                            <summary className="cursor-pointer list-none text-sm font-bold text-slate-900 marker:hidden dark:text-white"><span aria-hidden="true" className="mr-1">▸</span>{question}</summary>
                            <p className="pl-3.5 pt-2 text-sm leading-5 text-slate-600 dark:text-gray-300">{answer}</p>
                        </details>
                    ))}
                </div>
            </section>
        </div>
    );
}
