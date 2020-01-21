// Switch these lines once there are useful utils
// const testUtils = require('./utils');
require('./utils');
const converter = require('../lib/converter');

describe('Minimal examples', function () {
    it('Can convert <p>Hello World</p>', function () {
        const mobiledoc = converter.toMobiledoc('<p>Hello World!</p>');

        mobiledoc.should.be.an.Object().with.properties(['version', 'atoms', 'cards', 'markups', 'sections']);

        // Most of the object is empty
        mobiledoc.atoms.should.be.an.Array().with.lengthOf(0);
        mobiledoc.cards.should.be.an.Array().with.lengthOf(0);
        mobiledoc.markups.should.be.an.Array().with.lengthOf(0);

        // Only version & sections are populated
        mobiledoc.version.should.eql('0.3.1');
        mobiledoc.sections.should.be.an.Array().with.lengthOf(1);
        mobiledoc.sections[0].should.be.an.Array().with.lengthOf(3);
        mobiledoc.sections[0].should.eql([1, 'p', [[0, [], 0, 'Hello World!']]]);
    });

    it('Can convert <p>Hello</p><p>World</p>', function () {
        const mobiledoc = converter.toMobiledoc('<p>Hello</p><p>World</p>');

        mobiledoc.should.be.an.Object().with.properties(['version', 'atoms', 'cards', 'markups', 'sections']);

        // Most of the object is empty
        mobiledoc.atoms.should.be.an.Array().with.lengthOf(0);
        mobiledoc.cards.should.be.an.Array().with.lengthOf(0);
        mobiledoc.markups.should.be.an.Array().with.lengthOf(0);

        // Only version & sections are populated
        mobiledoc.version.should.eql('0.3.1');
        mobiledoc.sections.should.be.an.Array().with.lengthOf(2);
        mobiledoc.sections[0].should.be.an.Array().with.lengthOf(3);
        mobiledoc.sections[0].should.eql([1, 'p', [[0, [], 0, 'Hello']]]);
        mobiledoc.sections[1].should.be.an.Array().with.lengthOf(3);
        mobiledoc.sections[1].should.eql([1, 'p', [[0, [], 0, 'World']]]);
    });
});

describe('Nested examples', function () {
    it('Can convert <div><p>Hello</p><p>World</p></div>', function () {
        const mobiledoc = converter.toMobiledoc('<div><p>Hello</p><p>World</p></div>', {plugins: []});

        mobiledoc.should.be.an.Object().with.properties(['version', 'atoms', 'cards', 'markups', 'sections']);

        // Most of the object is empty
        mobiledoc.atoms.should.be.an.Array().with.lengthOf(0);
        mobiledoc.cards.should.be.an.Array().with.lengthOf(0);
        mobiledoc.markups.should.be.an.Array().with.lengthOf(0);

        // Only version & sections are populated
        mobiledoc.version.should.eql('0.3.1');
        mobiledoc.sections.should.be.an.Array().with.lengthOf(2);
        mobiledoc.sections[0].should.be.an.Array().with.lengthOf(3);
        mobiledoc.sections[0].should.eql([1, 'p', [[0, [], 0, 'Hello']]]);
        mobiledoc.sections[1].should.be.an.Array().with.lengthOf(3);
        mobiledoc.sections[1].should.eql([1, 'p', [[0, [], 0, 'World']]]);
    });

    it('Can convert <div><div><p>Hello</p><p>World</p></div></div>', function () {
        const mobiledoc = converter.toMobiledoc('<div><div><p>Hello</p><p>World</p></div></div>', {plugins: []});

        mobiledoc.should.be.an.Object().with.properties(['version', 'atoms', 'cards', 'markups', 'sections']);

        // Most of the object is empty
        mobiledoc.atoms.should.be.an.Array().with.lengthOf(0);
        mobiledoc.cards.should.be.an.Array().with.lengthOf(0);
        mobiledoc.markups.should.be.an.Array().with.lengthOf(0);

        // Only version & sections are populated
        mobiledoc.version.should.eql('0.3.1');
        mobiledoc.sections.should.be.an.Array().with.lengthOf(2);
        mobiledoc.sections[0].should.be.an.Array().with.lengthOf(3);
        mobiledoc.sections[0].should.eql([1, 'p', [[0, [], 0, 'Hello']]]);
        mobiledoc.sections[1].should.be.an.Array().with.lengthOf(3);
        mobiledoc.sections[1].should.eql([1, 'p', [[0, [], 0, 'World']]]);
    });

    it('Can convert <div><section><p>Hello</p></section><div><p>World</p></div></div>', function () {
        const mobiledoc = converter.toMobiledoc('<div><section><p>Hello</p></section><div><p>World</p></div></div>', {plugins: []});

        mobiledoc.should.be.an.Object().with.properties(['version', 'atoms', 'cards', 'markups', 'sections']);

        // Most of the object is empty
        mobiledoc.atoms.should.be.an.Array().with.lengthOf(0);
        mobiledoc.cards.should.be.an.Array().with.lengthOf(0);
        mobiledoc.markups.should.be.an.Array().with.lengthOf(0);

        // Only version & sections are populated
        mobiledoc.version.should.eql('0.3.1');
        mobiledoc.sections.should.be.an.Array().with.lengthOf(2);
        mobiledoc.sections[0].should.be.an.Array().with.lengthOf(3);
        mobiledoc.sections[0].should.eql([1, 'p', [[0, [], 0, 'Hello']]]);
        mobiledoc.sections[1].should.be.an.Array().with.lengthOf(3);
        mobiledoc.sections[1].should.eql([1, 'p', [[0, [], 0, 'World']]]);
    });

    it('Can convert <div><p>Hello</p><div><p>World</p></div></div>', function () {
        const mobiledoc = converter.toMobiledoc('<div><p>Hello</p><div><p>World</p></div></div>', {plugins: []});

        mobiledoc.should.be.an.Object().with.properties(['version', 'atoms', 'cards', 'markups', 'sections']);

        // Most of the object is empty
        mobiledoc.atoms.should.be.an.Array().with.lengthOf(0);
        mobiledoc.cards.should.be.an.Array().with.lengthOf(0);
        mobiledoc.markups.should.be.an.Array().with.lengthOf(0);

        // Only version & sections are populated
        mobiledoc.version.should.eql('0.3.1');
        mobiledoc.sections.should.be.an.Array().with.lengthOf(2);
        mobiledoc.sections[0].should.be.an.Array().with.lengthOf(3);
        mobiledoc.sections[0].should.eql([1, 'p', [[0, [], 0, 'Hello']]]);
        mobiledoc.sections[1].should.be.an.Array().with.lengthOf(3);
        mobiledoc.sections[1].should.eql([1, 'p', [[0, [], 0, 'World']]]);
    });

    it('Can convert with whitespace', function () {
        const mobiledoc = converter
            .toMobiledoc(`
                <div>
                <p>Hello</p>
                <ul>
                    <li>Big</li>
                </ul>
                <div>
                    <p>World</p>
                </div>
            </div>
            `, {plugins: []});

        mobiledoc.should.be.an.Object().with.properties(['version', 'atoms', 'cards', 'markups', 'sections']);

        // Most of the object is empty
        mobiledoc.atoms.should.be.an.Array().with.lengthOf(0);
        mobiledoc.cards.should.be.an.Array().with.lengthOf(0);
        mobiledoc.markups.should.be.an.Array().with.lengthOf(0);

        // Only version & sections are populated
        mobiledoc.version.should.eql('0.3.1');
        mobiledoc.sections.should.be.an.Array().with.lengthOf(3);
        mobiledoc.sections[0].should.be.an.Array().with.lengthOf(3);
        mobiledoc.sections[0].should.eql([1, 'p', [[0, [], 0, 'Hello']]]);
        mobiledoc.sections[1].should.be.an.Array().with.lengthOf(3);
        mobiledoc.sections[1].should.eql([3, 'ul', [[[0, [], 0, 'Big']]]]);
        mobiledoc.sections[2].should.be.an.Array().with.lengthOf(3);
        mobiledoc.sections[2].should.eql([1, 'p', [[0, [], 0, 'World']]]);
    });
});

// Basic tests to ensure that we are successfully loading kg-parser-plugins
describe('Default plugin examples', function () {
    it('Can convert <hr> into a card', function () {
        const mobiledoc = converter.toMobiledoc('<hr />');

        mobiledoc.cards.should.be.an.Array().with.lengthOf(1);
        mobiledoc.cards[0].should.be.an.Array().with.lengthOf(2);
        mobiledoc.cards[0].should.eql(['hr', {}]);
        mobiledoc.sections.should.be.an.Array().with.lengthOf(1);
        mobiledoc.sections[0].should.be.an.Array().with.lengthOf(2);
        mobiledoc.sections[0].should.eql([10, 0]);
    });

    // this is a special-case test to make sure that we're preserving the
    // first HTML comment when parsing html to DOM before the conversion
    it('can convert html card output back into html card', function () {
        const mobiledoc = converter.toMobiledoc('<!--kg-card-begin: html--><div><span>Custom HTML</span></div><!--kg-card-end: html-->');

        mobiledoc.cards.should.be.an.Array().with.lengthOf(1);
        mobiledoc.cards[0].should.be.an.Array().with.lengthOf(2);
        mobiledoc.cards[0].should.eql(['html', {html: '<div><span>Custom HTML</span></div>'}]);
        mobiledoc.sections.should.be.an.Array().with.lengthOf(1);
        mobiledoc.sections[0].should.be.an.Array().with.lengthOf(2);
        mobiledoc.sections[0].should.eql([10, 0]);
    });

    it.only('can convert escaped HTML', function () {
        const mobiledoc = converter.toMobiledoc('<div class="section-content"><div class="section-inner sectionLayout--insetColumn"><h3 name="e72b" id="e72b" class="graf graf--h3 graf--leading">The Philosophy of The Shortcut</h3><p name="3497" id="3497" class="graf graf--p graf-after--h3">Input fields are back again, we used them last time to learn <a href="https://medium.com/@ryan.roberts/converting-any-data-type-to-another-de37606c8fd9#.zaj1osp6j" data-href="https://medium.com/@ryan.roberts/converting-any-data-type-to-another-de37606c8fd9#.zaj1osp6j" class="markup--anchor markup--p-anchor" target="_blank">how to convert data</a> and this time we are using them to create shortcuts. If you want to make something like Dribbble’s keyboard shortcut for liking a post, this will get you there.</p><p name="405d" id="405d" class="graf graf--p graf-after--p">We will be covering the basics of creating keyboard shortcuts and there are many ways to set them up. We’ll be covering just one way so you can get an idea of how it works. After learning how it works, you’ll be able to tweak it to work for what you’re making.</p><h3 name="852f" id="852f" class="graf graf--h3 graf-after--p">The Bubbler’s Dilemma</h3><p name="bd81" id="bd81" class="graf graf--p graf-after--h3">You can do this with code, check out <a href="https://jsfiddle.net/dmtf6n27/38/" data-href="https://jsfiddle.net/dmtf6n27/38/" class="markup--anchor markup--p-anchor" rel="nofollow noopener noopener" target="_blank">https://jsfiddle.net/dmtf6n27/38/</a> copy and paste the JavaScript into an HTML element in Bubble. Surround the Javascript with a <a href="http://www.w3schools.com/tags/tag_script.asp" data-href="http://www.w3schools.com/tags/tag_script.asp" class="markup--anchor markup--p-anchor" rel="noopener" target="_blank">&lt;script&gt;</a> tag and you’re done. Well, if you just want the shortcut to do essentially nothing but display an alert. Which is fine if that’s what you’re looking for. You can even put in dynamic information for it to display in the alert. But, I don’t think that’s what we want.</p><p name="412b" id="412b" class="graf graf--p graf-after--p graf--trailing">We can’t use it to run a workflow, or toggle an element’s visibility, or do anything really fun since Bubble can’t get information from the HTML element yet. Just put information into it, albeit, dynamically.</p></div>');

        console.log(require('util').inspect(mobiledoc, false, null));
    });
});
