export const trasformData = (data) => {
    const distinctPartners = new Set(data.map(item => item.clientid));;
    const countriesCount = new Set(data.map(item => item.countryid));
    const { reportsRate, earliestDate } = getReportRate(data);
    const weekdayBreakdown = getWeekdayBreakdown(data);
    const countriesBreakdown = getCountriesBreakdown(data);
    const categoryBreakdown = getCategoryBreakdown(data);

    return {
        earliestDate,
        reportsAmount: data.length,
        partnerCount: distinctPartners.size,
        countriesCount: countriesCount.size,
        reportsRate,
        weekdayBreakdown,
        countriesBreakdown,
        categoryBreakdown,
    }

}

const getReportRate = (data) => {
    const totalRequests = data.length;
    const creationDates = data.map(item => item.creationdate);
    const earliestDate = Math.min(...creationDates);
    const latestDate = Math.max(...creationDates);
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const numberOfDays = Math.ceil((latestDate - earliestDate) / millisecondsPerDay);

    return {
        reportsRate: (totalRequests / numberOfDays).toFixed(2),
        earliestDate: earliestDate
    };
}

const getWeekdayBreakdown = (data) => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeekCount = {};

    dayNames.forEach(dayName => {
        dayOfWeekCount[dayName] = 0;
    });

    data.forEach(item => {
        const dayOfWeek = new Date(1 * item.creationdate).getDay();
        const dayName = dayNames[dayOfWeek];
        dayOfWeekCount[dayName] += 1;
    });
    return dayOfWeekCount;
}

const getCountriesBreakdown = (data) => {
    const countryCount = {};

    data.forEach(item => {
        const country = item.countryid;
        if (country in countryCount) {
            countryCount[country] += 1;
        } else {
            countryCount[country] = 1;
        }
    });
    return countryCount;
}

const getCategoryBreakdown = (data) => {
    const categoryCount = {};

    data.forEach(item => {
        const category = item.category;
        if (category in categoryCount) {
            categoryCount[category] += 1;
        } else {
            categoryCount[category] = 1;
        }
    });
    return categoryCount;
}