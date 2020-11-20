const express = require('express')
const urllib = require('urllib')
const router = express.Router()

const _teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

const _dreamTeam = []
const _dreamPlayers = {}

const _ifPlayerIsInDreamTeam = (name) => {
    if (_dreamPlayers[name] === undefined || _dreamPlayers[name] === false) {
        _dreamPlayers[name] = true
        return true
    }
    return false
}
const _removeFromDreamTeam = (name) => {
    _dreamPlayers[name] = false
    _dreamTeam.splice(_dreamTeam.findIndex((player) => `${player.firstName} ${player.lastName}` === name), 1)
}
const _getDreamTeam = () => { return { roster: _dreamTeam } }

router.get('/teams/:teamName', function(request, mainResponse) {
    const { teamName } = request.params
    urllib.request('http://data.nba.net/10s/prod/v1/2017/players.json', (err, response) => {
        mainResponse.send({
            roster: JSON.parse(response).league.standard.filter(player => player.isActive && player.teamId === _teamToIDs[teamName]).map(player => {
                return { firstName: player.firstName, lastName: player.lastName, jersey: player.jersey, pos: player.pos }
            })
        })
    })
})

router.get('/playerStats/:player', function(request, response) {
    const firstName = request.params.player.split(" ")[0]
    const lastName = request.params.player.split(" ")[1]
    urllib.request(`https://nba-players.herokuapp.com/players-stats/${lastName}/${firstName}`, (err, _response, res) => {
        if (_response && _response.toString() !== "Sorry, that player was not found. Please check the spelling.")
            response.send({ stats: JSON.parse(_response) })
        else
            response.send(err)
    }, )
})

router.put('/team/:team', function(req, res) {
    const newTeam = JSON.parse(req.params.team)
    _teamToIDs[newTeam.teamName] = newTeam.teamId
    res.end()
})

router.get('/dreamTeam', function(req, res) {
    res.send(_getDreamTeam())
})

router.post('/roster/:player', function(req, res) {
    const player = JSON.parse(req.params.player)
    if (_ifPlayerIsInDreamTeam(`${player.firstName} ${player.lastName}`))
        _dreamTeam.push(player)
    res.send(_dreamTeam)
})

router.delete('/roster/:player', function(req, res) {
    const { player } = req.params
    _removeFromDreamTeam(player)
    res.send(_getDreamTeam())
})

module.exports = router