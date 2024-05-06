
function isValidDateFromString(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}

function isValidDate(input) {
    if (!input) {
        return false;
    }

    if (!isValidDateFromString(input)) {
        return false;
    }

    return true;
}

function isValidNumber(input) {
    if (!input) {
        return false;
    }

    if (isNaN(Number(isValidDateFromString(input)))) {
        return false;
    }

    return true;
}

function isValidText(input) {
    if (!input) {
        return false;
    }

    if (typeof input !== 'string') {
        return false;
    }

    return true;
}

module.exports = {
    isValidText,
    isValidNumber,
    isValidDate
};
