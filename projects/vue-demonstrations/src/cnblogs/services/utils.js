/**
 * parse HTML document
 * @param {String} html HTML
 * @returns {Document}
 */
export function parseHtml(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc;
}