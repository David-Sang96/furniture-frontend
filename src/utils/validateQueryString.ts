const validateQueryString = (queryString: string | null = null) =>
  queryString
    ? decodeURIComponent(queryString)
        .split(",")
        .map((cat) => cat.trim())
        .map(Number)
        .filter((cat) => !isNaN(cat))
        .map(String)
    : [];

export default validateQueryString;
