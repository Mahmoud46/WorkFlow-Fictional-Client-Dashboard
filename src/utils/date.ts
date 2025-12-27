export function getFormattedDateTime(): {
	time: string;
	monthName: string;
	dayNum: string;
	year: string;
	dayName: string;
} {
	const now = new Date();

	// Date parts
	const dateString = now.toLocaleDateString("en-US", {
		weekday: "long", // Monday, Tuesday...
		year: "numeric",
		month: "long", // January, February...
		day: "numeric",
	});
	const [dayName, monthName, dayNum, year] = dateString
		.replace(",", "")
		.split(" ");

	// Time parts
	let hours = now.getHours();
	const minutes = now.getMinutes().toString().padStart(2, "0");
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12 || 12;

	const timeString = `${hours}:${minutes} ${ampm}`;

	return {
		time: timeString,
		monthName,
		dayNum,
		year,
		dayName,
	};
}

export function getProgressPercentageWithRespect2Date(
	startDate: Date,
	endDate: Date,
	currentDate: Date
): number {
	const start = startDate.getTime();
	const end = endDate.getTime();
	const current = currentDate.getTime();

	if (current <= start) return 0; // before start
	if (current >= end) return 100; // after end

	return ((current - start) / (end - start)) * 100;
}

export function isInCurrentMonth(date: Date | string): boolean {
	const inputDate = new Date(date);
	const today = new Date();

	return (
		inputDate.getFullYear() === today.getFullYear() &&
		inputDate.getMonth() === today.getMonth()
	);
}
