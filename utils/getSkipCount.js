
const getSkipCount = (pageLimit, nTotal, pageno) => {
	// pagelimit = total number of results per page/request.
	// nTotal = total posts. i.e. a, visiting a user's page with 60 posts, this would be 60.
	// pageno = the current page the user is on.
	let skip = pageLimit * pageno;
	if (skip > nTotal) return (nTotal - (nTotal % pageLimit))
	return skip
}

export default getSkipCount;