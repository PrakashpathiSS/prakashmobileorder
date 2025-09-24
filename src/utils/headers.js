export const authHeaders = (token) => {
    const headerData = {
        Accept: "application/json",
        'Content-Type': 'application/json',
        authorization: "Bearer " + `${token}`
    }
    return headerData
}