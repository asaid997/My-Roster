class ServerManager {
    constructor() {
        this.myTeams = {}
    }
    showStats = (image, stats, fullName, renderFunction) => $.get(`/playerStats/${fullName}`, data => renderFunction(data, stats, image))

    getTeam = (teamName, renderFunction) => $.get(`/teams/${teamName}`, data => renderFunction(data))

    removeFromDreamTeam(name, renderFunction) {
        $.ajax({
            url: `/roster/${name}`,
            type: 'DELETE',
            success: function (data) {
                renderFunction(data)
            }
        });
    }

    addToDreamTeam = (player) => $.post(`/roster/${JSON.stringify(player)}`, () => { })

    getDreamTeam(renderFunction) {
        $.get('/dreamTeam', function (data) {
            if (data.roster.length > 0)
                renderFunction(data)
            else
                alert("Please add players to your dream team first")
        })
    }

    getMyTeams = renderFunction => $.get('/myTeams', data => renderFunction(data))

    saveNewTeam = (teamName, renderFunction) => $.post(`/myTeams/${teamName}`, data => renderFunction(data))

    getMyTeam = (teamName,renderFunction) => $.get(`/myTeams/${teamName}`,data => renderFunction(data))

}