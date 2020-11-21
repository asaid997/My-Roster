class Renderer {
    constructor() {
        const source = $('#player-template').html();
        const statsSource = $('#stats-template').html();
        this.template = Handlebars.compile(source);
        this.statsTemplate = Handlebars.compile(statsSource);
    }

    showElement = element => element.css("visibility", "visible")
    hideElement = element => element.css("visibility", "hidden")

    switchDisplay(element1, element2) {
        element1.css("display", "none")
        element2.css("display", "grid")
    }

    playerHandleBarHelper = (roster) => {
        $('#roster-container').empty()
        let newHTML = this.template(roster);
        $('#roster-container').append(newHTML);
    }

    statsHandleBarHelper = (stats, elementToAppendTo, imageElement) => {
        this.switchDisplay(imageElement, elementToAppendTo)
        $(elementToAppendTo).empty()
        let newHTML = this.statsTemplate(stats);
        $(elementToAppendTo).append(newHTML);
    }

}