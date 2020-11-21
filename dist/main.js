const renderer = new Renderer()
const serverManager = new ServerManager()

$('#get-roster').on("click", function() {
    const teamName = $('input').val()
    serverManager.getTeam(teamName, renderer.playerHandleBarHelper)
})

$('#roster-container').on("click", "img", function() {
    const stats = $(this).closest(".player-container").find(".stats")
    const fullName = $(this).closest(".player-container").find('div:first-child').text()
    const img = $(this)
    serverManager.showStats(img, stats, fullName, renderer.statsHandleBarHelper)
})

$('#roster-container').on("click", ".stats", function() {
    const img = $(this).closest(".player-container").find("img")
    const stats = $(this)
    renderer.switchDisplay(stats, img)
})

$('#roster-container').on('click', '.add-to-dream-team', function() {
    const name = $(this).closest('.player-container').find('.name').text()
    const firstName = name.split(" ")[0]
    const lastName = name.split(" ")[1]
    const jersey = $(this).closest('.player-container').find('.jersey').text()
    const pos = $(this).closest('.player-container').find('.pos').text()
    const player = { firstName, lastName, jersey, pos, dreamPlayer: true }
    serverManager.addToDreamTeam(player)
})

$('#roster-container').on('click', '.remove-from-dream-team', function() {
    const name = $(this).closest('.player-container').find('.name').text()
    serverManager.removeFromDreamTeam(name, renderer.playerHandleBarHelper)
})

$('#get-dream-team').on("click", function() {
    serverManager.getDreamTeam(renderer.playerHandleBarHelper)
})