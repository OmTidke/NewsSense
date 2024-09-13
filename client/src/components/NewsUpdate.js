import React, { Component } from "react";
import "../css/NewsUpdate.css";
import { Link } from 'react-router-dom';
import SingleNews from "./SingleNews";

export default class NewsUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSingleNews: false,
    };
  }

  handleSingleNewsClick = () => {
    this.setState({ showSingleNews: true });
  }

  render() {
    if (this.state.showSingleNews) {
      return (
        <div className="singleNewsCss">
          <SingleNews title={this.props.title} description={this.props.thisArticle}/>
        </div>
      );
    }

    const { urlToImage, title, description, url, thisArticle } = this.props;

    return (
      <div className="card" id="newsID">
        <img src={urlToImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <p hidden>{JSON.stringify(thisArticle)}</p>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description.slice(0, 150)}. . .</p>
          <Link to={{
            pathname: `/singlenews/${url}`,
            state: { url: url }
          }} className="btn btn-sm btn-outline-warning">
            Read More
          </Link> 
          {/* <button className="btn btn-success" onClick={this.handleSingleNewsClick}>
            Here
          </button> */}
          
        </div>
      </div>
    );
  }
}
