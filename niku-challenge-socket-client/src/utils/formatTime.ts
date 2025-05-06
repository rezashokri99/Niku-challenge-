const formatTime = (date: Date | string): string => {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    return new Intl.DateTimeFormat('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Tehran' // اگه می‌خوای به وقت ایران باشه
    }).format(date);
};


export default formatTime;