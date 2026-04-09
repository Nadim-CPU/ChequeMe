
import dayjs from "dayjs";

export default formatDate = (date) => {
    return dayjs(date).format("YYY-MM-DD");
} 