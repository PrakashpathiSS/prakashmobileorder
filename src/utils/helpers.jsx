export const formatPhoneNumber = (input) => {
    const cleaned = ("" + input)?.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    return match
        ? [match[1], match[2], match[3]].filter(Boolean).join("-")
        : input;
};

export const formatCurrency = (value) => {
    if (value) {
        const stringValue = String(value);
        const numberValue = parseFloat(stringValue?.replace(/[^0-9]/g, ""));
        if (isNaN(numberValue)) return "0.00";

        const formattedValue = (numberValue / 100).toFixed(2);
        return formattedValue;
    }
};