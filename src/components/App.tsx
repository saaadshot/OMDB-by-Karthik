import React from "react";
// import _ from "lodash";
import { Layout, PageHeader, Pagination, Result } from "antd";
import "antd/dist/antd.css";

import searchMovie from "../apis/searchMovie";
import Form from "./Form";
import Content from "./Content";

interface IProps {}

interface IState {
  query: IQuery;
  response: IQueryResult<IMovieList>;
}

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  data: [],
  totalResults: "0",
};

class App extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      query: {
        title: "marvel",
        year: "",
        page: 1,
      },
      response: initialState,
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = async () => {
    const { query } = this.state;
    this.setState({ response: { ...initialState, isLoading: true } });

    try {
      const { title, year, page } = query;
      const { Response, Error, Search, totalResults } = await searchMovie(
        title,
        year,
        page
      );

      if (Response === "False") {
        throw Error;
      }

      this.setState({
        response: {
          ...initialState,
          data: Search,
          totalResults,
        },
      });
    } catch (ex) {
      this.setState({
        response: {
          ...initialState,
          isError: true,
          error: typeof ex === "string" ? ex : "Oops! Something went wrong",
        },
      });
    }
  };

  handleSearch = (value: IQuery) => {
    this.setState({ query: value }, this.fetchMovies);
  };

  handlePageChange = (page: number) => {
    const { query } = this.state;
    this.setState({ query: { ...query, page } }, this.fetchMovies);
  };

  render(): React.ReactNode {
    const { query, response } = this.state;
    const { isLoading, isError, error, data, totalResults } = response;

    const content = isError ? (
      <Result status={"error"} subTitle={error} />
    ) : (
      <Content
        loading={isLoading}
        data={data}
        footer={
          <Pagination
            current={query.page}
            total={Number(totalResults)}
            showSizeChanger={false}
            hideOnSinglePage
            onChange={this.handlePageChange}
          />
        }
      />
    );

    return (
      <Layout>
        <Layout.Header>OMDB</Layout.Header>
        <Layout.Content>
          <PageHeader>
            <Form loading={isLoading} onSearch={this.handleSearch} />
            {content}
          </PageHeader>
        </Layout.Content>
      </Layout>
    );
  }
}

export default App;
