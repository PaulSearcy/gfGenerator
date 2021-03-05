import fetch from 'node-fetch';
import fs from 'fs';

let commandArgs = process.argv.slice(2);

const main = async ([apiUrl, cssFileName, directoryPrefix]) => {

    const gfApiUrl = apiUrl || 'https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&subset=latin,latin-ext&display=swap';

    const urlReg = /url\((.*?)\)/g;

    let cssFile = '';
    let newCSSFile = '';
    let outputCSSFileName = cssFileName || 'font.css';
    let fontUrls = '';
    let fontGFVersion = '';
    let fontGFPrefix = '';

    let outputDirectoryPrefix = directoryPrefix || 'fonts/';

    const replaceGFPrefixInCSS = () => {
        newCSSFile = cssFile.replaceAll(new RegExp(fontGFPrefix, 'g'), outputDirectoryPrefix);
    };

    const getGFHash = url => url.match(new RegExp(`${fontGFVersion}\/(.*?)\.woff2`))[1];

    await fetch(
        gfApiUrl,
        {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36'
            }
        }
    )
    .then(data => data.text())
    .then( data => {
        cssFile = data;
        fontUrls = [...data.matchAll(urlReg)].map(x => x[1]);
        fontGFVersion = fontUrls[0].match(/\/v(.*?)\//)[1];
        fontGFPrefix = fontUrls[0].match(new RegExp(`(.*?)${fontGFVersion}\/`))[0];
    });

    await Promise.all(fontUrls.map(url => fetch(url)))
    .then(async data =>
        await Promise.all(
            data.map(async single => [await single.buffer(), getGFHash(single.url)])
        )
    )
    .then(data => {
        data.map(single => {
            fs.writeFileSync(`${outputDirectoryPrefix}${single[1]}.woff2`, single[0]);
        })
    });


    replaceGFPrefixInCSS();
    fs.writeFileSync(outputCSSFileName, newCSSFile);
}

main( commandArgs.length > 0 ? [...commandArgs] : '' );
