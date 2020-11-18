const renderer = new Renderer()

$('button').on("click", function() {
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