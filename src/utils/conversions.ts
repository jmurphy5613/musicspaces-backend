export const get24HoursAgoUnix = () => {
    const currentTimestamp = Date.now();
    const twentyFourHoursAgo = currentTimestamp - 24 * 60 * 60 * 1000;
    const unixTimeSeconds = Math.floor(twentyFourHoursAgo / 1000);
    return unixTimeSeconds;
}