import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import Blog from "../Modal/Blog.modal.js";

dotenv.config();
const articlesDirectory = fileURLToPath(new URL("../content/articles/", import.meta.url));
const applyChanges = process.argv.includes("--apply");
const allowedCategories = new Set([
    "Interview Tips",
    "DSA",
    "System Design",
    "HR Round",
    "Resume Tips",
    "Aptitude",
    "Coding Interview",
    "Career Advice",
]);

function countWords(content) {
    return content
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;|&#160;/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .length;
}

function validateArticle(article, filename) {
    const requiredFields = ["title", "slug", "excerpt", "content", "category"];
    const missing = requiredFields.filter((field) => !String(article[field] || "").trim());
    if (missing.length) {
        throw new Error(`${filename} is missing required fields: ${missing.join(", ")}`);
    }
    if (!allowedCategories.has(article.category)) {
        throw new Error(`${filename} has an unsupported category: ${article.category}`);
    }
    if (article.excerpt.length > 300) {
        throw new Error(`${filename} excerpt exceeds 300 characters`);
    }
    const wordCount = countWords(article.content);
    if (wordCount < 800 || wordCount > 1500) {
        throw new Error(`${filename} must contain 800-1,500 words; found ${wordCount}`);
    }
    return wordCount;
}

async function main() {
    const filenames = (await fs.readdir(articlesDirectory))
        .filter((filename) => filename.endsWith(".json"))
        .sort();
    if (!filenames.length) throw new Error(`No article JSON files found in ${articlesDirectory}`);

    const articles = [];
    const slugs = new Set();
    for (const filename of filenames) {
        const article = JSON.parse(await fs.readFile(path.join(articlesDirectory, filename), "utf8"));
        const wordCount = validateArticle(article, filename);
        if (slugs.has(article.slug)) throw new Error(`Duplicate article slug: ${article.slug}`);
        slugs.add(article.slug);
        articles.push({ ...article, wordCount });
    }

    if (!applyChanges) {
        for (const article of articles) {
            console.log(`Validated draft: ${article.slug} (${article.wordCount} words)`);
        }
        console.log("Dry run only. Re-run with --apply to save drafts as unpublished articles.");
        return;
    }

    const uri = process.env.MONGO_URI || process.env.MongoDBURI;
    if (!uri) throw new Error("Set MONGO_URI before seeding articles");
    await mongoose.connect(uri);
    for (const article of articles) {
        const { wordCount, ...draft } = article;
        if (await Blog.exists({ slug: draft.slug })) {
            console.log(`Skipped existing article (not overwritten): ${draft.slug}`);
            continue;
        }
        await Blog.create({ ...draft, published: false });
        console.log(`Created unpublished draft: ${draft.slug}`);
    }
}

main()
    .catch((error) => {
        console.error(`Article seeding failed: ${error.message}`);
        process.exitCode = 1;
    })
    .finally(async () => {
        if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
    });
