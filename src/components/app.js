import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Grid, Row, Col } from "react-bootstrap";
import LazyLoad from "react-lazy-load";
import { isMobile } from "react-device-detect";
import {
  getMovies,
  updateSearchKey,
  filterMovies,
  asyncFilterMovies
} from "../actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      searchKey: "",
      page: 1,
      init: true,
      isVisible: false,
      isMobile: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.showHead = this.showHead.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    this.props.actions.getMovies(this.state.page, false);
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  genImage(image, index, length) {
    return (
      <LazyLoad height={158}>
        <div
          style={{
            alignItems: "center",
            overflow: "hidden"
          }}
        >
          <img
            style={{
              width: "100%"
            }}
            src={
              `./assets/${image}` ||
              `./assets/placeholder_for_missing_posters.png`
            }
            alt={`./assets/placeholder_for_missing_posters.png`}
          />
        </div>
      </LazyLoad>
    );
  }

  showPosts() {
    return this.props.movies.length > 1 ? (
      this.props.movies.map((post, index) => {
        const image = post["poster-image"];
        return (
          <Col
            xs={4}
            key={index}
            style={{
              float: "left",
              marginBottom: "45px",
              marginRight: "0px",
              marginLeft: "0px"
            }}
          >
            <div
              style={{
                display: "inline-block"
              }}
            >
              <div style={{ paddingBottom: "10px" }}>
                {this.genImage(image, index, this.props.movies.length)}
              </div>
              <p style={{ color: "#ffffff", fontSize: "3vw" }}>{post.name}</p>
            </div>
          </Col>
        );
      })
    ) : (
      <div>Loading...</div>
    );
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({ searchKey: e.target.value });
    if (e.target.value.trim().length > 1) {
      this.props.actions.updateSearchKey(this.state.searchKey);
      this.props.actions.asyncFilterMovies(this.props.search.searchKey);
    }
    return;
  }

  onKeyDown(e) {
    if (e.keyCode === 8) {
      this.setState({ page: 1 });
      this.setState({ searchKey: "" });
      this.props.actions.getMovies(1, true);
      this.props.actions.updateSearchKey("");
    }
  }

  showHead() {
    return (
      <div style={{ position: "sticky", top: "0" }}>
        <div
          style={{
            marginTop: "30px",
            marginBottom: "30px",
            maxHeight: "190px"
          }}
        >
          <input
            type="image"
            src="./assets/Back.png"
            alt="back"
            width="28"
            height="28"
            style={{ display: "inline", float: "left", paddingTop: "0px" }}
          />
          <span>
            <input
              type="text"
              onChange={e => this.handleSearch(e)}
              onKeyDown={this.onKeyDown}
              value={this.state.searchKey}
              style={{
                border: "1px solid #2c2c2d",
                display: "inline",
                backgroundColor: "#131314",
                color: "#ffffff",
                fontSize: "4vw",
                marginLeft: "20px",
                outline: "none"
              }}
            />
          </span>
          <input
            type="image"
            src="./assets/search.png"
            alt="search"
            width="48"
            height="28"
            onClick={e => this.handleSearch(e)}
            style={{
              display: "inline",
              float: "right",
              paddingTop: "0px",
              paddingRight: "20px"
            }}
          />
        </div>
      </div>
    );
  }
  fetchMovies(page) {
    console.log(`new movies for page ${page}`);
    this.props.actions.getMovies(this.state.page, false);
  }

  handleScroll = event => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 400
    ) {
      if (this.state.page < 3) {
        this.setState({ page: this.state.page + 1 });
        this.fetchMovies(this.state.page);
      }

      console.log(`looks like yeah `);
    }
  };

  render() {
    const renderMovies = this.showPosts();
    const renderHead = this.showHead();
    return isMobile ? (
      <div className="">
        <div>{renderHead}</div>
        <Grid>
          <div>
            <Row>{renderMovies}</Row>
          </div>
        </Grid>
      </div>
    ) : (
      <div>
        <p
          style={{
            color: "#ffffff",
            fontSize: "25px",
            paddingTop: "30px",
            right: "50%"
          }}
        >
          React JS/ Workshop/ Diagnal technologies
        </p>
        <div
          style={{
            padding: 0,
            margin: 0,
            marginTop: "30px",
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "500px",
            backgroundImage: "url(./assets/mobileOnly.jpg)",
            color: "#ffffff",
            fontSize: "25px",
            position: "relative"
          }}
        >
          <p
            style={{
              position: "absolute",
              bottom: "80px",
              left: "20px",
              backgroundColor: "#191a21",
              color: "#ffffff",
              paddingLeft: "20px",
              paddingRight: "20px",
              width: "300px"
            }}
          >
            This is Mobile only version, please view the page in mobile or use
            browser devtools to toggle device view and then refresh the page.
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { movies: state.movies, search: state.search };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      { getMovies, updateSearchKey, filterMovies, asyncFilterMovies },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
