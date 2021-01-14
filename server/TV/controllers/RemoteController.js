const fetch = require('node-fetch');
const wol = require('wol');

const pressKey = function(key) {
    return fetch(process.env.TV_URL + "/6/input/key", {
        method: 'POST', 
        body: JSON.stringify({ key }),
    })
}

const getVolume = function() {
    return fetch(process.env.TV_URL + "/6/audio/volume")
    .then(res => res.json())
}

const setVolume = function(volume) {
    getVolume()
    .then(volumes => {
        let {current, max, min} = volumes;
        if(volume === current) return;

        let askedVolume = volume;
        if(askedVolume < min) askedVolume = min;
        if(askedVolume > max) askedVolume = max;

        if(Math.abs(askedVolume - current) === 1) {
            if(askedVolume > current) pressKey('VolumeUp')
            else pressKey('VolumeDown')

            return;
        }

        if(askedVolume > current) askedVolume--;
        else askedVolume++;

        fetch(process.env.TV_URL + "/6/audio/volume", {
            method: "POST",
            body: JSON.stringify({
                muted: false,
                current: askedVolume 
            }),
        })

    })
}

const powerOn = function() {
    wol.wake(process.env.TV_MAC, function(err, res){
        console.log(res);
    });
}

module.exports = {
    powerOn,
    setVolume
};
