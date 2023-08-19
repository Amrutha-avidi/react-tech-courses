import {Link} from 'react-router-dom'

import './index.css'

const TechItem = props => {
  const {techData} = props
  const {logoUrl, name, id} = techData

  return (
    <li>
      <Link to={`/courses/${id}`}>
        <img src={logoUrl} alt={name} />
        <p>{name}</p>
      </Link>
    </li>
  )
}
export default TechItem
