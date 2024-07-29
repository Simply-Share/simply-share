export default function handleURI(uri: string): string {
    const decodedURI = decodeURIComponent(uri).split('&')[0].split('=')[1];
    return decodedURI;
}