class ServerManager {

    showStats(image, stats, fullName, renderFunction) {
        $.get(`/playerStats/${fullName}`, (data) => {
            console.log(data)
            renderFunction(data, stats, image)
        })
    }

    getTeam(teamName, renderFunction) {
        $.get(`/teams/${teamName}`, function(data) {
            console.log(data)
            renderFunction(data)
        })
    }

    removeFromDreamTeam(name, renderFunction) {
        $.ajax({
            url: `/roster/${name}`,
            type: 'DELETE',
            success: function(data) {
                renderFunction(data)
            }
        });
    }

    addToDreamTeam(player) {
        $.post(`/roster/${JSON.stringify(player)}`, (data) => {})
    }

    getDreamTeam(renderFunction) {
        $.get('/dreamTeam', function(data) {
            renderFunction(data)
        })
    }

}