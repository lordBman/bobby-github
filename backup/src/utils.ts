export const handleLoginWithGithub = () => {
	window.open("/api/auth/github", "_self");
};

export const formatMemberSince = (inputDateString: string) =>  new Date(inputDateString).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
	

export function formatDate(inputDateString: string) {
	const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

	const date = new Date(inputDateString);
	const monthName = months[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();

	// Function to add ordinal suffix to day
	const getOrdinalSuffix = (day: number) =>{
		if (day >= 11 && day <= 13) {
			return day + "th";
		}
		switch (day % 10) {
			case 1:
				return day + "st";
			case 2:
				return day + "nd";
			case 3:
				return day + "rd";
			default:
				return day + "th";
		}
	}

	return `${monthName} ${getOrdinalSuffix(day)}, ${year}`;
}