module.exports = [
  {
    type: "Book",
    collection: "books",
    map: doc => ({
      title: doc.title,
      summary: doc.summary,
      author___NODE: doc.author.id,
      coverImageUrl: doc.coverImageUrl,
    }),
  },
  {
    type: "Author",
    collection: "authors",
    map: doc => ({
      name: doc.name,
    }),
  },
]
