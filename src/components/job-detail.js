
import './job-details.css';
const JobDetail = (props) => {
  return (
    <details  className='detail_container'>
     <summary className='detail_title'> {props.title}</summary>
     <h2><a href={props.companyURL}> {props.companyName} </a></h2>
     <div className='detail_description'
       dangerouslySetInnerHTML={{
         __html: props.description
       }}></div>
     </details>
  )
} 
export default JobDetail;