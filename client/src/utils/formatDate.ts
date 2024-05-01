export const formatDate = (date?: string | Date) => {
    if (!date) {
        return null;
    }

    let result: string | string[] = date
    .toString()
    .split(/:|T|-/);
    result = `${result[2]}.${result[1]}.${result[0]}`;

    return result;
};