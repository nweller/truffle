const { execSync } = require('child_process');

var compile = function(solcStandardInput) {
    // For now: Write input to temp file, read result from temp file
    const fs = require('fs'); 
    const tempInputFilePath = '/tmp/_fast-solc-js-input.json';
    const tempOutputFilePath = '/tmp/_fast-solc-js-output.json';

    fs.writeFileSync(tempInputFilePath, solcStandardInput);

    execSync(`cat ${tempInputFilePath} | ${process.env.SOLC_BINARY_PATH} --standard-json > ${tempOutputFilePath}`, { maxBuffer: 1024 * 10000 }, (err, stdout, stderr) => {
        if (err) {
            console.log('Compile error: ', err);
            return null;
        }
    });

    // Read compiled result file
    return fs.readFileSync(tempOutputFilePath, 'utf8');
}

module.exports = {
	compile
};
