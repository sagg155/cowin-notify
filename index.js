const fetch = require('node-fetch');
const player = require('play-sound')({ player: ".\\media\\mpg123.exe" });
checkWestDelhi();
checkSouthWestDelhi();
const interval = setInterval(() => {
    checkWestDelhi();
    checkSouthWestDelhi();
}, 1 * 60 * 1000)

async function checkWestDelhi() {
    try {
        const res = await fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=142&date=08-05-2021', {
            headers: {
                'authority': 'cdn-api.co-vin.in',
                'sec-ch-ua': '^\^',
                'accept': 'application/json, text/plain, */*',
                'sec-ch-ua-mobile': '?0',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
                'origin': 'https://www.cowin.gov.in',
                'sec-fetch-site': 'cross-site',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                'referer': 'https://www.cowin.gov.in/',
                'accept-language': 'en-US,en;q=0.9',
                'if-none-match': 'W/^\^18e12-nuJuqPcHUdHDL2OI/itYTx4ny1c^\^'
            }
        }).then(response => response.json());
        const centers = res.centers;
        const availableCenterForEighteen = centers.filter(center => {
            center.sessions = center.sessions.filter(session => session['min_age_limit'] == 18 && session['available_capacity'] > 1);
            return center.sessions.length > 0;
        })
        if (availableCenterForEighteen.length > 0) {
            const covaxin = availableCenterForEighteen.filter(center => {
                center.sessions = center.sessions.filter(session => session['vaccine'] == 'COVAXIN');
                return center.sessions.length > 0;
            });
            if (covaxin.length > 0) {
                console.log("FOUND IT : " + JSON.stringify(covaxin));
                console.log("FOUND IT : " + covaxin[0].address + covaxin[0].name);
                soundAlarm();
            }
        }
    } catch (error) {
        console.error(error);
    }
};
async function checkSouthWestDelhi() {
    try {
        const res = await fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=150&date=08-05-2021', {
            headers: {
                'authority': 'cdn-api.co-vin.in',
                'sec-ch-ua': '^\^',
                'accept': 'application/json, text/plain, */*',
                'sec-ch-ua-mobile': '?0',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
                'origin': 'https://www.cowin.gov.in',
                'sec-fetch-site': 'cross-site',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                'referer': 'https://www.cowin.gov.in/',
                'accept-language': 'en-US,en;q=0.9',
                'if-none-match': 'W/^\^18e12-nuJuqPcHUdHDL2OI/itYTx4ny1c^\^'
            }
        }).then(response => response.json());
        const centers = res.centers;
        const availableCenterForEighteen = centers.filter(center => {
            center.sessions = center.sessions.filter(session => session['min_age_limit'] == 18 && session['available_capacity'] > 1);
            return center.sessions.length > 0;
        })
        if (availableCenterForEighteen.length > 0) {
            const covaxin = availableCenterForEighteen.filter(center => {
                center.sessions = center.sessions.filter(session => session['vaccine'] == 'COVAXIN');
                return center.sessions.length > 0;
            });
            if (covaxin.length > 0) {
                console.log("FOUND IT : " + JSON.stringify(covaxin));
                console.log("FOUND IT : " + covaxin[0].address + covaxin[0].name);
                clearInterval(interval);
                soundAlarm();
            }
        }
    } catch (error) {
        console.error(error);
    }
};


function soundAlarm() {
    console.log('playing sound');
    player.play('./media/roadrunner.mp3', (err) => {
        if (err) console.log(`Could not play sound: ${err}`);
    });
}