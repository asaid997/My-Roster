const renderer = new Renderer()

$('#get-roster').on("click", function() {
    const input = $('input').val()
    $.get(`/teams/${input}`, function(data) {
        renderer.playerHandleBarHelper(data)
    })
})

$('#roster-container').on("click", "img", function() {
    const stats = $(this).closest(".player-container").find(".stats")
    const fullName = $(this).closest(".player-container").find('div:first-child').text()
    $.get(`/playerStats/${fullName}`, (data) => {
        $(this).css("display", "none")
        stats.css("display", "grid")
        renderer.statsHandleBarHelper(data, stats)
    })
})

$('#roster-container').on("click", ".stats", function() {
    $(this).css("display", "none")
    $(this).closest(".player-container").find("img").css("display", "grid")
})

$('#roster-container').on('click', '.add-to-dream-team', function() {
    const name = $(this).closest('.player-container').find('.name').text()
    const firstName = name.split(" ")[0]
    const lastName = name.split(" ")[1]
    const jersey = $(this).closest('.player-container').find('.jersey').text()
    const pos = $(this).closest('.player-container').find('.pos').text()
    const player = { firstName, lastName, jersey, pos, dreamPlayer: true }
    $.post(`/roster/${JSON.stringify(player)}`, (data) => {})
})

$('#roster-container').on('click', '.remove-from-dream-team', function() {
    const name = $(this).closest('.player-container').find('.name').text()
    $.ajax({
        url: `/roster/${name}`,
        type: 'DELETE',
        success: function(data) {
            renderer.playerHandleBarHelper(data)
        }
    });
})

$('#get-dream-team').on("click", function() {
    $.get('/dreamTeam', function(data) {
        renderer.playerHandleBarHelper(data)
    })
})