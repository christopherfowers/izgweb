/**
 * Wrapper for fetch request targeting
 * @param {string} endpoint i.e. "/api/Spell/AllSpells()"
 * @param {string} accessToken Bearer token used for API Calls
 * @param {object} additionalHeaders any headers to add with the default authorization header
 * @param {boolean} noCache true if should no-cache header be added. Defaults to false
 */
export async function requestApiData(endpoint, accessToken = "", additionalHeaders = {}, noCache = false) {
    let config = {
        headers: {
            Authorization: "Bearer " + accessToken,
            ...additionalHeaders
        }
    };
    
    if (noCache)
        config.headers["Cache-Control"] = "no-cache";

    return await fetch(endpoint, config);
}