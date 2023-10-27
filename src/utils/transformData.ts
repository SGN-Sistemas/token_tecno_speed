export function formatDbData(data: Date) {
    const year = data.getFullYear();
    const month = String(data.getMonth() + 1).padStart(2, '0');
    const day = String(data.getDate()).padStart(2, '0');
    const hour = String(data.getHours() - 3).padStart(2, '0');
    const minutes = String(data.getMinutes()).padStart(2, '0');
    const seconds = String(data.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
}