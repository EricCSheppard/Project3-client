import ProgressBar from 'react-bootstrap/ProgressBar'

const DaysLeftBar = (props) => {
    const { goal } = props
    let now = goal.percentRemain
    if (now >= 20) {
        return <ProgressBar variant='info' striped animated now={now}/>
    } else {
        return <ProgressBar variant='danger' striped animated now={now}/>
    }
}

export default DaysLeftBar