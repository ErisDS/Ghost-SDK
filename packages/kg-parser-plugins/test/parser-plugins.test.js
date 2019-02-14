const testUtils = require('./utils');

const plugins = require('../lib/parser-plugins');

describe.only('Advanced examples', function () {
    it('Can convert kg image gallery', function () {
        const mobiledoc = converter.toMobiledoc(testUtils.fixtures.readSync('kg-image-gallery.html'));

        mobiledoc.should.be.an.Object().with.properties(['version', 'atoms', 'cards', 'markups', 'sections']);

        console.log(mobiledoc.cards);

        // // Most of the object is empty
        // mobiledoc.atoms.should.be.an.Array().with.lengthOf(0);
        // mobiledoc.cards.should.be.an.Array().with.lengthOf(0);
        // mobiledoc.markups.should.be.an.Array().with.lengthOf(0);

        // // Only version & sections are populated
        // mobiledoc.version.should.eql('0.3.1');
        // mobiledoc.sections.should.be.an.Array().with.lengthOf(2);
        // mobiledoc.sections[0].should.be.an.Array().with.lengthOf(3);
        // mobiledoc.sections[0].should.eql([1, 'p', [[0, [], 0, 'Hello']]]);
        // mobiledoc.sections[1].should.be.an.Array().with.lengthOf(3);
        // mobiledoc.sections[1].should.eql([1, 'p', [[0, [], 0, 'World']]]);
    });

    it('Can convert graf image gallery', function () {
        const mobiledoc = converter.toMobiledoc(testUtils.fixtures.readSync('graf-image-gallery.html'));

        mobiledoc.should.be.an.Object().with.properties(['version', 'atoms', 'cards', 'markups', 'sections']);

        console.log(mobiledoc.cards);

        // // Most of the object is empty
        // mobiledoc.atoms.should.be.an.Array().with.lengthOf(0);
        // mobiledoc.cards.should.be.an.Array().with.lengthOf(0);
        // mobiledoc.markups.should.be.an.Array().with.lengthOf(0);

        // // Only version & sections are populated
        // mobiledoc.version.should.eql('0.3.1');
        // mobiledoc.sections.should.be.an.Array().with.lengthOf(2);
        // mobiledoc.sections[0].should.be.an.Array().with.lengthOf(3);
        // mobiledoc.sections[0].should.eql([1, 'p', [[0, [], 0, 'Hello']]]);
        // mobiledoc.sections[1].should.be.an.Array().with.lengthOf(3);
        // mobiledoc.sections[1].should.eql([1, 'p', [[0, [], 0, 'World']]]);
    });
});
