

export default function twoWeeksForward(date) {
const dateConverted = new Date(date);
    const dates = []
    Date.prototype.addDays = function(days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }


    for(let i =0;i < 14;i++){
        const dateAdded = dateConverted.addDays(i);
        const datesimplefide = {
            day: dateAdded.getDate(),
            month: dateAdded.getMonth() + 1,
            year: dateAdded.getFullYear()
        }
        const dateEdit = datesimplefide.year + "," + datesimplefide.month + "," + datesimplefide.day;
        dates.push(dateEdit)

    }
    console.log("this is date", dates)
    return dates
}