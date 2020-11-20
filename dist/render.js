class Renderer {
    constructor() {
        const source = $('#player-template').html();
        const statsSource = $('#stats-template').html();
        this.template = Handlebars.compile(source);
        this.statsTemplate = Handlebars.compile(statsSource);

        $('#roster-container').on('mouseenter', '.player-container',
            function() {
                $(this).find('button').css("visibility", "visible")
            })
        $('#roster-container').on('mouseleave', '.player-container',
            function() {
                $(this).find('button').css("visibility", "hidden")
            })
    }

    playerHandleBarHelper = (roster) => {
        $('#roster-container').empty()
        let newHTML = this.template(roster);
        $('#roster-container').append(newHTML);
    }

    statsHandleBarHelper = (stats, elementToAppendTo) => {
        $(elementToAppendTo).empty()
        let newHTML = this.statsTemplate(stats);
        $(elementToAppendTo).append(newHTML);
    }

}