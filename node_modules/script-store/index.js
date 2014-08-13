var through = require('through'),
    jsStringEscape = require('js-string-escape');

module.exports = function (file) {
    if (!isValidFile(file)) {
        return through();
    }

    var buffer = '';

    return through(concat, end);

    function concat(chunk) {
        buffer += chunk.toString()
    }

    function end() {
        this.queue(add(buffer, getFileName(file)));
        this.queue(buffer);
        this.queue(null)
    }

    function add(script, file) {
        return '(window.scriptStore = window.scriptStore || {})["' + file + '"] = "' + jsStringEscape(script) + '";'
    }

    function isValidFile(file) {
        var type = '.js';

        return file.substr(-(type.length)) === type;
    }

    function getFileName(file) {
        var lastSlashIndex = file.lastIndexOf('/'),
            start = lastSlashIndex >= 0 ? lastSlashIndex + 1 : 0;

        return file.substr(start, file.length - start);
    }
};
