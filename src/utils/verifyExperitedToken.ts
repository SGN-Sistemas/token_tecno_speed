import jwt from 'jsonwebtoken';
// Token JWT que você deseja verificar
export function verifyToken(token: string) {
    try {
        // Verifique se o token ainda é válido sem a chave secreta
        const decoded: any = jwt.decode(token);

        if (decoded.exp) {
            const expirationDate = new Date(decoded.exp * 1000);
            const currentUnixTime = Math.floor(Date.now() / 1000);
            if (decoded.exp > currentUnixTime) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}