require('./example.js');
require('./example.html');

var js = document.getElementById('js');
js.innerHTML = window.scriptStore['example.js'];

var html = document.getElementById('html'),
    partialName = './example.html';
html.innerHTML = escapeHTML(require(partialName));

function escapeHTML(str) {
    return str.replace(/[&<>]/g, replaceTag);

    function replaceTag(tag) {
        var tagsToReplace = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;'
        };

        return tagsToReplace[tag] || tag;
    }
}
