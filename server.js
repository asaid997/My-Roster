const express = require('express')
const urllib = require('urllib')
const app = express()
const path = require('path')
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'dist')))

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

app.get('/teams/:teamName', function(request, mainResponse) {
    const team = request.params.teamName
    urllib.request('http://data.nba.net/10s/prod/v1/2017/players.json', (err, response) => {
        mainResponse.send({
            roster: JSON.parse(response).league.standard.filter(player => player.isActive && player.teamId === teamToIDs[team]).map(player => {
                return { firstName: player.firstName, lastName: player.lastName, jersey: player.jersey, pos: player.pos }
            })
        })
    })
})

app.get('/playerStats/:player', function(request, mainResponse) {
    const firstName = request.params.player.split(" ")[0]
    const lastName = request.params.player.split(" ")[1]
    urllib.request(`https://nba-players.herokuapp.com/players-stats/${lastName}/${firstName}`, (err, response, res) => {
        if (response.toString() !== "Sorry, that player was not found. Please check the spelling.")
            mainResponse.send({ stats: JSON.parse(response) })
    }, )
})

const port = 3000
app.listen(port, function() {
    console.log(`Running server on port ${port}`)
})