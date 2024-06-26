SELECT books.title, books.price, books.publish_date, authors.name
FROM books
JOIN authors ON books.author_id = authors.author_id
WHERE EXTRACT(YEAR FROM books.publish_date) = :year
ORDER BY books.price DESC;