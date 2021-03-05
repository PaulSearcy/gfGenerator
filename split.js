let variations = '300italic,400italic,600italic,700italic,800italic,400,300,600,700,800';
let varArray = variations.split(',');

let styles = varArray.map( ar => {
    return `#w${ar}{
        font-family: 'Open Sans';
        font-weight: ${ar};
    }`
}).join('\n');

debugger