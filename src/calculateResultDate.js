import moment from "moment";

export function chooseCoefficientSpeed(language) {
    switch (language) {
        case 'uk':
        case 'ru':
            return {coefficient: 0.05, speed: 1333};
        case 'en':
            return {coefficient: 0.12, speed: 333};
        default:
            return {};
    }
}

export function calculatePercent(value, format) {
    if (format === 'pdf') {
        return value * 1.2;
    }
    return value;
}

export function calculatePrice(length, language, coefficient, format) {
    return calculatePercent(length * coefficient, format).toFixed(2);
}

export function calculateWorkDuration(length, speed, format) {
    return calculatePercent((Math.max(1, length / speed) * 60 + 30) * 60 * 1000, format);
}

export function calculateResultDate(startTimeMs, durationMs) {
    let deadline;
    const date = moment(startTimeMs);
    const now = moment(startTimeMs);

    while (durationMs > 0) {
        if (date.day() !== 0 && date.day() !== 6) {
            let startTime = date.clone().hours(10).minutes(0);
            if (now.isAfter(startTime)) {
                startTime = now.clone();
            }
            let endTime = date.clone().hours(19).minutes(0);
            const lol = now.isBefore(endTime);

            if (now.isBefore(endTime)) {
                deadline = startTime.add(durationMs);
                durationMs = deadline.diff(endTime);
            }
        }
        date.add(1, 'day');
    }
    const result = deadline ? deadline.valueOf() : null;
    return result;
}
