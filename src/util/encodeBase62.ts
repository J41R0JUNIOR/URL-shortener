
export default function encodeBase62(num: number): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let base62 = '';
    while (num) {
        base62 = chars[num % 62] + base62;
        num = Math.floor(num / 62);
    }
    return base62;
}
