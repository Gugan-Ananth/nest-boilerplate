export default function normalizeErrors (value: unknown): string[] | null {
    if (Array.isArray(value)) return value.map(String);
    if (typeof value === 'string') return [value];
    return null;
}