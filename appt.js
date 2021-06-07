const fetch = require('node-fetch');

async function findAppt() {
    try {
        const res = await fetch(
            "https://onlinetermine.zollsoft.de/includes/searchTermine_app_feature.php",
            {
                headers: {
                    accept: "*/*",
                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "cross-site",
                    "sec-gpc": "1",
                },
                referrer: "https://punctum-medico.de/",
                referrerPolicy: "strict-origin-when-cross-origin",
                body: "versichert=1&terminsuche=&uniqueident=5a72efb4d3aec",
                method: "POST",
                mode: "cors",
            }
        );
        if (res.status !== 200) console.error('RES status not 200')
    
        const body = JSON.stringify(await res.json());

        if (body.toLowerCase().includes('johnson') || body.toLowerCase().includes('janssen')) return true;
    } catch (err) {
        console.log("ERR");
        return false;
    }
    return false;
}

function alarm() {
    console.log("\007");
    setTimeout(alarm, 200);
}

async function run() {
    setTimeout(async () => {
        const apptFound = await findAppt();
        if (apptFound) {
            alarm();
            console.log('https://punctum-medico.de/onlinetermine/')
        }
        else {
            console.log('Not found')
            run();
        }
    }, 3000)
}

run();