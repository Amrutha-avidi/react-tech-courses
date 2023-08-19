import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstantsForDetails = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TechItemDetails extends Component {
  state = {
    techData: [],
    apiStatus: apiStatusConstantsForDetails.initial,
  }

  componentDidMount() {
    this.getTechItemDetails()
  }

  getTechItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstantsForDetails.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
      }

      this.setState({
        techData: formattedData,
        apiStatus: apiStatusConstantsForDetails.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstantsForDetails.failure,
      })
    }
  }

  getLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  error = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page that you are looking for</p>
      <button type="button" onClick={this.getTechItemDetails()}>
        Retry
      </button>
    </div>
  )

  getDetailsView = () => {
    const {techData} = this.state
    const {name, description, imageUrl} = techData
    return (
      <div>
        <img src={imageUrl} alt={name} />
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    )
  }

  getApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstantsForDetails.success:
        return this.getDetailsView()
      case apiStatusConstantsForDetails.failure:
        return this.error()
      case apiStatusConstantsForDetails.inProgress:
        return this.getLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.getApiStatus()}</div>
  }
}

export default TechItemDetails
