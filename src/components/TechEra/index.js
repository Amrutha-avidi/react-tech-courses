import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TechItem from '../TechItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TechEra extends Component {
  state = {
    techData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTechData()
  }

  getTechData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const response = await fetch('https://apis.ccbp.in/te/courses')
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        techData: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  error = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page that you are looking for</p>
      <button type="button" onClick={this.getTechData()}>
        Retry
      </button>
    </div>
  )

  getLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  getTechEraView = () => {
    const {techData} = this.state
    return (
      <ul>
        <h1>Courses</h1>
        {techData.map(item => (
          <TechItem techData={item} key={item.id} />
        ))}
      </ul>
    )
  }

  getTechApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getTechEraView()
      case apiStatusConstants.failure:
        return this.error()
      case apiStatusConstants.inProgress:
        return this.getLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="blog-list-container">{this.getTechApiStatus()}</div>
  }
}

export default TechEra
