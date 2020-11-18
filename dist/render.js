class Renderer {
    constructor() {
        const source = $('#player-template').html();
        this.template = Handlebars.compile(source);
    }

    handleBarHelper = (roster) => {
        $('#roster-container').empty()
        let newHTML = this.template(roster);
        $('#roster-container').append(newHTML);
    }

}