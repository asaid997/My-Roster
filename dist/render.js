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

    _handleBarAppender = (elementToAppendTo, Template, data) => {
        let newHTML = Template(data);
        elementToAppendTo.empty().append(newHTML);
    }

    switchDisplay(element1, element2) {
        element1.css("display", "none")
        element2.css("display", "grid")
    }

    playerHandleBarAppender = (roster) => {
        this.hideElement($('#new-team-container'))
        this._handleBarAppender($('#roster-container'), this._template, roster)
    }

    dreamTeamHAppender = (data) => {
        this.playerHandleBarAppender(data)
        if (data.roster.length > 0) {
            this.showElement($('#new-team-container'))
        }
    }

    statsHandleBarAppender = (stats, elementToAppendTo, imageElement) => {
        this.switchDisplay(imageElement, elementToAppendTo)
        this._handleBarAppender($(elementToAppendTo), this._statsTemplate, stats)
    }

    myTeamsHandleBarAppender = (teams) => this._handleBarAppender($('#my-teams'), this._myTeamsTemplate, { teams })

}