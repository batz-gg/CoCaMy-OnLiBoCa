import React from "react";
import { useSelector } from "react-redux";
import { selectArticles, filterArticles } from "../features/articles/articlesSlice";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";

export default function Articles () {
  const articles = useSelector(selectArticles)

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const title = queryParams.get('title');

  const filteredArticles = title ? filterArticles(title, articles) : Object.values(articles)

  return (
    <main>
      <h1>Articles</h1>
      <ul>
        { filteredArticles.map(article => (
          <li key={article.slug}>
            <Link to={`/articles/${article.slug}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
      <Search />
    </main>
  )
}
