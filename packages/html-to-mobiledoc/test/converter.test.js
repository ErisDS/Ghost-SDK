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
        mobiledoc.sections.should.be.an.Array().with.lengthOf(2);
        mobiledoc.sections[0].should.be.an.Array().with.lengthOf(3);
        mobiledoc.sections[0].should.eql([1, 'p', [[0, [], 0, 'Hello']]]);
        mobiledoc.sections[1].should.be.an.Array().with.lengthOf(3);
        mobiledoc.sections[1].should.eql([1, 'p', [[0, [], 0, 'World']]]);
    });

    it('Can convert with whitespace and not affect markups', function () {
        const mobiledoc = converter
            .toMobiledoc(`
                <div>
                <p>Hello to <a href="https://example.com">examples</a>
                ,
                    <a href="https://things.com">things</a>
                     and
                    <a href="https://stuff.com">stuff</a>.
                    Testing.
                </p>
            </div>
            `, {plugins: []});

        mobiledoc.should.be.an.Object().with.properties(['version', 'atoms', 'cards', 'markups', 'sections']);

        // Most of the object is empty
        mobiledoc.atoms.should.be.an.Array().with.lengthOf(0);
        mobiledoc.cards.should.be.an.Array().with.lengthOf(0);
        mobiledoc.markups.should.be.an.Array().with.lengthOf(0);

        // Only version & sections are populated
        mobiledoc.version.should.eql('0.3.1');
        mobiledoc.sections.should.be.an.Array().with.lengthOf(2);
        // mobiledoc.sections[0].should.be.an.Array().with.lengthOf(3);
        // mobiledoc.sections[0].should.eql([1, 'p', [[0, [], 0, 'Hello']]]);
        // mobiledoc.sections[1].should.be.an.Array().with.lengthOf(3);
        // mobiledoc.sections[1].should.eql([1, 'p', [[0, [], 0, 'World']]]);
    });

    it('Can convert with whitespace for lists and stuff', function () {
        const mobiledoc = converter
            .toMobiledoc(`<ul>
            <li>
                Single item list
            </li>
        </ul>
        <figure>
            <img data-width="2000" data-height="1203" src="123.jpeg">
            <figcaption>Test a <em>marked up</em> caption</figcaption>
        </figure>`, {plugins: []});

        mobiledoc.should.be.an.Object().with.properties(['version', 'atoms', 'cards', 'markups', 'sections']);
    });
});
