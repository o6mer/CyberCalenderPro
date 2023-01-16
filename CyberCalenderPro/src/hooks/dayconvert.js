import dateFormat from "dateformat";

export default function DayConvert(date) {
    const dateConverted = new Date(date);
    return dateFormat(dateConverted, "yyyy,mm,dd").toString()
}