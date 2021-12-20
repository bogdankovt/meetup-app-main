export default function formatPhoneNumber (phoneNumber: string) {
    const phoneRegexp = /0(\d\d)(\d\d\d)(\d\d)(\d\d)/;
    const match = phoneNumber.match(phoneRegexp);
    if (!match) return phoneNumber;
    const [op, ...parts] = match.slice(1);
    return `0 (${op}) ${parts.join(' ')}`
}
