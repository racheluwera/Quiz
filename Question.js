
async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error fetching ${url}`);
  return await response.json();
}
fetchJSON("https://jsonplaceholder.typicode.com/posts?_embed=comments&_expand=user")
  .then(data => console.log(data))
  .catch(error => console.error(error));


async function mergeAuthorAndComments() {
  try {
    // 1. Fetch all authors
    const authors = await fetchJSON("https://api.example.com/authors");

    // 2. For each author → fetch comments for their articles
    const authorsWithArticles = await Promise.all(
      authors.map(async (author) => {
        // For each articleId, fetch comments
        const articles = await Promise.all(
          author.articleIds.map(async (articleId) => {
            const comments = await fetchJSON(
              `https://api.example.com/articles/${articleId}/comments`
            );
            return {
              id: articleId,
              comments: comments,
            };
          })
        );

        // Return structured author object
        return {
          id: author.id,
          name: author.name,
          articles: articles,
        };
      })
    );

    return authorsWithArticles;
  } catch (error) {
    console.error("Error merging data:", error);
  }
}

// Run the function
mergeAuthorAndComments().then((result) => console.log(JSON.stringify(result, null, 2)));
