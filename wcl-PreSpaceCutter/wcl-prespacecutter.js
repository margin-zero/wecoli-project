$(document).ready(function() {

    wclPreSpaceCutterRun("pre>code"); // run plugin for pre>code elements
    wclPreSpaceCutterRun("pre"); // run plugin for pre elements

});

function wclPreSpaceCutterRun(preSpaceCutterSelectors) {
    var i;
    $selections = $(preSpaceCutterSelectors);

    $.each($(preSpaceCutterSelectors), function(index, obj) {
        var $this = $(this);
        $this.css("display", "block"); // set display to block to avoid first line problems

        if ($this.prop("tagName") == "CODE") {
            $this.html(wclPreSpaceCutter($this.html())); // run space cuttin routine for CODE
        } else {
            for (i = 0; i < $this.contents().length; i++) { // check every node and if it is #text - process it
                if ($this.contents().get(i).nodeName == "#text") {
                    $this.contents().get(i).nodeValue = (wclPreSpaceCutter($this.contents().get(i).nodeValue)); // run space cuttin routine for PRE        
                };
            };
        };
    });
};

function wclPreSpaceCutter(htmlStr) {
    // be sure if oldHtml is String and replace html entities
    var oldHtml = String(htmlStr).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    var newHtml;
    var lines;
    var i;
    var spacesToCut = -1;
    var spaceCount;

    // split old html into separate lines
    lines = oldHtml.split("\n");

    // cosmetic "touch" - if the first or the last line is empty (or spaces only) - let's cut them out
    if (lines[lines.length - 1].trim().length == 0) {
        lines.splice(lines.length - 1, 1);
    };

    if (lines[0].trim().length == 0) {
        lines.splice(0, 1);
    };

    // check every line to find minimal number of leading spaces in non-empty lines - we'll cut them later
    for (i = 0; i < lines.length; i++) {

        spaceCount = lines[i].search(/\S/); // find position of first non-space => this is space count in line

        if (spaceCount >= 0) {
            if (((spacesToCut >= 0) && (spaceCount < spacesToCut)) ||
                (spacesToCut < 0)) { spacesToCut = spaceCount; };
        };
    }

    // now we know how many leading spaces to cut off from every line of code, so we cut and create new html
    newHtml = "";

    for (i = 0; i < lines.length; i++) {
        if ((lines[i].substr(spacesToCut).length) > 0) {
            lines[i] = lines[i].substr(spacesToCut);
        };

        newHtml = newHtml + lines[i];
        // let's add "\n" (new line) at the end of every line - except the last one
        if (i < (lines.length - 1)) { newHtml = newHtml + "\n"; };
    };

    return newHtml;
};