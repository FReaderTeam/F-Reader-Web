function SectionList() {

    this.createHtmlView = function () {
        var body = $('.body')[0];
        var sections = $(".section", body);
        var html = "";
        for (var sectionIdx = 0; sectionIdx < sections.length; sectionIdx++) {
            var titles = $('.title', sections[sectionIdx]);
            for (var titleIdx = 0; titleIdx < titles.length; titleIdx++) {
                var titleName = titles[titleIdx].innerText;
                var anchor = generateLinkAnchor(titleName);
                var element = titles[titleIdx];
                $(anchor).insertBefore(element);
                html += generateListItem(titleName);
            }
        }
        $('#sections').append(html);
    }


    function generateListItem(title) {
        var li = '<li>';
        li += generateLink(title);
        li += '</li>';
        return li;
    }

    function generateLinkAnchor(title) {
        var trimmedTitle = title.replace(" ", "");
        trimmedTitle = trimmedTitle.trim();
        var a = '<a class="anchor" id="' + trimmedTitle + '">';
        a += '</a>';
        return a;
    }

    function generateLink(title) {
        var trimmedTitle = title.replace(" ", "");
        trimmedTitle = trimmedTitle.trim();
        var a = '<a href="#' + trimmedTitle + '">';
        a += title;
        a += '</a>';
        return a;
    }
}