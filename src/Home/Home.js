import React, {Component} from 'react';
import request from "superagent";
import CardHeader from "../Common/CardHeader"
import CardFooter from "../Common/CardFooter";
import PageHeader from "../Common/PageHeader";
import './Home.css';

export const Card = props => {
    return <div className="col-lg-4 col-sm-6 cardMargin">
      <div className="card cardSubBody">
        {props.children}
      </div>
  </div>
}

class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      apiData: [],
      page: 1,
      limit: 4
    };

    // Binds our scroll event handler
    window.onscroll = () => {
      const {
        loadUsers,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;
      if (error || isLoading || !hasMore) return;
      if ( window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        loadUsers(this.state.page, this.state.limit);
      }
    };
  }

  componentWillMount() {
    this.loadUsers(this.state.page, this.state.limit);
  }

  loadUsers = (page=1, limit=4) => {
    let url = `https://5e6dc3ca4e86f8001618cc2c.mockapi.io/ad/ad_docs?page=${page}&limit=${limit}`;
    this.setState({ isLoading: true }, () => {
      request
      .get(url)
      .then((results) => {
        const resData = results.body.map(res => ({
          description: res.description,
          title: res.title,
          documentation: res.documentation,
          image: res.image,
          icon: res.avatar
        }));
        this.setState({
          hasMore: (this.state.page < 5),
          isLoading: false,
          apiData: [
            ...this.state.apiData,
            ...resData,
          ],
          page: this.state.page + 1
        });
      })
      .catch((err) => {
        this.setState({
          error: err.message,
          isLoading: false,
        });
      })
    });
  }

  render() {
    const { error, hasMore, isLoading, apiData } = this.state;
    return (
      <div>
        <PageHeader />
        <div className="container">
          <div className="row">
            <div className="col-lg-12 ">
              <div className="row">
                {apiData && apiData.map((values, index) => (
                  <Card key={index}>
                    <CardHeader data={values} />
                    <CardFooter data={values} />
                  </Card>
                ))}
              </div>
            </div>
          </div>
          {error &&
            <div style={{ color: '#900' }}>
              {error}
            </div>
          }
          {isLoading &&
            <div style={{ color: '#900',margin:'30px 0' }}>Loading...</div>
          }
          {!hasMore &&
            <div style={{ color: '#32CD32',margin:'30px 0' }}>You did it! You reached the end!</div>
          }
        </div>
      </div>
    );
  }
}

export default Home;
