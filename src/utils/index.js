import moment from "moment"

export const formatDate = date =>
  moment(date.toDate()).format("h:mm MMM Do YYYY")
