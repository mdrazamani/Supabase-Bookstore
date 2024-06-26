SELECT authors.country, AVG(books.price) as average_price
FROM authors
JOIN books ON authors.author_id = books.author_id
GROUP BY authors.country;