/**
 * Copied from:
 * https://github.com/TryGhost/Ghost-Admin/blob/1f3d77d7230dd47a7eb5f38b90dfa510b2a16801/lib/koenig-editor/addon/options/parser-plugins.js
 * Which makes use of:
 * https://github.com/TryGhost/Ghost-Admin/blob/1f3d77d7230dd47a7eb5f38b90dfa510b2a16801/lib/koenig-editor/addon/helpers/clean-basic-html.js
 *
 * These functions are used to proces nodes during parsing from DOM -> mobiledoc
 */

// @TODO: resolve browser vs node env here
// import {cleanBasicHtml} from 'koenig-editor/helpers/clean-basic-html';

const _readFigCaptionFromNode = (node, payload) => {
    let figcaption = node.querySelector('figcaption');

    if (figcaption) {
        // @TODO: resolve browser vs node env here
        //let cleanHtml = cleanBasicHtml(figcaption.innerHTML);
        //payload.caption = cleanHtml;
        payload.caption = figcaption.innerHTML;
    }
};

const _readGalleryImageFromNode = (node, row, payload) => {
    let fileName = node.src.match(/[^/]*$/)[0];
    let image = {
        fileName,
        row,
        src: node.src,
        width: node.width,
        height: node.height
    };

    if (node.alt) {
        image.alt = node.alt;
    }

    if (node.title) {
        image.title = node.title;
    }

    payload.images.push(image);
};

// mobiledoc by default ignores <BR> tags but we have a custom SoftReturn atom
const brToSoftBreakAtom = (node, builder, {addMarkerable, nodeFinished}) => {
    if (node.nodeType !== 1 || node.tagName !== 'BR') {
        return;
    }

    let softReturn = builder.createAtom('soft-return');
    addMarkerable(softReturn);

    nodeFinished();
};

// leading newlines in text nodes will add a space to the beginning of the text
// which doesn't render correctly if we're replacing <br> with SoftReturn atoms
// after parsing text as markdown to html
const removeLeadingNewline = (node) => {
    if (node.nodeType !== 3 || node.nodeName !== '#text') {
        return;
    }

    node.nodeValue = node.nodeValue.replace(/^\n/, '');
};

let rowCount = 0, galleryPayload;

const nodeIsGrafGallery = (node) => {
    return node.nodeType === 1 && node.tagName === 'DIV' && node.dataset && node.dataset.paragraphCount && node.querySelectorAll('img').length > 0;
};

const grafGallery = (node, builder, {addSection, nodeFinished}) => {
    if (!nodeIsGrafGallery(node)) {
        return;
    }

    let imgs = node.querySelectorAll('img');

    if (rowCount === 0) {
        galleryPayload = {images: []};
    }

    imgs.forEach((img) => {
        if (!img.src) {
            return;
        }

        _readGalleryImageFromNode(img, rowCount, galleryPayload);
    });

    // If the next sibling is also a gallery item, we finish this node and return
    if (node.nextSibling && nodeIsGrafGallery(node.nextSibling)) {
        rowCount += 1;
        nodeFinished();
        return;
    }

    // Otherwise process the end of the gallery
    _readFigCaptionFromNode(node, galleryPayload);

    let cardSection = builder.createCardSection('gallery', galleryPayload);

    rowCount = 0;
    galleryPayload = null;
    addSection(cardSection);
    nodeFinished();
};

const figureToGalleryCard = (node, builder, {addSection, nodeFinished}) => {
    if (node.nodeType !== 1 || node.tagName !== 'FIGURE') {
        return;
    }

    if (!node.className.match(/kg-gallery-card/)) {
        return;
    }

    let rows = node.querySelectorAll('.kg-gallery-row');
    let payload = {
        images: []
    };

    rows.forEach((rowNode, rowNum) => {
        let imgs = rowNode.querySelectorAll('img');
        imgs.forEach((img) => {
            if (!img.src) {
                return;
            }

            _readGalleryImageFromNode(img, rowNum, payload);
        });
    });

    _readFigCaptionFromNode(node, payload);

    let cardSection = builder.createCardSection('gallery', payload);
    addSection(cardSection);
    nodeFinished();
};

const figureToImageCard = (node, builder, {addSection, nodeFinished}) => {
    if (node.nodeType !== 1 || node.tagName !== 'FIGURE') {
        return;
    }

    let img = node.querySelector('img');
    let kgClass = node.className.match(/kg-width-(wide|full)/);
    let grafClass = node.className.match(/graf--layout(FillWidth|OutsetCenter)/);

    if (!img) {
        return;
    }

    let payload = {
        src: img.src,
        alt: img.alt,
        title: img.title
    };

    if (kgClass) {
        payload.cardWidth = kgClass[1];
    } else if (grafClass) {
        payload.cardWidth = grafClass[1] === 'FillWidth' ? 'full' : 'wide';
    }

    _readFigCaptionFromNode(node, payload);

    let cardSection = builder.createCardSection('image', payload);
    addSection(cardSection);
    nodeFinished();
};

const imgToCard = (node, builder, {addSection, nodeFinished}) => {
    if (node.nodeType !== 1 || node.tagName !== 'IMG') {
        return;
    }

    let payload = {
        src: node.src,
        alt: node.alt,
        title: node.title
    };

    let cardSection = builder.createCardSection('image', payload);
    addSection(cardSection);
    nodeFinished();
};

const hrToCard = (node, builder, {addSection, nodeFinished}) => {
    if (node.nodeType !== 1 || node.tagName !== 'HR') {
        return;
    }

    let cardSection = builder.createCardSection('hr');
    addSection(cardSection);
    nodeFinished();
};

const preCodeToCard = (node, builder, {addSection, nodeFinished}) => {
    if (node.nodeType !== 1 || node.tagName !== 'PRE') {
        return;
    }

    let [codeElement] = node.children;

    if (codeElement && codeElement.tagName === 'CODE') {
        let payload = {code: codeElement.textContent};
        let cardSection = builder.createCardSection('code', payload);
        addSection(cardSection);
        nodeFinished();
    }
};

module.exports = [
    brToSoftBreakAtom,
    removeLeadingNewline,
    grafGallery,
    figureToGalleryCard,
    figureToImageCard,
    imgToCard,
    hrToCard,
    preCodeToCard
];
