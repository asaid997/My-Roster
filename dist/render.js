class Renderer {
    constructor() {
        const source = $('#player-template').html();
        const statsSource = $('#stats-template').html();
        const myTeamsSource = $('#team-template').html();
        this._template = Handlebars.compile(source);
        this._statsTemplate = Handlebars.compile(statsSource);
        this._myTeamsTemplate = Handlebars.compile(myTeamsSource);
    }

    showElement = element => element.css("visibility", "visible")
    hideElement = element => element.css("visibility", "hidden")

    _handleBarHelper = (elementToAppendTo, Template, data) => {
        elementToAppendTo.empty();
        let newHTML = Template(data);
        elementToAppendTo.append(newHTML);
    }

    switchDisplay(element1, element2) {
        element1.css("display", "none")
        element2.css("display", "grid")
    }

    playerHandleBarHelper = (roster) => {
        this.hideElement($('#new-team-container'))
        this._handleBarHelper($('#roster-container'), this._template, roster)
    }

    dreamTeamHelper = (data) => {
        this.playerHandleBarHelper(data)
        if (data.roster.length > 0) {
            this.showElement($('#new-team-container'))
        }
    }

    statsHandleBarHelper = (stats, elementToAppendTo, imageElement) => {
        this.switchDisplay(imageElement, elementToAppendTo)
        this._handleBarHelper($(elementToAppendTo), this._statsTemplate, stats)
    }

    myTeamsHandleBarHelper = (teams) => this._handleBarHelper($('#my-teams'), this._myTeamsTemplate, { teams })

}