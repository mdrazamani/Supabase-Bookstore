SELECT authors.name, COUNT(books.book_id) as book_count
FROM authors
JOIN books ON authors.author_id = books.author_id
GROUP BY authors.name
HAVING COUNT(books.book_id) > 5;