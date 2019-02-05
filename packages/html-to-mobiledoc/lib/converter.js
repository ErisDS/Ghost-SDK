const HTMLParser = require('@tryghost/mobiledoc-kit/dist/commonjs/mobiledoc-kit/parsers/html').default;
const DOMParser = require('@tryghost/mobiledoc-kit/dist/commonjs/mobiledoc-kit/parsers/dom').default;
const Builder = require('@tryghost/mobiledoc-kit/dist/commonjs/mobiledoc-kit/models/post-node-builder').default;
const mobiledocRenderer = require('@tryghost/mobiledoc-kit/dist/commonjs/mobiledoc-kit/renderers/mobiledoc').default;
const parserPlugins = require('@tryghost/kg-parser-plugins');
const { JSDOM } = require('jsdom');

require('undom/register');

const withJSDOM = (html, options = {}) => {
    // Vague steps:
    // 1. TODO: sanitize HTML
    let sanitizedHTML = html;

    // 2. Do something vaguely like loadPost
    // https://github.com/ErisDS/mobiledoc-kit/blob/master/src/js/editor/editor.js#L193
    // We use our parser plugins by default, but this is extensible
    options.plugins = options.plugins || parserPlugins;
    let parser = new DOMParser(new Builder(), options);
    let dom = new JSDOM(sanitizedHTML);
    let post = parser.parse(dom.window.document.body);

    // 3. Do something vaguely like serializePost
    // https://github.com/ErisDS/mobiledoc-kit/blob/master/src/js/editor/editor.js#L567
    let mobiledoc = mobiledocRenderer.render(post, '0.3.1');

    return mobiledoc;
};

const withOtherDOM = (html, options = {}) => {
     // Vague steps:
    // 1. TODO: sanitize HTML
    let sanitizedHTML = html;

    // 2. Do something vaguely like loadPost
    // https://github.com/ErisDS/mobiledoc-kit/blob/master/src/js/editor/editor.js#L193
    // We use our parser plugins by default, but this is extensible
    options.plugins = options.plugins || parserPlugins;
    let parser = new HTMLParser(new Builder(), options);
    let post = parser.parse(sanitizedHTML);

    console.log('post', post);

    // 3. Do something vaguely like serializePost
    // https://github.com/ErisDS/mobiledoc-kit/blob/master/src/js/editor/editor.js#L567
    let mobiledoc = mobiledocRenderer.render(post, '0.3.1');

    return mobiledoc;
};


module.exports.toMobiledoc = withOtherDOM;
// module.exports.toMobiledoc = withJSDOM;
