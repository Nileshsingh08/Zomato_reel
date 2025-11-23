const ImageKit = require("imagekit");
const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT && process.env.IMAGEKIT_URL_ENDPOINT.replace(/\/$/, '')
});

/**
 * Uploads a file to ImageKit.
 *
 * @param {string} base64Data - base64 string (without or with data: prefix).
 * @param {string} finalName - file name to store
 * @param {string} mimeType - optional mime type (e.g. 'video/mp4')
 */
async function uploadFile(base64Data, finalName, mimeType) {
    try {
        // If caller passed raw base64 without data URI prefix, add it using provided mimeType
        let fileParam = base64Data;
        if (mimeType && !/^data:\w+\/.+;base64,/.test(base64Data)) {
            fileParam = `data:${mimeType};base64,${base64Data}`;
        }

        // Ensure filename has an extension recognized by ImageKit (helps content-type resolution)
        let uploadFileName = finalName;
        if (mimeType && !/\.[a-zA-Z0-9]+$/.test(finalName)) {
            const subtype = (mimeType.split('/')[1] || '').split('+')[0];
            if (subtype) {
                // sanitize subtype (e.g., "mp4") and append
                const ext = subtype.replace(/[^a-z0-9]/gi, '') || '';
                if (ext) uploadFileName = `${finalName}.${ext}`;
            }
        }

        const result = await imagekit.upload({
            file: fileParam,
            fileName: uploadFileName,
        });
        // log full result to help debug Bad Request cases
        console.log('ImageKit upload successful:', { fileName: uploadFileName, url: result.url, fileId: result.fileId, result });
        return result;
    } catch (err) {
        console.error('ImageKit upload error:', err && err.message ? err.message : err);
        throw err;
    }
}

module.exports = { uploadFile };