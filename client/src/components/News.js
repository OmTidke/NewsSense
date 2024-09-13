import React from "react";
import NewsUpdate from "./NewsUpdate";
import { Component } from "react";
import propTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
  };

  static propTypes = {
    country: propTypes.string,
    category: propTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false, 
      page: 1,
      url: '' 
    };
  }
  
  
  
  // page and pageSize are methods provided by newsapi to get the current page number and number of articles to be displayed on single page
  async componentDidMount() {
    this.loading = true;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b3066539caff40e9a58adde12b51d404&page=1&pageSize=9`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      url: this.url
    });
    this.loading = false;
  }

  handleNextClick = async () => {
    console.log("Next");
    console.log(
      this.state.page + " " + Math.floor(this.state.totalResults / 9)
    );
    if (Math.ceil(this.state.page > this.state.totalResults / 9)) {
    } else {
      window.scrollTo(0, 0);
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=b3066539caff40e9a58adde12b51d404&page=${
        this.state.page + 1
      }&pageSize=9`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        url: this.url
      });
    }
  };

  handlePrevClick = async () => {
    console.log("Prev");
    window.scrollTo(0, 0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b3066539caff40e9a58adde12b51d404&page=${this.state.page-1}&pageSize=9`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      url: this.url
    });
  };
  render() {
    return (
      <>
        <div className="container my-3">
          <div className="row">
          {this.state.articles && this.state.articles.length > 0 ? (
  this.state.articles.map((article, index) => (
    <div className="col-md-4" key={index}>
      {/* Pass article data as props */}
      {(!article.url.includes('?'))?
        <NewsUpdate
          urlToImage={!article.urlToImage ? "" : article.urlToImage}
          title={!article.title ? "" : article.title.slice(0, 45)}
          description={!article.description ? "" : article.description.slice(0, 150)}
          url={article.url}
          thisArticle = {(article)}
        />
        : 
        <NewsUpdate
          urlToImage={!article.urlToImage ? "" : article.urlToImage}
          title={!article.title ? "" : article.title}
          description={!article.description ? "" : article.description}
          thisArticle = {(article)}
        />
      }
    </div>
  ))
) : (
  <p>No articles available.</p>
)}
          </div>
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" class="btn btn-warning" onClick={this.handlePrevClick}>
            &larr; Prev
          </button>
          <button disabled={this.state.page >= Math.ceil(this.state.totalResults / 9)} type="button" class="btn btn-warning" onClick={this.handleNextClick}>
            Next &rarr;
          </button>
        </div>
      </>
    );
  }
}
