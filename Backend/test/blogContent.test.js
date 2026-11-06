import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeBlogInput } from '../Controller/Blog.controller.js';

test('legacy article HTML is sanitized without changing supported markup', () => {
    const blog = normalizeBlogInput({
        content: '<h2 style="color: #7c3aed">Interview prep</h2><script>alert(1)</script><p onclick="run()">Read this</p>',
    }, { requireContent: true });

    assert.match(blog.content, /<h2 style="color:#7c3aed">Interview prep<\/h2>/);
    assert.match(blog.content, /<p>Read this<\/p>/);
    assert.doesNotMatch(blog.content, /script|onclick|alert/);
});

test('block-only articles are accepted and rich block HTML is sanitized', () => {
    const blog = normalizeBlogInput({
        blocks: [{
            type: 'paragraph',
            content: '<p>Safe <strong>rich text</strong><img src="javascript:alert(1)"></p><script>bad()</script>',
        }],
    }, { requireContent: true });

    assert.equal(blog.blocks.length, 1);
    assert.match(blog.blocks[0].content, /<strong>rich text<\/strong>/);
    assert.doesNotMatch(blog.blocks[0].content, /javascript:|script|bad\(\)/);
});

test('clearing blocks sanitizes retained legacy fallback HTML', () => {
    const blog = normalizeBlogInput(
        { blocks: [] },
        { existing: { content: '<p>Legacy</p><img src=x onerror="run()">', blocks: [] }, requireContent: true }
    );

    assert.match(blog.content, /<p>Legacy<\/p>/);
    assert.doesNotMatch(blog.content, /onerror|run\(\)/);
});

test('block URLs reject non-HTTP protocols', () => {
    assert.throws(
        () => normalizeBlogInput({ blocks: [{ type: 'image', url: 'javascript:alert(1)' }] }),
        /HTTP or HTTPS/
    );
    assert.throws(
        () => normalizeBlogInput({ blocks: [{ type: 'image', url: 'https://example.com/image.jpg' }] }),
        /alt text/
    );
    assert.equal(
        normalizeBlogInput({ blocks: [{ type: 'image', url: 'https://example.com/image.jpg', alt: 'Example image' }] }).blocks[0].url,
        'https://example.com/image.jpg'
    );
});

test('H4, table, button, and safe block styles are normalized', () => {
    const blog = normalizeBlogInput({
        blocks: [
            { type: 'heading', level: 4, heading: 'Implementation notes' },
            { type: 'table', headers: ['Skill', 'Level'], rows: [['JavaScript', 'Intermediate']] },
            { type: 'button', heading: 'Apply guide', url: 'https://example.com/apply', style: { accent: 'teal', textColor: '#123456' } },
        ],
    }, { requireContent: true });

    assert.equal(blog.blocks[0].level, 4);
    assert.deepEqual(blog.blocks[1].headers, ['Skill', 'Level']);
    assert.deepEqual(blog.blocks[1].rows, [['JavaScript', 'Intermediate']]);
    assert.equal(blog.blocks[2].style.accent, 'teal');
    assert.equal(blog.blocks[2].id.length > 0, true);
    assert.throws(
        () => normalizeBlogInput({ blocks: [{ type: 'paragraph', content: '<p>Text</p>', style: { textColor: 'red' } }] }),
        /six-digit hex/
    );
});
